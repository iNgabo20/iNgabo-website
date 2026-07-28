import React from "react";
import { Metadata } from "next";
import { PageHeader } from "../../components/layout/PageHeader";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { COMPLIANCE_STANDARDS } from "../../lib/constants";
import { FileText, ShieldCheck, Scale, Cpu } from "../../components/ui/icons";

export const metadata: Metadata = {
  title: "Research & International Standards",
  description: "Review iNgabo's engineering standards compliance including IEEE 29148, ISO 25010, NIST SP 800-207, and 3GPP TS 33.250.",
};

export default function ResearchPage() {
  return (
    <div>
      <PageHeader
        badge="Academic & Engineering Foundation"
        title="Research & International Standards"
        subtitle="iNgabo's architecture is engineered in compliance with international cybersecurity, telecommunications, and software quality frameworks."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <SectionHeader
            badge="Regulatory & Technical Compliance"
            title="Adherence to Global Standards"
            description="Our architecture document (iNGBO-TAD-v2.0-2026) incorporates strict technical specifications required for national law enforcement and telecom infrastructure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPLIANCE_STANDARDS.map((std, idx) => (
              <Card key={idx} className="space-y-4 hover:border-[#0F3D91]">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#0F3D91]/10 text-[#0F3D91] flex items-center justify-center font-bold">
                    <ShieldCheck size={22} />
                  </div>
                  <Badge variant="primary" size="sm">
                    Verified
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  {std.name}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {std.desc}
                </p>
              </Card>
            ))}
          </div>

          {/* Academic Source of Truth Summary */}
          <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-6">
            <div className="flex items-center gap-3">
              <FileText size={32} className="text-[#0F3D91]" />
              <div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Technical Architecture Document (TAD v2.0)
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Prepared for Rwanda Investigation Bureau (RIB), MINICT, RURA, & NCSA
                </p>
              </div>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              The platform incorporates Zero Trust default principles (NIST SP 800-207), 3GPP cellular security telemetry, CAMARA Open Network APIs, Neo4j graph algorithms, and fine-tuned Kinyarwanda BERT transformer models for smishing detection.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
