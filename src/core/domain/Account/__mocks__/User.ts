import { IUser } from '@/core/domain/User/IUser';

export const usersMock = async (): Promise<IUser[]> => {
  return [
    {
      id: '123',
      name: 'Mock 1',
      email: 'abc@abc.com.br',
      balance: 0,
      btc: 0,
      password: '@Sect#123456!',
    },
  ];
};
