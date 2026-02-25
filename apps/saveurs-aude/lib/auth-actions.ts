"use server";

import { cookies } from "next/headers";
import { z } from "zod/v4";
import type { ActionResult } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";
import { getPayloadClient } from "@/lib/payload";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CustomerAddress = {
  city: string;
  country: string;
  id?: string;
  isDefault?: boolean;
  label: string;
  street: string;
  zipCode: string;
};

export type CustomerData = {
  addresses: CustomerAddress[];
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  newsletter: boolean;
  phone: string;
};

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const registerSchema = z.object({
  email: z.email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  newsletter: z.boolean().optional(),
  phone: z.string().optional(),
});

const addressSchema = z.object({
  city: z.string().min(1),
  country: z.string().min(1),
  isDefault: z.boolean().optional(),
  label: z.string().min(1),
  street: z.string().min(1),
  zipCode: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function serializeCustomer(doc: Record<string, unknown>): CustomerData {
  return {
    addresses: (doc.addresses as CustomerAddress[]) ?? [],
    email: (doc.email as string) ?? "",
    firstName: (doc.firstName as string) ?? "",
    id: doc.id as number,
    lastName: (doc.lastName as string) ?? "",
    newsletter: (doc.newsletter as boolean) ?? false,
    phone: (doc.phone as string) ?? "",
  };
}

async function setAuthCookie(token: string) {
  const jar = await cookies();
  jar.set("payload-customer-token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export async function registerCustomer(
  data: z.infer<typeof registerSchema>
): Promise<ActionResult<CustomerData>> {
  try {
    const parsed = registerSchema.parse(data);
    const payload = await getPayloadClient();

    await payload.create({
      collection: "customers",
      data: {
        email: parsed.email,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        password: parsed.password,
        phone: parsed.phone ?? "",
      },
    });

    // Auto-login after registration
    const loginResult = await payload.login({
      collection: "customers",
      data: { email: parsed.email, password: parsed.password },
    });

    if (loginResult.token) {
      await setAuthCookie(loginResult.token);
    }

    return {
      response: serializeCustomer(
        loginResult.user as unknown as Record<string, unknown>
      ),
      success: true,
    };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}

export async function loginCustomer(
  data: z.infer<typeof loginSchema>
): Promise<ActionResult<CustomerData>> {
  try {
    const parsed = loginSchema.parse(data);
    const payload = await getPayloadClient();

    const result = await payload.login({
      collection: "customers",
      data: { email: parsed.email, password: parsed.password },
    });

    if (result.token) {
      await setAuthCookie(result.token);
    }

    return {
      response: serializeCustomer(
        result.user as unknown as Record<string, unknown>
      ),
      success: true,
    };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}

export async function logoutCustomer(): Promise<ActionResult> {
  try {
    const jar = await cookies();
    jar.delete("payload-customer-token");
    return { success: true };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}

export async function getCurrentCustomer(): Promise<CustomerData | null> {
  try {
    const jar = await cookies();
    const token = jar.get("payload-customer-token")?.value;
    if (!token) return null;

    const payload = await getPayloadClient();
    const { user } = await payload.auth({
      headers: new Headers({ Authorization: `JWT ${token}` }),
    });

    if (!user || user.collection !== "customers") return null;

    return serializeCustomer(user as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function updateProfile(
  data: z.infer<typeof updateProfileSchema>
): Promise<ActionResult<CustomerData>> {
  try {
    const parsed = updateProfileSchema.parse(data);
    const customer = await getCurrentCustomer();
    if (!customer) return { error: "Non authentifié", success: false };

    const payload = await getPayloadClient();
    const updated = await payload.update({
      collection: "customers",
      data: {
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        newsletter: parsed.newsletter,
        phone: parsed.phone ?? "",
      },
      id: customer.id,
    });

    return {
      response: serializeCustomer(
        updated as unknown as Record<string, unknown>
      ),
      success: true,
    };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}

export async function addAddress(
  data: z.infer<typeof addressSchema>
): Promise<ActionResult<CustomerData>> {
  try {
    const parsed = addressSchema.parse(data);
    const customer = await getCurrentCustomer();
    if (!customer) return { error: "Non authentifié", success: false };

    const payload = await getPayloadClient();

    // If this is set as default, unset other defaults
    let addresses = [...customer.addresses];
    if (parsed.isDefault) {
      addresses = addresses.map((a) => ({ ...a, isDefault: false }));
    }
    addresses.push(parsed);

    const updated = await payload.update({
      collection: "customers",
      data: { addresses },
      id: customer.id,
    });

    return {
      response: serializeCustomer(
        updated as unknown as Record<string, unknown>
      ),
      success: true,
    };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}

export async function removeAddress(
  addressIndex: number
): Promise<ActionResult<CustomerData>> {
  try {
    const customer = await getCurrentCustomer();
    if (!customer) return { error: "Non authentifié", success: false };

    const payload = await getPayloadClient();
    const addresses = customer.addresses.filter((_, i) => i !== addressIndex);

    const updated = await payload.update({
      collection: "customers",
      data: { addresses },
      id: customer.id,
    });

    return {
      response: serializeCustomer(
        updated as unknown as Record<string, unknown>
      ),
      success: true,
    };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
}

export async function getCustomerOrders() {
  try {
    const customer = await getCurrentCustomer();
    if (!customer) return [];

    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "orders",
      limit: 50,
      sort: "-createdAt",
      where: { customerAccount: { equals: customer.id } },
    });

    return result.docs;
  } catch {
    return [];
  }
}
