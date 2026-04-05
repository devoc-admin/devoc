import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAudit, deleteAudit } from "./audits-actions";
import { listAuditsKey } from "./audits-keys";

// --------------------------------------
// ➕ Create audit
export function useCreateAudit() {
  return useMutation({
    mutationFn: async ({
      url,
      name,
      type,
    }: {
      url: string;
      name?: string;
      type: "rgaa" | "wcag";
    }) => {
      const result = await createAudit({
        name,
        type,
        url,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.response;
    },
  });
}

// --------------------------------------
// 🚮 Delete an audit
export function useDeleteAudit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (auditId: string) => {
      const result = await deleteAudit(auditId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listAuditsKey() });
    },
  });
}
