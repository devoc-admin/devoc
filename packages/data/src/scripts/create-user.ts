import { createUser as createUserScript } from "@dev-oc/auth/scripts";

export async function createUser() {
  const [, , email, password] = process.argv;
  const name = process.argv[4] || "Admin";

  if (!(email && password)) {
    console.error(
      "Usage: bun run scripts/create-admin.ts <email> <password> [name]"
    );
    process.exit(1);
  }

  try {
    await createUserScript({ email, name, password });
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  }
}

createUser();
