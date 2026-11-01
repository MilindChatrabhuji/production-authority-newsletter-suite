# DEPLOYMENT & OPERATION MANUAL: WAY #67

## 1. Prerequisites
- Node.js 18+ and npm
- TypeScript 5.3+
- Cloudflare Wrangler CLI (`npm i -g wrangler`)
- Cloudflare D1 Database binding configured in `wrangler.toml`

## 2. Local Testing
```bash
cd engine/newsletter_authority_engine
npm test
```

## 3. Edge Gateway Deployment
```bash
cd engine/edge_newsletter_gateway
wrangler d1 execute newsletter_subscribers_d1 --file=schema.sql
wrangler deploy
```

## 4. Substack & beehiiv Integration
- Use the generated payloads from `rss_cross_poster.ts` to push drafts via API or import via RSS 2.0 endpoint.
- Webhooks from beehiiv/Substack route directly to `/api/newsletter/subscribe` and `/api/newsletter/track/click`.
