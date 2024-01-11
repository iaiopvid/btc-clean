import { SwaggerSingletonArray } from '@/infra/docs/swaggerSingletonArray';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import swaggerJSDoc from 'swagger-jsdoc';
import 'reflect-metadata';

export function Swagger(docs: swaggerJSDoc.PathItem) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const schemas = validationMetadatasToSchemas();
    const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    const dtoClass = paramTypes[0];
    const docsRoute = Object.keys(docs)[0];
    const docsMethod = Object.keys(docs[docsRoute])[0];

    if (!docs[docsRoute][docsMethod].responses) {
      docs[docsRoute][docsMethod].responses = {
        200: {
          description: 'Success',
        },
      };
    }

    if (!docs[docsRoute][docsMethod].parameters && dtoClass) {
      const dtoPrincipalClass = Reflect.getPrototypeOf(dtoClass);
      let isParam = false;
      let dtoQueryRef =
        schemas[dtoClass.name] &&
        schemas[dtoClass.name].properties.query &&
        schemas[dtoClass.name].properties.query['$ref'];

      if (!dtoQueryRef) {
        isParam = true;
        dtoQueryRef =
          schemas[dtoClass.name] &&
          schemas[dtoClass.name].properties.params &&
          schemas[dtoClass.name].properties.params['$ref'];
      }

      if (dtoQueryRef) {
        const dtoQuery = dtoQueryRef.split('/')[dtoQueryRef.split('/').length - 1];
        const queryProps = schemas[dtoQuery].properties;
        const queryMap = Object.keys(queryProps).map((prop) => ({
          name: prop,
          in: isParam ? 'path' : 'query',
          ...queryProps[prop],
        }));
        if (dtoPrincipalClass) {
          docs[docsRoute][docsMethod].parameters = queryMap;
        }
      }
    }

    if (!docs[docsRoute][docsMethod].requestBody && dtoClass) {
      const dtoPrincipalClass = Reflect.getPrototypeOf(dtoClass);
      let dtoBodyRef =
        schemas[dtoClass.name] &&
        schemas[dtoClass.name].properties.body &&
        schemas[dtoClass.name].properties.body['$ref'];

      if (!dtoBodyRef) {
        dtoBodyRef =
          schemas[dtoClass.name] &&
          schemas[dtoClass.name].properties.file &&
          schemas[dtoClass.name].properties.file['$ref'];
      }

      if (dtoBodyRef) {
        const dtoBody = dtoBodyRef.split('/')[dtoBodyRef.split('/').length - 1];
        if (dtoPrincipalClass) {
          docs[docsRoute][docsMethod].requestBody = {
            content: {
              'application/json': {
                schema: schemas[dtoBody],
              },
            },
          };
        }
      }
    }

    const routeExists = SwaggerSingletonArray.paths[docsRoute];
    if (routeExists) {
      SwaggerSingletonArray.paths[docsRoute] = {
        ...SwaggerSingletonArray.paths[docsRoute],
        [docsMethod]: docs[docsRoute][docsMethod],
      };
    }

    if (!routeExists) {
      SwaggerSingletonArray.paths[docsRoute] = docs[docsRoute];
    }

    const tags = docs[docsRoute][docsMethod].tags;
    const newTags = tags
      ? tags.filter((routeTag) => !SwaggerSingletonArray.tags.some((swaggerTag) => swaggerTag.name === routeTag))
      : [];
    if (newTags.length > 0) {
      newTags.forEach((tag) => {
        SwaggerSingletonArray.tags.push({
          name: tag,
        });
        SwaggerSingletonArray.tags.sort((a, b) => a.name.localeCompare(b.name));
      });
    }

    return descriptor;
  };
}
