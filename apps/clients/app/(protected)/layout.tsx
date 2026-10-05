import { cn } from "cn";
import { Content } from "./_components/content";
import { Header } from "./_components/header";
import { Sidenav } from "./_components/sidebar";

export default function DashboardLayout({
  children,
  breadcrumbs, // 🎰
  logo, // 🎰
}: {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
  logo: React.ReactNode;
}) {
  // 🏁
  const topGrid = "col-span-2 row-span-1";
  const leftGrid = "col-start-1 col-end-2 row-span-1";
  const centerGrid = "col-start-2 col-end-3 row-span-1";

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header
        breadcrumbs={breadcrumbs}
        className={cn(topGrid, "h-17 py-2")}
        logo={logo}
      />
      <Sidenav className={cn(leftGrid, "w-60")} />
      <Content className={cn(centerGrid)}>{children}</Content>
    </div>
  );
}
