"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "../lib/query-client";
import { FraudReportModal } from "../components/layout/FraudReportModal";
import { RatingModal } from "../components/layout/RatingModal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <FraudReportModal />
      <RatingModal />
    </QueryClientProvider>
  );
}
