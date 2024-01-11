import { IUser } from '@/core/domain/User/IUser';
import UserDomain from '@/core/domain/User/UserDomain';


export class GetPriceBtctoRequestDto {
  user: IUser;
}

export class CreateUserBodyResponse {
  createdUserId: UserDomain | string;
}
