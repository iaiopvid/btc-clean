import { GetPositionBtcUseCase } from '@/usecase/BTC/GetPositionBtcUseCase';
import { GetPositionBtcDto } from './GetPositionBtcDto';
import { ok, unprocessable, serverError } from '@/presentation/helpers/http.helper';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import { IController } from '@/presentation/protocols/IController';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';
import { Guard } from '@/infra/middleware/Guard';

export class GetPositionBtcController implements IController {
  constructor(
    private readonly btcRepository: IBtcRepository
  ) {}

  @Swagger({
    '/btc': {
      get: {
        tags: ['Auth'],
        summary: 'Btc Position',
      },
    },
  })
  @Guard([])
  async handle(request: GetPositionBtcDto): Promise<IHttpResponse> {
    try {
      const getPositionBtcUseCase = new GetPositionBtcUseCase(this.btcRepository);
      const balanceUser = await getPositionBtcUseCase.execute(request.user.id);
      console.log(balanceUser)
      if (!balanceUser) {
        return unprocessable(`btc.position.unprocessable`);
      }
      return ok(balanceUser);
    } catch (e) {
      return serverError(`btc.position.error`, e);
    }
  }
}