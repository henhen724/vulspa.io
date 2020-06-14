import { AuthenticationError, UserInputError } from 'apollo-server-micro';

import User from '../models/User';
import mongoose from 'mongoose';

const createUser = data => {
    return {
        id: new mongoose.Types.ObjectId,
        admin: false,
        name: data.name,
    };
}

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
        async viewer() {
            return null;
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
            const user = await User.find({ name: args.name }).exec(); // Find returns an array here I check that there is exactly one match
            if (user.length === 0)
                throw new UserInputError(`There is no users with the name ${args.name}`, { type: 'USER_DOES_NOT_EXIST' });
            if (user.length > 1) {
                console.log(`There are some how ${user.length} users with the name ${args.name}.  Here they are:\n${user}`);
                throw new Error(`Internal server error, some how multiple people have the name ${user.name}.`);
            }
            return { user: user[0] };
        },
        async signOut(parent, args, context, info) {
            // context.res.setHeader(
            //     'Set-Co'
            // )

            return true
        },
        async runCommand(parent, args, context, info) {
            const cmdArgs = args.command.split(' ');
            var rslt = "Sorry, I don't know that command.";
            switch (cmdArgs[0].toLowerCase()) {
                case 'joincode':
                case 'joinfireteam':
                case '':
                default:
                //Leave rslt message as the command not recognised string 
            }
            return rslt;
        },
    },
}

export default resolver;