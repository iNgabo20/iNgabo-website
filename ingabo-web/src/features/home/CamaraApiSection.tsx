import React from "react";
import { CAMARA_APIS } from "../../lib/constants";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Cpu, CheckCircle } from "../../components/ui/icons";

export const CamaraApiSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#102A43] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="GSMA Open Gateway Standards"
          title="CAMARA Telecom Open Network APIs"
          description="iNgabo directly interfaces with MTN Rwanda & Airtel Rwanda infrastructure through standardized CAMARA APIs to leverage carrier signal verification beyond traditional application layer analysis."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMARA_APIS.map((api) => (
            <Card key={api.code} dark className="space-y-4 hover:border-[#00A86B] transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#00A86B]/20 text-[#00A86B] flex items-center justify-center border border-[#00A86B]/30">
                  <Cpu size={22} />
                </div>
                <Badge variant="accent" size="sm">
                  {api.code}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {api.name}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {api.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-[#00A86B]">
                <CheckCircle size={16} className="shrink-0 mt-0.5" />
                <span><strong>Impact:</strong> {api.impact}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
