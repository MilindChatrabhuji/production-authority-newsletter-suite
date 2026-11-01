/**
 * beehiiv / Substack Edge Webhook Ingestion & Subscriber Sync Router
 * Ingests subscription, unsubscribe, and bounce webhooks at edge runtime
 */

export interface WebhookEventPayload {
  platform: 'beehiiv' | 'substack';
  eventType: 'subscription.created' | 'subscription.cancelled' | 'email.bounced' | 'post.published';
  subscriberEmail: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export class BeehiivSubstackWebhookRouter {
  public async processWebhook(payload: WebhookEventPayload): Promise<{ status: string; processed: boolean; syncAction: string }> {
    if (!payload.subscriberEmail) {
      throw new Error('Subscriber email missing in webhook payload');
    }

    let action = 'no_action';
    switch (payload.eventType) {
      case 'subscription.created':
        action = `Sync new subscriber ${payload.subscriberEmail} to Cloudflare D1 and trigger welcome flow`;
        break;
      case 'subscription.cancelled':
        action = `Mark ${payload.subscriberEmail} as unsubscribed in D1 database`;
        break;
      case 'email.bounced':
        action = `Flag ${payload.subscriberEmail} for suppression to preserve domain deliverability`;
        break;
      case 'post.published':
        action = `Trigger edge syndication & social archive broadcast`;
        break;
    }

    return {
      status: 'success',
      processed: true,
      syncAction: action
    };
  }
}
