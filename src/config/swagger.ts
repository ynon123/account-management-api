import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import SwaggerParser from '@apidevtools/swagger-parser';

export const setupSwaggerDocs = async (app: Express) => {
    const swaggerPath = path.resolve(__dirname, '../../docs/openapi.yaml');

    try {
        const swaggerDocument = await SwaggerParser.dereference(swaggerPath);

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        console.log('Swagger UI available at /api-docs');
    } catch (error) {
        console.error('Failed to load OpenAPI spec:', error);
    }
};
