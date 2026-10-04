import { cn } from "cn";
import { Content } from "./_components/content";
import { Header } from "./_components/header";
import { Sidenav } from "./_components/sidebar";

export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  // 🏁
  const leftGrid = "col-start-1 col-end-2 row-span-1";
  const topGrid = "col-span-2 row-span-1";
  const centerGrid = "col-start-2 col-end-3 row-span-1";

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header className={cn(topGrid, "h-20")} title={title} />
      <Sidenav className={cn(leftGrid, "w-50")} />
      <Content className={cn(centerGrid)}>{children}</Content>
    </div>
  );
}
