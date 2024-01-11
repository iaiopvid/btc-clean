import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IUseCase } from '@/usecase/IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';
import { IUser } from '@/core/domain/User/IUser';

export class GetOneUserByEmail implements IUseCase<string, UserDomain | string> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(email: string): Promise<UserDomain | string> {
    return await this.userRepository.getOneUserByEmail(email);
  }
}
