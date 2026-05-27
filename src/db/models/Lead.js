import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: String,
  email: String,
  phone: String,
  whatsapp: String,
  gender: String,
  garmentType: String,
  fabricQuality: String,
  customizations: [String],
  measurements: {
    chest: String,
    waist: String,
    hips: String,
    length: String,
    sleeve: String,
    neck: String,
  },
  estimatedPrice: String,
  deliveryPreference: String,
  contactPreference: String,
  notes: String,
  status: { type: String, default: 'new' },
  source: String,
  createdAt: String,
  updatedAt: String,
});

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
