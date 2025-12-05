'use client';

import { useEffect } from 'react';

interface AnalyticsEvent {
  event_type: string;
  page?: string;
  referrer?: string;
  user_agent?: string;
}

async function trackEvent(event: AnalyticsEvent) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip tracking if credentials not configured
  if (!supabaseUrl || !supabaseKey) {
    return;
  }

  try {
    await fetch(`${supabaseUrl}/rest/v1/analytics_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify(event),
    });
  } catch {
    // Silently fail - don't break the site for analytics
  }
}

// Export for manual tracking (button clicks, etc.)
export function trackClick(buttonName: string) {
  trackEvent({
    event_type: `click_${buttonName}`,
    page: typeof window !== 'undefined' ? window.location.pathname : '/',
  });
}

export default function Analytics() {
  useEffect(() => {
    // Track page view on mount
    trackEvent({
      event_type: 'page_view',
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
    });
  }, []);

  return null; // This component renders nothing
}
