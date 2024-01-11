import DealDomain from "./DealDomain";

export default class ExtractDealDomain {
  constructor(
    public total: number | string,
    public data: DealDomain[]
  ) {}
}