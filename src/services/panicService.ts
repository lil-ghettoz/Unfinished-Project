import { createAlert } from './alertService';
import { enqueueForSync } from './storageService';

type TriggerInput = {
  location: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  recording: {
    recordingId: string;
  };
};

export async function triggerPanicFlow({ location, recording }: TriggerInput) {
  await enqueueForSync('panic-event', { location, recording, createdAt: new Date().toISOString() });

  const result = await createAlert({
    triggeredAt: new Date().toISOString(),
    location,
    recording
  });

  return {
    alertId: result?.alertId || `local_${Date.now()}`
  };
}
