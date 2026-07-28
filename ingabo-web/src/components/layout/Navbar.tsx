"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_CONFIG } from "../../lib/constants";
import { useUIStore } from "../../store/ui.store";
import { Button } from "../ui/Button";
import { Menu, X, ShieldAlert } from "../ui/icons";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openFraudReportModal } = useUIStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-[#0F3D91]/20 bg-[#F8FAFC] flex items-center justify-center p-1 group-hover:border-[#0F3D91] transition-colors">
              <Image
                src="/logo.png"
                alt="iNgabo Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#0F3D91] font-[#Space Grotesk]">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] font-semibold text-[#00A86B] tracking-wider uppercase -mt-1">
                National Digital Shield
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.slice(0, 8).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[#0F3D91] bg-[#0F3D91]/10 font-semibold"
                      : "text-[#475569] hover:text-[#111827] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Contact & RIB Support
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<ShieldAlert size={16} />}
              onClick={openFraudReportModal}
            >
              Report Fraud
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-[#475569] hover:text-[#111827] hover:bg-[#F1F5F9] rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5E7EB] bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-[#0F3D91] bg-[#0F3D91]/10 font-bold"
                      : "text-[#334155] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
            <Button
              variant="danger"
              size="md"
              className="w-full justify-center"
              leftIcon={<ShieldAlert size={18} />}
              onClick={() => {
                closeMobileMenu();
                openFraudReportModal();
              }}
            >
              Report Fraud Incident
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
