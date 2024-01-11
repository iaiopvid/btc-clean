import { GetExtractDealUseCase } from '@/usecase/Deal/GetExtractDealUseCase';
import { GetExtractDealDto } from './GetExtractDealDto';
import { ok, unprocessable, serverError } from '@/presentation/helpers/http.helper';
import { IDealRepository } from '@/core/repositories/IDealRepository';
import { IController } from '@/presentation/protocols/IController';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';
import { Guard } from '@/infra/middleware/Guard';

export class GetExtractDealController implements IController {
  constructor(
    private readonly dealRepository: IDealRepository
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
  async handle(request: GetExtractDealDto): Promise<IHttpResponse> {
    try {
      const getPositionBtcUseCase = new GetExtractDealUseCase(this.dealRepository);
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