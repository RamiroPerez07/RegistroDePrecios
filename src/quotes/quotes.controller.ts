import { Request, Response } from 'express';

export class QuotesController {
  getAll(req: Request, res: Response) {
    res.json({ message: 'Lista de cotizaciones' });
  }

  getOne(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: `Cotización con ID: ${id}` });
  }
}