import { forbidden } from '@/presentation/helpers/http.helper';
import { ProfileEnum } from '@/core/domain/Profile/Profile';
import { env } from '@/infra/config/environment';
import 'reflect-metadata';

export function Guard(allowedProfiles: ProfileEnum[]) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...params: any[]) {
      if (env.nodeEnv === 'test' || env.nodeEnv === 'actions') {
        return originalMethod.apply(this, params);
      }

      const request = params[0];
      const { user } = request;

      if (!user) {
        return forbidden(`permission.denied`);
      }

      const userProfileId = user?.id_perfil;
      if (allowedProfiles.length > 0 && allowedProfiles.indexOf(userProfileId) === -1) {
        return forbidden(`permission.denied`);
      }
      return originalMethod.apply(this, params);
    };
    return descriptor;
  };
}
