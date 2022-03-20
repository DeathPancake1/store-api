import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('ENV: ', process.env.ENVI);
export const Client: Pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string),
  database:
    process.env.ENVI === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB
});