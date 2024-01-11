import { IController } from '@/presentation/protocols/IController';
import { Guard } from '@/infra/middleware/Guard';
import Errors from "@/core/shared/Erros";
import { Swagger } from '@/infra/middleware/Swagger';
import { DtoValidator } from '@/infra/middleware/DtoValidator';
import { IHttpResponse } from '@/presentation/protocols/http';
import { PurchaseBtcWithBalanceRequestDto } from './PurchaseBtcWithBalanceDto';
import { ok, serverError } from '@/presentation/helpers/http.helper';
import { PurchaseBtcWithBalanceUseCase } from '@/usecase/BTC/PurchaseBtcWithBalanceUseCase';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import { IDealRepository } from '@/core/repositories/IDealRepository';

export class PurchaseBtcWithBalanceController implements IController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly btcRepository: IBtcRepository,
    private readonly dealRepository: IDealRepository,
  ) {}

  @Swagger({
    '/btc/purchase': {
      post: {
        tags: ['BTC'],
        summary: 'BTC price',
      },
    },
  })
  @DtoValidator
  @Guard([])
  async handle(request: PurchaseBtcWithBalanceRequestDto): Promise<IHttpResponse<any>> {
    try {
      const requestData = {
        amount: request.body.amount,
        id: request.user.id,
        email: request.user.email,
      };
      const purchaseBtcWithBalanceUseCase = new PurchaseBtcWithBalanceUseCase(
        this.userRepository,
        this.btcRepository,
        this.dealRepository
      );
      const purchasedBtc = await purchaseBtcWithBalanceUseCase.execute(requestData);
      return ok(purchasedBtc);
    } catch (e) {
      return serverError('purchase.btc.rror', e);
    }
  }
}