import { GetHealthCheckController } from '@/presentation/controllers/Healthcheck/GetHealthCheck/GetHealthCheckController';

export const GetHealthCheckControllerFactory = () => {
  return new GetHealthCheckController();
};
