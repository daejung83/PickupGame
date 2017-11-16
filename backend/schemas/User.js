import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'

const saltRound = 8;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    name: String,
    hash: String
});

const User = mongoose.model('User', userSchema);

// Validate the user and if valid, return the user's id in the database as a string
userSchema.statics.validate = async (email, password) => {
    const user = await this.findOne({email: email.toLowerCase()}, 'hash').exec();
    if (!user) return null;
    else if (bcrypt.compare(password, user.hash)) return null;
    else return user.id;
};

// Register a user
userSchema.statics.register = async (email, password) => {
    const user = new User({
        email: email.toLowerCase(),
        hash: await bcrypt.hash(password, saltRound)
    });
    return user.save();
};

export default User;