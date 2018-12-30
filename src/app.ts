import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoConnect from 'connect-mongo';
import passport from 'passport';
import passportLocal from 'passport-local';
import validator from 'validator';
import { UserModel } from './schemas/user';
import apiRouter from './routes/api/router';

const app = express();

const MongoStore = MongoConnect(session);

// Session Handling
const mongoURL = `mongodb://${process.env.MLAB_USER}:${
  process.env.MLAB_PASSWORD
}@ds016108.mlab.com:16108/buyable-dev`;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: mongoURL
    }),
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
// MongoDB
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', () => console.error('Error connecting to MLab MongoDB'));

const LocalStrategy = passportLocal.Strategy;
passport.serializeUser<any, any>((user, done) => {
  done(undefined, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    UserModel.findOne(
      validator.isEmail(username) ? { email: username } : { username },
      async function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        const pwCorrect = await user.verifyPassword(password);
        if (!pwCorrect) {
          return done(null, false);
        }
        return done(null, user);
      }
    );
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', apiRouter);
app.use(express.static(__dirname + '/../client/build/'));

export default app;
