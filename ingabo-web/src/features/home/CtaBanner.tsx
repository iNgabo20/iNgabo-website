"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { ShieldAlert, ArrowRight } from "../../components/ui/icons";
import { useUIStore } from "../../store/ui.store";

export const CtaBanner: React.FC = () => {
  const { openFraudReportModal } = useUIStore();

  return (
    <section className="py-16 bg-[#0F3D91] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Building Rwanda&apos;s National Digital Trust Framework
        </h2>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Report stolen devices, detect unauthorized SIM swap threats, or partner with the iNgabo platform engineering team.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="danger"
            size="lg"
            leftIcon={<ShieldAlert size={20} />}
            onClick={openFraudReportModal}
          >
            Report Fraud Incident Now
          </Button>
          <Link href="/contact">
            <Button variant="accent" size="lg" rightIcon={<ArrowRight size={20} />}>
              Contact Engineering Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
