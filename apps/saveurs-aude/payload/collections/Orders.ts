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
    description: "Suivez et gérez les commandes de vos clients",
    group: "Boutique",
    listSearchableFields: [
      "orderNumber",
      "customer.email",
      "customer.firstName",
      "customer.lastName",
    ],
    useAsTitle: "orderNumber",
  },
  fields: [
    {
      admin: {
        description: "Généré automatiquement, ne peut pas être modifié",
        readOnly: true,
      },
      label: "Numéro de commande",
      name: "orderNumber",
      required: true,
      type: "text",
      unique: true,
    },
    {
      fields: [
        { label: "E-mail", name: "email", required: true, type: "email" },
        { label: "Prénom", name: "firstName", required: true, type: "text" },
        { label: "Nom", name: "lastName", required: true, type: "text" },
        { label: "Téléphone", name: "phone", required: true, type: "text" },
      ],
      label: "Client",
      name: "customer",
      type: "group",
    },
    {
      fields: [
        {
          label: "Produit",
          name: "product",
          relationTo: "products",
          required: true,
          type: "relationship",
        },
        {
          label: "Variante",
          name: "variantLabel",
          required: true,
          type: "text",
        },
        {
          label: "Quantité",
          min: 1,
          name: "quantity",
          required: true,
          type: "number",
        },
        {
          admin: { description: "Prix unitaire en centimes" },
          label: "Prix unitaire",
          min: 0,
          name: "unitPrice",
          required: true,
          type: "number",
        },
      ],
      label: "Articles",
      labels: { plural: "Articles", singular: "Article" },
      name: "items",
      required: true,
      type: "array",
    },
    {
      defaultValue: "shipping",
      label: "Mode de livraison",
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
        { label: "Rue", name: "street", type: "text" },
        { label: "Ville", name: "city", type: "text" },
        { label: "Code postal", name: "zipCode", type: "text" },
        { label: "Pays", name: "country", type: "text" },
      ],
      label: "Adresse de livraison",
      name: "shippingAddress",
      type: "group",
    },
    {
      admin: { description: "Frais de livraison en centimes" },
      defaultValue: 0,
      label: "Frais de livraison",
      min: 0,
      name: "shippingCost",
      required: true,
      type: "number",
    },
    {
      admin: { description: "Montant total en centimes" },
      label: "Montant total",
      min: 0,
      name: "totalAmount",
      required: true,
      type: "number",
    },
    {
      admin: {
        description:
          "Le changement de statut envoie un e-mail automatique au client",
      },
      defaultValue: "pending",
      label: "Statut",
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
    { label: "Numéro de suivi", name: "trackingNumber", type: "text" },
    {
      admin: { readOnly: true },
      label: "ID session Stripe",
      name: "stripeSessionId",
      type: "text",
    },
    {
      admin: { readOnly: true },
      label: "ID paiement Stripe",
      name: "stripePaymentIntentId",
      type: "text",
    },
    {
      admin: { description: "Compte client associé" },
      label: "Compte client",
      name: "customerAccount",
      relationTo: "customers",
      type: "relationship",
    },
    {
      admin: { description: "Notes internes" },
      label: "Notes",
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
  labels: {
    plural: "📦 Commandes",
    singular: "📦 Commande",
  },
  slug: "orders",
};
