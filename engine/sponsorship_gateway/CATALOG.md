# Pack 2: Edge Newsletter Gateway
**Way #67 / Product 69 (Category D: Content, Media & Audience)**

Edge-native Cloudflare Workers router for newsletter subscriber capture, UTM click telemetry redirects, D1 database persistence, and automated sponsor ROI analytics.

## Endpoints
- `GET /health` or `GET /api/v1/status`: Health check and isolate latency.
- `POST /api/newsletter/subscribe`: Instant subscriber verification and edge ingestion.
- `GET /api/newsletter/track/click`: Sub-10ms redirect with click token telemetry logging.
- `GET /api/newsletter/sponsor/roi`: Instant real-time performance and ROI metrics for sponsors.
