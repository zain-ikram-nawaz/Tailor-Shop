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
    return NextResponse.json({ posts: designs });
  } catch (err) {
    console.error('Error fetching designs (admin blog compat):', err);
    return NextResponse.json({ error: 'Failed to load.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const design = await createDesign({
      title: body.title,
      description: body.content || body.excerpt || '',
      category: body.category || 'General',
      garmentType: body.garmentType || '',
      featuredImage: body.featuredImage || '',
      images: [],
      startingPrice: 0,
      tags: Array.isArray(body.keywords) ? body.keywords : [],
      published: body.published ?? false,
    });
    return NextResponse.json({ post: design });
  } catch (err) {
    console.error('Error creating design (admin blog compat):', err);
    return NextResponse.json({ error: 'Failed to create.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'ID required.' }, { status: 400 });
    const design = await updateDesign(id, updates);
    if (!design) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    return NextResponse.json({ post: design });
  } catch (err) {
    console.error('Error updating design (admin blog compat):', err);
    return NextResponse.json({ error: 'Failed to update.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'ID required.' }, { status: 400 });
    const success = await deleteDesign(id);
    if (!success) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting design (admin blog compat):', err);
    return NextResponse.json({ error: 'Failed to delete.' }, { status: 500 });
  }
}
