import express, { Request, Response } from 'express';
import authRoutes from './auth/auth.routes';
import productRoutes from './products/products.routes';
import quoteRoutes from './quotes/quotes.routes';
import { DatabaseConnection } from './database/dbConfig';
import cors from "cors";

const app = express();

app.use(cors())

const port = process.env.PORT || 3000;

const DbConnection = new DatabaseConnection();

DbConnection.connect(); //conexión a base de datos.

//Middleware para parsear JSON
app.use(express.json());

// Usar rutas de cada módulo
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotes', quoteRoutes);

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('¡Bienvenido!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});