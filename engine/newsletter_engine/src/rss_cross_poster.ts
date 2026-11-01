/**
 * Multi-Platform Cross-Posting & Syndication Syndicator
 * Formats newsletters for beehiiv, Substack, LinkedIn Newsletters, and Web RSS
 */

import { NewsletterIssueDraft } from './types';

export class RssCrossPoster {
  public generateRss2Xml(draft: NewsletterIssueDraft, siteUrl: string = 'https://newsletter.example.com'): string {
    const pubDateRfc822 = new Date(draft.publicationDate).toUTCString();
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="https://www.w3.org/2005/Atom">
  <channel>
    <title>${draft.title}</title>
    <link>${siteUrl}</link>
    <description>${draft.subtitle}</description>
    <language>en-us</language>
    <pubDate>${pubDateRfc822}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>${draft.title}</title>
      <link>${siteUrl}/issues/${draft.issueSlug}</link>
      <description><![CDATA[${draft.renderedHtml}]]></description>
      <pubDate>${pubDateRfc822}</pubDate>
      <guid>${siteUrl}/issues/${draft.issueSlug}</guid>
    </item>
  </channel>
</rss>`;
  }

  public prepareSubstackPayload(draft: NewsletterIssueDraft): Record<string, any> {
    return {
      title: draft.title,
      subtitle: draft.subtitle,
      post_date: draft.publicationDate,
      body_markdown: draft.renderedMarkdown,
      send_email: true,
      audience: 'everyone',
      tags: ['clinical-informatics', 'healthtech', 'evidence-based', 'software-engineering']
    };
  }

  public prepareBeehiivPayload(draft: NewsletterIssueDraft): Record<string, any> {
    return {
      title: draft.title,
      content: draft.renderedHtml,
      status: 'confirmed',
      publish_date: draft.publicationDate,
      email_subject: draft.title,
      preview_text: draft.executiveSummary.slice(0, 120),
      is_premium: false
    };
  }
}
