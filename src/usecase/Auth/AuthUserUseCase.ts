import { IUserRepository } from '@/core/repositories/IUserRepository';
import jsonwebtoken from 'jsonwebtoken';
import { IUseCase } from '../IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';

export class AuthUserUseCase implements IUseCase<any, any> {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: { email: string }): Promise<any | any> {
    const user = await this.userRepository.getOneUserByEmail(data.email);
    if (!user) {
      return;
    }
    return jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET_STRING, {
      expiresIn: '1d',
    });
  }
}
