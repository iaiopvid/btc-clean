import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNumber, IsString } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsDefined()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsDefined()
  @Type(() => Number)
  pageSize: number;

  @IsString()
  searchText: string;
}
