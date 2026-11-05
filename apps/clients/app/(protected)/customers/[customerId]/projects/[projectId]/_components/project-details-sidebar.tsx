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
      className="flex cursor-pointer items-center gap-x-1 rounded-full bg-[#F0F0F3] px-3 py-1.5 text-[0.8rem] font-medium text-[#1C2024] transition-colors hover:bg-[#E0E1E6]"
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
          <TR>
            <TD_left>Nom</TD_left>
            <TD_right>{project.name}</TD_right>
          </TR>
          <TR>
            <TD_left>ID</TD_left>
            <TD_right>{project.id}</TD_right>
          </TR>
          <TR>
            <TD_left>Date démarrage</TD_left>
            <TD_right>
              {formatDate(project.createdAt)} (
              {totalDaysFromNow(project.createdAt)} jours effectués)
            </TD_right>
          </TR>
          {project.dueDate && (
            <TR>
              <TD_left>Fin prévue</TD_left>
              <TD_right>
                {formatDate(project.dueDate)} ({remainingDays(project.dueDate)}{" "}
                jours restants)
              </TD_right>
            </TR>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TR({ children }: { children: React.ReactNode }) {
  return <tr className="h-12 not-last-of-type:border-b">{children}</tr>;
}

function TD_left({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-r bg-[#F9F9FB] px-4 text-nowrap text-[#60646c]">
      {children}
    </td>
  );
}

function TD_right({ children }: { children: React.ReactNode }) {
  return <td className="w-full bg-white px-4">{children}</td>;
}

// 🔧 =========================================================

function formatDate(date: string) {
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return dateFormatter.format(new Date(date));
}

function remainingDays(date: string) {
  const today = new Date();
  const dueDate = new Date(date);
  const diffTime = Math.abs(dueDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function totalDaysFromNow(date: string) {
  const today = new Date();
  const endDate = new Date(date);
  const diffTime = Math.abs(endDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
