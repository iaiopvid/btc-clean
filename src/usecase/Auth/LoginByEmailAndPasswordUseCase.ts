import { IUserRepository } from '@/core/repositories/IUserRepository';
import jsonwebtoken from 'jsonwebtoken';
import { IUseCase } from '../IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';
import Errors from '@/core/shared/Erros';
import CriptoProvider from '@/core/domain/User/CriptoProvider';
import JwtProvider from '@/presentation/helpers/JwtProvider';

export type Input = {
  email: string
  password: string
}

export class LoginByEmailAndPasswordUseCase implements IUseCase<Input, UserDomain | string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly criptoRepository: CriptoProvider
  ) {}

  public async execute(data: Input): Promise<Input | any> {
    const user = await this.userRepository.getOneUserByEmail(data.email);
    if (!user) {
      return Errors.NOT_EXISTS
    }

    const samePassword = this.criptoRepository.compare(data.password, user.password);
    if (!samePassword) {
      return Errors.INCORRECT_PASSWORD
    }
    delete user.name
    delete user.password
    const existingUser = user

    const provedorJwt = new JwtProvider(process.env.JWT_SECRET_STRING!)
    return provedorJwt.set({ email: existingUser.email })

    // return jsonwebtoken.sign({ email: existingUser.email }, process.env.JWT_SECRET_STRING, {
    //   expiresIn: '1d',
    // });
  }
}
