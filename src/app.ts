import express from 'express';
import "reflect-metadata";
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/data-source';
import bookRoutes from './routes/book.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV !== 'test') {
  AppDataSource.initialize()
    .then(() => console.log('Data Source has been initialized'))
    .catch((err) => console.error('Error during Data Source initialization', err));
}

export default app;
