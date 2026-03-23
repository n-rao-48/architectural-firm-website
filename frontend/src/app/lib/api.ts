const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;

export const API_BASE_URL = viteEnv?.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface ProjectRecord {
  id: number;
  name: string;
  type: string;
  city?: string;
  location: string;
  area?: string;
  project_year?: string;
  status?: string;
  maps_query?: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface LoginResponse {
  token: string;
  admin: {
    email: string;
  };
}

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Make sure the API server is running on port 5000.`);
  }

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await response.json() : await response.text();
    const message = typeof body === 'object' && body && 'message' in body ? String(body.message) : String(body || 'Request failed');
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

export function fetchProjects(): Promise<ProjectRecord[]> {
  return request<ProjectRecord[]>('/projects');
}

export function fetchProjectById(id: string | number): Promise<ProjectRecord> {
  return request<ProjectRecord>(`/projects/${id}`);
}

export function createProject(data: FormData, token: string): Promise<ProjectRecord> {
  return request<ProjectRecord>('/projects', {
    method: 'POST',
    body: data,
    token,
  });
}

export function updateProject(id: string | number, data: FormData, token: string): Promise<ProjectRecord> {
  return request<ProjectRecord>(`/projects/${id}`, {
    method: 'PUT',
    body: data,
    token,
  });
}

export function deleteProject(id: string | number, token: string): Promise<void> {
  return request<void>(`/projects/${id}`, {
    method: 'DELETE',
    token,
  });
}

export function uploadProjectImage(file: File, token: string): Promise<{ image_url: string }> {
  const data = new FormData();
  data.append('image', file);

  return request<{ image_url: string }>('/projects/upload', {
    method: 'POST',
    body: data,
    token,
  });
}
