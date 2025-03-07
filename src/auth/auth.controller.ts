import { Request, Response } from 'express';

export class AuthController {
  login(req: Request, res: Response) {
    // Lógica de login
    res.json({ message: 'Login exitoso' });
  }

  register(req: Request, res: Response) {
    // Lógica de registro
    res.json({ message: 'Registro exitoso' });
  }
}