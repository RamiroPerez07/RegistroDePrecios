import { Router } from 'express';
import { ProductsController } from './products.controller';
import authMiddleware from '../auth/auth.middleware';

const router = Router();
const productsController = new ProductsController();

router.get('/', authMiddleware, productsController.getAll);
router.get('/:id', authMiddleware, productsController.getOne);
router.post('/', authMiddleware, productsController.create); // Ruta para crear un producto
router.delete('/', authMiddleware, productsController.delete);

export default router;