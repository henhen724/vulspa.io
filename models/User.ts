import mongoose from 'mongoose';

// Defining the typescript interfaces which user will use.
interface DiscordUser {
    id: string
}

interface SteamUser {
    id: string
}

interface User {
    id: string,
    hash: string,
    salt: string,
    name: string,
    discord?: DiscordUser,
    steam?: SteamUser,
}

const UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'This user needs an object id.']
    },
    hash: {
        type: String,
        required: [true, 'User needs a password hash.']
    },
    salt: {
        type: String,
        required: [true, 'User needs a salt for password encryption.']
    },
    name: {
        type: String,
        required: [true, 'This user needs a name.']
    },
    discord: {
        id: {
            type: String,
            required: false
        },
        required: false
    },
    steam: {
        id: {
            type: String,
            required: false
        },
        required: false
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');