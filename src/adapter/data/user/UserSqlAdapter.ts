import { IUserSqlType } from '@/data/models/sql/user/IUserSqlType';
import { IUser } from '@/core/domain/User/IUser';

export class UserSqlAdapter {
  static create(user: IUserSqlType): IUser {
    const userNameSplit = user.name.split(' ');
    const userLastName = userNameSplit
      ?.map((nameSplit, index) => (index > 0 ? nameSplit : ''))
      ?.join(' ')
      ?.trim();

    return {
      id: String(user.id),
      name: user.name,
      email: user.email,
      balance: user.balance,
      btc: user.btc,
      password: user.password
    };
  }
}
