import { IDealRepository } from '@/core/repositories/IDealRepository';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IUseCase } from '@/usecase/IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';
import Errors from '@/core/shared/Erros';
import { GetPriceBtctUseCase } from '../BTC/GetPriceBtctUseCase';

export class MakeDepositIntoAccountUseCase implements IUseCase<{
  amount: number;
  id: number | string
}, UserDomain | string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dealRepository: IDealRepository,
  ) {}

  public async execute(data: {
    amount: number;
    id: number | string
  }): Promise<UserDomain | string> {
    const getPriceBtcUseCase = new GetPriceBtctUseCase();
    const btcPrice = await getPriceBtcUseCase.execute();
    const btcSellPrice = btcPrice['ticker']['sell'];

    const updatedAccount = await this.userRepository.makeDepositIntoAccount(data)
    delete updatedAccount.password

    await this.dealRepository.createOneDeal({
      userId: data.id,
      balance: data.amount,
      rate: btcSellPrice,
      operation: 'deposit',
    })

    return updatedAccount
  }
}
