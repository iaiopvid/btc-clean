import { IProfileResource } from '@/core/domain/ProfileResource/ProfileResource';
import { DefaultNodeFields } from '@/core/domain/Common/DefaultNodeFields';
import { IUser } from '@/core/domain/User/IUser';

export interface IProfile extends DefaultNodeFields {
  identifier: string;
  name: string;
  tag: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  users?: IUser[];
  profileResources?: IProfileResource[];
}

export enum ProfileEnum {
  ADMIN = 1,
  CONTENT_MANAGER = 2,
  STUDENT = 3,
  SUPPORT = 4,
  SUPER_ADMIN = 5,
  PROFESSOR = 6,
  FLASHCARD_CONTENT_MANAGER = 7,
  TEST = 8,
}
