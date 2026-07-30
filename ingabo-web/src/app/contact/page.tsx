"use client";

import React, { useState } from "react";
import { contactService } from "../../services/contact.service";
import type { ContactMessageInput } from "../../types/contact";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Phone, Mail, MapPin, CheckCircle } from "../../components/ui/icons";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 1. Explicitly type the state so 'category' accepts the full union type
  const [formData, setFormData] = useState<ContactMessageInput>({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry", 
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.submitMessage(formData);
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        badge="Contact & Official Support"
        title="Get in Touch with iNgabo"
        subtitle="Reach out for technical partnerships, institutional inquiries, or report security incidents directly to our engineering & RIB analyst teams."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider">Official Contacts</span>
                <h2 className="text-3xl font-extrabold text-[#111827] mt-1">
                  Institutional Support & Law Enforcement Hotlines
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed mt-2">
                  For immediate active cybercrime emergencies, please dial the national hotline <span className="font-bold text-[#E63946]">112</span>.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F3D91]/10 text-[#0F3D91] flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Emergency Hotlines</h4>
                    <p className="text-sm font-semibold text-[#111827]">National Emergency: 112</p>
                    <p className="text-xs text-[#6B7280]">RIB Cybercrime Office: +250 788 311 123</p>
                  </div>
                </Card>

                <Card className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Official Emails</h4>
                    <p className="text-sm font-semibold text-[#111827]">info@ingabo.org</p>
                    <p className="text-xs text-[#6B7280]">RIB Cybercrime: cybercrime@rib.gov.rw</p>
                  </div>
                </Card>

                <Card className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2D9CDB]/10 text-[#2D9CDB] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Headquarters & Research Center</h4>
                    <p className="text-sm font-semibold text-[#111827]">Rwanda Coding Academy & MINICT</p>
                    <p className="text-xs text-[#6B7280]">Kigali Innovation City & Nyabihu Campus, Rwanda</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 border border-[#E5E7EB] shadow-lg">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-[#00A86B]/10 text-[#00A86B] rounded-full flex items-center justify-center mx-auto border border-[#00A86B]/20">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#111827]">Message Delivered</h3>
                    <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                      Thank you for contacting iNgabo. Our engineering and security team will review your inquiry.
                    </p>
                    <Button variant="primary" size="md" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-[#111827] mb-2">Send an Inquiry or Incident Report</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Mugisha"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="j.mugisha@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+250 788 000 000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as ContactMessageInput["category"] })}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                        >
                          {/* 2. Updated value properties to exactly match the types from your ContactMessageInput union */}
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="General">General</option>
                          <option value="Report Fraud">Report Telecom Fraud Incident</option>
                          <option value="Partnership">Institutional Partnership</option>
                          <option value="RIB Investigation">RIB Investigation</option>
                          <option value="Technical API Integration">CAMARA API / Tech Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Brief title of your inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                        Message Content *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Provide details about your question or report..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full justify-center" isLoading={loading}>
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}