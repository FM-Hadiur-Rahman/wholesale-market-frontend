import { apiRequest } from "../lib/api";

export async function getSupplierOrders() {
  const data = await apiRequest("/orders/supplier-orders");
  return data.orders || [];
}

export async function updateOrderStatus(orderId, status) {
  const data = await apiRequest(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  return data.order;
}
export async function getMySupplierProducts() {
  const data = await apiRequest("/products/supplier/my-products");
  return data.products || [];
}

export async function updateMySupplierProduct(productId, payload) {
  const data = await apiRequest(`/products/supplier/my-products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return data.product;
}
