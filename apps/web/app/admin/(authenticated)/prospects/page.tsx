import { Suspense } from "react";
import { Prospects } from "./prospects";

export default function ProspectsPage() {
  return (
    <Suspense>
      <Prospects />
    </Suspense>
  );
}
