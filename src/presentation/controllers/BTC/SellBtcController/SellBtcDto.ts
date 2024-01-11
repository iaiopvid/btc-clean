import { IsBoolean, IsDecimal, IsDefined, IsEmail, IsISO8601, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { IUser } from '@/core/domain/User/IUser';
import { Type } from 'class-transformer';
import UserDomain from '@/core/domain/User/UserDomain';

export class SellBtcBodyRequestDto {
  @IsDefined()
  @IsDecimal()
  amount: number | string;
}

export class SellBtcRequestDto {
  user: IUser;

  @ValidateNested()
  @Type(() => SellBtcBodyRequestDto)
  body: SellBtcBodyRequestDto;
}

export class CreateUserBodyResponse {
  createdUserId: UserDomain | string;
}
