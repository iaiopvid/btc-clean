import { env } from '@/infra/config/environment';
import { Express, json } from 'express';
import * as Sentry from '@sentry/node';
import cors from 'cors';

export const setupMiddleware = (app: Express): void => {
  app.use(cors({ allowedHeaders: '*', exposedHeaders: '*' }));
  startSentry(app);
  app.use(json());
};

export const startSentry = (app: Express) => {
  Sentry.init({
    dsn: env.sentryDsn,
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Sentry.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
};
