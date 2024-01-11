import { Btc } from '@/infra/database/models/objection/btc.model';
import BtcDomain from '../domain/BTC/BtcDomain';

export interface IBtcRepository {
  createOnePurchaseBtc(data: {
    userId: number | string,
    balance: number | string,
    rate?: number | string,
    operation: string,
  }): Promise<BtcDomain>;
  createOneSellBtc(data: {
    userId: number | string,
    balance: number | string,
    rate?: number | string,
    operation: string,
  }): Promise<BtcDomain>;
  GetPositionBtcByIdentifier(userId: string | number): Promise<BtcDomain[]>;
  GetVolumeBtcByIdentifierAndByOperation(userId: string | number, operation: string): any;
}
