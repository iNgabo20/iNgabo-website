"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { partnerService } from "../../services/partner.service";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Building, ExternalLink } from "../../components/ui/icons";

export default function PartnersPage() {
  const { data: partners = [] } = useQuery({
    queryKey: ["partners-full"],
    queryFn: () => partnerService.getPartners(),
  });

  return (
    <div>
      <PageHeader
        badge="Institutional Ecosystem"
        title="Partners & Stakeholder Network"
        subtitle="iNgabo operates at the intersection of government law enforcement, telecommunications regulation, central banking, and mobile operators."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <SectionHeader
            badge="National Governance"
            title="Institutional Stakeholders"
            description="Our cross-sector partnership model ensures seamless fraud telemetry exchange while maintaining strict compliance with national privacy laws."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <Card key={partner._id} className="flex flex-col justify-between space-y-4 hover:border-[#0F3D91]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0F3D91]/10 text-[#0F3D91] flex items-center justify-center border border-[#0F3D91]/20">
                      <Building size={24} />
                    </div>
                    <Badge variant="primary" size="sm">
                      Institutional partner
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#111827]">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mt-2">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {partner.website && (
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3D91] hover:underline"
                    >
                      <span>Visit Institutional Portal</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
