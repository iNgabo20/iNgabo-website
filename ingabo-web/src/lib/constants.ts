export const SITE_CONFIG = {
  name: "iNgabo",
  fullName: "iNgabo - National Telecom Fraud Intelligence Platform",
  tagline: "Digital Shield of Rwanda",
  description: "National digital infrastructure platform built to detect, prevent, analyze, and recover telecommunications fraud through advanced AI, CAMARA open APIs, and real-time intelligence.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ingabo.org",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  emergencyContact: "RIB Cybercrime Division: 112 | cybercrime@rib.gov.rw",
  rwandaGovPartners: [
    "Rwanda Investigation Bureau (RIB)",
    "Ministry of ICT and Innovation (MINICT)",
    "Rwanda Utilities Regulatory Authority (RURA)",
    "National Cyber Security Authority (NCSA)",
    "National Bank of Rwanda (BNR)",
    "Rwanda Coding Academy (RCA)"
  ]
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/features" },
  { label: "Solutions", href: "/#domains" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Research", href: "/research" },
  { label: "Blog & News", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Partners", href: "/partners" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const PLATFORM_STATS = [
  { id: "stats-1", label: "Real-time Telemetry Anomalies Checked", value: "50M+", change: "+14% monthly", icon: "Activity" },
  { id: "stats-2", label: "Device Recovery Success Rate", value: "89.4%", change: "RIB Verified", icon: "ShieldCheck" },
  { id: "stats-3", label: "SIM Swap & Smishing Threats Mitigated", value: "120,000+", change: "Zero Trust Defense", icon: "AlertTriangle" },
  { id: "stats-4", label: "CAMARA Telecom Network Integrations", value: "6 Core APIs", change: "MTN & Airtel Rwanda", icon: "Cpu" }
];

export const OPERATIONAL_DOMAINS = [
  {
    id: "phone-theft",
    title: "Phone Theft & Device Recovery",
    subtitle: "IMEI Tracking & Network-Assisted Recovery",
    description: "Real-time IMEI tracking across mobile network operators, SIM swap alert trigger upon device theft, chain-of-custody tracking for RIB law enforcement, and instant device registration for citizens.",
    icon: "Smartphone",
    beneficiary: "RIB, Rwanda National Police, Citizens",
    color: "#0F3D91"
  },
  {
    id: "telecom-fraud",
    title: "Telecom Fraud Detection",
    subtitle: "SS7/DIAMETER Anomaly & SIM Cloning Defense",
    description: "Deep packet telemetry inspection detecting SS7/DIAMETER protocol exploits, unauthorized SIM cloning, caller ID spoofing, bypass fraud (Wangiri), and account takeover vectors.",
    icon: "Radio",
    beneficiary: "RURA, MNOs, Financial Institutions",
    color: "#102A43"
  },
  {
    id: "sms-intelligence",
    title: "SMS Threat Intelligence",
    subtitle: "NLP-Powered Smishing & URL Threat Analysis",
    description: "Natural Language Processing (NLP) content classification targeting Kinyarwanda, English, and French bulk SMS spam, phishing URL extraction, and bank account scam propagation prevention.",
    icon: "MessageSquare",
    beneficiary: "Citizens, MNOs, BNR",
    color: "#00A86B"
  },
  {
    id: "voice-intelligence",
    title: "Voice Call Intelligence",
    subtitle: "Vishing Analytics & Reputation Scoring",
    description: "Metadata pattern detection for automated robocalls, social engineering vishing campaigns, caller identity verification, and caller reputation scoring.",
    icon: "PhoneCall",
    beneficiary: "Citizens, RIB, RNP",
    color: "#2D9CDB"
  },
  {
    id: "police-dashboard",
    title: "Police & Investigation Dashboards",
    subtitle: "Graph Fraud Network & Case Management",
    description: "Unified investigative workspace for cybercrime analysts with Neo4j visual graph network analysis, suspect correlation, location intelligence, and automated court evidence compilation.",
    icon: "ShieldAlert",
    beneficiary: "RIB Cybercrime Unit, Prosecutor General",
    color: "#0F3D91"
  },
  {
    id: "citizen-platform",
    title: "Citizen Security Portal",
    subtitle: "Instant Verification & Incident Reporting",
    description: "Public self-service portal allowing citizens to verify suspect phone numbers, perform IMEI stolen-phone status checks, report fraud attempts, and track recovery cases securely.",
    icon: "UserCheck",
    beneficiary: "All Rwandan Citizens & Public",
    color: "#00A86B"
  }
];

export const CAMARA_APIS = [
  {
    name: "SIM Swap Detection",
    code: "camara-sim-swap",
    description: "Verifies whether a subscriber's SIM card was swapped recently before authorizing sensitive financial or identity operations.",
    impact: "Prevents Mobile Money takeover & unauthorized SMS OTP interception."
  },
  {
    name: "Device Location Verification",
    code: "camara-location-verify",
    description: "Queries network cell-tower and location telemetry to confirm physical presence of a mobile device in fraud investigation scenarios.",
    impact: "Assists RIB law enforcement in stolen phone location recovery."
  },
  {
    name: "Number Verification",
    code: "camara-number-verify",
    description: "Seamless, cryptographic verification of phone numbers straight from network infrastructure without relying on vulnerable SMS OTPs.",
    impact: "Eliminates SMS intercept vector for citizen authentication."
  },
  {
    name: "Device Status & IMEI Match",
    code: "camara-device-status",
    description: "Validates current IMEI status (blacklisted/stolen) directly with MNO EIR (Equipment Identity Register) databases.",
    impact: "Blocks stolen devices from connecting to any Rwandan cellular network."
  },
  {
    name: "KYC Match",
    code: "camara-kyc-match",
    description: "Cross-checks national identity credentials against subscriber details registered at telecom operators.",
    impact: "Stops fraudulent SIM registration with stolen NIDA identities."
  }
];

export const AI_CAPABILITIES = [
  {
    title: "Fraud Risk Scoring Engine",
    description: "Multi-layered machine learning risk scoring pipeline synthesizing network telemetry, device behavior, and historical fraud signals in under 50ms.",
    tech: "Supervised XGBoost + Isolation Forests"
  },
  {
    title: "Neo4j Graph Intelligence",
    description: "Graph neural network mapping connections between stolen devices, suspect SIM cards, mule bank accounts, and organized fraud syndicates.",
    tech: "Neo4j Graph DB + PageRank / Community Detection"
  },
  {
    title: "Multilingual NLP Smishing Classifier",
    description: "Custom transformer model fine-tuned on Kinyarwanda, English, and French scam templates to catch evolving phishing language patterns.",
    tech: "Transformer NLP Models (BERT/RoBERTa)"
  },
  {
    title: "Explainable AI (XAI) & Human-in-the-Loop",
    description: "Every AI fraud decision produces human-readable SHAP reasoning summaries, ensuring legal accountability and RIB investigator review before blocking.",
    tech: "SHAP Explainability Framework + HITL Audit Logs"
  }
];

export const COMPLIANCE_STANDARDS = [
  { name: "IEEE 29148", desc: "Systems and software engineering requirements standards" },
  { name: "ISO/IEC 25010", desc: "Software Product Quality Specification & Evaluation" },
  { name: "NIST SP 800-207", desc: "Zero Trust Architecture Standards" },
  { name: "3GPP TS 33.250", desc: "Security architecture for 3GPP cellular networks" },
  { name: "Law N° 058/2021", desc: "Rwanda Personal Data Protection and Privacy Law" }
];
