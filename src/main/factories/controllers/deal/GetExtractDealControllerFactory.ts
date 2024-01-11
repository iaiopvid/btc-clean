import { DealRepository } from '@/infra/repositories/DealRepository';
import { GetExtractDealController } from '@/presentation/controllers/Deal/GetExtractDealController/GetExtractDealController';

export const GetExtractDealControllerFactory = () => {
  const dealRepository =new DealRepository();
  return new GetExtractDealController(dealRepository);
};