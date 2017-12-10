import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'
import Group from './Group'

const saltRound = 12;
export const sportList = ["Basketball", "Football", "Soccer", "Tennis", "Badminton", "Volleyball"];

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    name: String,
    hash: {
        type: String,
        select: false
    },
    groups: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Group',
        }],
    },
    rating: {
        type: Number,
        default: 0,
    },
    numberRated: {
        type: Number,
        default: 0,
    },
    preferredSport: {
        type: String,
        enum: sportList
    },
    updated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

// Validate the user and if valid, return the user's id in the database as a string
userSchema.statics.validate = async function(email, password) {
    const user = await this.findOne({email: email.toLowerCase()}, '+hash').exec();
    if (user && await bcrypt.compare(password, user.hash)) return user;
    else return null;
};

// Register a user
userSchema.statics.register = async function(email, password) {
    const existing = await this.findOne({email: email.toLowerCase()});
    if (existing) throw {
        statusCode: 403,
        message: "This email already exists"
    };
    const user = new this({
        email: email.toLowerCase(),
        hash: await bcrypt.hash(password, saltRound)
    });
    await user.save();
    return user;
};

userSchema.methods.createGroup = async function (name, sport, lon, lat, maxSize, start, end) {
    const group = new Group({
        name: name,
        sport: sport,
        longitude: lon,
        latitude: lat,
        maxSize: maxSize,
        host: this._id,
        startTime: start,
        endTime: end
    });
    await group.save();
    return group;
};

const User = mongoose.model('User', userSchema);

export default User;