import { useState } from 'react';

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setIsRecording(true);
    return { recordingId: `rec_${Date.now()}` };
  };

  const stopRecording = async () => {
    setIsRecording(false);
  };

  return { isRecording, startRecording, stopRecording };
}
