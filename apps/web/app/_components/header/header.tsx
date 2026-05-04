"use client";
// import { Glass } from "@/components/sera-ui/liquid-glass";
// import { cn } from "@/lib/utils";
import { useFontsReady } from "../../_hooks/use-font-ready";
// import s from "./styles.module.css";

export default function Header() {
  return <DesktopHeader />;
}

// --------------------------------
// 💻
function DesktopHeader() {
  const fontsReady = useFontsReady();

  if (!fontsReady) return null;

  return null;

  // return (
  //   /* ♻️📨 */
  //   <ToogleNavbarOnScroll>
  //     {/* ♻️ */}
  //     <div className="justify-start">
  //       <DevOcNavbar logoSize={24} />
  //     </div>
  //     {/* 📨 */}
  //     <div className="justify-end">
  //       <ContactButtonNavbar />
  //     </div>
  //   </ToogleNavbarOnScroll>
  // );
}

// const navbarClasses = cn(
//   "flex items-center justify-between",
//   "mx-auto",
//   "py-3",
//   "pr-2 pl-6",
//   "text-secondary hover:text-secondary"
// );

// function ToogleNavbarOnScroll({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       className={cn(
//         "fixed z-5000",
//         "top-0 left-1/2 -translate-x-1/2",
//         s.navbarEntry
//       )}
//     >
//       {/* ⬆️ */}
//       <div className={cn(navbarClasses, s.navbarExpanded)}>{children}</div>
//       {/* 🫗 */}
//       <Glass
//         borderRadius={1000}
//         className={cn(
//           navbarClasses,
//           s.navbarCollapsed,
//           "border-zinc-50 bg-white/60!", // ☀️ Light
//           "[html[data-nav-theme='dark']_&]:border-zinc-800 [html[data-nav-theme='dark']_&]:bg-[#12110E]/90!" // 🌙 Dark
//         )}
//       >
//         {children}
//       </Glass>
//     </div>
//   );
// }
