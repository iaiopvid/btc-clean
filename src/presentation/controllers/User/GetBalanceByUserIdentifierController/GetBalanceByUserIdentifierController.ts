import { GetBalanceByUserIdentifierUseCase } from '@/usecase/User/GetBalanceByUserIdentifier';
import { GetBalanceByUserIdentifierDto } from './GetBalanceByUserIdentifierDto';
import { ok, unprocessable, serverError } from '@/presentation/helpers/http.helper';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IController } from '@/presentation/protocols/IController';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';
import { Guard } from '@/infra/middleware/Guard';
// import CriptoProvider from '@/core/domain/User/CriptoProvider';

export class GetBalanceByUserIdentifierController implements IController {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  @Swagger({
    '/auth/info': {
      get: {
        tags: ['Auth'],
        summary: 'Get User info by session',
      },
    },
  })
  @Guard([])
  async handle(request: GetBalanceByUserIdentifierDto): Promise<IHttpResponse> {
    try {
      const getBalanceByUserIdentifierUseCase = new GetBalanceByUserIdentifierUseCase(this.userRepository);
      const balanceUser = await getBalanceByUserIdentifierUseCase.execute(request.user.id);
      if (!balanceUser) {
        return unprocessable(`get.user.info.unprocessable`);
      }
      return ok(balanceUser);
    } catch (e) {
      return serverError(`get.user.info.error`, e);
    }
  }
}
