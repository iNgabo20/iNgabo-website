import apiClient from "../lib/axios";
import { Partner } from "../types/partner";
import { ApiResponse } from "../types/api";
export const partnerService = { async getPartners(): Promise<Partner[]> { const response = await apiClient.get<ApiResponse<Partner[]>>("/partners"); return response.data.data; } };
