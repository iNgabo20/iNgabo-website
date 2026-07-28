import apiClient from "../lib/axios";
import { Partner } from "../types/partner";
import { ApiResponse } from "../types/api";

const FALLBACK_PARTNERS: Partner[] = [
  {
    _id: "part-1",
    name: "Rwanda Investigation Bureau (RIB)",
    type: "Government",
    logoUrl: "/logo.png",
    websiteUrl: "https://rib.gov.rw",
    description: "Primary law enforcement beneficiary enforcing cybercrime investigations, chain-of-custody device recovery, and fraud syndicate prosecution.",
    order: 1
  },
  {
    _id: "part-2",
    name: "Ministry of ICT and Innovation (MINICT)",
    type: "Government",
    logoUrl: "/logo.png",
    websiteUrl: "https://minict.gov.rw",
    description: "Strategic policy sponsor supporting national digital trust infrastructure and cybersecurity modernization across Rwanda.",
    order: 2
  },
  {
    _id: "part-3",
    name: "Rwanda Utilities Regulatory Authority (RURA)",
    type: "Regulator",
    logoUrl: "/logo.png",
    websiteUrl: "https://rura.rw",
    description: "Telecommunications regulatory partner overseeing operator compliance, SIM registration standards, and CAMARA API framework governance.",
    order: 3
  },
  {
    _id: "part-4",
    name: "National Cyber Security Authority (NCSA)",
    type: "Regulator",
    logoUrl: "/logo.png",
    websiteUrl: "https://ncsa.gov.rw",
    description: "National cybersecurity authority ensuring platform adherence to Zero Trust standards, data privacy laws, and threat intelligence sharing.",
    order: 4
  },
  {
    _id: "part-5",
    name: "MTN Rwanda & Airtel Rwanda",
    type: "Telecom",
    logoUrl: "/logo.png",
    websiteUrl: "https://ingabo.org",
    description: "National mobile network operators supplying core network signaling telemetry and integrating CAMARA Open Network APIs.",
    order: 5
  },
  {
    _id: "part-6",
    name: "National Bank of Rwanda (BNR)",
    type: "Financial",
    logoUrl: "/logo.png",
    websiteUrl: "https://bnr.rw",
    description: "Central financial regulator facilitating cross-sector SIM swap fraud prevention for Mobile Money and commercial banks.",
    order: 6
  }
];

export const partnerService = {
  async getPartners(): Promise<Partner[]> {
    try {
      const response = await apiClient.get<ApiResponse<Partner[]>>("/partners");
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_PARTNERS;
  }
};
