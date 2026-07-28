"use client";

import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { FAQ_ITEMS } from "../../lib/constants";
import { ChevronRight, ShieldAlert } from "../../components/ui/icons";
import { Button } from "../../components/ui/Button";
import { useUIStore } from "../../store/ui.store";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openFraudReportModal } = useUIStore();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div>
      <PageHeader
        badge="Citizen Help & Support"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about SIM swap fraud, phone theft reporting, RIB investigations, and CAMARA security."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <SectionHeader
            badge="Citizen Guidance"
            title="Understanding iNgabo Protection"
            description="Everything you need to know about protecting your SIM identity, reporting stolen devices, and interacting with RIB Cybercrime."
          />

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <Card key={idx} className="p-0 overflow-hidden border border-[#E5E7EB]">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#111827] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-base">{faq.question}</span>
                    <ChevronRight
                      size={20}
                      className={`shrink-0 transition-transform duration-200 text-[#0F3D91] ${isOpen ? "rotate-90" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] bg-[#F8FAFC]">
                      {faq.answer}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="p-8 rounded-2xl bg-[#102A43] text-white text-center space-y-4 mt-12">
            <h3 className="text-xl font-bold">Have an urgent fraud incident to report?</h3>
            <p className="text-xs text-[#94A3B8] max-w-lg mx-auto">
              Our automated system dispatches incident details directly to RIB Cybercrime Analysts.
            </p>
            <Button
              variant="danger"
              size="md"
              leftIcon={<ShieldAlert size={18} />}
              onClick={openFraudReportModal}
            >
              Report Incident Now
            </Button>
          </div>

        </div>
      </section>
    </div>
  );
}
