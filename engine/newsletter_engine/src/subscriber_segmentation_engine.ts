/**
 * beehiiv / Substack Subscriber Segmentation & Engagement Scoring Engine
 * Analyzes open velocity, reading streaks, and referral influence
 */

export interface SubscriberSegmentProfile {
  email: string;
  platform: 'beehiiv' | 'substack' | 'custom_edge';
  engagementScore: number; // 0 - 100
  segmentTier: 'vip_advocate' | 'regular_reader' | 'casual_browser' | 'at_risk_churn';
  recommendedAction: string;
}

export class SubscriberSegmentationEngine {
  public scoreSubscriber(
    email: string,
    platform: 'beehiiv' | 'substack' | 'custom_edge',
    openCountLast10: number,
    clickCountLast10: number
  ): SubscriberSegmentProfile {
    const score = (openCountLast10 * 7) + (clickCountLast10 * 3);
    let segment: 'vip_advocate' | 'regular_reader' | 'casual_browser' | 'at_risk_churn' = 'casual_browser';
    let action = 'Deliver standard weekly digest';

    if (score >= 80) {
      segment = 'vip_advocate';
      action = 'Invite to private clinical advisory circle / sponsor feedback panel';
    } else if (score >= 50) {
      segment = 'regular_reader';
      action = 'Promote growth partner sponsor recommendations';
    } else if (score < 20) {
      segment = 'at_risk_churn';
      action = 'Trigger deliverability winback email sequence';
    }

    return {
      email,
      platform,
      engagementScore: Math.min(100, score),
      segmentTier: segment,
      recommendedAction: action
    };
  }
}
