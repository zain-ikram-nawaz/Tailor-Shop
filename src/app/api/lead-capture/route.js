import { NextResponse } from 'next/server';
import { saveLead } from '@/db/db';
import { calculateTailorPrice } from '@/lib/calculator';
import { sendNewLeadNotification, sendLeadConfirmationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name, email, phone, whatsapp, gender,
      garmentType, fabricQuality, customizations, measurements,
      deliveryPreference, contactPreference, notes,
    } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name aur email zaroori hain.' }, { status: 400 });
    }

    const customizationsArray = Array.isArray(customizations) ? customizations : [];

    let estimatedPriceText = '';
    if (garmentType && fabricQuality) {
      const pricing = calculateTailorPrice(garmentType, fabricQuality, customizationsArray, deliveryPreference || 'standard');
      estimatedPriceText = pricing.formattedRange;
    }

    const lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      email,
      phone: phone || '',
      whatsapp: whatsapp || '',
      gender: gender || '',
      garmentType: garmentType || '',
      fabricQuality: fabricQuality || '',
      customizations: customizationsArray,
      measurements: measurements || {},
      estimatedPrice: estimatedPriceText || '',
      deliveryPreference: deliveryPreference || 'standard',
      contactPreference: contactPreference || 'email',
      notes: notes || '',
      status: 'new',
      source: garmentType ? 'calculator' : 'contact-form',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveLead(lead);

    Promise.all([
      sendNewLeadNotification(lead),
      sendLeadConfirmationEmail(lead),
    ]).catch((err) => console.error('[Email] Failed to send emails:', err));

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    console.error('Error capturing lead:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
