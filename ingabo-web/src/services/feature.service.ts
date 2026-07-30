import apiClient from "../lib/axios";
import { PlatformFeature } from "../types/feature";
import { ApiResponse } from "../types/api";
export const featureService = { async getFeatures(): Promise<PlatformFeature[]> { const response = await apiClient.get<ApiResponse<PlatformFeature[]>>("/features"); return response.data.data; } };
