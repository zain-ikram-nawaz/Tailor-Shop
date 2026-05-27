import { NextResponse } from 'next/server';
import { getDesigns, getDesignBySlug } from '@/db/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const design = await getDesignBySlug(slug, true);
      if (!design) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ post: design });
    }
    const designs = await getDesigns(false);
    return NextResponse.json({ posts: designs });
  } catch (err) {
    console.error('Error fetching designs (blog compat):', err);
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
