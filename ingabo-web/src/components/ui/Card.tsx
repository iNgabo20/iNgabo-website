import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  bordered?: boolean;
  dark?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  bordered = true,
  dark = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        dark ? "bg-[#102A43] text-white border border-[#1E3A5F]" : "bg-white text-[#111827]",
        bordered && !dark && "border border-[#E5E7EB]",
        hoverEffect && "hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
