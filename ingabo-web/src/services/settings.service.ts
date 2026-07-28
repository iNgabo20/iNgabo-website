import apiClient from "../lib/axios";
import { SystemSettings } from "../types/settings";
import { ApiResponse } from "../types/api";

const FALLBACK_SETTINGS: SystemSettings = {
  siteTitle: "iNgabo — National Telecom Fraud Intelligence Platform",
  contactEmail: "info@ingabo.org",
  emergencyPhone: "112",
  ribContactEmail: "cybercrime@rib.gov.rw",
  twitterUrl: "https://twitter.com/ingabo_rw",
  linkedinUrl: "https://linkedin.com/company/ingabo",
  githubUrl: "https://github.com/ingabo-platform",
  facebookUrl: "https://facebook.com/ingabo.rw",
  maintenanceMode: false,
};

export const settingsService = {
  async getSettings(): Promise<SystemSettings> {
    try {
      const response = await apiClient.get<ApiResponse<SystemSettings>>("/settings");
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_SETTINGS;
  }
};
