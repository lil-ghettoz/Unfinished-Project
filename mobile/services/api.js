const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function sendPanicAlert(payload) {
  return request('/alerts', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function fetchAlerts() {
  return request('/alerts', {
    method: 'GET'
  });
}
