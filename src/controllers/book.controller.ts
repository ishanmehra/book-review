import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import redis from '../cache/redisClient';

const bookRepo = AppDataSource.getRepository(Book);
const reviewRepo = AppDataSource.getRepository(Review);

export const getBooks = async (req: Request, res: Response) => {
  try {
    const cached = await redis.get('books');
    if (cached) return res.json(JSON.parse(cached));

    const books = await bookRepo.find();
    await redis.set('books', JSON.stringify(books), 'EX', 300);
    return res.json(books);
  } catch (err) {
    console.error('Redis error:', err);
    const books = await bookRepo.find();
    return res.json(books);
  }
};

export const postBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const book = bookRepo.create({ title, author });
  const result = await bookRepo.save(book);
  await redis.del('books'); // Invalidate cache
  res.status(201).json(result);
};

export const getReviews = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const reviews = await reviewRepo.find({ where: { bookId } });
  res.json(reviews);
};

export const postReview = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const { content, rating } = req.body;
  const review = reviewRepo.create({ bookId, content, rating });
  const result = await reviewRepo.save(review);
  res.status(201).json(result);
};