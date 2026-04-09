const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

function buildSmsBody({ message, location, alertId }) {
  return `${message}
Alert ID: ${alertId}
Location: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
}

exports.sendEmergencySms = async ({ contacts = [], location, alertId, message }) => {
  const recipients = contacts.filter((contact) => contact.enabled && contact.phone);
  const body = buildSmsBody({ message, location, alertId });

  if (!recipients.length) {
    return {
      provider: client ? 'twilio' : 'mock',
      delivered: 0,
      skipped: true,
      reason: 'No enabled contacts were provided.'
    };
  }

  if (!client || !fromNumber) {
    return {
      provider: 'mock',
      delivered: 0,
      skipped: true,
      reason: 'Twilio credentials are not configured.',
      preview: {
        body,
        recipients: recipients.map((contact) => contact.phone)
      }
    };
  }

  const deliveryResults = [];

  for (const recipient of recipients) {
    try {
      const result = await client.messages.create({
        body,
        from: fromNumber,
        to: recipient.phone
      });

      deliveryResults.push({
        phone: recipient.phone,
        sid: result.sid,
        status: result.status
      });
    } catch (error) {
      deliveryResults.push({
        phone: recipient.phone,
        error: error.message
      });
    }
  }

  return {
    provider: 'twilio',
    delivered: deliveryResults.filter((item) => item.sid).length,
    skipped: false,
    results: deliveryResults
  };
};
