import mongoose, { Schema } from 'mongoose';
import User, {sportList} from "./User";

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sport: {
        type: String,
        enum: sportList,
        required: true,
    },
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    maxSize: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger
        }
    },
    currentSize: {
        type: Number,
        default: 1,
        validate: {
            validator: Number.isInteger
        }
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date,
        default: Date.parse("2 hours")
    },
    updated: {
        type: Date,
        default: Date.now(),
    }

}, { timestamps: true });

// Custom Validations

groupSchema.pre('validate', (next) => {
    if (this.startTime >= this.endTime) next(new Error("The end time must be greater than the start time!"));
    else if (this.currentSize > this.maxSize) next(new Error("The max size must be greater than or equal to the current size!"));
    else next();
});

const Group = mongoose.model('Group', groupSchema);

export default Group;