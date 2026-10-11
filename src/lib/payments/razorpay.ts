/**
 * Payment Provider Adapter: Gulati & Sons
 * Supports Razorpay Live Integration and an explicit Interactive Demo Mode.
 */

export interface PaymentInitiationResult {
  success: boolean;
  orderId?: string;
  transactionId?: string;
  error?: string;
  isDemo: boolean;
  receipt?: string;
}

export interface PaymentVerificationResult {
  verified: boolean;
  paymentId: string;
  signatureVerified: boolean;
  error?: string;
}

export class PaymentAdapter {
  private static isLiveConfigured(): boolean {
    return Boolean(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET
    );
  }

  public static getMode(): 'demo' | 'live' {
    return this.isLiveConfigured() ? 'live' : 'demo';
  }

  /**
   * Process simulated demo payment
   */
  public static async processDemoPayment(
    amount: number,
    method: 'upi' | 'card' | 'netbanking' | 'cod'
  ): Promise<PaymentInitiationResult> {
    // Simulate real-time secure banking handshake
    await new Promise((resolve) => setTimeout(resolve, 850));

    const testTxnId = `txn_demo_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      success: true,
      orderId: `order_demo_${Date.now()}`,
      transactionId: testTxnId,
      isDemo: true,
      receipt: `RCPT-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }

  /**
   * Live payment initiation (Only called if trusted server endpoint is present)
   */
  public static async initiateLiveRazorpayOrder(
    amount: number,
    currency: string = 'INR',
    receipt: string
  ): Promise<PaymentInitiationResult> {
    if (!this.isLiveConfigured()) {
      return {
        success: false,
        error: 'Razorpay Live credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) not configured on server.',
        isDemo: true
      };
    }

    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, receipt })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Payment initiation failed');
      }

      return {
        success: true,
        orderId: data.id,
        isDemo: false
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
        isDemo: false
      };
    }
  }

  /**
   * Verify signature on server (Never on client)
   */
  public static async verifyServerSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<PaymentVerificationResult> {
    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature
        })
      });

      const result = await response.json();
      return result;
    } catch (err: any) {
      return {
        verified: false,
        paymentId: razorpayPaymentId,
        signatureVerified: false,
        error: err.message
      };
    }
  }
}
