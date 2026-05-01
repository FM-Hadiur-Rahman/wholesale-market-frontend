import { apiRequest } from "../lib/api";

export async function loginUser(payload) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("bazaarlink_token", data.token);
  localStorage.setItem("bazaarlink_user", JSON.stringify(data.user));

  return data;
}

export async function registerUser(payload) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("bazaarlink_token", data.token);
  localStorage.setItem("bazaarlink_user", JSON.stringify(data.user));

  return data;
}

export function getCurrentUser() {
  const user = localStorage.getItem("bazaarlink_user");
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem("bazaarlink_token");
  localStorage.removeItem("bazaarlink_user");
}
