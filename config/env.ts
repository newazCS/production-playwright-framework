import dotenv from 'dotenv';

const envFile = process.env.TEST_ENV
  ? `.env.${process.env.TEST_ENV}`
  : '.env.dev';

dotenv.config({ path: envFile });

export const ENV = {
  current: process.env.ENV || 'dev'
};