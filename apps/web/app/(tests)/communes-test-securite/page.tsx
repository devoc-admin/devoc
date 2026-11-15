import { Form } from "./_sections/form";
import { Hero } from "./_sections/hero";
export default function TestCommunesSecurity() {
  return (
    <div className="h-screen">
      <OrangeDot />
      <ContentContainer>
        <Hero />
        <Form />
      </ContentContainer>
    </div>
  );
}

// 🟠 ==============================================
function OrangeDot() {
  return (
    <div className="bg-orange-red absolute top-0 left-1/2 -z-1 size-300 -translate-x-1/2 -translate-y-1/2 content-center rounded-full opacity-15 blur-[200px]" />
  );
}

// 📦 ==============================================
function ContentContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-350 space-y-48 py-36">{children}</div>;
}
