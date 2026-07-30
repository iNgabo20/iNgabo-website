"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { memberService } from "../../services/member.service";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

export default function TeamPage() {
  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => memberService.getMembers(),
  });

  return (
    <div>
      <PageHeader
        badge="Platform Engineering & Research"
        title="iNgabo Core Development Team"
        subtitle="Engineered by cybersecurity researchers, software architects, and data engineers at Rwanda Coding Academy."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <SectionHeader
            badge="Leadership & Researchers"
            title="Engineers & Security Researchers"
            description="Meet the core architects driving Rwanda's National Digital Trust Platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member) => (
              <Card key={member._id} className="flex flex-col sm:flex-row gap-6 hover:border-[#0F3D91]">
                <div className="w-16 h-16 rounded-2xl bg-[#0F3D91]/10 text-[#0F3D91] flex items-center justify-center font-bold text-2xl shrink-0 border border-[#0F3D91]/20">
                  {member.fullName.charAt(0)}
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-[#111827]">
                      {member.fullName}
                    </h3>
                    <p className="text-xs font-semibold text-[#00A86B]">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed">
                    {member.bio}
                  </p>

                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
