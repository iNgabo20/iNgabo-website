import React from "react";
import { Badge } from "./Badge";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  align = "center",
  className = ""
}) => {
  return (
    <div className={cn("max-w-3xl mb-12", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {badge && (
        <Badge variant="accent" size="md" className="mb-3">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111827] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-[#6B7280] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
