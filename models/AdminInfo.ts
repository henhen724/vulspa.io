import mongoose from 'mongoose';

export enum Permissions {
    normal = 'normal',
    bot = 'bot',
    super = 'super'
}

const AdminInfoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    permission_level: {
        type: Permissions,
        required: true
    }
})

export default mongoose.models.AdminInfo || mongoose.model('AdminInfo', AdminInfoSchema, 'admins');