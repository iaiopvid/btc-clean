import { AssignUserFromJwtMiddleware } from '@/infra/presentation/middleware/AssingUserFromJwtMiddleware';
import { UserRepository } from '@/infra/repositories/UserRepository';

export const AssignUserFromJwtMiddlewareFactory = (req: any, res: any, next: any) => {
  const userRepository = new UserRepository();
  const assignUserMiddleware = new AssignUserFromJwtMiddleware(userRepository);
  return assignUserMiddleware.handle(req, res, next);
};
