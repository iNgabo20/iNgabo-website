"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ratingService } from "../../services/rating.service";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Star, MessageSquare } from "../../components/ui/icons";
import { useUIStore } from "../../store/ui.store";

export const RatingsSection: React.FC = () => {
  const { openRatingModal } = useUIStore();
  const { data: ratings = [] } = useQuery({
    queryKey: ["ratings"],
    queryFn: () => ratingService.getRatings(),
  });

  return (
    <section className="py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Citizen & Partner Trust"
          title="Community Ratings & Security Testimonials"
          description="Hear how iNgabo is protecting citizens, businesses, and mobile subscribers from telecom fraud."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ratings.map((item) => (
            <Card key={item._id} className="flex flex-col justify-between hover:border-[#00A86B]">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#F4B400]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#F4B400]" />
                  ))}
                </div>
                <p className="text-xs text-[#334155] italic leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
                <h4 className="text-xs font-bold text-[#111827]">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#6B7280]">
                  {item.role} · {item.organization}
                </p>
              </div>
            </Card>
          ))}
        </div>

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
