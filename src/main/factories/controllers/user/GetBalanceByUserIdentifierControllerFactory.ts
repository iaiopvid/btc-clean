import { GetBalanceByUserIdentifierController } from '@/presentation/controllers/User/GetBalanceByUserIdentifierController/GetBalanceByUserIdentifierController';
import { UserRepository } from '@/infra/repositories/UserRepository';

export const GetBalanceByUserIdentifierControllerFactory = () => {
  const userRepository = new UserRepository();
  return new GetBalanceByUserIdentifierController(userRepository);
};
