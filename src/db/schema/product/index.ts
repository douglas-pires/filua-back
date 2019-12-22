import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  name: string;
  image: string;
  price: string;
  categoryTree: string;
  partnerUrl: string;
  partner: string;
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  categoryTree: {
    type: Array,
  },
  partnerUrl: {
    type: String,
  },
  partner: {
    type: String,
  },
});

export default mongoose.model('Product', ProductSchema);
