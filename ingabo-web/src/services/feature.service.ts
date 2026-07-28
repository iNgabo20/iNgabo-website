import apiClient from "../lib/axios";
import { PlatformFeature } from "../types/feature";
import { ApiResponse } from "../types/api";

const FALLBACK_FEATURES: PlatformFeature[] = [
  {
    _id: "feat-1",
    title: "IMEI Stolen Phone Tracking & Network Lockout",
    category: "Phone Theft",
    shortDescription: "Tracks reported stolen devices across all national mobile networks and enforces instant network disconnection.",
    fullDescription: "Integrates with Equipment Identity Register (EIR) databases across MTN Rwanda and Airtel Rwanda to track IMEI status in real time. Automatically logs SIM card insertions into stolen devices and generates RIB legal custody reports.",
    icon: "Smartphone",
    beneficiaries: ["RIB", "Rwanda National Police", "Rwandan Citizens"],
    capabilities: [
      "Real-time IMEI Blacklisting across all MNOs",
      "SIM swap alert upon unauthorized device insertion",
      "Network cell-tower location triangulation",
      "Digital Chain-of-Custody for court proceedings"
    ],
    isActive: true
  },
  {
    _id: "feat-2",
    title: "SS7 & DIAMETER Protocol Telemetry Anomaly Engine",
    category: "Telecom Fraud",
    shortDescription: "Monitors cellular signaling channels to intercept SS7/DIAMETER bypass fraud, number spoofing, and location tracking exploits.",
    fullDescription: "Inspects core telecom network signaling traffic (SS7, DIAMETER, GTP) for abnormal pattern spikes, unauthorized MAP_SEND_ROUTING_INFO requests, and international bypass fraud (Wangiri).",
    icon: "Radio",
    beneficiaries: ["RURA", "MNO Security Operations", "Financial Institutions"],
    capabilities: [
      "Real-time SS7 Map request anomaly detection",
      "CLI (Caller Line Identity) spoofing prevention",
      "International Robocall & Wangiri bypass block",
      "Automated RURA regulatory compliance telemetry"
    ],
    isActive: true
  },
  {
    _id: "feat-3",
    title: "Multilingual Kinyarwanda/English/French NLP Smishing Interceptor",
    category: "SMS Intelligence",
    shortDescription: "Uses custom NLP transformers to detect smishing, phishing URLs, and fraudulent Mobile Money SMS campaigns.",
    fullDescription: "Analyzes bulk SMS traffic in real time using fine-tuned transformer models capable of detecting localized scam patterns in Kinyarwanda, English, and French, protecting subscribers from financial fraud.",
    icon: "MessageSquare",
    beneficiaries: ["Citizens", "MNOs", "Central Bank of Rwanda (BNR)"],
    capabilities: [
      "Agglutinative Kinyarwanda text classification",
      "URL threat extraction & sandbox detonation",
      "Bulk SMS campaign cluster detection",
      "Real-time SMS gateway drop rules"
    ],
    isActive: true
  },
  {
    _id: "feat-4",
    title: "Neo4j Graph Network Fraud Analytics",
    category: "Police Dashboard",
    shortDescription: "Visualizes complex web of relationships between burner SIMs, stolen devices, and money mule accounts.",
    fullDescription: "Empowers law enforcement analysts at RIB with visual graph intelligence. Applies PageRank and Louvain community detection to pinpoint fraud network hubs and automated evidence generation.",
    icon: "ShieldAlert",
    beneficiaries: ["RIB Cybercrime Division", "Prosecutor General's Office"],
    capabilities: [
      "Neo4j visual node & relationship mapping",
      "Fraud syndicate community detection",
      "Mule account cluster identification",
      "One-click legal case package export"
    ],
    isActive: true
  }
];

export const featureService = {
  async getFeatures(): Promise<PlatformFeature[]> {
    try {
      const response = await apiClient.get<ApiResponse<PlatformFeature[]>>("/features");
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_FEATURES;
  }
};
