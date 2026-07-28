import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "warning" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "sm",
  ...props
}) => {
  const variantStyles = {
    primary: "bg-[#0F3D91]/10 text-[#0F3D91] border border-[#0F3D91]/20",
    secondary: "bg-[#102A43]/10 text-[#102A43] border border-[#102A43]/20",
    accent: "bg-[#00A86B]/10 text-[#00A86B] border border-[#00A86B]/20",
    danger: "bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/20",
    warning: "bg-[#F4B400]/10 text-[#B48400] border border-[#F4B400]/30",
    neutral: "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 font-medium rounded-full",
    md: "text-xs px-3 py-1 font-semibold rounded-full uppercase tracking-wider"
  };

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};
