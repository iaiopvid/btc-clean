import { GetPriceBtcController } from '@/presentation/controllers/BTC/GetPriceBtcController/GetPriceBtcController';

export const GetPriceBtcControllerFactory = () => {
  return new GetPriceBtcController();
};