/**
 * Sponsor Metrics & Click Telemetry Tracker
 * Computes CPM, CPC, CTR, and Sponsor ROI performance reports
 */

import { SponsorRoiAnalytics, NewsletterSponsorPlacement } from './types';

export class SponsorMetricsTracker {
  public calculateRoi(
    sponsor: NewsletterSponsorPlacement,
    issueNumber: number,
    deliveredImpressions: number,
    uniqueClicks: number
  ): SponsorRoiAnalytics {
    if (deliveredImpressions <= 0) {
      throw new Error('Delivered impressions must be greater than zero.');
    }

    const ctr = (uniqueClicks / deliveredImpressions) * 100;
    const totalCost = sponsor.flatFeeUsd > 0 ? sponsor.flatFeeUsd : (deliveredImpressions / 1000) * sponsor.cpmRateUsd;
    const effectiveCpc = uniqueClicks > 0 ? totalCost / uniqueClicks : totalCost;
    const effectiveCpm = (totalCost / deliveredImpressions) * 1000;

    // Benchmarking satisfaction: > 1.5% CTR in B2B newsletter is considered high performer
    let satisfaction = 85;
    let recommendation: 'immediate_upsell' | 'maintain_quarterly' | 'creative_optimization_needed' = 'maintain_quarterly';

    if (ctr >= 2.0) {
      satisfaction = 98;
      recommendation = 'immediate_upsell';
    } else if (ctr < 0.8) {
      satisfaction = 65;
      recommendation = 'creative_optimization_needed';
    }

    return {
      sponsorId: sponsor.id,
      issueNumber,
      impressionsDelivered: deliveredImpressions,
      uniqueClicksRecorded: uniqueClicks,
      clickThroughRatePercent: parseFloat(ctr.toFixed(2)),
      effectiveCpcUsd: parseFloat(effectiveCpc.toFixed(2)),
      effectiveCpmUsd: parseFloat(effectiveCpm.toFixed(2)),
      sponsorSatisfactionScore: satisfaction,
      rebookingRecommendation: recommendation
    };
  }

  public generateSponsorExecutiveReport(analytics: SponsorRoiAnalytics, sponsorName: string): string {
    return `# SPONSOR PERFORMANCE & ROI REPORT
**Sponsor:** ${sponsorName} | **Issue Reference:** #${analytics.issueNumber}
**Date Generated:** ${new Date().toISOString().split('T')[0]}

---

### Core Performance Metrics
- **Audience Impressions Delivered:** ${analytics.impressionsDelivered.toLocaleString()} verified readers
- **Unique Qualified Clicks:** ${analytics.uniqueClicksRecorded.toLocaleString()} visits
- **Click-Through Rate (CTR):** ${analytics.clickThroughRatePercent}% (B2B Industry Benchmark: 1.2%)
- **Effective CPC:** $${analytics.effectiveCpcUsd.toFixed(2)} USD
- **Effective CPM:** $${analytics.effectiveCpmUsd.toFixed(2)} USD

### Strategic Assessment & Recommendation
- **Sponsor Satisfaction Index:** ${analytics.sponsorSatisfactionScore} / 100
- **Action Recommendation:** ${analytics.rebookingRecommendation.toUpperCase()}
- **Follow-up:** Placement renewal reservation automatically locked for 7 business days.
`;
  }
}
