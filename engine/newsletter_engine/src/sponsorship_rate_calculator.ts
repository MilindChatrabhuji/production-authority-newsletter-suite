/**
 * Multi-Tier Sponsorship Rate & ROI Calculator (CPM/CPC/Flat)
 * Models publisher earnings across subscriber milestones and sponsorship tiers
 */

export interface RateCalculation {
  subscribers: number;
  openRatePercent: number;
  cpmRateUsd: number;
  pricePerIssueUsd: number;
  monthlyRevenueEstUsd: number;
  annualRunRateUsd: number;
  recommendedTiers: {
    starterTierUsd: number;
    growthTierUsd: number;
    networkExclusiveTierUsd: number;
  };
}

export class SponsorshipRateCalculator {
  public calculateRates(subscribers: number, openRate: number = 42.5, cpmRate: number = 45.0): RateCalculation {
    const activeReadersPerIssue = subscribers * (openRate / 100);
    const standardIssuePrice = Math.max(300, Math.round((activeReadersPerIssue / 1000) * cpmRate));
    const monthlyRev = standardIssuePrice * 4;

    return {
      subscribers,
      openRatePercent: openRate,
      cpmRateUsd: cpmRate,
      pricePerIssueUsd: standardIssuePrice,
      monthlyRevenueEstUsd: monthlyRev,
      annualRunRateUsd: monthlyRev * 12,
      recommendedTiers: {
        starterTierUsd: 500,        // Monthly retainer tier 1
        growthTierUsd: 1500,       // Monthly retainer tier 2
        networkExclusiveTierUsd: 3000 // Monthly retainer tier 3
      }
    };
  }
}
