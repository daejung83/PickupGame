import { Schema } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Users: {
        type: [User.id],
        required: true,
    },
    Host: {
        type: User.id,
        required: true,
    }
})