import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: String,
  slug: { type: String, unique: true, index: true },
  description: String,
  category: String,
  garmentType: String,
  featuredImage: String,
  images: [String],
  startingPrice: Number,
  tags: [String],
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: String,
  updatedAt: String,
});

export const Design = mongoose.models.Design || mongoose.model('Design', designSchema);
