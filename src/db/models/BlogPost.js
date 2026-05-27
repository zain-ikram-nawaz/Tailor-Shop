import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: String,
  slug: { type: String, unique: true, index: true },
  content: String,
  excerpt: String,
  metaDescription: String,
  keywords: [String],
  category: String,
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  featuredImage: String,
  author: String,
  createdAt: String,
  updatedAt: String,
});

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
