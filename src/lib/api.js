const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5009/api";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("bazaarlink_token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}
