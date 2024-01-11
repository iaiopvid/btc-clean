import { IController } from '@/presentation/protocols/IController';
import { Guard } from '@/infra/middleware/Guard';
import Errors from "@/core/shared/Erros";
import { Swagger } from '@/infra/middleware/Swagger';
import { DtoValidator } from '@/infra/middleware/DtoValidator';
import { IHttpResponse } from '@/presentation/protocols/http';
import { ok, serverError } from '@/presentation/helpers/http.helper';
import { PurchaseBtcWithBalanceUseCase } from '@/usecase/BTC/PurchaseBtcWithBalanceUseCase';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import { IDealRepository } from '@/core/repositories/IDealRepository';
import { SellBtcRequestDto } from './SellBtcDto';
import { SellBtcUseCase } from '@/usecase/BTC/SellBtcUseCase ';

export class SellBtcController implements IController {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly btcRepository: IBtcRepository,
    private readonly dealRepository: IDealRepository
  ) {}

  @Swagger({
    '/btc/sell': {
      post: {
        tags: ['BTC'],
        summary: 'BTC price',
      },
    },
  })
  @DtoValidator
  @Guard([])
  async handle(request: SellBtcRequestDto): Promise<IHttpResponse<any>> {
    try {
      const requestData = {
        amount: request.body.amount,
        id: request.user.id
      };
      const sellBtcUseCase = new SellBtcUseCase(this.userRepository, this.btcRepository, this.dealRepository);
      const soldBtc = await sellBtcUseCase.execute(requestData);
      return ok(soldBtc);
    } catch (e) {
      return serverError('sell.btc.error', e);
    }
  }
}