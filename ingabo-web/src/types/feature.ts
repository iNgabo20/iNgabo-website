export interface PlatformFeature {
  _id: string;
  title: string;
  category: "Phone Theft" | "Telecom Fraud" | "SMS Intelligence" | "Voice Intelligence" | "Police Dashboard" | "Citizen Portal";
  shortDescription: string;
  fullDescription: string;
  icon?: string;
  beneficiaries: string[];
  capabilities: string[];
  isActive: boolean;
}
