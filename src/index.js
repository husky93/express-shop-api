import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();

app.use(cors());
app.use('/users', routes.users);
app.use('/posts', routes.posts);

app.listen(3000, () => console.log('Blog API listening on port 3000!'));
