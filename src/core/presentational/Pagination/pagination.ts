import { IPaginationResponseInterface, IPaginationObjectResponse } from './pagination.interface';

export class PaginationResponse<T = any> implements IPaginationResponseInterface<T> {
  constructor(public data: T, public pagination: IPaginationObjectResponse) {}
}
