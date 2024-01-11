import { AssignUserFromJwtMiddlewareFactory } from '@/main/factories/middleware/auth/AssignUserFromJwtMiddlewareFactory';
import { healthcheckRoutes } from '@/infra/http/routes/healthcheck';
import { userRoutes } from '@/infra/http/routes/user';
import { authRoutes } from '@/infra/http/routes/auth';
import { Express } from 'express';
import { btcRoutes } from '../http/routes/BTC';
import { dealRoutes } from '../http/routes/deal';

export const setupRoutes = (app: Express): void => {
  app.use('/healthcheck', healthcheckRoutes);
  app.use((req, res, next) => AssignUserFromJwtMiddlewareFactory(req, res, next));
  app.use('/auth', authRoutes);
  app.use('/account', userRoutes);
  app.use('/btc', btcRoutes);
  app.use('/', dealRoutes);
};
