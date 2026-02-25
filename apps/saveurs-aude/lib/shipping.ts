export type ShippingConfig = {
  shippingCost: number;
  freeShippingThreshold: number;
  clickAndCollectEnabled: boolean;
  shippingZones?: { label: string; zipCodePrefix: string; cost: number }[];
};

export function calculateShipping(
  subtotal: number,
  method: "shipping" | "clickAndCollect",
  config: Pick<ShippingConfig, "shippingCost" | "freeShippingThreshold">
): number {
  if (method === "clickAndCollect") return 0;
  if (subtotal >= config.freeShippingThreshold) return 0;
  return config.shippingCost;
}
