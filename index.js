import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import connect from './db/connect';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import uploadRouter from './routes/upload.route';
import postRouter from './routes/post.route';
import commentRouter from './routes/comment.route';
import notificationRouter from './routes/notification.route';

const app = express();
const port = 8888;

// config
dotenv.config();
app.use(express.json());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use(morgan('combined'));

app.use('/uploads', express.static('uploads'));

// database connect
connect();

app.listen(port, () => {
    console.log('App listening on port ' + port);
});

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter);   
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/notification', notificationRouter);
