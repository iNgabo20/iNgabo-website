import React from "react";
import { Badge } from "../ui/Badge";

export interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  children
}) => {
  return (
    <div className="relative bg-[#102A43] text-white py-16 md:py-24 border-b border-[#1E3A5F] overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {badge && (
          <Badge variant="accent" size="md" className="mb-4">
            {badge}
          </Badge>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
};
