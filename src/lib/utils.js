export function formatCurrency(amount) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
