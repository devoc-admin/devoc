import type { Prospect } from "@/lib/db/schema";
import { ProspectTypeBadge } from "../../buttons/prospect-type-button";

export function ProspecTypeCell({
  prospectType,
}: {
  prospectType: Prospect["type"];
}) {
  return <ProspectTypeBadge type={prospectType} />;
}
