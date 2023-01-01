import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';
import express from 'express';
import bodyParser from 'body-parser';
import { connection } from './database/connection';

dotenv.config();

const app = express();
const pathToFolder = './assets';

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(pathToFolder, express.static(path.join(__dirname, pathToFolder)));

app.use(routes);

const server = async () => {
  const PORT = process.env.PORT || 3000;
  const databaseConnection = await connection();

  if (!databaseConnection) {
    console.log('database connection failure');
    return;
  }

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

server();
