import { create } from 'zustand';

export type PanicLocation = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

type PanicState = {
  isActive: boolean;
  isRecording: boolean;
  lastLocation: PanicLocation | null;
  alertId: string | null;
  activate: (alertId: string, location: PanicLocation) => void;
  updateLocation: (location: PanicLocation) => void;
  stop: () => void;
};

export const usePanicStore = create<PanicState>((set) => ({
  isActive: false,
  isRecording: false,
  lastLocation: null,
  alertId: null,
  activate: (alertId, location) =>
    set({ isActive: true, isRecording: true, alertId, lastLocation: location }),
  updateLocation: (location) => set({ lastLocation: location }),
  stop: () =>
    set({ isActive: false, isRecording: false, alertId: null, lastLocation: null })
}));
