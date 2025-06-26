import { DataSource } from 'typeorm';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import * as dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: isTest ? ':memory:' : process.env.DB_PATH || './db.sqlite',
  synchronize: true,
  logging: true,
  entities: [Book, Review],
  migrations: ['src/database/migrations/*.ts'],
});