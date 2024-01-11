import { requestAdapter } from '@/adapter/presentational/http/RequestAdapter';
import { Router } from 'express';
import { LoginByEmailAndPasswordControllerFactory } from '@/main/factories/controllers/auth/LoginByEmailAndPasswordControllerFactory';
import { GetUserInfoControllerFactory } from '@/main/factories/controllers/auth/GetUserInfoControllerFactory';

const authRoutes = Router();

authRoutes.post('/login', requestAdapter(LoginByEmailAndPasswordControllerFactory()));
authRoutes.get('/info', requestAdapter(GetUserInfoControllerFactory()));

export { authRoutes };
