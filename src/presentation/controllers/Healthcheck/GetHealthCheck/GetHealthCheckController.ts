import { ok, serverError } from '@/presentation/helpers/http.helper';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';

export class GetHealthCheckController {
  constructor() {}

  @Swagger({
    '/healthcheck': {
      get: {
        tags: ['Healthcheck'],
        summary: 'Get Healthcheck status',
      },
    },
  })
  async handle(): Promise<IHttpResponse> {
    try {
      return ok(
        { isHealthy: true },
        {
          noLog: true,
        },
      );
    } catch (e) {
      return serverError(`get.healthcheck.error`, e);
    }
  }
}
