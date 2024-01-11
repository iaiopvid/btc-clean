import { DefaultNodeFields } from '@/core/domain/Common/DefaultNodeFields';

export interface IUser extends DefaultNodeFields {
  id: string;
  name: string;
  email: string;
  balance: number | string;
  btc: number | string;
  password?: string;
}
