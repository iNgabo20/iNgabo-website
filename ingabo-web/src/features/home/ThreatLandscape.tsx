import React from "react";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Smartphone, Radio, MessageSquare, PhoneCall, ShieldAlert } from "../../components/ui/icons";

export const ThreatLandscape: React.FC = () => {
  const threatVectors = [
    {
      title: "SIM Swap & Identity Theft",
      desc: "Attackers port target phone numbers onto unauthorized SIM cards to intercept Mobile Money OTPs and hijack digital identities.",
      icon: <Smartphone className="text-[#E63946]" size={28} />
    },
    {
      title: "SS7 & DIAMETER Protocol Exploits",
      desc: "Sophisticated adversaries manipulate cellular signaling networks to track subscriber locations and bypass authentication.",
      icon: <Radio className="text-[#0F3D91]" size={28} />
    },
    {
      title: "Localized Smishing Campaigns",
      desc: "Aggressive bulk SMS phishing in Kinyarwanda impersonating financial institutions to drain citizens' accounts.",
      icon: <MessageSquare className="text-[#00A86B]" size={28} />
    },
    {
      title: "Social Engineering Vishing",
      desc: "Organized call centers deceiving subscribers with fake lottery wins, urgent tax payments, or impersonating law enforcement.",
      icon: <PhoneCall className="text-[#2D9CDB]" size={28} />
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="National Security Threat Matrix"
          title="The Telecom Fraud Challenge in East Africa"
          description="Telecommunications networks are the backbone of Rwanda's digital economy. iNgabo bridges the gap between fragmented mobile networks and law enforcement to neutralize complex fraud vectors."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {threatVectors.map((threat, idx) => (
            <Card key={idx} className="space-y-4 hover:border-[#0F3D91] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
                {threat.icon}
              </div>
              <h3 className="text-lg font-bold text-[#111827]">
                {threat.title}
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {threat.desc}
              </p>
            </Card>
          ))}
        </div>

        {/* Structural Gap Warning Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center shrink-0">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#111827]">
                The Structural Failure: Fragmented Defense
              </h4>
              <p className="text-xs text-[#6B7280]">
                Isolated mobile operators, commercial banks, and police forces cannot fight cross-network fraud independently. iNgabo provides a unified national intelligence layer.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
