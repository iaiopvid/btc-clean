import { BtcRepository } from '@/infra/repositories/BtcRepository';
import { DealRepository } from '@/infra/repositories/DealRepository';
import { UserRepository } from '@/infra/repositories/UserRepository';
import { PurchaseBtcWithBalanceController } from '@/presentation/controllers/BTC/PurchaseBtcWithBalanceController/PurchaseBtcWithBalanceController';

export const PurchaseBtcWithBalanceControllerFactory = () => {
  const userRepository = new UserRepository();
  const btcRepository = new BtcRepository();
  const dealRepository = new DealRepository();
  return new PurchaseBtcWithBalanceController(userRepository, btcRepository, dealRepository);
};