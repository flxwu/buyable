import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoConnect from 'connect-mongo';

import apiRouter from './routes/api/router';

const app = express();

const MongoStore = MongoConnect(session);

// Session Handling
const mongoURL = `mongodb://flxwu:${
  process.env.MLAB_PASSWORD
}@ds016108.mlab.com:16108/buyable-dev`;
app.use(
  session({
    secret: 'foo',
    store: new MongoStore({
      url: mongoURL
    }),
    resave: true,
    saveUninitialized: true
  })
);

// MongoDB
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', () => console.error('Error connecting to MLab MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', apiRouter);
app.use(express.static(__dirname + '/../client/build/'));

export default app;