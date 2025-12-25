import { betterAuth } from "better-auth";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

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
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!(email && password)) {
    console.error(
      "Usage: bun run scripts/create-admin.ts <email> <password> [name]"
    );
    process.exit(1);
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });

    if (result.user) {
      console.log("Admin user created successfully!");
      console.log(`Email: ${email}`);
      console.log(`Name: ${name}`);
    }
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdmin();
