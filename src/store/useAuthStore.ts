import { create } from 'zustand';

type AuthState = {
  userId: string | null;
  token: string | null;
  setSession: (userId: string, token: string) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  token: null,
  setSession: (userId, token) => set({ userId, token }),
  clearSession: () => set({ userId: null, token: null })
}));
