import { Router } from 'express';
import { QuotesController } from './quotes.controller';
import authMiddleware from '../auth/auth.middleware';

const router = Router();
const quotesController = new QuotesController();

router.post('/', authMiddleware, quotesController.create);
router.get('/:productId', authMiddleware, quotesController.getQuotesByProductId);
router.delete('/:quoteId', authMiddleware, quotesController.delete);

export default router;