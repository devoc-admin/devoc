import { createUser } from "@dev-oc/auth/scripts";

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
    await createUser({ email, name, password });
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  }
}

createAdmin();
