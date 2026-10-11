import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        {
          error: 'Missing Razorpay Secret',
          message: 'Server-side RAZORPAY_KEY_SECRET is not configured.',
          verified: false
        },
        { status: 400 }
      );
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await request.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing payment parameters for signature verification', verified: false },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const isMatch = generatedSignature === razorpaySignature;

    if (!isMatch) {
      return NextResponse.json(
        {
          verified: false,
          signatureVerified: false,
          error: 'Tampered or invalid Razorpay payment signature'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      verified: true,
      signatureVerified: true,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, verified: false }, { status: 500 });
  }
}
