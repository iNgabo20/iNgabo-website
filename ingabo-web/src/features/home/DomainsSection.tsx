import React from "react";
import { OPERATIONAL_DOMAINS } from "../../lib/constants";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { DynamicIcon } from "../../components/ui/icons";

export const DomainsSection: React.FC = () => {
  return (
    <section id="domains" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Core Architecture"
          title="6 Integrated Operational Domains"
          description="iNgabo consolidates six mission-critical security domains into a single unified national platform serving government, regulators, telecom operators, and citizens."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OPERATIONAL_DOMAINS.map((domain) => (
            <Card
              key={domain.id}
              className="flex flex-col justify-between border-l-4 hover:shadow-xl transition-all"
              style={{ borderLeftColor: domain.color }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: domain.color }}
                  >
                    <DynamicIcon name={domain.icon} size={24} />
                  </div>
                  <Badge variant="neutral" size="sm">
                    Domain Module
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">
                    {domain.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#00A86B]">
                    {domain.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {domain.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#111827]">Beneficiaries:</span>
                <span className="text-[#0F3D91] font-medium">{domain.beneficiary}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
