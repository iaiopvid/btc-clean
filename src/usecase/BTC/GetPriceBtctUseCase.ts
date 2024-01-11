import { IUseCase } from '@/usecase/IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';

export class GetPriceBtctUseCase implements IUseCase<string, UserDomain | string> {
  public async execute(): Promise<UserDomain | string> {
    const requestResult = await fetch('https://www.mercadobitcoin.net/api/BTC/ticker/');
    const btcPrice = await requestResult.json();
    return btcPrice;
  }
}