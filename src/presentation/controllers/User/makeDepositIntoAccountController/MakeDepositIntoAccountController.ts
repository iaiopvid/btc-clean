import { IController } from '@/presentation/protocols/IController';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IDealRepository } from '@/core/repositories/IDealRepository';
import { Guard } from '@/infra/middleware/Guard';
import Errors from "@/core/shared/Erros";
import { Swagger } from '@/infra/middleware/Swagger';
import { DtoValidator } from '@/infra/middleware/DtoValidator';
import { IHttpResponse } from '@/presentation/protocols/http';
import { MakeDepositIntoAccountRequestDto } from './MakeDepositIntoAccountDto';
import { MakeDepositIntoAccountUseCase } from '@/usecase/User/MakeDepositIntoAccountUseCase';
import { ok, serverError } from '@/presentation/helpers/http.helper';

export class MakeDepositIntoAccountController implements IController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dealRepository: IDealRepository,
  ) {}

  @Swagger({
    '/account/deposit': {
      post: {
        tags: ['User'],
        summary: 'Create a new Deposit Account',
      },
    },
  })
  @Guard([])
  @DtoValidator
  @Guard([])
  async handle(request: MakeDepositIntoAccountRequestDto): Promise<IHttpResponse<any>> {
    try {
      const requestData = {
        amount: request.body.amount,
        id: request.user.id,
        email: request.user.email
      };
      const makeDepositIntoAccount = new MakeDepositIntoAccountUseCase(this.userRepository, this.dealRepository);
      const updatedAccount = await makeDepositIntoAccount.execute(requestData);

      return ok(updatedAccount);
    } catch (e) {
      return serverError('make.deposit.rror', e);
    }
  }
}