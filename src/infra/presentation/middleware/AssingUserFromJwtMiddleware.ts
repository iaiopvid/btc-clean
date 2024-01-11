import { IUserRepository } from '@/core/repositories/IUserRepository';
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';

export class AssignUserFromJwtMiddleware {
  constructor(private readonly userRepository: IUserRepository) {}

  async handle(req, res, next) {
    try {
      const userJwt = req.headers.authorization;
      if (!userJwt) {
        return next();
      }

      const bearerString = userJwt.substring(7);
      const jwtDecoded = jsonwebtoken.verify(bearerString, process.env.JWT_SECRET_STRING) as any;
      if (!jwtDecoded) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Invalid authorization' });
      }

      return await this.userRepository.getOneUserByEmail(jwtDecoded.email).then((userById) => {
        req.user = userById;
        return next(null, userById);
      });
    } catch (error) {
      return res.status(401).send({ error: 'Invalid authorization' });
    }
  }
}
