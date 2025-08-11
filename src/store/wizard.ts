import { create } from 'zustand';

// Tipos para el wizard
export type WizardService = {
  id: string;
  name: string;
  slug: string;
  // ...otros campos
};
export type WizardPlan = {
  id: string;
  name: string;
  slug: string;
  price: number;
  max_users: number;
  // ...otros campos
};

interface WizardState {
  service: WizardService | null;
  plan: WizardPlan | null;
  slots: number;
  setService: (service: WizardService) => void;
  setPlan: (plan: WizardPlan) => void;
  setSlots: (slots: number) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  service: null,
  plan: null,
  slots: 1,
  setService: (service) => set({ service, plan: null, slots: 1 }),
  setPlan: (plan) => set({ plan }),
  setSlots: (slots) => set({ slots }),
  reset: () => set({ service: null, plan: null, slots: 1 }),
}));
