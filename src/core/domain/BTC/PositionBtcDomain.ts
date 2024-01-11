import BtcDomain from "./BtcDomain";

export default class PositionBtcDomain {
  constructor(
    public totalInvestment: number | string,
    public data: BtcDomain[]
  ) {}
}