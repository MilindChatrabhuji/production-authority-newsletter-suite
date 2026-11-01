/**
 * Sponsorship Slot Booking & Telemetry Impression/Click Tracker
 * Manages calendar inventory, reserved placement slots, and verified impression auditing
 */

export interface SponsorshipBooking {
  bookingId: string;
  sponsorName: string;
  issueNumber: number;
  placementSlot: 'header_primary' | 'mid_content_featured' | 'footer_bullet' | 'exclusive_takeover';
  status: 'reserved' | 'copy_approved' | 'published' | 'audited';
  feeUsd: number;
  guaranteedImpressions: number;
  actualDeliveredImpressions?: number;
  actualUniqueClicks?: number;
}

export class SponsorshipBookingTracker {
  private bookings: Map<string, SponsorshipBooking> = new Map();

  public createBooking(booking: SponsorshipBooking): SponsorshipBooking {
    this.bookings.set(booking.bookingId, booking);
    return booking;
  }

  public recordDeliveryTelemetry(bookingId: string, impressions: number, clicks: number): SponsorshipBooking {
    const b = this.bookings.get(bookingId);
    if (!b) throw new Error(`Booking ${bookingId} not found.`);
    b.actualDeliveredImpressions = impressions;
    b.actualUniqueClicks = clicks;
    b.status = 'audited';
    return b;
  }

  public getAvailableInventory(issueNumber: number): string[] {
    const bookedSlots = Array.from(this.bookings.values())
      .filter(b => b.issueNumber === issueNumber)
      .map(b => b.placementSlot);
    
    const allSlots = ['header_primary', 'mid_content_featured', 'footer_bullet'];
    return allSlots.filter(s => !bookedSlots.includes(s as any));
  }
}
