import Image from "next/image";
import Vineyard from "./_assets/vineyard.jpg";
import Cagnolhes from "./_assets/cagnolhes.jpg";
import Bal from "./_assets/bal.jpg";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <div className="min-h-svh">
      <div className={cn("flex relative", "border-3 border-red-900")}>
        {/*<VineyardImage />*/}
        <CentralImage />
        {/*<BalImage />*/}
      </div>
    </div>
  );
}

// 🖼️

function VineyardImage() {
  return (
    <Image
      style={{
        clipPath: "polygon(100% 100%, 0 0, 0 100%)",
      }}
      alt=""
      src={Vineyard}
      width={1000}
      height={600}
    />
  );
}
function CentralImage() {
  return (
    <div
      style={{
        clipPath: "polygon(100% 0, 0 0, 50% 100%)",
      }}
      className="h-[800px] w-full"
    >
      <Image
        className="h-full w-full object-cover"
        alt=""
        src={Cagnolhes}
        width={1000}
        height={600}
      />
    </div>
  );
}

function BalImage() {
  return <Image alt="" src={Bal} width={1000} height={600} />;
}
