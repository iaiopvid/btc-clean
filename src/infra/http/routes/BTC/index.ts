import { requestAdapter } from '@/adapter/presentational/http/RequestAdapter';
import { Router } from 'express';
import { GetPositionBtcControllerFactory } from '@/main/factories/controllers/BTC/GetPositionBtcControllerFactory';
import { GetPriceBtcControllerFactory } from '@/main/factories/controllers/BTC/GetPriceBtcControllerFactory';
import { PurchaseBtcWithBalanceControllerFactory } from '@/main/factories/controllers/BTC/PurchaseBtcWithBalanceControllerFactory';
import { SellBtcControllerFactory } from '@/main/factories/controllers/BTC/SellBtcControllerFactory ';

const btcRoutes = Router();

btcRoutes.get('/', requestAdapter(GetPositionBtcControllerFactory()));
btcRoutes.get('/price', requestAdapter(GetPriceBtcControllerFactory()));
btcRoutes.post('/purchase', requestAdapter(PurchaseBtcWithBalanceControllerFactory()));
btcRoutes.post('/sell', requestAdapter(SellBtcControllerFactory()));

export { btcRoutes };
