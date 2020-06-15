import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import User from '../models/User';
import AdminInfo, { Permissions } from '../models/AdminInfo';
import { createUser, validatePassword } from '../lib/users';
import { setLoginSession, getLoginSession } from '../lib/auth';
import { removeTokenCookie } from '../lib/auth-cookies';

const resolver = {
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
            try {
                const session = await getLoginSession(context.req);

                if (session) {
                    return await User.find({ id: session.id }).exec();
                }
            } catch (error) {
                throw new AuthenticationError(`Authentication token is not valid or not present.  Please log in.`);
            }
        },
        async adminList() {
            return await AdminInfo.find({}).exec();
        },
    },
    Mutation: {
        async signUp(parent, args, context, info) {
            const user = createUser(args.input);
            const nameConflict = await User.find({ name: user.name });
            if (nameConflict.length !== 0)
                throw new UserInputError(`An account already exists for ${user.name}.`, { type: 'USER_EXISTS' });
            await User.create(user);
            return { user };
        },
        async signIn(parent, args, context, info) {
            const { name, password } = args.input;
            const user = await User.find({ name }).exec(); // Find returns an array here I check that there is exactly one match
            if (user.length === 0)
                throw new UserInputError(`There is no users with the name ${name}`, { type: 'USER_DOES_NOT_EXIST' });
            if (user.length > 1) {
                console.log(`There are some how ${user.length} users with the name ${name}.  Here they are:\n${user}`);
                throw new Error(`Internal server error, some how multiple people have the name ${user.name}.`);
            }
            if (validatePassword(user[0], password)) {
                const session = { id: user[0].id, name: user[0].name }

                await setLoginSession(context.res, session);

                return { user: user[0] };
            }
            else
                throw new AuthenticationError('Sorry, that password isn\'t correct.');
        },
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
                console.log(`Non admin. Premoting ${users[0].name} normal user to admin permissions level ${permissionString}`);
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

            console.log(`Admin ${id} found deleteing`);
            await admins[0].remove();
            return { admin: admins[0] };
        },
        async runCommand(parent, args, context, info) {
            const cmdArgs = args.command.split(' ');
            var rslt = "Sorry, I don't know that command.";
            switch (cmdArgs[0].toLowerCase()) {
                default:
                //Leave rslt message as the command not recognised string 
            }
            return rslt;
        },
    },
}

export default resolver;