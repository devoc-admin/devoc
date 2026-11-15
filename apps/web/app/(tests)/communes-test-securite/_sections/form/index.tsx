import { cn } from "cn";
import { BannerInfo } from "./_components/banner-info";
import { Card } from "./_components/card";

export function Form() {
  return (
    <Container>
      <Card />
      <BannerInfo />
    </Container>
  );
}

// 📦 ==============================
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex w-full justify-between gap-x-18")}>{children}</div>
  );
}
