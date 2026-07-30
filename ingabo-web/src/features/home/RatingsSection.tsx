"use client";

import React from "react";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Button } from "../../components/ui/Button";
import { MessageSquare } from "../../components/ui/icons";
import { useUIStore } from "../../store/ui.store";

export const RatingsSection: React.FC = () => {
  const { openRatingModal } = useUIStore();
  return (
    <section className="py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Citizen & Partner Trust"
          title="Community Ratings & Security Testimonials"
          description="Hear how iNgabo is protecting citizens, businesses, and mobile subscribers from telecom fraud."
        />

        <div className="text-center">
          <Button
            variant="outline"
            size="md"
            leftIcon={<MessageSquare size={18} />}
            onClick={openRatingModal}
          >
            Submit Your Feedback & Experience
          </Button>
        </div>
      </div>
    </section>
  );
};
