import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();

app.use(cors());

app.use('/transactions', routes.transactions);
app.use('/categories', routes.categories);
app.use('/items', routes.items);
app.use('/user', routes.user);

app.listen(3000, () => console.log('Blog API listening on port 3000!'));
