import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import User from '../models/User';
import AdminInfo, { Permissions } from '../models/AdminInfo';
import { createUser } from '../lib/users';
import { setLoginSession, getLoginSessionFromReq, getLoginSessionFromToken } from '../lib/auth';
import { removeTokenCookie } from '../lib/auth-cookies';
import fetch from 'isomorphic-unfetch';
import { GraphQLScalarType } from 'graphql';

const resolver = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'The standard Date type for javascript',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
    }),
    Query: {
        async user(id) {
            return await User.find({ id: id }).exec();
        },
        async userByName(name) {
            return await User.find({ name: name }).exec();
        },
        async users() {
            return await User.find({}).exec();
        },
        async viewer(parent, args, context, info) {
            const session = await getLoginSessionFromReq(context.req);

            if (session) {
                return await User.findOne({ id: session.id }).exec();
            }
        },
        async discordOAuthCode(parent, args, context, info) {
            // Get token and id from discord
            const data = {
                'client_id': process.env.DISCORD_BOT_CLIENT_ID,
                'client_secret': process.env.DISCORD_BOT_CLIENT_SECRET,
                'grant_type': 'authorization_code',
                'code': args.code,
                'scope': 'identify email connections gdm.join',
                'redirect_uri': process.env.ROOT_URI + '/accounts/discord/landing',
            };
            const body = new URLSearchParams(data);
            const bearerToken = await (await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body,
            })).json();
            if (bearerToken.error) {
                throw new AuthenticationError(`Discord authentication failed: ${bearerToken.error} - ${bearerToken.error_description}`)
            }
            const discordViewerRes = await (await fetch('https://discord.com/api/users/@me', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${bearerToken.access_token}` }
            })).json();
            if (discordViewerRes.error) {
                throw new AuthenticationError(`Discord authentication failed: ${discordViewerRes.error} - ${discordViewerRes.error_description}`)
            }

            //Find user or create user
            if (args.state.split(0, 5) === 'TOKEN') {
                const session = await getLoginSessionFromToken(args.state);
                if (!session) {
                    throw new AuthenticationError(`Authentication token is not valid.`);
                }
                var user = await User.findOne({ id: session.id }).exec();
                if (user.discordId !== discordViewerRes.id) {
                    throw new UserInputError(`You are already signed into a different discord account: ${user.name}.  Please sign out first.`)
                }
            } else {
                var user = await User.findOne({ discordId: discordViewerRes.id }).exec();
                if (!user) {
                    const userObj = createUser({ name: discordViewerRes.username, discordId: discordViewerRes.id })
                    console.log(userObj)
                    user = User.create(userObj)
                }
                const session = { id: user.id, name: user.name };
                await setLoginSession(context.res, session);
            }
            user.discord = {
                id: discordViewerRes.id,
                token: bearerToken.access_token,
                refresh_token: bearerToken.refresh_token,
                expirationDate: new Date(Date.now() + bearerToken.expires_in)
            };
            user.email = discordViewerRes.email;
            await user.save();
            return user
        },
        async bungieOAuthCode(parent, args, context, info) {
            const data = {
                'client_id': process.env.BUNGIE_CLIENT_ID,
                'client_secret': process.env.BUNGIE_CLIENT_SECRET,
                'grant_type': 'authorization_code',
                'code': args.code,
            };
            const body = new URLSearchParams(data);

            const bearerToken = await (await fetch('https://www.bungie.net/Platform/App/OAuth/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body,
            })).json();

            if (bearerToken.error) {
                throw new AuthenticationError(`Bungie authentication failed: ${bearerToken.error} - ${bearerToken.error_description}`)
            }
            const session = await getLoginSessionFromToken(args.state);
            if (!session) {
                throw new AuthenticationError(`Authentication token is not valid or not present.  Please log in.`);
            }
            var user = await User.findOne({ id: session.id }).exec();
            user.bungie = {
                id: bearerToken.membership_id,
                token: bearerToken.access_token,
                refresh_token: bearerToken.refresh_token,
                expirationDate: new Date(Date.now() + bearerToken.expires_in)
            };
            await user.save();
            return user
        },
        async adminList() {
            return await AdminInfo.find({}).exec();
        },
        async adminListByUser() {
            const admins = await AdminInfo.find({}).exec();
            const adminids = admins.map(admin => admin.id);
            const users = await User.find({ id: { $in: adminids } }).exec();
            return { users, admins }
        }
    },
    Mutation: {
        async signOut(parent, args, context, info) {
            removeTokenCookie(context.res);
            return true
        },
        async editAdmin(parent, args, context, info) {
            const { id, permissionString } = args.input;
            if (permissionString !== 'normal' && permissionString !== 'bot' && permissionString !== 'super')
                throw new UserInputError(`${permissionString} is not a valid permission level.  Can be normal, bot, or super.`, { type: 'INVALID_PERMISSION' });

            let permission_level = permissionString as Permissions;

            const users = await User.find({ id });
            if (users.length === 0)
                throw new UserInputError(`No user exists with the id ${id}`);
            if (users.length > 1)
                throw new Error(`Server error multiple users exist with the id ${id}`);

            const admins = await AdminInfo.find({ id });
            console.log(`Admins ${admins}`)
            if (admins.length === 0) {
                console.log(`Non admin. Promoting ${users[0].name} normal user to admin permissions level ${permissionString}`);
                await AdminInfo.create({ id, permission_level });
                return { admin: { id, permission_level } };
            }
            if (admins.length > 1)
                throw new Error(`Multiple admin exist with the id ${id}`);

            console.log(`${users[0].name} is perm level ${admins[0].permission_level}. Changing permissions to ${permissionString}.`);
            await AdminInfo.updateOne({ id }, { id, permission_level });
            console.log(`Permissions changed.`)
            return { admin: { id, permission_level } }
        },
        async deleteAdmin(parent, args, context, info) {
            const { id } = args.input;
            const admins = await AdminInfo.find({ id });
            if (admins.length === 0) {
                throw new UserInputError(`No admin has the id ${id}`);
            }
            if (admins.length > 1)
                throw new Error(`Multiple admin exist with the id ${id}`);

            console.log(`Admin ${id} found deleting`);
            await admins[0].remove();
            return { admin: admins[0] };
        },
        async runCommand(parent, args, context, info) {
            const cmdArgs = args.command.split(' ');
            var rslt = "Sorry, I don't know that command.";
            switch (cmdArgs[0].toLowerCase()) {
                default:
                //Leave rslt message as the command not recognized string 
            }
            return rslt;
        },
    },
}

export default resolver;