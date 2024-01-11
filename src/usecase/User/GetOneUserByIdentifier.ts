import { IUserRepository } from '@/core/repositories/IUserRepository';
import { IUseCase } from '@/usecase/IUseCase';
import UserDomain from '@/core/domain/User/UserDomain';

export class GetOneUserByIdentifier implements IUseCase<string, UserDomain | string> {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<UserDomain | string> {
    return await this.userRepository.GetOneUserByIdentifier(id);
  }
}