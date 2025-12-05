import { NextResponse } from 'next/server';

// Validate subscription ID format (numeric string only)
const isValidSubscriptionId = (id: unknown): id is string => {
  if (typeof id !== 'string') return false;
  // LemonSqueezy subscription IDs are numeric
  return /^\d{1,20}$/.test(id);
};

// Helper function to check subscription status with LemonSqueezy
const checkSubscriptionStatus = async (subscriptionId: string): Promise<{
  valid: boolean;
  status: string;
}> => {
  try {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
      {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      return { valid: false, status: 'error' };
    }

    const data = await response.json();
    const status = data.data.attributes.status;

    // Valid statuses: active, past_due
    // Invalid statuses: cancelled, expired, unpaid, paused
    const validStatuses = ['active', 'past_due'];

    return {
      valid: validStatuses.includes(status),
      status
    };
  } catch {
    return { valid: false, status: 'error' };
  }
};

export async function POST(request: Request) {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate body is an object
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { subscriptionId } = body as { subscriptionId?: unknown };

    // Validate subscription ID
    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscription ID' },
        { status: 400 }
      );
    }

    if (!isValidSubscriptionId(subscriptionId)) {
      return NextResponse.json(
        { error: 'Invalid subscription ID format' },
        { status: 400 }
      );
    }

    // Check subscription status with LemonSqueezy
    const { valid, status } = await checkSubscriptionStatus(subscriptionId);

    // Don't echo back the subscription ID - minimize information disclosure
    return NextResponse.json({
      valid,
      status
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
