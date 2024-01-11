
import { LoginByEmailAndPasswordController } from '@/presentation/controllers/Auth/AuthUserController/LoginByEmailAndPasswordController';
import { UserRepository } from '@/infra/repositories/UserRepository';
import Cryptography from '@/presentation/helpers/Cryptography';

export const LoginByEmailAndPasswordControllerFactory = () => {
  const userRepository = new UserRepository();
  const criptoRepository = new Cryptography();
  return new LoginByEmailAndPasswordController(userRepository, criptoRepository);
};
