import Knex from 'knex'

const dbName = process.env.DATABASE_NAME
const dbUser = process.env.DATABASE_USER
const dbHost = process.env.DATABASE_HOST
const dbPassword = process.env.DATABASE_PASSWORD
const dbPort = process.env.DATABASE_PORT

const knex = Knex({
  client: 'postgres',
  connection: {
    host: dbHost,
    port: Number(dbPort),
    user: dbUser,
    password: dbPassword,
    database: dbName,
  }
});

export default knex
