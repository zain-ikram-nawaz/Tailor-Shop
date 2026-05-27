import { NextResponse } from 'next/server';
import { calculateTailorPrice } from '@/lib/calculator';

export async function POST(request) {
  try {
    const body = await request.json();
    const { garmentType, fabricQuality, customizations, delivery } = body;

    if (!garmentType || !fabricQuality) {
      return NextResponse.json(
        { error: 'garmentType and fabricQuality are required fields.' },
        { status: 400 }
      );
    }

    const customizationsArray = Array.isArray(customizations) ? customizations : [];
    const stats = calculateTailorPrice(garmentType, fabricQuality, customizationsArray, delivery || 'standard');

    return NextResponse.json({
      formattedRange: stats.formattedRange,
      estimatedMid: Math.round((stats.estimatedMin + stats.estimatedMax) / 2),
      breakdown: {
        base: stats.base,
        customTotal: stats.customTotal,
        deliveryCharge: stats.deliveryCharge,
        total: stats.total,
        estimatedMin: stats.estimatedMin,
        estimatedMax: stats.estimatedMax,
        customizations: stats.breakdown.customizations,
        delivery: stats.breakdown.delivery,
      },
    });
  } catch (err) {
    console.error('Error calculating tailor price:', err);
    return NextResponse.json({ error: 'Internal server error calculating price' }, { status: 500 });
  }
}
