import mongoose from 'mongoose';

export const PRODUCT_CATEGORIES = ['scooter', 'motorcycle'];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: PRODUCT_CATEGORIES,
    },
    image: { type: String, required: true, trim: true },
    power: { type: String, required: true, trim: true },
    topSpeed: { type: String, required: true, trim: true },
    range: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
