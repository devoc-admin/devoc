import type { LucideProps } from "lucide-react";
import { motion } from "motion/react";
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
    <Card>
      <CardHeader>
        <div className="mb-3 flex items-center justify-between">
          <div className="transition-all grid items-center p-2.5 w-fit rounded-lg group-hover:bg-purple-800/30 bg-purple-900/20 text-purple-900">
            <Icon size={28} />
          </div>
          <motion.div
            className="w-[60px] rounded-lg h-1 bg-purple-900"
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ width: "60px" }}
            initial={{ width: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </div>
        <CardTitle className="transition-all group-hover:text-purple-800 text-white text-xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
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
