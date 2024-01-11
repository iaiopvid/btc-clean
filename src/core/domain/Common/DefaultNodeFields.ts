import { IUser } from '@/core/domain/User/IUser';

export interface DefaultNodeFields {
  isDeleted?: boolean;
  createdBy?: Partial<IUser>;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  updatedBy?: Partial<IUser>;
  deletedAt?: Date | string;
  deletedBy?: Partial<IUser>;
}
