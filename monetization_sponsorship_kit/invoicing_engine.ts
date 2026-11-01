/**
 * Automated Dual-Currency Newsletter Retainer Invoicing Engine
 * Generates compliant B2B invoices in USD and INR for newsletter production and sponsorships
 */

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPriceUsd: number;
}

export interface InvoiceRecord {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  currency: 'USD' | 'INR';
  exchangeRate: number; // e.g. 84.0 INR/USD
  items: InvoiceItem[];
  subtotalUsd: number;
  totalUsd: number;
  totalInr: number;
  issueDate: string;
  dueDate: string;
  paymentDetails: {
    domesticUpi: string;
    internationalPaypal: string;
  };
  notes: string;
}

export class NewsletterInvoicingEngine {
  private readonly UPI_ID = 'milind.chatrabhuji@okhdfcbank';
  private readonly PAYPAL_EMAIL = 'milind.chatrabhuji@gmail.com';
  private readonly EXCHANGE_RATE = 84.0;

  public generateRetainerInvoice(
    clientName: string,
    clientEmail: string,
    retainerTier: 'starter' | 'growth' | 'enterprise_network' | 'single_sponsorship' | 'monthly_sponsorship' | 'single_pack' | 'master_suite',
    customInvoiceNum?: string
  ): InvoiceRecord {
    const invNum = customInvoiceNum || `INV-NEWS-${Date.now().toString().slice(-6)}`;
    const today = new Date().toISOString().split('T')[0];
    const due = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];

    let items: InvoiceItem[] = [];

    switch (retainerTier) {
      case 'starter':
        items.push({ description: 'Newsletter Starter Retainer (2 issues/mo curation + delivery)', quantity: 1, unitPriceUsd: 500.0 });
        break;
      case 'growth':
        items.push({ description: 'Newsletter Growth Authority Retainer (Weekly 4-issue delivery + telemetry)', quantity: 1, unitPriceUsd: 1500.0 });
        break;
      case 'enterprise_network':
        items.push({ description: 'Turnkey Enterprise Newsletter Network Retainer (Full editorial + sponsor ops)', quantity: 1, unitPriceUsd: 3000.0 });
        break;
      case 'single_sponsorship':
        items.push({ description: 'Featured Dedicated Issue Sponsor Placement (1 Issue)', quantity: 1, unitPriceUsd: 300.0 });
        break;
      case 'monthly_sponsorship':
        items.push({ description: 'Monthly Growth Partner Sponsorship (4 Consecutive Issues)', quantity: 1, unitPriceUsd: 1000.0 });
        break;
      case 'single_pack':
        items.push({ description: 'Production Authority Newsletter Engine (Single Commercial Pack)', quantity: 1, unitPriceUsd: 9.0 });
        break;
      case 'master_suite':
      default:
        items.push({ description: 'Production Authority Newsletter & Sponsorship Master Suite (All 3 Packs + Showcase)', quantity: 1, unitPriceUsd: 19.0 });
        break;
    }

    const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unitPriceUsd), 0);
    const totalInr = Math.round(subtotal * this.EXCHANGE_RATE);

    return {
      invoiceNumber: invNum,
      clientName,
      clientEmail,
      currency: 'USD',
      exchangeRate: this.EXCHANGE_RATE,
      items,
      subtotalUsd: subtotal,
      totalUsd: subtotal,
      totalInr,
      issueDate: today,
      dueDate: due,
      paymentDetails: {
        domesticUpi: this.UPI_ID,
        internationalPaypal: this.PAYPAL_EMAIL
      },
      notes: 'Thank you for partnering with IncomeEngine Publishing Network. Strictly evidence-based clinical informatics and modern engineering standards guaranteed.'
    };
  }

  public renderInvoiceMarkdown(invoice: InvoiceRecord): string {
    return `# COMMERCIAL INVOICE: ${invoice.invoiceNumber}
**Date:** ${invoice.issueDate} | **Due Date:** ${invoice.dueDate}
**Billed To:** ${invoice.clientName} (${invoice.clientEmail})
**Issued By:** Dr. Milind Chatrabhuji (IncomeEngine Publishing Network, India)

---

### Itemized Service Breakdown
${invoice.items.map(it => `- **${it.description}**: $${it.unitPriceUsd.toFixed(2)} USD`).join('\n')}

---

### Total Due
- **Total in USD:** $${invoice.totalUsd.toFixed(2)} USD
- **Total in INR (approx @ ₹${invoice.exchangeRate}/USD):** ₹${invoice.totalInr.toLocaleString('en-IN')} INR

### Official Settlement Channels
1. **Domestic UPI (India):** \`${invoice.paymentDetails.domesticUpi}\`
2. **International PayPal:** \`${invoice.paymentDetails.internationalPaypal}\` (https://paypal.me/milindchatrabhuji/${invoice.totalUsd}usd)

*Zero out-of-pocket setup expenditure. Powered by Cloudflare Workers edge isolates.*
`;
  }
}
