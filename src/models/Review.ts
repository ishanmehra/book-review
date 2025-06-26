import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  bookId!: number;

  @Column()
  content!: string;

  @Column()
  rating!: number;

  @ManyToOne(() => Book, (book) => book.reviews)
  book!: Book;
}