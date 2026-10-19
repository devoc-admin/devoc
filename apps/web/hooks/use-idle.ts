import { useEffect, useState } from "react";

// Safari has no requestIdleCallback: give the main thread a short breather instead
const FALLBACK_DELAY = 300;

/**
 * Becomes true once the page has fully loaded and the browser is idle.
 * Use it to defer heavy, non-essential work (WebGL, large chunks).
 * `timeout` caps how long we wait for an idle period after load.
 */
export function useIdle(timeout = 2000) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let cancelIdle: () => void = () => undefined;

    function scheduleIdle() {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => setIsIdle(true), {
          timeout,
        });
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(() => setIsIdle(true), FALLBACK_DELAY);
        cancelIdle = () => clearTimeout(id);
      }
    }

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleIdle);
      cancelIdle();
    };
  }, [timeout]);

  return isIdle;
}
