import UserDomain from '../domain/User/UserDomain';

export interface IUserRepository {
  createOneUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserDomain>;

  getOneUserByEmail(email: string): Promise<UserDomain>;
  GetOneUserByIdentifier(id: string): Promise<UserDomain>;
  makeDepositIntoAccount(data: { amount: number | string, id: number | string }): Promise<UserDomain>;
  GetBalanceByIdentifier(id: number | string): Promise<UserDomain>;
  makePurchaseBtcWithBalance(data: { amount: number | string, id: number | string }, btc: number | string): Promise<UserDomain>;
  makeSellBtc(data: { amount: number | string, id: number | string }, btc: number | string): Promise<UserDomain>;
  incrementBtcBalance(id: string | number, btcValue: string | number): Promise<UserDomain>;
  decrementBtcBalance(id: string | number, btcValue: string | number): Promise<UserDomain>;
}
