import { betterAuth } from "better-auth";
import { baseAuthOptions, createPool } from "./server";

type CreateUserOptions = {
  email: string;
  password: string;
  name: string;
  databaseUrl?: string;
};

// For CLI scripts: no nextCookies plugin, since next/headers throws outside a request.
export async function createUser({
  email,
  password,
  name,
  databaseUrl,
}: CreateUserOptions) {
  const pool = createPool(databaseUrl);
  const auth = betterAuth({ ...baseAuthOptions, database: pool });

  try {
    return await auth.api.signUpEmail({ body: { email, name, password } });
  } finally {
    await pool.end();
  }
}
