import { GetHealthCheckControllerFactory } from '@/main/factories/controllers/healthcheck/GetHealthCheckControllerFactory';
import { requestAdapter } from '@/adapter/presentational/http/RequestAdapter';
import { Router } from 'express';

const healthcheckRoutes = Router();

healthcheckRoutes.get('/', requestAdapter(GetHealthCheckControllerFactory()));

export { healthcheckRoutes };
