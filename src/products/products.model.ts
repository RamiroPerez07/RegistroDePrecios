import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  description: string;
  userId: mongoose.Types.ObjectId; // Referencia a user
  userRevisor: mongoose.Types.ObjectId; // Referencia a user
}

const productSchema: Schema = new Schema({
  description: { 
    type: String, 
    required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userRevisor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;