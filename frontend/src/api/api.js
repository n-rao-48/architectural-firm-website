const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

function normalizeBaseUrl(url) {
  const trimmed = (url || '').trim();
  if (!trimmed) {
    return 'https://architectural-firm-website-backend.onrender.com/api';
  }

  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const BASE_URL = normalizeBaseUrl(rawBaseUrl);

async function request(path, options = {}, retries = 0) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);

    if (!response.ok) {
      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const body = isJson ? await response.json() : await response.text();
      const message =
        typeof body === 'object' && body && 'message' in body
          ? String(body.message)
          : String(body || 'Request failed');
      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    if (retries > 0) {
      return request(path, options, retries - 1);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Network request failed');
  }
}

export async function getProjects() {
  return request('/projects', { method: 'GET' }, 1);
}

export async function sendClientInquiry(data) {
  return request('/client-inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function sendCareerInquiry(formData) {
  return request('/career-inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}

export async function loginUser(credentials) {
  return request('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

export { BASE_URL };
