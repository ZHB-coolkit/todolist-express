import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import userRouter from './routes/user';
import todoRouter from './routes/todo';

import './db/mongodb';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/v1', indexRouter);
app.use('/v1/user', userRouter);
app.use('/v1/todo', todoRouter);

export default app;
