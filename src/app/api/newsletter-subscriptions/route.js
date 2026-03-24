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
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    await client.create({
      _type: 'newsletterSubscription',
      email,
      source: 'footer',
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Unable to submit right now. Please try again.' },
      { status: 500 }
    );
  }
}
