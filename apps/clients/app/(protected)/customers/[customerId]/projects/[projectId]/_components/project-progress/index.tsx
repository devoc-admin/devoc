import { getProjectStepsByProjectId } from "@dev-oc/data/projects";
import { cn } from "cn";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import s from "./style.module.css";

// 🏗️
export async function ProgressLine({ projectId }: { projectId: string }) {
  const steps = await getProjectStepsByProjectId(+projectId);

  return (
    <div className={cn("flex gap-x-2.5")}>
      {steps.map((step) => (
        <Segment
          completedAt={step.completedAt}
          key={step.id}
          name={step.name}
          position={step.position}
          startDate={step.startDate}
        />
      ))}
    </div>
  );
}

function Segment({
  position,
  name,
  completedAt,
  startDate,
}: {
  position: number;
  name: string;
  completedAt?: string | null;
  startDate?: string | null;
}) {
  const isCompleted = !!completedAt;
  const isInProgress =
    !!startDate && !isCompleted && new Date(startDate) < new Date();
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-y-1">
      <SegmentName name={name} position={position} />
      <Bar isCompleted={isCompleted} isInProgress={isInProgress} />
    </div>
  );
}

function SegmentName({ position, name }: { position: number; name: string }) {
  const text = `${position}. ${name}`;
  return (
    <Tooltip>
      <TooltipTrigger className="w-fit truncate text-left text-sm text-slate-600">
        {text}
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function Bar({
  isCompleted,
  isInProgress,
}: {
  isCompleted: boolean;
  isInProgress: boolean;
}) {
  return (
    <div
      className={cn(
        s.bar,
        "h-2 grow rounded-full bg-slate-200",
        isCompleted && "bg-[#0090FF]",
        isInProgress &&
          "after:block after:h-full after:w-full after:rounded-full after:bg-[#0090FF] after:content-['']"
      )}
    />
  );
}
