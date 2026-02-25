import type { GlobalConfig } from "payload";

export const ShippingConfig: GlobalConfig = {
  fields: [
    {
      admin: { description: "Montant en centimes (ex: 690 = 6,90€)" },
      defaultValue: 690,
      name: "shippingCost",
      required: true,
      type: "number",
    },
    {
      admin: {
        description:
          "Montant en centimes au-delà duquel la livraison est offerte (ex: 6000 = 60€)",
      },
      defaultValue: 6000,
      name: "freeShippingThreshold",
      required: true,
      type: "number",
    },
    {
      fields: [
        { name: "label", required: true, type: "text" },
        {
          admin: { description: "Ex: 11, 34, 31" },
          name: "zipCodePrefix",
          required: true,
          type: "text",
        },
        {
          admin: { description: "Montant en centimes" },
          name: "cost",
          required: true,
          type: "number",
        },
      ],
      name: "shippingZones",
      type: "array",
    },
    {
      defaultValue: true,
      name: "clickAndCollectEnabled",
      type: "checkbox",
    },
    {
      localized: true,
      name: "clickAndCollectInstructions",
      type: "richText",
    },
  ],
  label: "Configuration livraison",
  slug: "shipping-config",
};
