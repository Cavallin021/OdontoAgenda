const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro na requisição: ${response.status}`,
    );
  }

  return response.json();
}

export async function login(nickname: string, password: string) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ nickname, password }),
  });
}

export async function getAppointments(token: string) {
  return request("/appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getMyAppointments(token: string) {
  return request("/appointments/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createAppointment(token: string, data: any) {
  return request("/appointments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function editAppointment(token: string, id: string, data: any) {
  return request(`/appointments/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteAppointment(token: string, id: string) {
  return request(`/appointments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
