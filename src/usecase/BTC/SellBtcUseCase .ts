import { IUseCase } from '@/usecase/IUseCase';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import Errors from '@/core/shared/Erros';
import { GetPriceBtctUseCase } from './GetPriceBtctUseCase';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import { IDealRepository } from '@/core/repositories/IDealRepository';
import BtcDomain from '@/core/domain/BTC/BtcDomain';

export class SellBtcUseCase implements IUseCase<{
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
    const getPriceBtcUseCase = new GetPriceBtctUseCase();
    const btcPrice = await getPriceBtcUseCase.execute();
    const btcSellPrice = btcPrice['ticker']['sell'];
    const btcCurrentQuoteValue = ((Number(data.amount) * 100) / btcSellPrice)
    let sellBtcValue = btcCurrentQuoteValue

    const currentyBalanceByUser = await this.userRepository.GetBalanceByIdentifier(data.id)

    if (!Number(currentyBalanceByUser.btc)) {
      return Errors.NO_BTC_BALANCE
    }

    if (Number(btcCurrentQuoteValue) > Number(currentyBalanceByUser.btc)) {
      sellBtcValue = Number(currentyBalanceByUser.btc)
    }

    const soldBtc = await this.btcRepository.createOneSellBtc({
      userId: data.id,
      balance: sellBtcValue,
      rate: btcSellPrice,
      operation: 'sell'
    })

    if (soldBtc) {
      await this.userRepository.makeSellBtc(data, sellBtcValue)
      await this.userRepository.decrementBtcBalance(data.id, sellBtcValue)
      await this.dealRepository.createOneDeal({
        userId: data.id,
        balance: data.amount,
        rate: btcSellPrice,
        operation: 'rescue'
      })
    }

    return soldBtc
  }
}