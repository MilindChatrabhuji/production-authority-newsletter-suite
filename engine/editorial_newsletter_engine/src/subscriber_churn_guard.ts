/**
 * Subscriber Churn Guard & List Deliverability Engine
 * Identifies engagement decay, triggers re-engagement workflows, and protects domain sender reputation
 */

import { ChurnRiskSubscriber } from './types';

export class SubscriberChurnGuard {
  public auditSubscriberEngagement(
    email: string,
    joinedDate: string,
    lastOpenedDate: string,
    unopenedIssuesCount: number
  ): ChurnRiskSubscriber {
    let tier: 'low' | 'moderate' | 'critical' = 'low';
    let action: 'continue' | 'trigger_winback_email' | 'prune_to_protect_deliverability' = 'continue';

    if (unopenedIssuesCount >= 8) {
      tier = 'critical';
      action = 'prune_to_protect_deliverability';
    } else if (unopenedIssuesCount >= 4) {
      tier = 'moderate';
      action = 'trigger_winback_email';
    }

    return {
      subscriberEmail: email,
      joinedDate,
      lastOpenedDate,
      consecutiveUnopenedIssues: unopenedIssuesCount,
      churnRiskTier: tier,
      recommendedAction: action
    };
  }

  public generateWinbackSequence(email: string, publicationName: string): { subject: string; bodyMarkdown: string } {
    return {
      subject: `Should we pause your ${publicationName} updates?`,
      bodyMarkdown: `Hi there,\n\nWe noticed you haven't opened the last few issues of **${publicationName}**.\n\nWe protect your inbox strictly: we only want to deliver high-yield clinical informatics, FDA alerts, and software architectures if you find them truly actionable.\n\nIf you'd like to stay subscribed, just [Click Here to Confirm Your Subscription](https://newsletter.example.com/api/newsletter/confirm?email=${encodeURIComponent(email)}).\n\nIf not, no worries at all! We will automatically unsubscribe you next Friday to keep your inbox clean.\n\nBest regards,\nEditorial Team`
    };
  }
}
