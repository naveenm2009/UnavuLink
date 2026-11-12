import { FoodListing, Organization, UserProfile } from '../types';

export interface FairShareMatchResult {
  recipientId: string;
  recipientName: string;
  organizationType: string;
  distanceKm: number;
  dietaryScore: number;       // 0 - 100
  timeScore: number;          // 0 - 100
  capacityScore: number;      // 0 - 100
  readinessScore: number;     // 0 - 100
  volunteerScore: number;     // 0 - 100
  fairShareTotalScore: number; // 0 - 100
  rank: number;
  explanation: string;
}

// Calculate straight-line approximate distance in km (Haversine formula)
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

/**
 * FAIRSHARE PRIORITY ENGINE
 * Computes multi-factor objective matching score:
 * S = 0.30D + 0.25T + 0.20C + 0.15R + 0.10V
 * 
 * Safety Gate is applied strictly first. If a listing fails safety check, matching is blocked.
 */
export function computeFairShareMatches(
  listing: FoodListing,
  potentialRecipients: Array<{
    id: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    capacityKg: number;
    acceptsNonVeg: boolean;
    hasRefrigeration: boolean;
  }>
): FairShareMatchResult[] {
  // If safety gate is NOT eligible, return empty matches
  if (listing.safety_status !== 'eligible') {
    return [];
  }

  const matches: FairShareMatchResult[] = potentialRecipients.map((rec) => {
    // 1. Dietary Compatibility Score (D)
    let dietaryScore = 100;
    if (listing.dietary_category === 'non_veg' && !rec.acceptsNonVeg) {
      dietaryScore = 0; // Strict dietary mismatch
    }

    // 2. Distance and Time Feasibility Score (T)
    const distanceKm = calculateDistanceKm(
      listing.latitude,
      listing.longitude,
      rec.latitude,
      rec.longitude
    );
    // Score decays as distance exceeds 15km
    const timeScore = Math.max(10, Math.min(100, Math.round(100 - distanceKm * 4.5)));

    // 3. Receiving Capacity Score (C)
    // Measures if recipient has enough capacity to absorb the batch without overflow
    let capacityScore = 80;
    if (rec.capacityKg >= listing.quantity) {
      capacityScore = 100;
    } else {
      capacityScore = Math.max(20, Math.round((rec.capacityKg / listing.quantity) * 100));
    }

    // 4. Storage Readiness Score (R)
    let readinessScore = 90;
    if (
      (listing.storage_condition === 'refrigerated' || listing.storage_condition === 'frozen') &&
      !rec.hasRefrigeration
    ) {
      readinessScore = 20; // Critical warning: lacking cold storage
    }

    // 5. Volunteer Availability Score (V)
    // Urban centers like Coimbatore, Salem, Erode have high volunteer density
    const volunteerScore = distanceKm < 10 ? 95 : 75;

    // Composite Formula: S = 0.30D + 0.25T + 0.20C + 0.15R + 0.10V
    const fairShareTotalScore = Number(
      (
        0.3 * dietaryScore +
        0.25 * timeScore +
        0.2 * capacityScore +
        0.15 * readinessScore +
        0.1 * volunteerScore
      ).toFixed(1)
    );

    let explanation = `Optimal match within ${distanceKm}km. Full capacity match.`;
    if (dietaryScore === 0) {
      explanation = `Dietary incompatibility (cannot accept non-vegetarian meal).`;
    } else if (readinessScore < 50) {
      explanation = `Requires cold-storage facilities which recipient lacks.`;
    } else if (distanceKm > 20) {
      explanation = `Long transit route (${distanceKm}km). May require specialized vehicle.`;
    }

    return {
      recipientId: rec.id,
      recipientName: rec.name,
      organizationType: rec.type,
      distanceKm,
      dietaryScore,
      timeScore,
      capacityScore,
      readinessScore,
      volunteerScore,
      fairShareTotalScore,
      rank: 1,
      explanation,
    };
  });

  // Filter out complete mismatches (dietary score = 0) and sort descending by score
  const sorted = matches
    .filter((m) => m.dietaryScore > 0)
    .sort((a, b) => b.fairShareTotalScore - a.fairShareTotalScore)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  return sorted;
}
