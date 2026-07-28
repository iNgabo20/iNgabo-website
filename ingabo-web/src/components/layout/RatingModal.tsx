"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { useUIStore } from "../../store/ui.store";
import { ratingService } from "../../services/rating.service";
import { Button } from "../ui/Button";
import { Star, CheckCircle } from "../ui/icons";

export const RatingModal: React.FC = () => {
  const { isRatingModalOpen, closeRatingModal } = useUIStore();
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "Citizen / User",
    organization: "Public Subscriber",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ratingService.submitRating({ ...formData, rating });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", role: "Citizen / User", organization: "Public Subscriber", comment: "" });
    setRating(5);
    closeRatingModal();
  };

  return (
    <Modal
      isOpen={isRatingModalOpen}
      onClose={handleReset}
      title="Submit Citizen Platform Feedback"
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-[#00A86B]/10 text-[#00A86B] rounded-full flex items-center justify-center mx-auto border border-[#00A86B]/20">
            <CheckCircle size={36} />
          </div>
          <h4 className="text-xl font-bold text-[#111827]">
            Feedback Submitted!
          </h4>
          <p className="text-sm text-[#6B7280]">
            Thank you for helping us strengthen Rwanda's National Digital Trust Platform.
          </p>
          <Button variant="primary" size="md" onClick={handleReset} className="mt-2">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-2 text-center">
              Rating Score
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-[#F4B400] hover:scale-110 transition-transform"
                >
                  <Star size={32} className={star <= rating ? "fill-[#F4B400]" : "text-[#E2E8F0]"} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Marie Mukamana"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                Your Role / Title
              </label>
              <input
                type="text"
                placeholder="e.g. Fintech Merchant, Citizen"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
                Organization / Sector
              </label>
              <input
                type="text"
                placeholder="e.g. Telecom Sector, Citizen"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">
              Feedback & Comments *
            </label>
            <textarea
              required
              rows={3}
              placeholder="How has iNgabo improved your security or digital trust?"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" size="md" onClick={closeRatingModal}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" size="md" isLoading={loading}>
              Submit Feedback
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
