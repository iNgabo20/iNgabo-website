import React from "react";
import { Metadata } from "next";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { ShieldCheck, Cpu, Scale, Building, Award } from "../../components/ui/icons";

export const metadata: Metadata = {
  title: "About iNgabo",
  description: "Learn about iNgabo's mission to protect Rwanda's telecommunications ecosystem through advanced AI, CAMARA APIs, and law enforcement collaboration.",
};

export default function AboutPage() {
  const principles = [
    { title: "National Digital Trust", desc: "Protecting citizens, micro-businesses, and enterprise institutions from cybercrime and financial fraud.", icon: <ShieldCheck size={28} className="text-[#00A86B]" /> },
    { title: "Zero Trust Architecture", desc: "Enforcing mutual TLS, strict authentication, continuous authorization, and cryptographic integrity across all APIs.", icon: <Cpu size={28} className="text-[#0F3D91]" /> },
    { title: "Accountable Explainable AI", desc: "Combining machine learning with SHAP reasoning and Human-in-the-Loop governance before law enforcement action.", icon: <Scale size={28} className="text-[#2D9CDB]" /> },
    { title: "Cross-Sector Synergy", desc: "Uniting RIB, MINICT, RURA, NCSA, BNR, MTN, and Airtel Rwanda into a single defensive intelligence network.", icon: <Building size={28} className="text-[#F4B400]" /> }
  ];

  return (
    <div>
      <PageHeader
        badge="About iNgabo"
        title="Building Rwanda's Digital Shield"
        subtitle="iNgabo is a national telecom fraud intelligence, citizen protection, and device recovery platform born out of cybersecurity research at Rwanda Coding Academy."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Mission & Origin */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider">Mission Statement</span>
              <h2 className="text-3xl font-extrabold text-[#111827]">
                Securing Every Mobile Subscriber Across Rwanda
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                As Rwanda accelerates its digital economy transition, telecommunications networks have become essential infrastructure for payments(eKash), government services (Irembo), healthcare, and commerce. 
              </p>
              <p className="text-sm text-[#475569] leading-relaxed">
                iNgabo was conceived to solve the systemic failure of fragmented defense. By synthesizing cell tower telemetry, GSMA CAMARA network APIs, and Neo4j graph analytics, iNgabo neutralizes SIM swap attacks, IMEI device theft, and smishing scams before they inflict financial harm.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-6">
              <div className="flex items-center gap-3">
                <Award size={32} className="text-[#0F3D91]" />
                <h3 className="text-lg font-bold text-[#111827]">Rwanda Coding Academy Origin</h3>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Engineered by security researchers, data engineers, and software architects at Rwanda Coding Academy in partnership with the Ministry of ICT and Innovation and the Rwanda Investigation Bureau.
              </p>
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-2 text-xs font-semibold text-[#0F3D91]">
                <span className="bg-[#0F3D91]/10 px-3 py-1 rounded-full">RIB Law Enforcement</span>
                <span className="bg-[#00A86B]/10 px-3 py-1 rounded-full text-[#00A86B]">RURA Regulator</span>
                <span className="bg-[#2D9CDB]/10 px-3 py-1 rounded-full text-[#2D9CDB]">NCSA Cyber Authority</span>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div>
            <SectionHeader
              badge="Engineering Foundation"
              title="Guiding Principles"
              description="Every line of code and architectural decision in iNgabo adheres to enterprise-grade security and national trust standards."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((pr, idx) => (
                <Card key={idx} className="space-y-3 hover:border-[#0F3D91]">
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
                    {pr.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">
                    {pr.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {pr.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
