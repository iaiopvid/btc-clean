import moduleAlias from 'module-alias';
import path from 'path';
import dotenv from "dotenv"
dotenv.config()
import Express from 'express';

moduleAlias.addAliases({
  '@': path.resolve(`${__dirname}`, '../../'),
});

import { setupMiddleware } from '@/infra/config/middleware';
import { setupSwagger } from '@/infra/config/swagger';
import { setupRoutes } from '@/infra/config/routes';

import knex from '@/infra/database/postgres/knex';

console.log(process.env.PORT)

knex
  .raw('SELECT 1')
  .then(() => {
    console.log(`PostgreSQL connected`)
    return `PostgreSQL connected`
  })
  .catch((e) => {
    console.error(`PostgreSQL not connected`)
  });


(async () => {
  const listeningPort = process.env.PORT || 5000;
  const server = Express();

  setupMiddleware(server);
  setupRoutes(server);
  setupSwagger(server);

  server.use((req, res, next) => {
    res.on('error', (err) => {
      console.log('error', err);
    });
    next();
  });

  server.listen(listeningPort, () => {
    console.log(`[*] listening http://0.0.0.0:${listeningPort}`);
  });
})();
