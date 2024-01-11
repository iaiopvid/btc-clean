import BtcModel, { Btc } from "../database/models/objection/btc.model";
import { IBtcRepository } from "@/core/repositories/IBtcRepository";
import BtcDomain from "@/core/domain/BTC/BtcDomain";

export class BtcRepository implements IBtcRepository {
  GetVolumeBtcByIdentifier(userId: string | number) {
    throw new Error("Method not implemented.");
  }
  async createOnePurchaseBtc(data: {
    userId: string | number,
    balance: number | string,
    rate?: number | string,
    operation: string,
  }): Promise<Btc> {
    const purchasedBtc = await BtcModel
      .query()
      .insert(data)
    return purchasedBtc
  }

  async createOneSellBtc(data: {
    userId: string | number,
    balance: string | number,
    rate?: number | string,
    operation: string,
  }): Promise<Btc> {
    const soldBtc = await BtcModel
      .query()
      .insert(data)
    return soldBtc
  }

  async GetPositionBtcByIdentifier(userId: string | number): Promise<Btc[]> {
    const positionBtc = await BtcModel
      .query()
      .where('userId', userId)
    return positionBtc
  }

  async GetVolumeBtcByIdentifierAndByOperation(userId: string | number, operation: string) {
    const positionBtc = await BtcModel
      .query()
      .where('userId', userId)
      .where('operation', operation)
      .andWhereRaw(`DATE("createdAt") = DATE('${new Date().toISOString()}')`)
      .count('balance')
    return positionBtc
  }
}
