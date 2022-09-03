import mongoose from 'mongoose';

export const createUser = (data: { name: string, discordId: string }) => {
    const user = {
        id: new mongoose.Types.ObjectId,
        discordId: data.discordId,
        name: data.name,
        createdAt: Date.now(),
    }
    return user;
}