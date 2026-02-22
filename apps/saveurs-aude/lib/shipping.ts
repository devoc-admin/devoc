export const SHIPPING_FLAT_RATE = 690;
export const FREE_SHIPPING_THRESHOLD = 6000;

export function calculateShipping(
  subtotal: number,
  method: "shipping" | "clickAndCollect"
): number {
  if (method === "clickAndCollect") return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FLAT_RATE;
}
