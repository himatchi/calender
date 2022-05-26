import mongoose, {Schema, Document, ObjectId } from 'mongoose';

export interface User extends Document {
    id: String;
    name: String;
    hashedPassword: String;
}

const userSchema: Schema = new Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        hashedPassword: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<User>('User', userSchema);