import mongoose, { Schema, Document } from 'mongoose';

// Interface para definir el tipo de la cotización
export interface IQuote extends Document {
  proveedor: string;
  precio: number;
  iva: number;
  descuento1: number;
  descuento2: number;
  plazo?: string;
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
  precio: { type: Number, required: true },
  iva: { type: Number, required: true, default: 0 },
  descuento1: { type: Number, default: 0 },
  descuento2: { type: Number, default: 0 },
  plazo: { type: String, required: false },
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