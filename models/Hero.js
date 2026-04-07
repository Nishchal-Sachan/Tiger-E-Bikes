import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    backgroundImage: { type: String, required: true, trim: true },
    primaryButtonText: { type: String, required: true, trim: true },
    primaryButtonLink: { type: String, required: true, trim: true },
    secondaryButtonText: { type: String, required: true, trim: true },
    secondaryButtonLink: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Hero =
  mongoose.models.Hero || mongoose.model('Hero', heroSchema);
