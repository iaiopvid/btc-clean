export interface IPaginatedResult<T> {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  data: T[];
  first: boolean;
  last: boolean;
}
