import { BtcRepository } from '@/infra/repositories/BtcRepository';
import { GetPositionBtcController } from '@/presentation/controllers/BTC/GetPositionBtcController/GetPositionBtcController';

export const GetPositionBtcControllerFactory = () => {
  const btcRepository =new BtcRepository();
  return new GetPositionBtcController(btcRepository);
};