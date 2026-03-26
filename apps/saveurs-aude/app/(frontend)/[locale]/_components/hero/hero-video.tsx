import { cn } from "@/lib/utils";

function HeroVideo() {
  return (
    <video
      autoPlay
      className={cn(
        "min-w-full",
        "max-w-none",
        "h-full",
        "object-cover",
        "brightness-60"
      )}
      loop
      muted
      playsInline
    >
      <source
        src="/videos/video-hero-av1.mp4"
        type='video/mp4; codecs="av01.0.05M.08"'
      />
      <source src="/videos/video-hero.webm" type="video/webm" />
      <source src="/videos/video-hero.mp4" type="video/mp4" />
    </video>
  );
}

export { HeroVideo };
