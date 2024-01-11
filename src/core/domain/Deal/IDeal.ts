import { DefaultNodeFields } from '@/core/domain/Common/DefaultNodeFields';

export interface IDeal extends DefaultNodeFields {
  id: number;
  userId: number | string;
  balance: number | string;
  rate?: number | string;
  operation?: string;
}