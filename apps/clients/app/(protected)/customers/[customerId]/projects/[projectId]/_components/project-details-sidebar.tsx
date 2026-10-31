import { getProjectById } from "@dev-oc/data/projects";
import { Notebook as DetailsButtonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export async function ProjectDetailsSidebar({
  projectId,
}: {
  projectId: string;
}) {
  // 🐝
  const project = await getProjectById(+projectId);

  return (
    <Sheet>
      <SheetTrigger render={<DetailsButtonTrigger />} />
      <SheetContent className="max-w-150! bg-[#FCFCFD]">
        <SheetHeader className="border-b bg-white">
          <SheetTitle className="text-xl">Détail du projet</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <DetailsTable project={project} />
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Fermer</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// 📝 ==============================
function DetailsButtonTrigger() {
  return (
    <button
      className="flex cursor-pointer items-center gap-x-1 rounded-full bg-[#F0F0F3] px-3 py-1.5 text-xs font-medium text-[#1C2024] transition-colors hover:bg-[#E0E1E6]"
      type="button"
    >
      <DetailsButtonIcon size={14} />
      <span>Détails</span>
    </button>
  );
}

// 🧮 ==============================
function DetailsTable({
  project,
}: {
  project: Awaited<ReturnType<typeof getProjectById>>;
}) {
  if (!project) return null;
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <tbody>
          <tr className="h-12 border-b">
            <td className="border-r bg-[#F9F9FB] px-4 text-[#60646c]">Nom</td>
            <td className="w-full bg-white px-4">{project.name}</td>
          </tr>
          <tr className="h-12 border-b">
            <td className="border-r bg-[#F9F9FB] px-4 text-[#60646c]">ID</td>
            <td className="w-full bg-white px-4">{project.id}</td>
          </tr>
          <tr className="h-12">
            <td className="border-r bg-[#F9F9FB] px-4 text-nowrap text-[#60646c]">
              Date démarrage
            </td>
            <td className="w-full overflow-visible bg-white px-4">
              {formatDate(project.createdAt)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function formatDate(date: string) {
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return dateFormatter.format(new Date(date));
}
