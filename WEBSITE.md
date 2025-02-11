# SideSwitch Website Documentation

## Overview
The SideSwitch website (https://www.sideswitch.app) is built with Next.js and deployed on Vercel. It features a modern landing page with animations, subscription handling through LemonSqueezy, and webhook integration for managing subscriptions.

## Tech Stack
- Next.js 15.1.7
- React 19.0.0
- Framer Motion (for animations)
- Styled Components
- TailwindCSS
- TypeScript

## Domain Setup
### GoDaddy Configuration
1. Domain: sideswitch.app
2. DNS Records:
   ```
   A Record:
   - Name: @ (or empty)
   - Value: 76.76.21.21 (Vercel's IP)

   CNAME Record:
   - Name: www
   - Value: cname.vercel-dns.com
   ```

### Vercel Configuration
1. Project: sideswitchv1
2. Domain: www.sideswitch.app
3. Environment Variables:
   - `NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL`: LemonSqueezy checkout URL
   - `LEMONSQUEEZY_WEBHOOK_SECRET`: Webhook verification secret
   - `LEMONSQUEEZY_API_KEY`: API key for LemonSqueezy integration

## LemonSqueezy Integration
### Product Setup
- Product: SideSwitch Pro
- Price: $9.99/month
- Test Mode: Enabled during development

### Webhook Configuration
- Endpoint: https://www.sideswitch.app/api/webhook
- Events tracked:
  - subscription_created
  - subscription_updated
  - subscription_cancelled
  - subscription_resumed
  - order_created
  - order_refunded

### Success/Cancel URLs
- Success: https://www.sideswitch.app/success
- Cancel: https://www.sideswitch.app/cancel

## Development
### Local Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   cd website
   npm install
   ```
3. Create `.env.local` with required environment variables
4. Run development server:
   ```bash
   npm run dev
   ```

### Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL="your_checkout_url"
LEMONSQUEEZY_WEBHOOK_SECRET="your_webhook_secret"
LEMONSQUEEZY_API_KEY="your_api_key"
```

### Deployment
1. Push changes to the repository
2. Vercel automatically deploys from the main branch
3. Manual deployment:
   ```bash
   vercel deploy --prod
   ```

## File Structure
```
website/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── api/
│   │   │   └── webhook/       # LemonSqueezy webhook handler
│   │   ├── success/          # Subscription success page
│   │   └── cancel/           # Subscription cancel page
│   └── components/           # Shared components
├── public/                   # Static assets
├── vercel.json              # Vercel configuration
└── package.json             # Dependencies and scripts
```

## Monitoring & Maintenance
1. Vercel Dashboard: Monitor deployments and analytics
2. LemonSqueezy Dashboard: Track subscriptions and payments
3. Webhook Logs: Check `/api/webhook` endpoint logs in Vercel

## Security Considerations
1. Environment variables are securely stored in Vercel
2. Webhook signatures are verified using HMAC
3. SSL/TLS encryption via Vercel's automatic HTTPS

## Future Improvements
1. Add subscription management dashboard
2. Implement user authentication
3. Add usage analytics
4. Set up email notifications for subscription events 