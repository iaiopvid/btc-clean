import { IUploadedFile } from '@/presentation/protocols/iUploadedFile';
import { IController } from '@/presentation/protocols/IController';
import { IUser } from '@/core/domain/User/IUser';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import pino from 'pino';

const pinoLogger = pino();

export const requestAdapter = (controller: IController) => {
  return async (request: Request & { user: IUser; file?: IUploadedFile }, res: Response): Promise<Response> => {
    const httpResponse = await controller.handle(request);
    delete request.body?.password;

    httpResponse.noLog !== true &&
      pinoLogger[httpResponse.errorInfo ? 'error' : 'info']({
        message: {
          userEmail: request.user ? request.user.email : null,
          ...(httpResponse.errorInfo
            ? {
                error: {
                  stack: httpResponse.errorInfo?.stack,
                  message: httpResponse.errorInfo?.message,
                  cause: httpResponse.errorInfo?.cause,
                },
              }
            : {}),
          method: request.method,
          path: `${request.baseUrl}${request.path}`,
          statusCode: httpResponse.statusCode,
          ...(httpResponse.statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? { serverError: httpResponse.body } : {}),
          ...(httpResponse.statusCode === StatusCodes.BAD_REQUEST ? { badRequest: httpResponse.body } : {}),
          ...(Object.keys(request.body).length > 0 ? { body: request.body } : {}),
          ...(Object.keys(request.query).length > 0 ? { query: request.query } : {}),
          ...(Object.keys(request.params).length > 0 ? { params: request.params } : {}),
          ip: [request.headers['x-forwarded-for'], request.socket.remoteAddress].filter((ip) => !!ip).join(','),
        },
      });
    if (httpResponse.isRaw) {
      return res.status(httpResponse.statusCode).set(httpResponse.headers).end(httpResponse.body);
    }

    return res.status(httpResponse?.statusCode || StatusCodes.SERVICE_UNAVAILABLE).json(httpResponse?.body);
  };
};
