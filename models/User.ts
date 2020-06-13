import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This user needs a name.']
    },
    discord: {
        id: {
            type: String,
            required: false
        }
    },
    steam: {
        id: {
            type: String,
            required: false
        }
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema);