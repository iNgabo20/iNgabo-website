"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "../../lib/constants";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ShieldCheck, ShieldAlert, ArrowRight, Activity, Cpu, Network } from "../../components/ui/icons";
import { useUIStore } from "../../store/ui.store";

export const Hero: React.FC = () => {
  const { openFraudReportModal } = useUIStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#102A43] via-[#0F3D91] to-[#102A43] text-white py-20 lg:py-32">
      {/* Background Grid Pattern & Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00A86B]/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* National Badge Ribbon */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-ping" />
              <span className="text-[#00A86B] uppercase tracking-wider">Official Platform</span>
              <span className="text-white/40">|</span>
              <span className="text-white/90">RIB · MINICT · RURA · NCSA · BNR</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              National Telecom Fraud <span className="text-gradient-accent">Intelligence Platform</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {SITE_CONFIG.description}
            </p>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/features">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight size={20} />}>
                  Explore Platform Capabilities
                </Button>
              </Link>
              <Button
                variant="danger"
                size="lg"
                leftIcon={<ShieldAlert size={20} />}
                onClick={openFraudReportModal}
              >
                Report Fraud Incident
              </Button>
            </div>

            {/* Standards Compliance Pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#00A86B]" /> Zero Trust Architecture
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Cpu size={14} className="text-[#2D9CDB]" /> GSMA CAMARA Open APIs
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Network size={14} className="text-[#F4B400]" /> Neo4j Graph Intelligence
              </span>
            </div>
          </div>

          {/* Right Architecture Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F3D91] border border-white/20 p-1 flex items-center justify-center">
                    <Image src="/logo.png" alt="iNgabo Shield" width={32} height={32} className="object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live Telemetry Shield</h3>
                    <p className="text-[11px] text-[#00A86B] font-medium">Active Real-Time Inspection</p>
                  </div>
                </div>
                <Badge variant="accent" size="sm">Operational</Badge>
              </div>

              {/* Security Telemetry Status List */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-[#2D9CDB]" />
                    <span className="font-medium text-white/90">SS7/DIAMETER Telemetry</span>
                  </div>
                  <span className="font-bold text-[#00A86B]">0 Anomalies</span>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-[#00A86B]" />
                    <span className="font-medium text-white/90">CAMARA SIM Swap Gate</span>
                  </div>
                  <span className="font-bold text-white">Active (MTN/Airtel)</span>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-[#F4B400]" />
                    <span className="font-medium text-white/90">NLP Kinyarwanda Smishing</span>
                  </div>
                  <span className="font-bold text-[#2D9CDB]">99.8% Accuracy</span>
                </div>
              </div>

              {/* Bottom RIB Hotline Notice */}
              <div className="p-3 rounded-lg bg-[#0F3D91]/60 border border-white/10 text-center">
                <p className="text-[11px] text-white/80">
                  Integrated with <span className="font-semibold text-white">Rwanda Investigation Bureau (RIB)</span> Law Enforcement Systems
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
