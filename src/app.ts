import express, { Application } from 'express';
import cors from 'cors';

export const app: Application = express();

// enable cors
const corsOption = {
  optionsSuccessStatus: 200 // for some lagacy browsers
};
app.use(cors(corsOption));
// add json parser
app.use(express.json());