import { HeadersInit } from 'node-fetch';

export type IHttpResponse<T = any> = {
  statusCode: number;
  body: T;
  url?: string;
  headers?: HeadersInit;
  isRaw?: boolean;
  errorInfo?: Error;
  noLog?: boolean;
};
