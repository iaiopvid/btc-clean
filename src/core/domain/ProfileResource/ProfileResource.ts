import { DefaultNodeFields } from '@/core/domain/Common/DefaultNodeFields';
import { IProfile } from '@/core/domain/Profile/Profile';

export interface IProfileResource extends DefaultNodeFields {
  identifier: string;
  description: string;
  path: string;
  method: string;
  isActive: boolean;
  profiles?: IProfile[];
}
