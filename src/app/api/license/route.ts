import { NextResponse } from 'next/server';

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
      console.error('LemonSqueezy API error:', await response.text());
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
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { valid: false, status: 'error' };
  }
};

export async function POST(request: Request) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscription ID' },
        { status: 400 }
      );
    }

    // Check subscription status with LemonSqueezy
    const { valid, status } = await checkSubscriptionStatus(subscriptionId);

    return NextResponse.json({
      valid,
      subscription: {
        id: subscriptionId,
        status
      }
    });
  } catch (error) {
    console.error('Subscription check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 