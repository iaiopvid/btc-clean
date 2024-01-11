import { BtcRepository } from '@/infra/repositories/BtcRepository';
import { GetVolumeBtcController } from '@/presentation/controllers/BTC/GetVolumeBtcController/GetVolumeBtcController';

export const GetVolumeBtcControllerFactory = () => {
  const btcRepository =new BtcRepository();
  return new GetVolumeBtcController(btcRepository);
};