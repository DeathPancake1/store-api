import express, { Application } from 'express';
import cors from 'cors';
import { routes } from './api/routes';

export const app: Application = express();

const corsOption = {
  optionsSuccessStatus: 200
};
app.use(cors(corsOption));
app.use(express.json());
routes(app);