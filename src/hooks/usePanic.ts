import { usePanicStore } from '../store/usePanicStore';
import { useLocation } from './useLocation';
import { useRecording } from './useRecording';
import { triggerPanicFlow } from '../services/panicService';

export function usePanic() {
  const { activate } = usePanicStore();
  const { getCurrentLocation } = useLocation();
  const { startRecording } = useRecording();

  const triggerPanic = async () => {
    const location = await getCurrentLocation();
    const recording = await startRecording();
    const result = await triggerPanicFlow({ location, recording });
    activate(result.alertId, location);
    return result;
  };

  return { triggerPanic };
}
