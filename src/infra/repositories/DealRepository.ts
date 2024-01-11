import DealModel, { Deal } from "../database/models/objection/deal.model";
import { IDealRepository } from "@/core/repositories/IDealRepository";
import BtcDomain from "@/core/domain/BTC/BtcDomain";
import DealDomain from "@/core/domain/Deal/DealDomain";

export class DealRepository implements IDealRepository {
  async createOneDeal(data: {
    userId: string | number,
    balance: number | string,
    rate?: number | string,
    operation: string,
  }): Promise<Deal> {
    const purchasedDeal = await DealModel
      .query()
      .insert(data)
    return purchasedDeal
  }

  async GetExtractDealByIdentifier(userId: string | number): Promise<Deal[]> {
    const extractDeal = await DealModel
      .query()
      .where('userId', userId)
    return extractDeal
  }
}
