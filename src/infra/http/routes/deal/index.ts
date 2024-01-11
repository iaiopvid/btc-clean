import { requestAdapter } from '@/adapter/presentational/http/RequestAdapter';
import { Router } from 'express';
import { GetExtractDealControllerFactory } from '@/main/factories/controllers/deal/GetExtractDealControllerFactory';
import { GetVolumeBtcControllerFactory } from '@/main/factories/controllers/BTC/GetVolumeBtcControllerFactory';

const dealRoutes = Router();

dealRoutes.get('/extract', requestAdapter(GetExtractDealControllerFactory()));
dealRoutes.get('/volume', requestAdapter(GetVolumeBtcControllerFactory()));

export { dealRoutes };
