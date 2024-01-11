import { PaginationResponse } from '@/core/presentational/Pagination/pagination';

export default class PaginationResponseAdapter {
  static create<T>(data: any, pagination: any): PaginationResponse<T> {
    return new PaginationResponse<T>(data, pagination);
  }
}
