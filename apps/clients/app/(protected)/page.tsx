import { Loader } from "@/components/ui/loader";

export default function Page() {
  return (
    <div className="grid h-full place-items-center">
      <Loader label="Chargement" />
    </div>
  );
}
