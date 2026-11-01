/**
 * Edge Newsletter Gateway Types
 */

export interface Env {
  DB: any; // Cloudflare D1 Database binding
  NEWSLETTER_ENV: string;
  PUBLICATION_DOMAIN: string;
}

export interface SubscribeRequest {
  email: string;
  sourceReferral?: string;
  nicheInterests?: string[];
}

export interface ClickTrackingRequest {
  token: string;
  sponsorId: string;
  issueNumber: number;
  destinationUrl: string;
}

export interface TelemetrySummary {
  issueNumber: number;
  totalSubscribers: number;
  openCount: number;
  uniqueClicks: number;
  deliveredAt: string;
}
