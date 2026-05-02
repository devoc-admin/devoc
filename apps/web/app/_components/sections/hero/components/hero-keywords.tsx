const HERO_KEYWORDS = ["Sécurité", "Accessibilité", "Performance", "Design"];

export function HeroKeywords() {
  return (
    <div className="upppercase flex items-center gap-x-2 font-geist-mono text-zinc-400">
      {HERO_KEYWORDS.map((word, idx) => (
        <div className="flex items-center gap-x-[inherit]" key={word}>
          <span className="font-light text-[0.7rem] uppercase tracking-[0.1rem]">
            {word}
          </span>
          {idx < HERO_KEYWORDS.length - 1 && <span>•</span>}
        </div>
      ))}
    </div>
  );
}
