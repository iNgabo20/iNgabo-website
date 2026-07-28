import React from "react";
import { Hero } from "../features/home/Hero";
import { MetricsSection } from "../features/home/MetricsSection";
import { ThreatLandscape } from "../features/home/ThreatLandscape";
import { DomainsSection } from "../features/home/DomainsSection";
import { CamaraApiSection } from "../features/home/CamaraApiSection";
import { AiEngineSection } from "../features/home/AiEngineSection";
import { BlogPreviewSection } from "../features/home/BlogPreviewSection";
import { PartnersSection } from "../features/home/PartnersSection";
import { RatingsSection } from "../features/home/RatingsSection";
import { CtaBanner } from "../features/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <MetricsSection />
      <ThreatLandscape />
      <DomainsSection />
      <CamaraApiSection />
      <AiEngineSection />
      <BlogPreviewSection />
      <PartnersSection />
      <RatingsSection />
      <CtaBanner />
    </div>
  );
}
