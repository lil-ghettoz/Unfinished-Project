import { create } from 'zustand';

type SubscriptionPlan = 'free' | 'premium';

type SubscriptionState = {
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;
  hasPremium: () => boolean;
};

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  plan: 'free',
  setPlan: (plan) => set({ plan }),
  hasPremium: () => get().plan === 'premium'
}));
