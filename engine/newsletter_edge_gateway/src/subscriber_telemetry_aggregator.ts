/**
 * Subscriber Telemetry Aggregator
 * Logs and analyzes open/click event telemetry at edge runtime
 */

import { TelemetrySummary } from './types';

export class SubscriberTelemetryAggregator {
  public aggregateIssuePerformance(
    issueNumber: number,
    totalSent: number,
    opens: number,
    clicks: number
  ): TelemetrySummary & { openRatePercent: number; clickToOpenRatePercent: number } {
    const openRate = totalSent > 0 ? (opens / totalSent) * 100 : 0;
    const ctor = opens > 0 ? (clicks / opens) * 100 : 0;

    return {
      issueNumber,
      totalSubscribers: totalSent,
      openCount: opens,
      uniqueClicks: clicks,
      openRatePercent: parseFloat(openRate.toFixed(2)),
      clickToOpenRatePercent: parseFloat(ctor.toFixed(2)),
      deliveredAt: new Date().toISOString()
    };
  }

  public generateSqlInsert(issueNumber: number, opens: number, clicks: number, sent: number): string {
    return `INSERT INTO issue_telemetry (issue_number, subscribers_sent, opens_recorded, clicks_recorded, recorded_at) VALUES (${issueNumber}, ${sent}, ${opens}, ${clicks}, CURRENT_TIMESTAMP);`;
  }
}
