export default class DealDomain {
  constructor(
    public id: number | string,
    public userId: number | string,
    public balance: number | string,
    public rate?: number | string,
    public operation?: string,
    public createdAt?:  Date | string,
    public updatedAt?:  Date | string,
  ) {}
}