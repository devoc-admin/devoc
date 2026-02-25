import type { CollectionConfig } from "payload";

import { sendOrderStatusEmail } from "@/payload/hooks/sendOrderStatusEmail";

export const Orders: CollectionConfig = {
  admin: {
    defaultColumns: [
      "orderNumber",
      "customer.email",
      "status",
      "totalAmount",
      "createdAt",
    ],
    useAsTitle: "orderNumber",
  },
  fields: [
    {
      admin: { readOnly: true },
      name: "orderNumber",
      required: true,
      type: "text",
      unique: true,
    },
    {
      fields: [
        { name: "email", required: true, type: "email" },
        { name: "firstName", required: true, type: "text" },
        { name: "lastName", required: true, type: "text" },
        { name: "phone", required: true, type: "text" },
      ],
      name: "customer",
      type: "group",
    },
    {
      fields: [
        {
          name: "product",
          relationTo: "products",
          required: true,
          type: "relationship",
        },
        { name: "variantLabel", required: true, type: "text" },
        { min: 1, name: "quantity", required: true, type: "number" },
        {
          admin: { description: "Prix unitaire en centimes" },
          min: 0,
          name: "unitPrice",
          required: true,
          type: "number",
        },
      ],
      name: "items",
      required: true,
      type: "array",
    },
    {
      defaultValue: "shipping",
      name: "deliveryMethod",
      options: [
        { label: "Livraison", value: "shipping" },
        { label: "Retrait en boutique", value: "clickAndCollect" },
      ],
      required: true,
      type: "select",
    },
    {
      admin: {
        condition: (data) => data?.deliveryMethod === "shipping",
      },
      fields: [
        { name: "street", type: "text" },
        { name: "city", type: "text" },
        { name: "zipCode", type: "text" },
        { name: "country", type: "text" },
      ],
      name: "shippingAddress",
      type: "group",
    },
    {
      admin: { description: "Frais de livraison en centimes" },
      defaultValue: 0,
      min: 0,
      name: "shippingCost",
      required: true,
      type: "number",
    },
    {
      admin: { description: "Montant total en centimes" },
      min: 0,
      name: "totalAmount",
      required: true,
      type: "number",
    },
    {
      defaultValue: "pending",
      name: "status",
      options: [
        { label: "En attente", value: "pending" },
        { label: "Confirmée", value: "confirmed" },
        { label: "En préparation", value: "preparing" },
        { label: "Expédiée", value: "shipped" },
        { label: "Prête", value: "ready" },
        { label: "Livrée", value: "delivered" },
        { label: "Récupérée", value: "collected" },
        { label: "Annulée", value: "cancelled" },
      ],
      required: true,
      type: "select",
    },
    { name: "trackingNumber", type: "text" },
    {
      admin: { readOnly: true },
      name: "stripeSessionId",
      type: "text",
    },
    {
      admin: { readOnly: true },
      name: "stripePaymentIntentId",
      type: "text",
    },
    {
      admin: { description: "Notes internes" },
      name: "notes",
      type: "textarea",
    },
  ],
  hooks: {
    afterChange: [sendOrderStatusEmail],
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation === "create" && data && !data.orderNumber) {
          const today = new Date();
          const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");

          const existingOrders = await req.payload.find({
            collection: "orders",
            limit: 0,
            where: {
              createdAt: {
                greater_than_equal: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                ).toISOString(),
              },
            },
          });

          const count = existingOrders.totalDocs + 1;
          data.orderNumber = `SA-${dateStr}-${String(count).padStart(3, "0")}`;
        }
        return data;
      },
    ],
  },
  slug: "orders",
};
