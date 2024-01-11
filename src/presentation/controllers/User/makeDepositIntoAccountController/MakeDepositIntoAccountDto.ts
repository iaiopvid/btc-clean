import { IsBoolean, IsDecimal, IsDefined, IsEmail, IsISO8601, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { IUser } from '@/core/domain/User/IUser';
import { Type } from 'class-transformer';
import UserDomain from '@/core/domain/User/UserDomain';

export class MakeDepositIntoAccountBodyRequestDto {
  @IsDefined()
  @IsDecimal()
  amount: number;
}

export class MakeDepositIntoAccountRequestDto {
  user: IUser;

  @ValidateNested()
  @Type(() => MakeDepositIntoAccountBodyRequestDto)
  body: MakeDepositIntoAccountBodyRequestDto;
}

export class CreateUserBodyResponse {
  createdUserId: UserDomain | string;
}
