/**
 * Editorial Digest Curator & Newsletter Issue Synthesizer
 * Formulates evidence-based clinical medicine & software engineering digests
 */

import { IndustryLinkItem, NewsletterIssueDraft } from './types';
import { NewsletterCurationSynthesizer } from './newsletter_curation_synthesizer';

export class NewsletterEditorialCurator {
  private synthesizer: NewsletterCurationSynthesizer;

  constructor(title: string = 'Authority Clinical & Tech Digest') {
    this.synthesizer = new NewsletterCurationSynthesizer(title, 'authority-digest');
  }

  public curateDigest(items: IndustryLinkItem[], issueNum: number, summary: string): NewsletterIssueDraft {
    items.forEach(item => this.synthesizer.addCuratedItem(item));
    return this.synthesizer.synthesizeIssue(issueNum, summary);
  }
}
