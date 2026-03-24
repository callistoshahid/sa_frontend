import { NextResponse } from 'next/server';
import { getSanityWriteClient } from '@/lib/sanityWrite';

export const runtime = 'nodejs';

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request) {
  try {
    const client = getSanityWriteClient();

    if (!client) {
      return NextResponse.json(
        { error: 'Server is not configured for write access.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim().toLowerCase();
    const phone = String(body?.phone || '')
      .replace(/\D/g, '')
      .trim();
    const purpose = String(body?.purpose || '').trim();
    const message = String(body?.message || '').trim();

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (phone.length < 10 || phone.length > 15) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    if (!purpose) {
      return NextResponse.json(
        { error: 'Subject matter is required.' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Please provide at least 10 characters in details.' },
        { status: 400 }
      );
    }

    await client.create({
      _type: 'contactInquiry',
      name,
      email,
      phone,
      purpose,
      message,
      source: 'contact-page',
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save contact inquiry:', error);
    return NextResponse.json(
      { error: 'Unable to submit right now. Please try again.' },
      { status: 500 }
    );
  }
}
