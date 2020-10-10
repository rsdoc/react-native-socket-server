import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/hello', (_req, res) => res.status(200).send('Ok '));

app.listen(4000, () => console.log(`Running successfully at port 4000`));
