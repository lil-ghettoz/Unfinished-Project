export async function sendEmergencySms(phone: string, message: string) {
  return {
    provider: 'twilio-ready',
    phone,
    message
  };
}
