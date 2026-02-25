import { getPayloadClient } from "@/lib/payload";

export type ShippingConfig = {
  shippingCost: number;
  freeShippingThreshold: number;
  clickAndCollectEnabled: boolean;
  shippingZones?: { label: string; zipCodePrefix: string; cost: number }[];
};

export async function getShippingConfig(): Promise<ShippingConfig> {
  const payload = await getPayloadClient();
  const config = await payload.findGlobal({ slug: "shipping-config" });

  return {
    clickAndCollectEnabled: config.clickAndCollectEnabled ?? true,
    freeShippingThreshold: config.freeShippingThreshold,
    shippingCost: config.shippingCost,
    shippingZones: config.shippingZones?.map((z) => ({
      cost: z.cost,
      label: z.label,
      zipCodePrefix: z.zipCodePrefix,
    })),
  };
}

export function calculateShipping(
  subtotal: number,
  method: "shipping" | "clickAndCollect",
  config: Pick<ShippingConfig, "shippingCost" | "freeShippingThreshold">
): number {
  if (method === "clickAndCollect") return 0;
  if (subtotal >= config.freeShippingThreshold) return 0;
  return config.shippingCost;
}
