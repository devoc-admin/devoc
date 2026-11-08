import type { GlobalConfig } from "payload";

export const ShippingConfig: GlobalConfig = {
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      admin: { description: "Montant en centimes (ex: 690 = 6,90€)" },
      defaultValue: 690,
      label: "Frais de livraison",
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
      label: "Seuil de livraison gratuite",
      name: "freeShippingThreshold",
      required: true,
      type: "number",
    },
    {
      fields: [
        { label: "Libellé", name: "label", required: true, type: "text" },
        {
          admin: { description: "Ex: 11, 34, 31" },
          label: "Préfixe code postal",
          name: "zipCodePrefix",
          required: true,
          type: "text",
        },
        {
          admin: { description: "Montant en centimes" },
          label: "Coût",
          name: "cost",
          required: true,
          type: "number",
        },
      ],
      label: "Zones de livraison",
      labels: { plural: "Zones", singular: "Zone" },
      name: "shippingZones",
      type: "array",
    },
    {
      defaultValue: true,
      label: "Retrait en boutique activé",
      name: "clickAndCollectEnabled",
      type: "checkbox",
    },
    {
      label: "Instructions de retrait",
      localized: true,
      name: "clickAndCollectInstructions",
      type: "richText",
    },
  ],
  label: "🚚 Configuration livraison",
  slug: "shipping-config",
};
