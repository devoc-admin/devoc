import type { LucideProps } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  features: string[];
  Icon: React.ComponentType<LucideProps>;
};

export default function ServiceCard({
  title,
  description,
  features,
  Icon,
}: Props) {
  return (
    <Card className="group hover:border-purple-950 backdrop-blur-sm hover:shadow-2xl shadow-purple-950/40 hover:translate-y-[-10px] transition-all duration-300 cursor-pointer gap-4 border-zinc-900 text-white bg-gradient-to-br from-zinc-950 to-zinc-900">
      <CardHeader>
        <div className="mb-3 flex items-center justify-between">
          <div className="transition-all grid items-center p-2.5 w-fit rounded-lg group-hover:bg-purple-800/20 bg-purple-900/20 text-purple-900">
            <Icon size={28} />
          </div>
          <div className="w-[60px] rounded-lg h-1 bg-purple-900" />
        </div>
        <CardTitle className="transition-all group-hover:text-purple-800 text-white text-xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-zinc-500 flex flex-col gap-4">
        <CardDescription className="text-base">{description}</CardDescription>
        <ul>
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <div className="bg-purple-800 size-1.5 rounded-full" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
