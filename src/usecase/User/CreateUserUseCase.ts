import { HashRawPasswordUseCase } from '@/usecase/Password/HashRawPasswordUseCase';
import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IUseCase } from '@/usecase/IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';
import Errors from '@/core/shared/Erros';

export class CreateUserUseCase implements IUseCase<{
  name: string;
  email: string;
  password: string;
}, UserDomain | string> {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserDomain | string> {
    const hashRawPasswordUseCase = new HashRawPasswordUseCase()
    const userExist = await this.userRepository.getOneUserByEmail(data.email)
    if (userExist) {
      return Errors.ALREADY_EXISTS
    }
    const hashedPassword = await hashRawPasswordUseCase.execute({ rawPassword: data.password })
    data.password = hashedPassword
    const createduser = await this.userRepository.createOneUser(data)
    delete createduser.password
    return createduser
  }
}
