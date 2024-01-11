import { IUseCase } from '@/usecase/IUseCase';
import Errors from '@/core/shared/Erros';
import { IDealRepository } from '@/core/repositories/IDealRepository';
import ExtractDealDomain from '@/core/domain/Deal/ExtractDealDomain';

export class GetExtractDealUseCase implements IUseCase<string, ExtractDealDomain | string> {
  constructor(
    private readonly dealRepository: IDealRepository
  ) {}

  public async execute(idUser: string): Promise<ExtractDealDomain | string> {
    const extractDeal = await this.dealRepository.GetExtractDealByIdentifier(idUser);

    const total= extractDeal.reduce((result, current) => result + Number(current.balance), 0)

    return { total: total, data: extractDeal }
  }
}