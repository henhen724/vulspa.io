import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'This user needs an object id.']
    },
    admin: {
        type: Boolean,
        required: [true, 'I need to know whether this is an admin or not.']
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

export default mongoose.models.User || mongoose.model('User', UserSchema);