import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    backgroundImage: { type: String, required: true, trim: true },
    primaryButtonText: { type: String, required: true, trim: true },
    primaryButtonLink: { type: String, required: true, trim: true },
    secondaryButtonText: { type: String, required: true, trim: true },
    secondaryButtonLink: { type: String, required: true, trim: true },
    /** Dark overlay strength (higher = darker image for text contrast). */
    overlayStrength: { type: Number, default: 72, min: 35, max: 92 },
    textAlign: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'left',
    },
  },
  { _id: true }
);

const heroSchema = new mongoose.Schema(
  {
    slides: { type: [heroSlideSchema], default: [] },
    /** Legacy flat fields — synced from slides[0] on save for older documents. */
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    backgroundImage: { type: String, trim: true },
    primaryButtonText: { type: String, trim: true },
    primaryButtonLink: { type: String, trim: true },
    secondaryButtonText: { type: String, trim: true },
    secondaryButtonLink: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Hero = mongoose.models.Hero || mongoose.model('Hero', heroSchema);
