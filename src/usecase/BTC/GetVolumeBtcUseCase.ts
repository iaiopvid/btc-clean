import { IUseCase } from '@/usecase/IUseCase';
import Errors from '@/core/shared/Erros';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';

export class GetVolumeBtcUseCase implements IUseCase<string, any | string> {
  constructor(
    private readonly btcRepository: IBtcRepository
  ) {}

  public async execute(idUser: string): Promise<any | string> {
    const purchasedBtcs = await this.btcRepository.GetVolumeBtcByIdentifierAndByOperation(idUser, 'buy');
    const totalPurchasedBitcoins = purchasedBtcs[0].count;
    const soldBtcs = await this.btcRepository.GetVolumeBtcByIdentifierAndByOperation(idUser, 'sell');
    const totalSoldBitcoins = soldBtcs[0].count;

    return {
      totalPurchasedBitcoins,
      totalSoldBitcoins,
    }
  }
}