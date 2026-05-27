import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDesigns, createDesign, updateDesign, deleteDesign } from '@/db/db';

function isAdmin(session) {
  return !!(session?.user?.role === 'admin');
}

export async function GET() {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const designs = await getDesigns(true);
    return NextResponse.json({ designs });
  } catch (err) {
    console.error('Error fetching designs (admin):', err);
    return NextResponse.json({ error: 'Failed to load designs.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { title, description, category, garmentType, featuredImage, images, startingPrice, tags, published } = body;
    if (!title) return NextResponse.json({ error: 'Title zaroori hai.' }, { status: 400 });
    const design = await createDesign({
      title,
      description: description || '',
      category: category || 'General',
      garmentType: garmentType || '',
      featuredImage: featuredImage || '',
      images: Array.isArray(images) ? images : [],
      startingPrice: Number(startingPrice) || 0,
      tags: Array.isArray(tags) ? tags : [],
      published: published ?? false,
    });
    return NextResponse.json({ design });
  } catch (err) {
    console.error('Error creating design:', err);
    return NextResponse.json({ error: 'Failed to create design.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID zaroori hai.' }, { status: 400 });
    const design = await updateDesign(id, updates);
    if (!design) return NextResponse.json({ error: 'Design not found.' }, { status: 404 });
    return NextResponse.json({ design });
  } catch (err) {
    console.error('Error updating design:', err);
    return NextResponse.json({ error: 'Failed to update design.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'ID zaroori hai.' }, { status: 400 });
    const success = await deleteDesign(id);
    if (!success) return NextResponse.json({ error: 'Design not found.' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting design:', err);
    return NextResponse.json({ error: 'Failed to delete design.' }, { status: 500 });
  }
}
