import { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

const dbName = process.env.DATABASE_NAME
const dbUser = process.env.DATABASE_USER
const dbHost = process.env.DATABASE_HOST
const dbPassword = process.env.DATABASE_PASSWORD
const dbPort = process.env.DATABASE_PORT

const config = {
  client: 'postgresql',
  connection: {
    host: dbHost,
    port: Number(dbPort),
    user: dbUser,
    password: dbPassword,
    database: dbName,
  },
} as Knex.Config;

export default config;
