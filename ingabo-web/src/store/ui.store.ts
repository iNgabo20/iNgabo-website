import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  isFraudReportModalOpen: boolean;
  openFraudReportModal: () => void;
  closeFraudReportModal: () => void;

  isRatingModalOpen: boolean;
  openRatingModal: () => void;
  closeRatingModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  isFraudReportModalOpen: false,
  openFraudReportModal: () => set({ isFraudReportModalOpen: true }),
  closeFraudReportModal: () => set({ isFraudReportModalOpen: false }),

  isRatingModalOpen: false,
  openRatingModal: () => set({ isRatingModalOpen: true }),
  closeRatingModal: () => set({ isRatingModalOpen: false }),
}));
