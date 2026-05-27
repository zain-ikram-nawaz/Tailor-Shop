import { connectDB } from './mongodb.js';
import { Lead } from './models/Lead.js';
import { Design } from './models/Design.js';

function toPlain(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  delete obj._id;
  delete obj.__v;
  return obj;
}

export const getLeads = async () => {
  await connectDB();
  const docs = await Lead.find().sort({ createdAt: -1 });
  return docs.map(toPlain);
};

export const saveLead = async (lead) => {
  await connectDB();
  const doc = await Lead.create(lead);
  return toPlain(doc);
};

export const updateLeadStatus = async (id, status) => {
  await connectDB();
  const doc = await Lead.findOneAndUpdate(
    { id },
    { status, updatedAt: new Date().toISOString() },
    { returnDocument: 'after' }
  );
  return toPlain(doc);
};

function buildSlug(title) {
  return title
    .toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const getDesigns = async (includeDrafts = false) => {
  await connectDB();
  const query = includeDrafts ? {} : { published: true };
  const docs = await Design.find(query).sort({ createdAt: -1 });
  return docs.map(toPlain);
};

export const getDesignBySlug = async (slug, incrementView = false) => {
  await connectDB();
  if (incrementView) {
    const doc = await Design.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { returnDocument: 'after' }
    );
    return toPlain(doc);
  }
  const doc = await Design.findOne({ slug });
  return toPlain(doc);
};

export const createDesign = async (design) => {
  await connectDB();
  const baseSlug = buildSlug(design.title);
  let finalSlug = baseSlug;
  let counter = 1;
  while (await Design.exists({ slug: finalSlug })) {
    finalSlug = `${baseSlug}-${counter++}`;
  }
  const newDesign = {
    ...design,
    id: `design-${Date.now()}`,
    slug: finalSlug,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const doc = await Design.create(newDesign);
  return toPlain(doc);
};

export const updateDesign = async (id, updates) => {
  await connectDB();
  const existing = await Design.findOne({ id });
  if (!existing) return null;
  const updateData = { ...updates, updatedAt: new Date().toISOString() };
  if (updates.title && updates.title !== existing.title) {
    const baseSlug = buildSlug(updates.title);
    let finalSlug = baseSlug;
    let counter = 1;
    while (await Design.exists({ slug: finalSlug, id: { $ne: id } })) {
      finalSlug = `${baseSlug}-${counter++}`;
    }
    updateData.slug = finalSlug;
  }
  const doc = await Design.findOneAndUpdate({ id }, updateData, { returnDocument: 'after' });
  return toPlain(doc);
};

export const deleteDesign = async (id) => {
  await connectDB();
  const result = await Design.deleteOne({ id });
  return result.deletedCount > 0;
};
