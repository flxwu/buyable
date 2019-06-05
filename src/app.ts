import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import mongoose, { Mongoose } from 'mongoose';
import MongoConnect from 'connect-mongo';
import passport from 'passport';
import passportLocal from 'passport-local';
import expressValidator from 'express-validator';
import validator from 'validator';
import { UserModel } from './schemas/user';
import { IUser } from './interfaces/user';
import apiRouter from './routes/api/router';
import { Schema } from 'mongoose';
const configureApp = async () => {
  const app = express();
  const MongoStore = MongoConnect(session);

  // Session Handling
  const mongoURL = `mongodb://${process.env.MLAB_USER}:${
    process.env.MLAB_PASSWORD
  }@ds016108.mlab.com:16108/buyable-dev`;
  if (!process.env.OFFLINE) {
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
  }

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressValidator());
  // MongoDB
  if (!process.env.OFFLINE)
    await mongoose.connect(mongoURL, { useNewUrlParser: true });

  console.log('connected to db');
  const db = mongoose.connection;
  db.on('error', () => console.error('Error connecting to MLab MongoDB'));

  const LocalStrategy = passportLocal.Strategy;
  passport.serializeUser((user: IUser, done: Function) => {
    done(null, user._id);
  });

  passport.deserializeUser((id: Schema.Types.ObjectId, done: Function) => {
    UserModel.findById(id, (err: Error, user: IUser) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(function(
      username: string,
      password: string,
      done: Function
    ) {
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

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api', apiRouter);
  app.use(express.static(__dirname + '/../client/build/'));
  return app;
};
export default configureApp;
