import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes/api/router';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', apiRouter);
app.use(express.static(__dirname + '/../client/build/'));

export default app;