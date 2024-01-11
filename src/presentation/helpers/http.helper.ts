import { IHttpResponse } from '@/presentation/protocols/http';

export const badRequest = (error: string | Object): IHttpResponse => ({
  statusCode: 400,
  body: { error },
});

export const forbidden = (error: string): IHttpResponse => ({
  statusCode: 403,
  body: { error },
});

export const pageNotFound = (error?: string): IHttpResponse => ({
  statusCode: 404,
  body: { error },
});

export const unauthorized = (error: string): IHttpResponse => ({
  statusCode: 401,
  body: { error },
});

export const serverError = (error: string, err?: Error): IHttpResponse => ({
  statusCode: 500,
  body: { error },
  errorInfo: err,
});

export const unprocessable = (error: string): IHttpResponse => ({
  statusCode: 422,
  body: { error },
});

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null,
});

export const ok = (data: any, options?: { noLog?: boolean }): IHttpResponse => ({
  statusCode: 200,
  body: data,
  noLog: options?.noLog,
});

export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

export const pdf = (data: any, pdfName: string): IHttpResponse => ({
  statusCode: 200,
  body: data,
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=\"${pdfName}\"`,
  },
  isRaw: true,
});

export const zip = (data: any, zipName: string): IHttpResponse => ({
  statusCode: 200,
  body: data,
  headers: {
    'Content-Type': 'application/zip, application/octet-stream',
    'Content-Disposition': `attachment;filename=\"${zipName}\"`,
  },
  isRaw: true,
});
