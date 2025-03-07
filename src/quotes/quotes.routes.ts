import { Router } from 'express';
import { QuotesController } from './quotes.controller';

const router = Router();
const quotesController = new QuotesController();

router.get('/', quotesController.getAll);
router.get('/:id', quotesController.getOne);

export default router;