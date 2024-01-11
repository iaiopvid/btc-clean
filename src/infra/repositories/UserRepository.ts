import UserDomain from "@/core/domain/User/UserDomain";
import { IUserRepository } from "@/core/repositories/IUserRepository";
import UserModel, { User } from "../database/models/objection/user.model";

export class UserRepository implements IUserRepository {
  makeSellBtcBalance(data: { amount: string | number; id: string | number; }): Promise<UserDomain> {
    throw new Error("Method not implemented.");
  }

  async GetOneUserByIdentifier(id: string): Promise<User> {
    const user = await UserModel
      .query()
      .findById(id)
    return user
  }

  async getOneUserByEmail(email: string): Promise<User> {
    const user = await UserModel
      .query()
      .where('email', email)
    return user[0]
  }

  async createOneUser(data: { name: string; email: string; password: string; }): Promise<User> {
    const userCreated = UserModel
      .query()
      .insert(data)
    return userCreated
  }

  async makeDepositIntoAccount(data: { amount: number | string, id: number | string }): Promise<User> {
    const accountUpdated = UserModel
      .query()
      .increment('balance', Number(data.amount))
      .findById(data.id)
    return accountUpdated
  }

  async GetBalanceByIdentifier(id: number | string): Promise<User> {
    const user = await UserModel
      .query()
      .findById(id)
      .select('balance', 'btc')
    return user
  }

  async makePurchaseBtcWithBalance(data: { amount: number | string, id: number | string }, btc: number | string): Promise<User> {
    const accountUpdated = UserModel
      .query()
      .decrement('balance', Number(data.amount))
      .findById(data.id)
    return accountUpdated
  }

  async makeSellBtc(data: { amount: number | string, id: number | string }, btc: number | string): Promise<User> {
    const accountUpdated = UserModel
      .query()
      .increment('balance', Number(data.amount))
      .findById(data.id)
    return accountUpdated
  }

  async incrementBtcBalance(id: string | number, btcValue: string | number) {
    const incrementedBtc = UserModel
      .query()
      .increment('btc', Number(btcValue))
      .findById(id)
    return incrementedBtc
  }

  async decrementBtcBalance(id: string | number, btcValue: string | number) {
    const decrementedBtc = UserModel
      .query()
      .decrement('btc', Number(btcValue))
      .findById(id)
    return decrementedBtc
  }
}
