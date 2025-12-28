import { DeleteAuditsButton } from "./_components/delete-audits-button";
import { SearchForm } from "./_components/search-form";

export default async function AuditPage() {
  return (
    <div>
      <SearchForm />
      <DeleteAuditsButton />
    </div>
  );
}
