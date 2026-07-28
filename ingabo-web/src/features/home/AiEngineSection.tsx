import React from "react";
import { AI_CAPABILITIES } from "../../lib/constants";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Network, ShieldCheck, Scale } from "../../components/ui/icons";

export const AiEngineSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Artificial Intelligence & Data Science"
          title="Intelligent Fraud Risk Scoring & Graph Analytics"
          description="Combining Graph Neural Networks (Neo4j), multilingual NLP, XGBoost risk classification, and Explainable AI (XAI) to deliver accountable, transparent fraud decisions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {AI_CAPABILITIES.map((ai, idx) => (
            <Card key={idx} className="space-y-4 hover:border-[#0F3D91]">
              <div className="flex items-center justify-between">
                <Badge variant="primary" size="md">
                  {ai.tech}
                </Badge>
                <Network size={22} className="text-[#0F3D91]" />
              </div>
              <h3 className="text-xl font-bold text-[#111827]">
                {ai.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {ai.description}
              </p>
            </Card>
          ))}
        </div>

        {/* XAI & HITL Governance Ribbon */}
        <div className="p-6 rounded-2xl bg-[#0F3D91] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#00A86B] shrink-0 border border-white/20">
              <Scale size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Human-in-the-Loop (HITL) & SHAP Explainability Governance
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-2xl">
                No automatic line disconnection occurs without explainable SHAP reasoning audit logs and RIB law enforcement verification, upholding Rwanda's legal standards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
