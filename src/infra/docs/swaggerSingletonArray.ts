import swaggerJSDoc from 'swagger-jsdoc';

interface ISwaggerSingletonArray {
  paths: swaggerJSDoc.Paths;
  tags: {
    name: string;
  }[];
}

export const SwaggerSingletonArray: ISwaggerSingletonArray = {
  paths: {},
  tags: [],
};
