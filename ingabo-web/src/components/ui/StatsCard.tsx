import React from "react";
import { Card } from "./Card";
import { DynamicIcon } from "./icons";

export interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  icon?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, change, icon = "Activity" }) => {
  return (
    <Card className="flex items-start justify-between border-t-4 border-t-[#0F3D91]">
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
          {value}
        </h3>
        {change && (
          <span className="inline-flex items-center text-xs font-medium text-[#00A86B] bg-[#00A86B]/10 px-2 py-0.5 rounded">
            {change}
          </span>
        )}
      </div>
      <div className="p-3 bg-[#0F3D91]/10 text-[#0F3D91] rounded-xl shrink-0">
        <DynamicIcon name={icon} size={24} />
      </div>
    </Card>
  );
};
