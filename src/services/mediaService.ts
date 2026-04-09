export async function startEmergencyRecording() {
  return {
    recordingId: `media_${Date.now()}`,
    status: 'recording'
  };
}

export async function stopEmergencyRecording() {
  return {
    status: 'stopped'
  };
}
