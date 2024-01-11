import { MakeDepositIntoAccountController } from '@/presentation/controllers/User/makeDepositIntoAccountController/MakeDepositIntoAccountController';
import { UserRepository } from '@/infra/repositories/UserRepository';
import { DealRepository } from '@/infra/repositories/DealRepository';

export const MakeDepositIntoAccountControllerFactory = () => {
  const userRepository = new UserRepository();
  const dealRepository = new DealRepository();
  return new MakeDepositIntoAccountController(userRepository, dealRepository);
};
