export default class UserDomain {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password:  string | undefined,
    public balance?: number | string,
    public btc?: number | string,
  ) {}
}