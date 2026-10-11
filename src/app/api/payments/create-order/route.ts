import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          error: 'Missing Razorpay Credentials',
          message:
            'Razorpay live keys (NEXT_PUBLIC_RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET) are not set. The storefront is running in verified Demo Mode.',
          mode: 'demo'
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { amount, currency = 'INR', receipt } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Direct basic auth Razorpay API call
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // convert to paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`
      })
    });

    const data = await razorpayRes.json();
    if (!razorpayRes.ok) {
      return NextResponse.json({ error: data.error?.description || 'Razorpay order creation failed' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
