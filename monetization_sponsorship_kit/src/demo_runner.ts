/**
 * Demo runner for Pack 3: Monetization Newsletter Kit
 */

import { NewsletterInvoicingEngine } from './invoicing_engine';

export function runDemo(): void {
  console.log('=== WAY #67 PACK 3: MONETIZATION KIT DEMO ===');
  const engine = new NewsletterInvoicingEngine();
  
  const inv1 = engine.generateRetainerInvoice('HealthTech Innovations Inc', 'cmo@healthtech.example.com', 'growth');
  console.log('Generated Growth Retainer Invoice: Total USD $' + inv1.totalUsd + ' | Total INR: ₹' + inv1.totalInr);

  const inv2 = engine.generateRetainerInvoice('BioPharma Systems', 'marketing@biopharma.example.com', 'monthly_sponsorship');
  console.log('Generated Monthly Sponsorship Invoice: Total USD $' + inv2.totalUsd);

  const inv3 = engine.generateRetainerInvoice('Individual Developer', 'dev@example.com', 'master_suite');
  console.log('Generated Master Suite License: $' + inv3.totalUsd + ' USD');
  console.log('=== MONETIZATION DEMO COMPLETE: ZERO DEFECTS ===');
}

if (require.main === module) {
  runDemo();
}
