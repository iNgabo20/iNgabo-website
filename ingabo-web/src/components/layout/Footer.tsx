"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS, COMPLIANCE_STANDARDS } from "../../lib/constants";
import { Shield, CheckCircle } from "../ui/icons";
import { Button } from "../ui/Button";

import { contactService } from "../../services/contact.service";

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      await contactService.subscribeNewsletter(emailInput);
      setSubscribed(true);
      setEmailInput("");
    } catch (err: any) {
      setErrorMsg(err?.message || "Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#102A43] text-white border-t border-[#1E3A5F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1 & 2: Institutional Identity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/20">
                <Image
                  src="/logo.png"
                  alt="iNgabo Logo"
                  width={36}
                  height={36}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-xs text-[#00A86B] font-semibold uppercase tracking-wider">
                  {SITE_CONFIG.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md">
              {SITE_CONFIG.description}
            </p>

            {/* Emergency Ribbon */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E63946]">
                <Shield size={16} />
                <span>RIB Cybercrime Incident Hotline</span>
              </div>
              <p className="text-sm font-medium text-white">
                Emergency: <span className="font-bold text-[#2D9CDB]">112</span> | Cybercrime: <span className="font-bold text-[#2D9CDB]">cybercrime@rib.gov.rw</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Solutions & Standards */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Standards & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Research & Architecture
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Citizen FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy & Data Protection Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service & Usage
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-xs font-semibold text-[#00A86B] uppercase tracking-wider block mb-2">
                Standards Compliance
              </span>
              <div className="flex flex-wrap gap-1.5">
                {COMPLIANCE_STANDARDS.slice(0, 3).map((st) => (
                  <span key={st.name} className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded border border-white/10">
                    {st.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 5: Security Bulletins Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Threat Bulletins
            </h4>
            <p className="text-xs text-[#94A3B8] mb-4">
              Subscribe to official national telecom security advisories & fraud warnings.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#00A86B]/20 text-[#00A86B] rounded-lg border border-[#00A86B]/30 flex items-center gap-2 text-xs font-medium">
                <CheckCircle size={18} />
                <span>Successfully subscribed to threat bulletins!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter official email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#2D9CDB]"
                />
                {errorMsg && (
                  <p className="text-[11px] text-[#E63946] font-medium">{errorMsg}</p>
                )}
                <Button variant="accent" size="sm" type="submit" isLoading={loading} className="w-full justify-center">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Strategic Government Partner Logos */}
        <div className="pt-8 border-t border-white/10 mb-8">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest text-center mb-6">
            Institutional Stakeholders & Regulatory Governance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-80">
            {SITE_CONFIG.rwandaGovPartners.map((partner) => (
              <span key={partner} className="text-xs font-semibold text-white/70 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>
            © {new Date().getFullYear()} iNgabo Project. Developed in collaboration with Rwanda Coding Academy, RIB, MINICT, & RURA. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Incident Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
