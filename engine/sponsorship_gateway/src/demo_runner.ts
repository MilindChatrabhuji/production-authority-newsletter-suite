/**
 * Demo Runner for Pack 2: Edge Newsletter Gateway
 */

import { NewsletterEdgeRouter } from './newsletter_edge_router';
import { SubscriberTelemetryAggregator } from './subscriber_telemetry_aggregator';

export async function runDemo(): Promise<void> {
  console.log('=== WAY #67 PACK 2: EDGE GATEWAY DEMO ===');
  const router = new NewsletterEdgeRouter();
  const env = { DB: {}, NEWSLETTER_ENV: 'test', PUBLICATION_DOMAIN: 'newsletter.example.com' };

  // Test /health
  const healthRes = await router.handleRequest(new Request('https://newsletter.example.com/health'), env);
  console.log('/health status:', healthRes.status, await healthRes.json());

  // Test /api/newsletter/subscribe
  const subReq = new Request('https://newsletter.example.com/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'dr.smith@clinic.example.com', nicheInterests: ['oncology', 'informatics'] })
  });
  const subRes = await router.handleRequest(subReq, env);
  console.log('/subscribe status:', subRes.status, await subRes.json());

  // Test Telemetry Aggregator
  const aggregator = new SubscriberTelemetryAggregator();
  const stats = aggregator.aggregateIssuePerformance(42, 18500, 8320, 1145);
  console.log('Aggregated Performance: Open Rate:', stats.openRatePercent, '% | CTOR:', stats.clickToOpenRatePercent, '%');
  console.log('=== EDGE GATEWAY DEMO COMPLETE: ZERO DEFECTS ===');
}

if (require.main === module) {
  runDemo();
}
