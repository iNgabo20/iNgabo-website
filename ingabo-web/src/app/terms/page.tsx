import React from "react";
import { Metadata } from "next";
import { PageHeader } from "../../components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and legal agreement for using the iNgabo public website and incident reporting portal.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        badge="Legal Agreement"
        title="Terms of Service & Usage"
        subtitle="Operational terms governing citizen access, incident reporting submission, and institutional API consumption."
      />

      <section className="py-16 bg-white text-[#334155]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm md:text-base leading-relaxed">
          
          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing the iNgabo public platform or submitting a fraud incident report, you agree to abide by these Terms of Service, national telecommunications regulations, and the laws of the Republic of Rwanda.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">2. Reporting Integrity & Prohibition of False Reports</h2>
            <p>
              Citizens and entity representatives submitting fraud reports certify that all provided information is accurate to the best of their knowledge. Intentionally submitting false incident reports to mislead law enforcement constitutes a criminal offense under the Penal Code of Rwanda and will be prosecuted by RIB.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">3. Institutional API Access</h2>
            <p>
              Access to iNgabo REST API endpoints and CAMARA gateway connectors is restricted to authenticated partners with active RBAC tokens. Unauthorized attempts to exploit, reverse engineer, or flood iNgabo infrastructure will trigger automated IP lockout and notification to NCSA.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
