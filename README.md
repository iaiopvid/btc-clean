# btc-clean

BTC - Clean Architecture

## Downloading the repository

Requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/iaiopvid/btc-clean.git
```

ou via ssh

```sh
git clone git@github.com:iaiopvid/btc-clean.git
```

## Installing dependencies - Terminal

Install the dependencies and devDependencies and start the server.

#### com yarn

```sh
yarn
```

#### com npm/pnpm

```sh
npm install
pnpm install
```

## Config

Configure environment variables through the .env file

```sh
PORT=5000
JWT_SECRET_STRING=MYS3CR3TK3Y
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
```

## Migrating the Database

Através do Knex

```sh
yarn/npx/pnpx knex migrate:latest
```

If everything is configured correctly, the tables should already be in the Database

## Running the project

```sh
yarn/npx/pnpx serve
```

```sh
21:36:20 - Found 0 errors. Watching for file changes.
5000
[*] listening http://0.0.0.0:5000
PostgreSQL connected
```
