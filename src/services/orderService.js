import { apiRequest } from "../lib/api";

export async function createOrder(payload) {
  const data = await apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data;
}

export async function getMyOrders() {
  const data = await apiRequest("/orders/my-orders");
  return data.orders || [];
}

export async function getSupplierOrders() {
  const data = await apiRequest("/orders/supplier-orders");
  return data.orders || [];
}
