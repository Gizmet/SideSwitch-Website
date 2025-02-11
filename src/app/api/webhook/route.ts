import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Helper function to verify webhook signature
const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
): boolean => {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
};

export async function POST(request: Request) {
  try {
    // Get the raw request body as a string
    const rawBody = await request.text();
    
    // Get the signature from headers
    const signature = request.headers.get('x-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 401 }
      );
    }

    // Verify the webhook signature
    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ''
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    const { meta, data } = payload;
    
    // Handle different event types
    switch (meta.event_name) {
      case 'subscription_created':
        // Handle new subscription
        console.log('New subscription:', data.id);
        break;
        
      case 'subscription_updated':
        // Handle subscription update
        console.log('Subscription updated:', data.id);
        break;
        
      case 'subscription_cancelled':
        // Handle subscription cancellation
        console.log('Subscription cancelled:', data.id);
        break;
        
      case 'subscription_resumed':
        // Handle subscription resumption
        console.log('Subscription resumed:', data.id);
        break;
        
      case 'order_created':
        // Handle new order
        console.log('New order:', data.id);
        break;
        
      case 'order_refunded':
        // Handle refund
        console.log('Order refunded:', data.id);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 