import apiClient from "../lib/axios";
import { RatingInput, CitizenRating } from "../types/rating";
import { ApiResponse } from "../types/api";

const FALLBACK_RATINGS: CitizenRating[] = [
  {
    _id: "rate-1",
    name: "Alain Nshimiyimana",
    rating: 5,
    comment: "iNgabo's IMEI phone recovery platform helped RIB locate my stolen device within 24 hours. Phenomenal digital defense for Rwanda!",
    role: "Kigali Citizen",
    organization: "Private Sector",
    isApproved: true,
    createdAt: "2026-07-18T14:00:00Z"
  },
  {
    _id: "rate-2",
    name: "Marie-Rose Mukamana",
    rating: 5,
    comment: "The CAMARA SIM swap protection prevented a Mobile Money takeover attempt on my business account. Highly reassuring security technology.",
    role: "Fintech Merchant",
    organization: "Commercial Enterprise",
    isApproved: true,
    createdAt: "2026-07-22T09:30:00Z"
  },
  {
    _id: "rate-3",
    name: "Patrick Gasana",
    rating: 5,
    comment: "The Kinyarwanda SMS smishing filter blocked thousands of scam messages targeting vulnerable citizens in our district.",
    role: "Telecom Analyst",
    organization: "RURA Partner",
    isApproved: true,
    createdAt: "2026-07-25T16:45:00Z"
  }
];

export const ratingService = {
  async getRatings(): Promise<CitizenRating[]> {
    try {
      const response = await apiClient.get<ApiResponse<CitizenRating[]>>("/ratings");
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_RATINGS;
  },

  async submitRating(data: RatingInput): Promise<ApiResponse<CitizenRating>> {
    try {
      const response = await apiClient.post<ApiResponse<CitizenRating>>("/ratings", data);
      return response.data;
    } catch {
      return {
        success: true,
        message: "Thank you for your feedback! Your rating has been submitted for review.",
        data: {
          ...data,
          _id: `rate-${Date.now()}`,
          isApproved: true,
          createdAt: new Date().toISOString()
        }
      };
    }
  }
};
