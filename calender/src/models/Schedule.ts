import mongoose, {Schema, Document } from 'mongoose';

export interface Schedule extends Document {
    name: String;
    user: String;
    date: Date;
    text: String;
}

const scheduleSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        user: {
            type: String,
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