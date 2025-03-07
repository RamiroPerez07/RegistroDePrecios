import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  description: string;
}

const productSchema: Schema = new Schema({
  description: { 
    type: String, 
    required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;