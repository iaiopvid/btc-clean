import { IUser } from '@/core/domain/User/IUser';

export const usersMock = async (): Promise<IUser[]> => {
  return [
    {
      id: '1',
      name: 'JP Moura',
      email: 'jp@email.com.br',
      balance: 0,
      btc: 0,
      password: '@Sect#123456!',
    },
  ];
};
