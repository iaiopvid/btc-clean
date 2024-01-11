import { DefaultNodeFields } from '@/core/domain/Common/DefaultNodeFields';

export interface IBtc extends DefaultNodeFields {
  id: number;
  userId: number | string;
  balance: number | string;
  rate?: number | string;
  operation?: string;
}