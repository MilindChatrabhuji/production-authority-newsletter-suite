/**
 * Way #67: Authority Newsletter & Multi-Platform Sponsorship Engine
 * Core TypeScript Type Definitions
 */

export interface IndustryLinkItem {
  id: string;
  title: string;
  url: string;
  sourceDomain: string;
  sourceName: string;
  publishDate: string;
  category: 'clinical_trial' | 'regulatory_fda' | 'medical_informatics' | 'biotech_rd' | 'industry_analysis';
  summaryBullets: string[];
  editorialTake: string;
  keyMetrics?: Record<string, string | number>;
  verifiedEvidenceCitations: string[];
}

export interface NewsletterSponsorPlacement {
  id: string;
  sponsorName: string;
  sponsorSlug: string;
  headline: string;
  bodyText: string;
  ctaText: string;
  targetDestinationUrl: string;
  trackingTrackingToken: string;
  placementSlot: 'header_primary' | 'mid_content_featured' | 'footer_bullet' | 'exclusive_takeover';
  cpmRateUsd: number;
  flatFeeUsd: number;
  statutoryDisclosureText: string; // e.g. "Sponsored by Acme Health: Tested in clinical environments"
}

export interface NewsletterIssueDraft {
  issueNumber: number;
  issueSlug: string;
  title: string;
  subtitle: string;
  publicationDate: string;
  executiveSummary: string;
  curatedItems: IndustryLinkItem[];
  sponsors: NewsletterSponsorPlacement[];
  footerSignoff: string;
  renderedMarkdown: string;
  renderedHtml: string;
}

export interface SponsorRoiAnalytics {
  sponsorId: string;
  issueNumber: number;
  impressionsDelivered: number;
  uniqueClicksRecorded: number;
  clickThroughRatePercent: number;
  effectiveCpcUsd: number;
  effectiveCpmUsd: number;
  sponsorSatisfactionScore: number;
  rebookingRecommendation: 'immediate_upsell' | 'maintain_quarterly' | 'creative_optimization_needed';
}

export interface MediaKitRateCard {
  publicationName: string;
  primaryNiche: string;
  activeSubscriberCount: number;
  averageOpenRatePercent: number;
  averageClickRatePercent: number;
  primaryDemographics: {
    titles: string[];
    geographies: string[];
    decisionMakerPercent: number;
  };
  pricingTiers: {
    tierId: string;
    tierName: string;
    pricePerIssueUsd: number;
    pricePerMonthUsd: number;
    deliverables: string[];
    slotAvailability: string;
  }[];
  generatedAt: string;
}

export interface ChurnRiskSubscriber {
  subscriberEmail: string;
  joinedDate: string;
  lastOpenedDate: string;
  consecutiveUnopenedIssues: number;
  churnRiskTier: 'low' | 'moderate' | 'critical';
  recommendedAction: 'continue' | 'trigger_winback_email' | 'prune_to_protect_deliverability';
}
