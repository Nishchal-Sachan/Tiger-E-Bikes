import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    /** Lucide icon name, e.g. "Battery", "Gauge" — optional. */
    icon: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

export const Feature =
  mongoose.models.Feature || mongoose.model('Feature', featureSchema);
