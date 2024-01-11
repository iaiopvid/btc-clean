import { AuthUserUseCase } from '../../../../usecase/Auth/AuthUserUseCase';
import { ok, serverError, unauthorized } from '@/presentation/helpers/http.helper';
import { IController } from '@/presentation/protocols/IController';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';

export class AuthUserController implements IController {
  constructor(private readonly userRepository: IUserRepository) {}

  @Swagger({
    '/auth': {
      get: {
        tags: ['Auth'],
        summary: 'Auth as student',
      },
    },
  })
  async handle(request): Promise<IHttpResponse> {
    try {
      const requestData = {
        email: request.body.email,
      };
      const auth = new AuthUserUseCase(this.userRepository);
      const ssoResponse = await auth.execute(requestData);
      if (!ssoResponse) {
        return unauthorized(`wrong.user.id`);
      }
      return ok({ access_token: ssoResponse });
    } catch (e) {
      return serverError(`auth.user.error`, e);
    }
  }
}
