import { apiRequest } from "../lib/api";

export async function getProducts({ search = "", category = "All" } = {}) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);

  const data = await apiRequest(`/products?${params.toString()}`);

  return data.products || [];
}

export async function getProductById(id) {
  const data = await apiRequest(`/products/${id}`);

  return data.product;
}
