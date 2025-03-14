import { Request, Response } from 'express';
import Product from './products.model';
import Quote from '../quotes/quotes.model';

export class ProductsController {
  // Obtener todos los productos
  async getAll(req: Request, res: Response) {
    try {
      const products = await Product.find().populate('userId', 'username');
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
    const { description, userId } = req.body;

    try {
      const newProduct = new Product({ description, userId });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }

  // Eliminar un producto y sus cotizaciones asociadas
  async delete(req: Request, res: Response) {
    const { id } = req.body; // Ahora obtenemos el id desde el body en lugar de params

    if (!id) {
      return res.status(400).json({ message: 'El ID del producto es necesario' });
    }

    try {
      // Primero, elimina las cotizaciones asociadas a este producto
      await Quote.deleteMany({ productId: id });

      // Luego, elimina el producto
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({ message: 'Producto y cotizaciones eliminadas correctamente', product: deletedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
}
