import { IsBoolean, IsDefined, IsEmail, IsISO8601, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { IUser } from '@/core/domain/User/IUser';
import { Type } from 'class-transformer';
import UserDomain from '@/core/domain/User/UserDomain';

export class CreateUserBodyRequestDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;

  // @IsDefined()
  // @IsBoolean()
  // isActive: boolean;
}

export class CreateUserRequestDto {
  user: IUser;

  @ValidateNested()
  @Type(() => CreateUserBodyRequestDto)
  body: CreateUserBodyRequestDto;
}

export class CreateUserBodyResponse {
  createdUserId: UserDomain | string;
}
