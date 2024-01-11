import { IProfileResource } from '@/core/domain/ProfileResource/ProfileResource';

export const profileResourceMock = (): IProfileResource[] => {
  return [
    {
      identifier: '6801f740-c405-11ed-afa1-0242ac120002',
      description: 'Login',
      path: '/auth/login$',
      method: 'POST',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      deletedBy: null,
    },
    {
      identifier: '6801f740-c405-11ed-afa1-0242ac120002',
      description: 'Login',
      path: '/auth/login$',
      method: 'POST',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      deletedBy: null,
    },
  ];
};
