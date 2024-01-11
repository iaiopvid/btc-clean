import { IDealRepository } from '@/core/repositories/IDealRepository';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IUseCase } from '@/usecase/IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';
import Errors from '@/core/shared/Erros';
import { GetPriceBtctUseCase } from '../BTC/GetPriceBtctUseCase';
import sendMail from '@/infra/email/nodemailer';

export class MakeDepositIntoAccountUseCase implements IUseCase<{
  amount: number;
  id: number | string,
  email: string,
}, UserDomain | string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dealRepository: IDealRepository,
  ) {}

  public async execute(data: {
    amount: number,
    id: number | string,
    email: string,
  }): Promise<UserDomain | string> {
    const getPriceBtcUseCase = new GetPriceBtctUseCase();
    const btcPrice = await getPriceBtcUseCase.execute();
    const btcSellPrice = btcPrice['ticker']['sell'];

    const depositedAccount = await this.userRepository.makeDepositIntoAccount(data)
    delete depositedAccount.password

    if (depositedAccount) {
      await sendMail(
        process.env.MAIL_SYSTEM,
        data.email,
        'Deposit for you',
        `<h1>DEPOSIT MADE</H1>
          <p>A deposit of $$ ${data.amount} has been made to your account.</p>`,
      );
    }

    await this.dealRepository.createOneDeal({
      userId: data.id,
      balance: data.amount,
      rate: btcSellPrice,
      operation: 'deposit',
    })

    return depositedAccount
  }
}
