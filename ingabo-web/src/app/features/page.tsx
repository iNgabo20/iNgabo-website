"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { featureService } from "../../services/feature.service";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { DynamicIcon, CheckCircle } from "../../components/ui/icons";

export default function FeaturesPage() {
  const { data: features = [] } = useQuery({
    queryKey: ["features"],
    queryFn: () => featureService.getFeatures(),
  });

  return (
    <div>
      <PageHeader
        badge="Platform Architecture"
        title="Technical Capabilities & Solutions"
        subtitle="Deep dive into iNgabo's core technology stack: IMEI tracking, SS7 anomaly detection, NLP smishing filters, and Neo4j graph analytics."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge="Full Capability Matrix"
            title="Enterprise Security Modules"
            description="Explore the technical capabilities engineered into the iNgabo platform to safeguard Rwanda's telecommunications infrastructure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat) => (
              <Card key={feat._id} className="space-y-6 hover:border-[#0F3D91]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0F3D91]/10 text-[#0F3D91] flex items-center justify-center">
                      <DynamicIcon name={feat.icon || "Shield"} size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111827]">
                        {feat.title}
                      </h3>
                      <Badge variant="primary" size="sm">
                        {feat.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed">
                  {feat.fullDescription}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#E5E7EB]">
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    Core Technical Capabilities:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#334155]">
                    {feat.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle size={14} className="text-[#00A86B] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                  <span>Target Beneficiaries:</span>
                  <span className="font-semibold text-[#0F3D91]">{feat.beneficiaries.join(", ")}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
