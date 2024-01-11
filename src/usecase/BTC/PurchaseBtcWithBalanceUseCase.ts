import { IUseCase } from '@/usecase/IUseCase';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import Errors from '@/core/shared/Erros';
import { GetPriceBtctUseCase } from './GetPriceBtctUseCase';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import BtcDomain from '@/core/domain/BTC/BtcDomain';
import { IDealRepository } from '@/core/repositories/IDealRepository';

export class PurchaseBtcWithBalanceUseCase implements IUseCase<{
  amount: number | string;
  id: number | string
}, BtcDomain | string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly btcRepository: IBtcRepository,
    private readonly dealRepository: IDealRepository,
  ) {}

  public async execute(data: {
    amount: number | string;
    id: number | string
  }): Promise<BtcDomain | string> {
    const currentyBalance = await this.userRepository.GetBalanceByIdentifier(data.id)
    if (Number(data.amount) > Number(currentyBalance) ) {
      return Errors.NO_BALANCE
    }

    const getPriceBtcUseCase = new GetPriceBtctUseCase();
    const btcPrice = await getPriceBtcUseCase.execute();
    const btcSellPrice = btcPrice['ticker']['sell'];

    const btcCurrentValue = ((Number(data.amount) * 100) / btcSellPrice)
    const purchasedBtc = await this.btcRepository.createOnePurchaseBtc({
      userId: data.id,
      balance: btcCurrentValue,
      rate: btcSellPrice,
      operation: 'buy'
    })
    if (purchasedBtc) {
      await this.userRepository.makePurchaseBtcWithBalance(data, btcCurrentValue)
      await this.userRepository.incrementBtcBalance(data.id, btcCurrentValue)
      await this.dealRepository.createOneDeal({
        userId: data.id,
        balance: data.amount,
        rate: btcSellPrice,
        operation: 'purchase'
      })
    }

    return purchasedBtc
  }
}