/**
 * Newsletter Curation & Multi-Source Synthesis Engine
 * Synthesizes verified clinical & software industry items into publication-ready Markdown & HTML
 */

import { IndustryLinkItem, NewsletterSponsorPlacement, NewsletterIssueDraft } from './types';

export class NewsletterCurationSynthesizer {
  private curatedItems: IndustryLinkItem[] = [];
  private sponsors: NewsletterSponsorPlacement[] = [];

  constructor(
    private readonly publicationTitle: string = 'Evidence-Based Clinical Informatics Weekly',
    private readonly publicationSlug: string = 'clinical-informatics-weekly'
  ) {}

  public addCuratedItem(item: IndustryLinkItem): void {
    // Quality & Evidence Verification Gate
    if (!item.verifiedEvidenceCitations || item.verifiedEvidenceCitations.length === 0) {
      throw new Error(`Item ${item.title} lacks verified scientific or engineering evidence citations.`);
    }
    this.curatedItems.push(item);
  }

  public addSponsor(sponsor: NewsletterSponsorPlacement): void {
    if (!sponsor.statutoryDisclosureText) {
      sponsor.statutoryDisclosureText = `Sponsored by ${sponsor.sponsorName}: FTC statutory disclosure`;
    }
    this.sponsors.push(sponsor);
  }

  public synthesizeIssue(
    issueNumber: number,
    executiveSummary: string,
    pubDate: string = new Date().toISOString().split('T')[0]
  ): NewsletterIssueDraft {
    const title = `${this.publicationTitle} #${issueNumber}`;
    const subtitle = `Weekly Evidence Digest: FDA Updates, Clinical Informatics & Healthcare Technology`;

    // Render Markdown
    let md = `# ${title}\n\n**${subtitle}**\n*Published on ${pubDate}*\n\n---\n\n`;
    md += `## Executive Editorial Summary\n\n${executiveSummary}\n\n`;

    // Header Sponsor
    const headerSponsor = this.sponsors.find(s => s.placementSlot === 'header_primary');
    if (headerSponsor) {
      md += `> **[PARTNER DISCLOSURE: ${headerSponsor.statutoryDisclosureText.toUpperCase()}]**\n`;
      md += `> ### ${headerSponsor.headline}\n`;
      md += `> ${headerSponsor.bodyText}\n`;
      md += `> [**${headerSponsor.ctaText} &rarr;**](${headerSponsor.targetDestinationUrl}?ref=${headerSponsor.trackingTrackingToken})\n\n---\n\n`;
    }

    md += `## High-Yield Clinical Informatics & Regulatory Developments\n\n`;
    this.curatedItems.forEach((item, idx) => {
      md += `### ${idx + 1}. [${item.title}](${item.url})\n`;
      md += `*Source: ${item.sourceName} (${item.sourceDomain}) | Category: ${item.category}*\n\n`;
      item.summaryBullets.forEach(b => {
        md += `- ${b}\n`;
      });
      md += `\n**Clinical Take:** ${item.editorialTake}\n\n`;
      md += `*Evidence:* ${item.verifiedEvidenceCitations.join('; ')}\n\n`;
    });

    // Mid-content Sponsor
    const midSponsor = this.sponsors.find(s => s.placementSlot === 'mid_content_featured');
    if (midSponsor) {
      md += `---\n\n> **[FEATURED SPONSOR]**\n`;
      md += `> **${midSponsor.headline}**\n`;
      md += `> ${midSponsor.bodyText}\n`;
      md += `> [**${midSponsor.ctaText} &rarr;**](${midSponsor.targetDestinationUrl}?ref=${midSponsor.trackingTrackingToken})\n`;
      md += `> *${midSponsor.statutoryDisclosureText}*\n\n---\n\n`;
    }

    md += `## Editorial Sign-Off & Methodology\n\n`;
    md += `This publication strictly curates peer-reviewed clinical research, FDA regulatory announcements, and production software standards. All sponsor placements undergo editorial scrutiny.\n\n`;
    md += `&copy; ${new Date().getFullYear()} ${this.publicationTitle}. All rights reserved.\n`;

    // Render HTML
    const html = this.renderHtmlFromMarkdown(title, md, this.sponsors);

    return {
      issueNumber,
      issueSlug: `${this.publicationSlug}-issue-${issueNumber}`,
      title,
      subtitle,
      publicationDate: pubDate,
      executiveSummary,
      curatedItems: [...this.curatedItems],
      sponsors: [...this.sponsors],
      footerSignoff: `&copy; ${new Date().getFullYear()} ${this.publicationTitle}`,
      renderedMarkdown: md,
      renderedHtml: html
    };
  }

  private renderHtmlFromMarkdown(title: string, md: string, sponsors: NewsletterSponsorPlacement[]): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px; }
    .container { max-width: 680px; margin: 0 auto; background: #ffffff; padding: 36px; border-radius: 12px; border: 1px solid #e2e8f0; }
    h1 { font-size: 26px; color: #0f172a; margin-top: 0; }
    h2 { font-size: 20px; color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 28px; }
    .sponsor-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .sponsor-badge { display: inline-block; font-size: 11px; font-weight: 700; color: #15803d; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px; }
    .cta-button { display: inline-block; background: #059669; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 700; margin-top: 12px; }
    .item-card { margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px dashed #e2e8f0; }
    .source-meta { font-size: 12px; color: #64748b; margin-bottom: 8px; }
    .footer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 36px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <div class="content">${md.replace(/\n/g, '<br/>')}</div>
  </div>
</body>
</html>`;
  }
}
