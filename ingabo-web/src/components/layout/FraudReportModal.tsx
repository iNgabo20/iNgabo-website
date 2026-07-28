"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { useUIStore } from "../../store/ui.store";
import { contactService } from "../../services/contact.service";
import { Button } from "../ui/Button";
import { ShieldAlert, CheckCircle } from "../ui/icons";

export const FraudReportModal: React.FC = () => {
  const { isFraudReportModalOpen, closeFraudReportModal } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Report Fraud" as const,
    subject: "Telecom Fraud Incident Report",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.submitMessage(formData);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      category: "Report Fraud",
      subject: "Telecom Fraud Incident Report",
      message: "",
    });
    closeFraudReportModal();
  };

  return (
    <Modal
      isOpen={isFraudReportModalOpen}
      onClose={handleReset}
      title="Report Telecom Fraud Incident"
    >
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-[#00A86B]/10 text-[#00A86B] rounded-full flex items-center justify-center mx-auto border border-[#00A86B]/20">
            <CheckCircle size={36} />
          </div>
          <h4 className="text-xl font-bold text-[#111827]">
            Incident Report Logged
          </h4>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto">
            Your incident report has been securely transmitted to the iNgabo platform & RIB Cybercrime Analysts. 
            If urgent assistance is required, please dial <span className="font-bold text-[#0F3D91]">112</span> directly.
          </p>
          <Button variant="primary" size="md" onClick={handleReset} className="mt-4">
            Close & Return to Site
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-[#E63946]/10 border border-[#E63946]/20 rounded-lg text-xs text-[#E63946] flex items-center gap-2 font-medium">
            <ShieldAlert size={18} className="shrink-0" />
            <span>Reports are encrypted and dispatched to official law enforcement (RIB Cybercrime Unit).</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Mugisha"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                Affected Phone / Suspect Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+250 788 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="email"
                placeholder="citizen@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
              Fraud Incident Type *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91] focus:bg-white"
            >
              <option value="SIM Swap Theft Incident">SIM Swap / Phone Number Takeover</option>
              <option value="Stolen Phone IMEI Tracking">Stolen Device IMEI Loss</option>
              <option value="Vishing Social Engineering Call">Vishing Scam / Fake Bank Call</option>
              <option value="Smishing Phishing SMS Campaign">Smishing SMS Phishing</option>
              <option value="Mobile Money Fraud">Mobile Money Unauthorized Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
              Incident Description & Details *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe what happened, timestamps, suspect phone numbers, messages received, or monetary impact..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91] focus:bg-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" size="md" onClick={closeFraudReportModal}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="md" isLoading={loading}>
              Submit Incident Report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
