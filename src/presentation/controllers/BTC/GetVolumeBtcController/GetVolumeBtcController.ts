import { GetVolumeBtcUseCase } from '@/usecase/BTC/GetVolumeBtcUseCase';
import { GetVolumeBtcDto } from './GetVolumeBtcDto';
import { ok, unprocessable, serverError } from '@/presentation/helpers/http.helper';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import { IController } from '@/presentation/protocols/IController';
import { IHttpResponse } from '@/presentation/protocols/http';
import { Swagger } from '@/infra/middleware/Swagger';
import { Guard } from '@/infra/middleware/Guard';

export class GetVolumeBtcController implements IController {
  constructor(
    private readonly btcRepository: IBtcRepository
  ) {}

  @Swagger({
    '/volume': {
      get: {
        tags: ['Auth'],
        summary: 'Btc Volume',
      },
    },
  })
  @Guard([])
  async handle(request: GetVolumeBtcDto): Promise<IHttpResponse> {
    try {
      const getVolumeBtcUseCase = new GetVolumeBtcUseCase(this.btcRepository);
      const volume = await getVolumeBtcUseCase.execute(request.user.id);
      console.log(volume)
      if (!volume) {
        return unprocessable(`btc.volume.unprocessable`);
      }
      return ok(volume);
    } catch (e) {
      return serverError(`btc.volume.error`, e);
    }
  }
}