import { IController } from '@/presentation/protocols/IController';
import { Guard } from '@/infra/middleware/Guard';
import { Swagger } from '@/infra/middleware/Swagger';
import { IHttpResponse } from '@/presentation/protocols/http';
import { GetPriceBtctoRequestDto } from './GetPriceBtctoRequestDto';
import { ok, serverError } from '@/presentation/helpers/http.helper';
import { GetPriceBtctUseCase } from '@/usecase/BTC/GetPriceBtctUseCase';
// import Errors from "@/core/shared/Erros";

export class GetPriceBtcController implements IController {
  @Swagger({
    '/btc/price': {
      get: {
        tags: ['BTC'],
        summary: 'BTC price',
      },
    },
  })
  @Guard([])
  async handle(request: GetPriceBtctoRequestDto): Promise<IHttpResponse<any>> {
    try {
      const getPriceCriptUseCase = new GetPriceBtctUseCase();
      const btcPrice = await getPriceCriptUseCase.execute();
      return ok(btcPrice);
    } catch (e) {
      return serverError('make.deposit.rror', e);
    }
  }
}