import { CreateUserController } from '@/presentation/controllers/User/CreateUserController/CreateUserController';
import { UserRepository } from '@/infra/repositories/UserRepository';

export const CreateUserControllerFactory = () => {
  const userRepository = new UserRepository();
  return new CreateUserController(userRepository);
};
