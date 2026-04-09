import client from '../api/client';

export async function createAlert(payload: Record<string, unknown>) {
  const response = await client.post('/panic', payload);
  return response.data;
}

export async function fetchAlertHistory() {
  const response = await client.get('/panic/history');
  return response.data;
}
