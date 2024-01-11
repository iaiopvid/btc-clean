import { IUserPaginatedSqlType } from '@/data/models/sql/user/IUserPaginatedSqlType';
import { IPaginatedUser } from '@/core/domain/User/IPaginatedUser';

export class UserPaginatedSqlAdapter {
  static create(user: IUserPaginatedSqlType): IPaginatedUser {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
