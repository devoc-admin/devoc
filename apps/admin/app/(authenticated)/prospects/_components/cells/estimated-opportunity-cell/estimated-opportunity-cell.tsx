import type { Prospect } from "@dev-oc/db/schema";
import { EstimatedOpportunitySelect } from "../../selects/estimated-opportunity-select";
export function EstimatedOpportunityCell({
  prospectId,
  value,
}: {
  prospectId: number;
  value: Prospect["estimatedOpportunity"] | null;
}) {
  return (
    <EstimatedOpportunitySelect
      prospectId={prospectId}
      value={value ?? "medium"}
    />
  );
}
