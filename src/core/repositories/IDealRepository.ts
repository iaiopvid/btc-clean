import { Deal } from '@/infra/database/models/objection/deal.model';
import DealDomain from '../domain/Deal/DealDomain';

export interface IDealRepository {
  createOneDeal(data: {
    userId: number | string,
    balance: number | string,
    rate?: number | string,
    operation: string,
  }): Promise<DealDomain>;
  GetExtractDealByIdentifier(userId: string | number): Promise<DealDomain[]>;
}
