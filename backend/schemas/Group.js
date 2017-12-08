import { Schema } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sports: {
        type: String,
        required: true,
    },
    Users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: User,
        }],
    },
    Host: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now,
    }

}, { timestamps: true })

export default Group;