'use client';

import { useEffect } from 'react';

const SUPABASE_URL = 'https://rvcfmfqnopizavdzpupk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Y2ZtZnFub3BpemF2ZHpwdXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzExNjUsImV4cCI6MjA3OTY0NzE2NX0.ZptdYlrV8jKz3cGkSqQLRG8dMPieOrLJIqiBR0X2cK8';

interface AnalyticsEvent {
  event_type: string;
  page?: string;
  referrer?: string;
  user_agent?: string;
}

async function trackEvent(event: AnalyticsEvent) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(event),
    });
  } catch (e) {
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
