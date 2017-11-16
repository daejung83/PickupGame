import express, {Router} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import secrets from './secrets';
import morgan from 'morgan';
import index from './routers';

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

// Register the router to /api
app.use(morgan('combined'));
app.use('/api', index);

// Launch the server on port 3000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    const {address, port} = server.address();
    console.log(`Listening at http://${address}:${port}`);
});

// TODO: cookie-parser?
// TODO: Configure passport.js session
// TODO: Configure passport.js local strategy
