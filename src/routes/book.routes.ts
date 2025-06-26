import { Router } from 'express';
import { getBooks, postBook, getReviews, postReview } from '../controllers/book.controller';
const router = Router();

router.get('/', async (req, res) => {
  await getBooks(req, res);
});
router.post('/', async (req, res) => {
  await postBook(req, res);
});
router.get('/:id/reviews', async (req, res) => {
  await getReviews(req, res);
});
router.post('/:id/reviews', async (req, res) => {
  await postReview(req, res);
});

export default router;