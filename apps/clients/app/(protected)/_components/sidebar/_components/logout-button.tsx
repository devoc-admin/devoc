"use client";
import { useSignOut } from "@dev-oc/auth/client";
import { IconArrowsBoldOppositeDirection } from "nucleo-glass";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const handleSignOut = useSignOut({ redirectTo: "/login" });

  return (
    <Button className="mt-auto gap-x-2" onClick={handleSignOut}>
      <IconArrowsBoldOppositeDirection />
      <span>Se déconnecter</span>
    </Button>
  );
}
