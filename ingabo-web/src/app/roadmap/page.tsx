import React from "react";
import { Metadata } from "next";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { CheckCircle, Activity, Cpu, Layers } from "../../components/ui/icons";

export const metadata: Metadata = {
  title: "Platform Roadmap",
  description: "Explore iNgabo's technical roadmap, future feature releases, and national deployment milestones.",
};

export default function RoadmapPage() {
  const phases = [
    {
      phase: "Phase 1 — Core Foundation",
      timeline: "Q1 - Q2 2026 (Completed)",
      status: "Completed",
      title: "Backend Microservices & MongoDB Base Architecture",
      items: [
        "NestJS REST API & Centralized Exception Filter",
        "JWT + Passport RBAC Authentication & Role Management",
        "IMEI Registration & RIB Case Management Schemas",
        "Public Website Monorepo Next.js App Router Setup"
      ]
    },
    {
      phase: "Phase 2 — Telecom & CAMARA Integrations",
      timeline: "Q3 2026 (Active Phase)",
      status: "In Progress",
      title: "GSMA CAMARA Gateway & Telemetry Streaming",
      items: [
        "MTN & Airtel Rwanda CAMARA SIM Swap API integration",
        "Device Location & Equipment Identity Register (EIR) sync",
        "SS7 / DIAMETER anomaly telemetry ingestion pipeline",
        "National Bank of Rwanda (BNR) Mobile Money alert triggers"
      ]
    },
    {
      phase: "Phase 3 — Neo4j Graph AI & XAI Reasoning",
      timeline: "Q4 2026 (Planned)",
      status: "Upcoming",
      title: "Graph Neural Networks & Explainable Fraud Scoring",
      items: [
        "Neo4j GDS PageRank & Louvain fraud ring detection",
        "Kinyarwanda BERT/RoBERTa SMS smishing classifier",
        "SHAP reasoning engine for Human-in-the-Loop auditing",
        "RIB Police Dashboard visual graph workspace"
      ]
    },
    {
      phase: "Phase 4 — National Scale & Multi-Operator Rollout",
      timeline: "Q1 - Q2 2027 (Future)",
      status: "Planned",
      title: "Regional Threat Sharing & PWA Citizen App",
      items: [
        "Cross-border EACO East Africa threat intelligence sharing",
        "Offline-capable Citizen Progressive Web Application (PWA)",
        "Automated court evidence bundle generation",
        "AI-assisted automated RIB cybercrime triage"
      ]
    }
  ];

  return (
    <div>
      <PageHeader
        badge="Strategic Vision"
        title="Platform Technical Roadmap"
        subtitle="Tracking iNgabo's evolution from core software architecture to national telecom gateway deployment and regional intelligence sharing."
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {phases.map((ph, idx) => (
            <Card key={idx} className="relative overflow-hidden border-l-4 border-l-[#0F3D91] p-8 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-[#0F3D91] uppercase tracking-widest block">
                    {ph.timeline}
                  </span>
                  <h3 className="text-2xl font-bold text-[#111827]">
                    {ph.phase}: {ph.title}
                  </h3>
                </div>
                <Badge
                  variant={ph.status === "Completed" ? "accent" : ph.status === "In Progress" ? "warning" : "neutral"}
                  size="md"
                >
                  {ph.status}
                </Badge>
              </div>

              <ul className="space-y-2 pt-4 border-t border-[#E5E7EB] text-sm text-[#475569]">
                {ph.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-[#00A86B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
