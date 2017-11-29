import express, {Router} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import secrets from './secrets';
import morgan from 'morgan';
import routers from './routers';
import passport from 'passport';
import Strategy from 'passport-local';
import session from 'express-session'
import User from "./schemas/User";

// Initialize http server
const app = express();

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect(secrets.connection, {useMongoClient: true});

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Configure passport.js session
app.use(session({ secret: 'derpy' }));
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Configure passport.js local strategy
passport.use('local-signup', new Strategy({
    usernameField : 'email',
    passwordField : 'password',
}, async (email, password, done) => {
    let user;
    try {
        user = await User.register(email, password);
    } catch (err) {
        if (err.statusCode === 403) return done(null, false, {message: err.message});
        else return done(err);
    }
    return done(null, user);
}));

passport.use('local-signin', new Strategy(
    {usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        const user = await User.validate(email, password);
        if (user) done(null, user);
        else done(null, false, { message: 'Incorrect email or password.' });
    }
));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Register the router to /api
app.use(morgan('combined'));
app.use('/api', routers(new Router(), passport));

// Launch the server on PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    const {address, port} = server.address();
    console.log(`Listening at http://${address}:${port}`);
});
