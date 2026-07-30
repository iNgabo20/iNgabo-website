"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { partnerService } from "../../services/partner.service";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Building } from "../../components/ui/icons";

export const PartnersSection: React.FC = () => {
  const { data: partners = [] } = useQuery({
    queryKey: ["partners"],
    queryFn: () => partnerService.getPartners(),
  });

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Institutional Ecosystem"
          title="Strategic Partners & Stakeholders"
          description="Collaborating with law enforcement, national ICT ministries, regulators, telecom operators, and financial institutions across Rwanda."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {partners.map((partner) => (
            <Card key={partner._id} className="space-y-4 hover:border-[#0F3D91]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#0F3D91]/10 text-[#0F3D91] flex items-center justify-center">
                  <Building size={20} />
                </div>
                <Badge variant="primary" size="sm">
                  Institutional partner
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  {partner.name}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                  {partner.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/partners" className="text-xs font-semibold text-[#0F3D91] hover:underline">
            View complete institutional partnership breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
};
