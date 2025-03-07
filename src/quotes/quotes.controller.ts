import { Request, Response } from 'express';
import Quote, { IQuote } from './quotes.model';
import mongoose from 'mongoose';

export class QuotesController {
  async getQuotesByProductId(req: Request, res: Response) {
    const { productId } = req.params;

    try {
      const quotes: IQuote[] = await Quote.find({ productId });
      res.json(quotes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las cotizaciones' });
    }
  }

  async create(req: Request, res: Response) {
    
    const { proveedor, precio, iva, marca, stock, userId, productId, observacion } = req.body;

    try {
      const newQuote = new Quote({
        proveedor,
        precio,
        iva,
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
}