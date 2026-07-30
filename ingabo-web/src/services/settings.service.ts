import apiClient from "../lib/axios";
import { SystemSettings } from "../types/settings";
import { ApiResponse } from "../types/api";

export const settingsService = {
  async getSettings(): Promise<SystemSettings | null> {
    const response = await apiClient.get<ApiResponse<SystemSettings | null>>("/settings");
    return response.data.data;
  },
};
