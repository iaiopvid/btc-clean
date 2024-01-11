import {
  CreateUserBodyResponse,
  CreateUserRequestDto,
} from '@/presentation/controllers/User/CreateUserController/CreateUserRequestDto';
import { badRequest, created, forbidden, ok, serverError } from '@/presentation/helpers/http.helper';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IController } from '@/presentation/protocols/IController';
import { DtoValidator } from '@/infra/middleware/DtoValidator';
import { IHttpResponse } from '@/presentation/protocols/http';
import { ProfileEnum } from '@/core/domain/Profile/Profile';
import { CreateUserUseCase } from '@/usecase/User/CreateUserUseCase';
import { Swagger } from '@/infra/middleware/Swagger';
import Errors from "@/core/shared/Erros";

export class CreateUserController implements IController {
  constructor(private readonly userRepository: IUserRepository) {}

  @Swagger({
    '/account': {
      post: {
        tags: ['User', 'Account'],
        summary: 'Create a new Account',
      },
    },
  })
  @DtoValidator
  async handle(request: CreateUserRequestDto): Promise<IHttpResponse<CreateUserBodyResponse>> {
    try {
      const requestData = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      };
      const createOneUser = new CreateUserUseCase(this.userRepository);
      const createdUser = await createOneUser.execute(requestData);
      if (createdUser === Errors.ALREADY_EXISTS) {
        return badRequest('account already exists');
      }
      return created(createdUser);
    } catch (e) {
      return serverError('create.one.user.error', e);
    }
  }
}
