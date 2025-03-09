import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../auth/auth.model';

// Interface para definir el tipo de la cotización
export interface IQuote extends Document {
  proveedor: string;
  fechaCarga: Date;
  precio: number;
  iva: number;
  marca?: string; // Opcional
  stock: boolean;
  userId: mongoose.Types.ObjectId; // Referencia a user
  productId: mongoose.Types.ObjectId; // Referencia a product
  fechaRevisionStock: Date;
  userRevisionStock: mongoose.Types.ObjectId;
  observacion?: string; // Opcional
}



// Definición del esquema
const QuoteSchema: Schema = new Schema({
  proveedor: { type: String, required: true },
  fechaCarga: { type: Date, default: Date.now },
  precio: { type: Number, required: true },
  iva: { type: Number, required: true },
  marca: { type: String, required: false },
  stock: { type: Boolean, required: true, default: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  fechaRevisionStock: { type: Date, default: Date.now },
  userRevisionStock: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  observacion: { type: String, required: false }
}, { timestamps: true });

// Creación del modelo
const Quote = mongoose.model<IQuote>('Quote', QuoteSchema);

export default Quote;