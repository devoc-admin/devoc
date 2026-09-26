import { Header } from "./_components/header";
import { Sidenav } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      {/* 🆎 */}
      <Header className="col-span-2 row-span-1 h-20" />
      {/* ↔️ */}
      <Sidenav className="col-start-1 col-end-2 row-span-1 w-50" />
      {/* 📦 */}
      <main className="col-start-2 col-end-3 row-span-1 p-6">{children}</main>
    </div>
  );
}
