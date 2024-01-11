import jsonwebtoken from 'jsonwebtoken';
import UserDomain from '@/core/domain/User/UserDomain';
import { IUseCase } from '../IUseCase';

export class GenerateTokenByUserDataUseCase implements IUseCase<any, any> {
  constructor() {}

  public execute(data: {
    user: UserDomain;
    tokenExpiresIn: string;
    secret: string;
  }): string {
    const token = jsonwebtoken.sign(
      {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      },
      data.secret,
      {
        expiresIn: data.tokenExpiresIn,
      },
    );
    return token;
  }
}
