/**
 * Sponsorship Deck & Media Kit Synthesizer
 * Formulates dynamic subscriber demographics, audience metrics, and rate cards
 */

import { MediaKitRateCard } from './types';

export class SponsorshipDeckSynthesizer {
  public generateMediaKit(
    activeSubscribers: number = 18500,
    averageOpenRate: number = 44.8,
    averageClickRate: number = 3.6
  ): MediaKitRateCard {
    const cpmBenchmark = 45.0; // $45 CPM for specialized technical & healthcare audience
    const starterPrice = Math.round((activeSubscribers * (averageOpenRate / 100) / 1000) * cpmBenchmark);

    return {
      publicationName: 'Evidence-Based Clinical Informatics & Engineering Review',
      primaryNiche: 'Healthcare Software Engineers, Clinical Informaticians, and Health-Tech Founders',
      activeSubscriberCount: activeSubscribers,
      averageOpenRatePercent: averageOpenRate,
      averageClickRatePercent: averageClickRate,
      primaryDemographics: {
        titles: ['Chief Medical Officer', 'Lead Health Informatics Engineer', 'VP of Product', 'Clinical Research Director', 'Biotech Founder'],
        geographies: ['United States (62%)', 'European Union (21%)', 'India & APAC (12%)', 'Other (5%)'],
        decisionMakerPercent: 78
      },
      pricingTiers: [
        {
          tierId: 'tier-starter',
          tierName: 'Starter Placement (1 Dedicated Slot)',
          pricePerIssueUsd: 300,
          pricePerMonthUsd: 1000,
          deliverables: [
            '1x Secondary Featured Placement (100 words + CTA button)',
            'Audience reach: 18,500+ subscribers',
            'Full post-campaign click & open telemetry report',
            'Permanent backlink in public web archive'
          ],
          slotAvailability: '2 slots per issue'
        },
        {
          tierId: 'tier-growth',
          tierName: 'Growth Partner (Monthly 4-Issue Package)',
          pricePerIssueUsd: 250,
          pricePerMonthUsd: 1000,
          deliverables: [
            '4x Consecutive Primary Placements (Header prominence)',
            'Co-branded editorial shoutout in executive summary',
            'Dedicated UTM click redirect with sub-10ms edge routing',
            'Sponsor media kit showcase feature'
          ],
          slotAvailability: '1 exclusive brand per month'
        },
        {
          tierId: 'tier-network-exclusive',
          tierName: 'Network Exclusive Sponsorship',
          pricePerIssueUsd: 750,
          pricePerMonthUsd: 2500,
          deliverables: [
            'Sole exclusive sponsor for the entire monthly run (zero competitor ads)',
            'Header takeover + Mid-content deep-dive case study (250 words)',
            'Social and LinkedIn newsletter syndication integration',
            'Custom subscriber segment lead qualification questionnaire'
          ],
          slotAvailability: 'Quarterly booking only'
        }
      ],
      generatedAt: new Date().toISOString()
    };
  }

  public renderMediaKitMarkdown(deck: MediaKitRateCard): string {
    let md = `# SPONSORSHIP MEDIA KIT & RATE CARD\n`;
    md += `**Publication:** ${deck.publicationName}\n`;
    md += `**Target Audience:** ${deck.primaryNiche}\n\n`;
    md += `### Audience Highlights\n`;
    md += `- **Active Subscribers:** ${deck.activeSubscriberCount.toLocaleString()} verified subscribers\n`;
    md += `- **Average Open Rate:** ${deck.averageOpenRatePercent}% (Industry Avg: 21.5%)\n`;
    md += `- **Average Click-to-Open Rate:** ${deck.averageClickRatePercent}%\n`;
    md += `- **Decision Makers:** ${deck.primaryDemographics.decisionMakerPercent}% executive/budget authority\n\n`;
    md += `### Available Sponsorship Tiers\n\n`;

    deck.pricingTiers.forEach(t => {
      md += `#### ${t.tierName}\n`;
      md += `- **Rate:** $${t.pricePerIssueUsd} USD / issue ($${t.pricePerMonthUsd} USD / mo)\n`;
      md += `- **Availability:** ${t.slotAvailability}\n`;
      md += `- **Deliverables:**\n`;
      t.deliverables.forEach(d => md += `  * ${d}\n`);
      md += `\n`;
    });

    return md;
  }
}
