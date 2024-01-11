import { BtcRepository } from '@/infra/repositories/BtcRepository';
import { DealRepository } from '@/infra/repositories/DealRepository';
import { UserRepository } from '@/infra/repositories/UserRepository';
import { SellBtcController } from '@/presentation/controllers/BTC/SellBtcController/SellBtcController';

export const SellBtcControllerFactory = () => {
  const userRepository = new UserRepository();
  const btcRepository = new BtcRepository();
  const dealRepository = new DealRepository();
  return new SellBtcController(userRepository, btcRepository, dealRepository);
};