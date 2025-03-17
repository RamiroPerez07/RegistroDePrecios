import { Request, Response } from 'express';
import Quote, { IQuote } from './quotes.model';
import mongoose from 'mongoose';

export class QuotesController {
  async getQuotesByProductId(req: Request, res: Response) {
    const { productId } = req.params;

    try {
      const quotes: IQuote[] = await Quote.find({ productId }).populate('userRevisionStock', 'username').populate('userId', 'username');;
      res.json(quotes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las cotizaciones' });
    }
  }

  async create(req: Request, res: Response) {
    
    const { proveedor, precio, descuento1, descuento2, plazo, iva, marca, stock, userId, productId, observacion } = req.body;

    try {
      const newQuote = new Quote({
        proveedor,
        precio,
        iva,
        descuento1,
        descuento2,
        plazo,
        marca,
        stock,
        userId,
        productId,
        observacion,
        userRevisionStock: userId,
      });
    
      const savedQuote = await newQuote.save();
      res.status(201).json(savedQuote);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error al crear la cotización', error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    // Verificación simple del formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'ID de cotización no válido' });
      return
    }

    try {
      const deletedQuote = await Quote.findByIdAndDelete(id);
      if (!deletedQuote) {
        res.status(404).json({ message: 'Cotización no encontrada' });
        return
      }
      res.status(200).json({ message: 'Cotización eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la cotización' });
    }
  }

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body;  // La lista de _id de las quotes a eliminar
  
    // Verificación de que los IDs sean válidos
    if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      res.status(400).json({ message: 'Lista de IDs no válida' });
      return
    }
  
    try {
      const deletedQuotes = await Quote.deleteMany({ _id: { $in: ids } });
  
      if (deletedQuotes.deletedCount === 0) {
        res.status(404).json({ message: 'No se encontraron cotizaciones para eliminar' });
        return
      }
  
      res.status(200).json({ message: 'Cotizaciones eliminadas exitosamente', deletedCount: deletedQuotes.deletedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar las cotizaciones' });
    }
  }

  async updateStock(req: Request, res: Response) {
    const { id, stock } = req.body;  // Obtienes el id y el stock desde el cuerpo de la solicitud
  
    // Verificación simple del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'ID de cotización no válido' });
      return;
    }
  
    if (typeof stock !== 'boolean') {
      res.status(400).json({ message: 'El valor de stock debe ser un booleano' });
      return;
    }
  
    try {
      // Aquí obtienes el usuario desde el middleware que lo ha añadido a req.body
      const userId = req.body.userId;
  
      // Actualiza la cotización
      const updatedQuote = await Quote.findByIdAndUpdate(
        id, 
        {
          stock,  // Nuevo valor de stock
          fechaRevisionStock: new Date(),  // Fecha actual
          userRevisionStock: userId  // El ID del usuario que hace la modificación
        },
        { new: true }  // Retorna el documento actualizado
      );
  
      if (!updatedQuote) {
        res.status(404).json({ message: 'Cotización no encontrada' });
        return;
      }
  
      res.status(200).json(updatedQuote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la cotización' });
    }
  }

  async update(req: Request, res: Response) {
    
    const { id, proveedor, precio, descuento1, descuento2, plazo, iva, marca, stock, observacion, userId } = req.body;  // Obtenemos los nuevos datos desde el cuerpo de la solicitud
  
    // Verificación simple del formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'ID de cotización no válido' });
      return;
    }
  
    try {
      const updatedQuote = await Quote.findById(id);
      if (!updatedQuote) {
        res.status(404).json({ message: 'Cotización no encontrada' });
        return
      }

      updatedQuote.proveedor = proveedor;
      updatedQuote.precio = precio;
      updatedQuote.iva = iva;
      updatedQuote.descuento1 = descuento1;
      updatedQuote.descuento2 = descuento2;
      updatedQuote.plazo = plazo;
      updatedQuote.marca = marca;
      updatedQuote.stock = stock;
      updatedQuote.observacion = observacion;
      updatedQuote.userRevisionStock = userId;
      updatedQuote.fechaRevisionStock = new Date();

      await updatedQuote.save();  // Guardamos los cambios

      res.status(200).json(updatedQuote); // Se retorna la cotizacion actualizada

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la cotización' });
    }
  }
}