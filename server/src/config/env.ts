import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  databaseUrl: process.env.DATABASE_URL,
  baseUrl: process.env.BASE_URL || 'http://localhost:4000',
  nodeEnv: process.env.NODE_ENV || 'development'
};
