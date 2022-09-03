import mongoose from 'mongoose';

// Defining the typescript interfaces which user will use.
interface DiscordUser {
    id: string,
    code: string,
    token: string,
    expatriationDate: Date,
}

interface BungieUser {
    id: string,
    code: string,
    token: string,
    expatriationDate: Date,
}

interface User {
    id: string,
    hash: string,
    salt: string,
    name: string,
    email: string,
    discord?: DiscordUser,
    bungie?: BungieUser,
}

const UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        unique: true,
        required: true
    },
    discordId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: false
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
        token: {
            type: String,
            required: false
        },
        refresh_token: {
            type: String,
            required: false
        },
        expirationDate: {
            type: Date,
            required: false
        },
        required: false
    },
    bungie: {
        id: {
            type: String,
            required: false
        },
        token: {
            type: String,
            required: false
        },
        refresh_token: {
            type: String,
            required: false
        },
        expirationDate: {
            type: Date,
            required: false
        },
        required: false
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');