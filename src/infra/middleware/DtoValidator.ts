import { badRequest } from '@/presentation/helpers/http.helper';
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import 'reflect-metadata';

export function DtoValidator(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
  descriptor.value = function (...params: any[]) {
    const request = params[0];
    const dtoClass = paramTypes[0];
    const allParams = {
      body: request.body,
      params: request.params,
      query: request.query,
      files: request.files,
    };
    const dtoInstance: object = plainToInstance(dtoClass, allParams);
    const validations: ValidationError[] = validateSync(dtoInstance, {
      skipMissingProperties: true,
    });

    if (validations.length > 0) {
      const errors = validations.map((error: ValidationError) => buildErrorTree(error));
      return badRequest(errors);
    }
    return originalMethod.apply(this, params);
  };
  return descriptor;

  function buildErrorTree(error: ValidationError) {
    if (error?.children && error?.children?.length > 0) {
      return {
        field: error.property,
        constraints: error.children.map((child) => buildErrorTree(child)),
      };
    }
    return {
      field: error.property,
      constraints: error.constraints,
    };
  }
}
