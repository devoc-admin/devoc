import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() =>
          signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/admin/login");
              },
            },
          })
        }
      >
        Sign out
      </button>
    </div>
  );
}
