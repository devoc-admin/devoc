import { cn } from "@/lib/utils";
export function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden={true}
      className={cn(className)}
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <path
          d="M4 4.25A2.25 2.25 0 0 1 6.25 2h8a2.25 2.25 0 0 1 2.25 2.25V9.5h1.25A2.25 2.25 0 0 1 20 11.75v9.5a.75.75 0 0 1-.75.75H4.75a.75.75 0 0 1-.75-.75z"
          fill="url(#SVGNA3dywjJ)"
        />
        <path
          d="M16.5 18.25c0-.69-.56-1.25-1.25-1.25H12l-1 2.5l1 2.5h4.5z"
          fill="url(#SVGrLoGkbRc)"
        />
        <path
          d="M7.5 18.25c0-.69.56-1.25 1.25-1.25H12v5H7.5z"
          fill="url(#SVGAbxKsd9F)"
        />
        <path
          d="M7.5 6.5a1 1 0 1 0 2 0a1 1 0 0 0-2 0m1 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0-3.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3.5 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2M12 9a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
          fill="url(#SVGWawrddXY)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="SVGNA3dywjJ"
            x1="4"
            x2="23.081"
            y1="2.625"
            y2="22.168"
          >
            <stop stop-color="#ffc731" />
            <stop offset="1" stop-color="#f48c06" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="SVGrLoGkbRc"
            x1="12.359"
            x2="16.131"
            y1="17.422"
            y2="20.102"
          >
            <stop stop-color="#c76800" />
            <stop offset="1" stop-color="#7a3f00" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="SVGAbxKsd9F"
            x1="7.661"
            x2="11.106"
            y1="17.938"
            y2="21.159"
          >
            <stop stop-color="#c76800" />
            <stop offset="1" stop-color="#7a3f00" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="SVGWawrddXY"
            x1="10.2"
            x2="13.488"
            y1="4.5"
            y2="16.337"
          >
            <stop stop-color="#fdfdfd" />
            <stop offset="1" stop-color="#ffe0b3" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
