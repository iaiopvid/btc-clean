import { IUseCase } from '@/usecase/IUseCase';
import Errors from '@/core/shared/Erros';
import { IBtcRepository } from '@/core/repositories/IBtcRepository';
import PositionBtcDomain from '@/core/domain/BTC/PositionBtcDomain';



export class GetPositionBtcUseCase implements IUseCase<string, PositionBtcDomain | string> {
  constructor(
    private readonly btcRepository: IBtcRepository
  ) {}

  public async execute(idUser: string): Promise<PositionBtcDomain | string> {
    const positionBtcs = await this.btcRepository.GetPositionBtcByIdentifier(idUser);

    const totalInvestment = positionBtcs.reduce((result, current) => result + Number(current.balance), 0)

    return { totalInvestment: totalInvestment, data: positionBtcs }
  }
}