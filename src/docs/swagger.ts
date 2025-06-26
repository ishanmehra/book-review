import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Book Review API',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.ts')],
};

export default swaggerJSDoc(options);