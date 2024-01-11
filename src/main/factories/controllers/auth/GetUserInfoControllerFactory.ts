import { GetUserInfoController } from '@/presentation/controllers/Auth/GetUserInfoController/GetUserInfoController';
import { UserRepository } from '@/infra/repositories/UserRepository';

export const GetUserInfoControllerFactory = () => {
  const userRepository = new UserRepository();
  return new GetUserInfoController(userRepository);
};
