import { betterAuth } from "better-auth";
import { Pool } from "pg";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
});

export async function createAdmin() {
  const [, , email, password] = process.argv;
  const name = process.argv[4] || "Admin";

  if (!(email && password)) {
    console.error(
      "Usage: bun run scripts/create-admin.ts <email> <password> [name]"
    );
    process.exit(1);
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdmin();
