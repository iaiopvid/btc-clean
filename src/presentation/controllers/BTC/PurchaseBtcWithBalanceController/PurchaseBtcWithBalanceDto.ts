import { IsBoolean, IsDecimal, IsDefined, IsEmail, IsISO8601, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { IUser } from '@/core/domain/User/IUser';
import { Type } from 'class-transformer';
import UserDomain from '@/core/domain/User/UserDomain';

export class PurchaseBtcWithBalanceBodyRequestDto {
  @IsDefined()
  @IsDecimal()
  amount: number;
}

export class PurchaseBtcWithBalanceRequestDto {
  user: IUser;

  @ValidateNested()
  @Type(() => PurchaseBtcWithBalanceBodyRequestDto)
  body: PurchaseBtcWithBalanceBodyRequestDto;
}

export class CreateUserBodyResponse {
  createdUserId: UserDomain | string;
}
