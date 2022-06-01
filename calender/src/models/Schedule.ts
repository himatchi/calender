/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import mongoose, {Schema, Document, ObjectId } from 'mongoose';

export interface Schedule extends Document {
    name: String;
    user: String;
    category: String;
    allday: Boolean;
    date: Date;
    end: Date;
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
        category: {
            type: String,
            required: true
        },
        allday: {
            type: Boolean,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        end: {
            type:Date,
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