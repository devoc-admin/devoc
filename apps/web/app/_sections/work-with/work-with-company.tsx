"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import NoiseTexture from "./noise-texture.png";

type Props = {
  link: string;
  logo: React.ReactNode;
};

const DEGREES = 180;
const DEGREES_TO_RADIANS = DEGREES / Math.PI;

function WorkWithCompany({ link, logo }: Props) {
  const [size, setSize] = useState({ diagonal: 0, rotationInDegrees: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        const computedStyle = window.getComputedStyle(target);

        // get paddings
        const paddingLeft = Number.parseFloat(computedStyle.paddingLeft);
        const paddingRight = Number.parseFloat(computedStyle.paddingRight);
        const paddingTop = Number.parseFloat(computedStyle.paddingTop);
        const paddingBottom = Number.parseFloat(computedStyle.paddingBottom);

        const borderWidth = 2;

        // contentRect excludes padding, so add them
        const widthWithPadding =
          entry.contentRect.width + paddingLeft + paddingRight + borderWidth;
        const heightWithPadding =
          entry.contentRect.height + paddingTop + paddingBottom + borderWidth;

        const diagonal = Math.hypot(widthWithPadding, heightWithPadding);
        const rotationInRadians = Math.asin(heightWithPadding / diagonal);

        setSize({
          diagonal,
          rotationInDegrees: rotationInRadians * DEGREES_TO_RADIANS,
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
        resizeObserver.disconnect();
      }
    };
  }, []);
  return (
    <a
      className="group relative flex h-24 items-center justify-center overflow-hidden border-border border-t border-r px-12 py-2"
      href={link}
      ref={ref}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div
        className={cn(
          "not-group-hover:-rotate-90! absolute top-0 left-0 h-full origin-bottom-left overflow-hidden bg-linear-to-b from-[#FF5709] to-[#FFC731] transition-transform duration-300 ease-linear"
        )}
        style={{
          rotate: `-${size.rotationInDegrees - 1}deg`,
          width: size.diagonal,
        }}
      >
        <Image
          alt="Noise Texture"
          className="w-full"
          height={100}
          src={NoiseTexture}
          width={100}
        />
      </div>
      <div
        className={cn(
          "not-group-hover:-rotate-90! absolute top-0 right-0 h-full origin-top-right overflow-hidden bg-linear-to-t from-[#FF5709] to-[#FFC731] transition-transform duration-300 ease-linear"
        )}
        style={{
          rotate: `-${size.rotationInDegrees - 1}deg`,
          width: size.diagonal,
        }}
      >
        <Image
          alt="Noise Texture"
          className="w-full"
          height={100}
          src={NoiseTexture}
          width={100}
        />
      </div>
      {logo}
    </a>
  );
}

export default WorkWithCompany;
