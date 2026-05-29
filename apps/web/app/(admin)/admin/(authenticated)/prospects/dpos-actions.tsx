"use server";
import { asc } from "drizzle-orm";
import { getErrorMessage } from "@/lib/api";
import { db } from "@/lib/db";
import { dpo } from "@/lib/db/schema";

const dposQuery = db
  .select({ id: dpo.id, name: dpo.name, url: dpo.url })
  .from(dpo)
  .orderBy(asc(dpo.name));

export type ListDposResult = Awaited<typeof dposQuery>;
export type DpoResult = ListDposResult[number];

export async function listDpos() {
  try {
    const dpos = await dposQuery.execute();
    return { response: dpos, success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message, success: false };
  }
}
