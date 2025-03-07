import { Request, Response } from 'express';
import User, { IUser } from './auth.model';
import jwt from 'jsonwebtoken';

export class AuthController {

  secret = "este_es_un_secreto_que_debe_ser_reemplazado_por_otro"

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(400).json({ message: 'Contraseña incorrecta' });
        return;
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user._id }, this.secret, { expiresIn: '1h' });
      
      res.status(200).json({user, token });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor', error });
    }
  }

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el usuario', error });
  }
  }
}