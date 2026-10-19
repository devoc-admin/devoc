const HERO_FONT_VARIABLES = [
  "--font-geist-sans",
  "--font-geist-mono",
  "--font-fraunces",
  "--font-style-script",
];
const FONT_TIMEOUT_MS = 3000;

// Runs before hydration, so the hero reveal doesn't wait for the JS bundles.
// The font variables are defined by next/font classes on <body>.
const script = `(() => {
  const root = document.documentElement;
  const ready = () => { root.dataset.fontsReady = "true"; };
  if (!document.fonts) return ready();
  const run = () => {
    const style = getComputedStyle(document.body);
    const loads = ${JSON.stringify(HERO_FONT_VARIABLES)}
      .map((name) => style.getPropertyValue(name).trim())
      .filter(Boolean)
      .map((family) => document.fonts.load("1em " + family));
    const timeout = new Promise((resolve) => setTimeout(resolve, ${FONT_TIMEOUT_MS}));
    Promise.race([Promise.allSettled(loads), timeout]).then(ready);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();`;

const noScriptStyle = `[class*="heroEntry"],[class*="backgroundEntry"]{animation-play-state:running!important}`;

export function FontsReadyScript() {
  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script */}
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline style */}
        <style dangerouslySetInnerHTML={{ __html: noScriptStyle }} />
      </noscript>
    </>
  );
}
