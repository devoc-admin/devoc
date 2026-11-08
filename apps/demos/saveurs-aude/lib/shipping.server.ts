import { getPayloadClient } from "@/lib/payload";
import type { ShippingConfig } from "@/lib/shipping";

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
