import apiClient from "../lib/axios";
import { RatingInput, CitizenRating } from "../types/rating";
import { ApiResponse } from "../types/api";
export const ratingService = { async submitRating(data: RatingInput): Promise<ApiResponse<CitizenRating>> { const response = await apiClient.post<ApiResponse<CitizenRating>>("/ratings", { name: data.name, rating: data.rating, comment: data.comment }); return response.data; } };
