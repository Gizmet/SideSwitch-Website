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

// Helper function to generate a license key
const generateLicenseKey = (subscriptionId: string): string => {
  const prefix = 'SS-';
  const hash = crypto
    .createHash('sha256')
    .update(`${subscriptionId}-${process.env.LEMONSQUEEZY_WEBHOOK_SECRET}`)
    .digest('hex')
    .substring(0, 16);
  return `${prefix}${hash}`;
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
      case 'subscription_created': {
        // Generate license key for new subscription
        const licenseKey = generateLicenseKey(data.id);
        console.log('New subscription:', {
          id: data.id,
          licenseKey,
          status: 'active'
        });
        // TODO: Store subscription and license key in database
        break;
      }
        
      case 'subscription_updated': {
        console.log('Subscription updated:', {
          id: data.id,
          status: data.attributes.status
        });
        // TODO: Update subscription status in database
        break;
      }
        
      case 'subscription_cancelled': {
        console.log('Subscription cancelled:', {
          id: data.id,
          status: 'cancelled'
        });
        // TODO: Update subscription status in database
        break;
      }
        
      case 'subscription_resumed': {
        console.log('Subscription resumed:', {
          id: data.id,
          status: 'active'
        });
        // TODO: Update subscription status in database
        break;
      }
        
      case 'order_created': {
        // Initial order - license key already generated in subscription_created
        console.log('New order:', data.id);
        break;
      }
        
      case 'order_refunded': {
        console.log('Order refunded:', {
          id: data.id,
          status: 'refunded'
        });
        // TODO: Mark subscription as refunded in database
        break;
      }
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