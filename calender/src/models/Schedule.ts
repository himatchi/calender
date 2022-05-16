import mongoose, {Schema, Document } from 'mongoose';

export interface Schedule extends Document {
    id: Number;
    name: String;
    user: Number;
    date: Date;
    text: String;
}

const scheduleSchema: Schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        user: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Schedule>('Schedule', scheduleSchema);