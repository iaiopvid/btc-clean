
import { LoginByEmailAndPasswordUseCase } from '@/usecase/Auth/LoginByEmailAndPasswordUseCase';
import CriptoProvider from '@/core/domain/User/CriptoProvider';
import { ok, serverError, unauthorized } from '@/presentation/helpers/http.helper';
import { IController } from '@/presentation/protocols/IController';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';
import Errors from '@/core/shared/Erros';

export class LoginByEmailAndPasswordController implements IController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly criptoRepository: CriptoProvider
  ) {}

  @Swagger({
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Auth login',
      },
    },
  })
  async handle(request): Promise<IHttpResponse> {
    try {
      const requestData = {
        email: request.body.email,
        password: request.body.password,
      };
      const auth = new LoginByEmailAndPasswordUseCase(this.userRepository, this.criptoRepository);
      const ssoResponse = await auth.execute(requestData);
      if (!ssoResponse) {
        return unauthorized(`wrong.user.id`);
      }
      return ok({ token: ssoResponse });
    } catch (e) {
      return serverError(`auth.user.error`, e);
    }
  }
}
