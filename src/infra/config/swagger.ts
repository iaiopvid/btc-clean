import { SwaggerSingletonArray } from '@/infra/docs/swaggerSingletonArray';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const setupSwagger = (app: Express): void => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(
      {
        openapi: '3.0.0',
        info: {
          title: 'Backend',
          version: '1.0.0',
          contact: {},
        },
        servers: [
          {
            url: 'http://localhost:5000',
          },
        ],
        security: [
          {
            SSOAuth: [],
          },
        ],
        components: {
          securitySchemes: {
            SSOAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
        paths: {
          ...SwaggerSingletonArray.paths,
        },
        tags: SwaggerSingletonArray.tags,
      },
      {
        explorer: false,
        swaggerOptions: {
          authAction: {
            JWT: {
              name: 'JWT',
              schema: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: '',
              },
              value: 'Bearer <my own JWT token>',
            },
          },
        },
      },
    ),
  );
};
