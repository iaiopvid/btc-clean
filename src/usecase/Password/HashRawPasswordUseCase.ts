import { IUseCase } from '@/usecase/IUseCase';
import bcrypt from 'bcrypt';

export class HashRawPasswordUseCase implements IUseCase<{ rawPassword: string }, string> {
  public execute(data: { rawPassword: string }): Promise<string> {
    return bcrypt.hash(data.rawPassword, 12);
  }
}
