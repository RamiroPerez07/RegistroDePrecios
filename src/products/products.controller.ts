import { Request, Response } from 'express';
import Product from './products.model';

export class ProductsController {
  // Obtener todos los productos
  async getAll(req: Request, res: Response) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  }

  async getOne(req: Request<{id: string}>, res: Response){
    const { id } = req.params;  // id es un string porque lo definimos en Request<{ id: string }>
    
    try {
      const product = await Product.findById(id);
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  }
  
  // Crear un nuevo producto
  async create(req: Request, res: Response) {
    const { description } = req.body;

    try {
      const newProduct = new Product({ description });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }
}