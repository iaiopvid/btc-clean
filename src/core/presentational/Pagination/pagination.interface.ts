export interface IPaginationResponseInterface<T> {
  data: Array<T> | T;
  pagination: IPaginationObjectResponse;
}

export interface IPaginationObjectResponse {
  last: boolean;
  first: boolean;
  page: number;
  totalElements: number;
  totalPages: number;
  pageSize: number;
}
