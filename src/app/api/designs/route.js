import { NextResponse } from 'next/server';
import { getDesigns, getDesignBySlug } from '@/db/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    if (slug) {
      const design = await getDesignBySlug(slug, true);
      if (!design) {
        return NextResponse.json({ error: 'Design not found' }, { status: 404 });
      }
      return NextResponse.json({ design });
    }

    const designs = await getDesigns(false);
    const filtered = category
      ? designs.filter((d) => d.category === category)
      : designs;

    return NextResponse.json({ designs: filtered });
  } catch (err) {
    console.error('Error fetching designs:', err);
    return NextResponse.json({ error: 'Failed to load designs' }, { status: 500 });
  }
}
