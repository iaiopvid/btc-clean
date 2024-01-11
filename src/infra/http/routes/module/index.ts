import { Request, Response, Router } from 'express';

const moduleRoutes = Router();

moduleRoutes.get('/', (request: Request, response: Response) => {
  return response.status(200).json();
});

export { moduleRoutes };
