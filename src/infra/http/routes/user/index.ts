import { CreateUserControllerFactory } from '@/main/factories/controllers/user/CreateUserControllerFactory';
import { requestAdapter } from '@/adapter/presentational/http/RequestAdapter';
import { Router } from 'express';
import { MakeDepositIntoAccountControllerFactory } from '@/main/factories/controllers/user/MakeDepositIntoAccountControllerFactory';
import { GetBalanceByUserIdentifierControllerFactory } from '@/main/factories/controllers/user/GetBalanceByUserIdentifierControllerFactory';

const userRoutes = Router();

userRoutes.post('/', requestAdapter(CreateUserControllerFactory()));
userRoutes.post('/deposit', requestAdapter(MakeDepositIntoAccountControllerFactory()));
userRoutes.get('/balance', requestAdapter(GetBalanceByUserIdentifierControllerFactory()));

export { userRoutes };
