import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/transactions', routes.transactions);
app.use('/categories', routes.categories);
app.use('/items', routes.items);
app.use('/user', routes.user);

app.listen(3000, () => console.log('Blog API listening on port 3000!'));
