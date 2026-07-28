import React from "react";
import { Metadata } from "next";
import { PageHeader } from "../../components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy",
  description: "iNgabo's privacy policy adhering to Rwanda Law N° 058/2021 on protection of personal data.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        badge="Legal & Regulatory Compliance"
        title="Privacy & Data Protection Policy"
        subtitle="Adhering to Law N° 058/2021 of 13/10/2021 relating to the protection of personal data and privacy in Rwanda."
      />

      <section className="py-16 bg-white text-[#334155]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm md:text-base leading-relaxed">
          
          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">1. Regulatory Framework</h2>
            <p>
              The iNgabo Platform is operated in strict compliance with the Republic of Rwanda Law N° 058/2021 of 13/10/2021 relating to the Protection of Personal Data and Privacy. As a national cybersecurity and telecom fraud intelligence infrastructure, iNgabo enforces data minimization, cryptographic anonymization, and role-based access control across all database interactions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">2. Telemetry Collection & Purpose</h2>
            <p>
              iNgabo collects cellular signal telemetry (including SIM swap timestamps, Equipment Identity Register IMEI status, and bulk SMS threat indicators) solely for the explicit purpose of detecting telecommunications fraud, protecting citizen assets, and facilitating authorized law enforcement investigations by the Rwanda Investigation Bureau (RIB).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">3. Data Sharing with Law Enforcement & Regulators</h2>
            <p>
              Incident telemetry and fraud risk scores are shared exclusively with authorized government bodies, including RIB Cybercrime Division, RURA, NCSA, BNR, and licensed telecom operators (MTN Rwanda and Airtel Rwanda). Personal subscriber identities are never monetized, sold, or shared with third-party advertising entities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">4. Cryptographic Security Standards</h2>
            <p>
              All data transmitted to or processed by the iNgabo backend REST API is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Database access tokens utilize RS256 RSA keypairs with short-lived JWT expiration windows.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
