import type { Knex } from "knex";
import dotenv from "dotenv"
dotenv.config()

const dbName = process.env.DATABASE_NAME
const dbUser = process.env.DATABASE_USER
const dbHost = process.env.DATABASE_HOST
const dbPassword = process.env.DATABASE_PASSWORD
const dbPort = process.env.DATABASE_PORT

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: dbHost,
      port: Number(dbPort),
      database: dbName,
      user: dbUser,
      password: dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: dbHost,
      port: Number(dbPort),
      database: dbName,
      user: dbUser,
      password: dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: dbHost,
      port: Number(dbPort),
      database: dbName,
      user: dbUser,
      password: dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
