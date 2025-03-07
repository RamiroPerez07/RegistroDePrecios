import { Router } from 'express';
import { ProductsController } from './products.controller';

const router = Router();
const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getOne);
router.post('/', productsController.create); // Ruta para crear un producto

export default router;