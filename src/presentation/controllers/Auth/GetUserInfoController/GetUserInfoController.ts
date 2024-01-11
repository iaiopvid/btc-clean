import { GetUserInfoDto } from '@/presentation/controllers/Auth/GetUserInfoController/GetUserInfoDto';
import { ok, unprocessable, serverError } from '@/presentation/helpers/http.helper';
import { GetOneUserByIdentifier } from '@/usecase/User/GetOneUserByIdentifier';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IController } from '@/presentation/protocols/IController';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';
import { Guard } from '@/infra/middleware/Guard';
// import CriptoProvider from '@/core/domain/User/CriptoProvider';

export class GetUserInfoController implements IController {
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
  async handle(request: GetUserInfoDto): Promise<IHttpResponse> {
    try {
      const getOneUserByIdentifier = new GetOneUserByIdentifier(this.userRepository);
      const loggedUser = await getOneUserByIdentifier.execute(request.user.id);
      if (!loggedUser) {
        return unprocessable(`get.user.info.unprocessable`);
      }
      return ok(loggedUser);
    } catch (e) {
      return serverError(`get.user.info.error`, e);
    }
  }
}
