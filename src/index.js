import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import routes from './routes';

import './passport';

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: 'https://husky93.github.io',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/transactions', routes.transactions);
app.use('/categories', routes.categories);
app.use('/images', routes.images);
app.use('/items', routes.items);
app.use('/user', routes.user);
app.use('/auth', routes.auth);

app.listen(port, () => console.log('Blog API listening on port 3000!'));
