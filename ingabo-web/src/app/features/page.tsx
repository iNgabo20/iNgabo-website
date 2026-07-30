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
                        Platform capability
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed">
                  {feat.description}
                </p>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                  <span>Published capability</span>
                  <CheckCircle size={16} className="text-[#00A86B]" aria-label="Active" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
