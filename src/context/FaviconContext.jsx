import { useEffect, useState } from 'react';
import { FaviconContext, FAVICON_FRAMES, FAVICON_INTERVAL_MS } from './faviconFrames';

export function FaviconProvider({ children }) {
  const [frame, setFrame] = useState(FAVICON_FRAMES[0]);

  // Single interval, single source of truth for the current frame.
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % FAVICON_FRAMES.length;
      setFrame(FAVICON_FRAMES[index]);
    }, FAVICON_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  // Keep the actual browser tab favicon <link> in sync with the frame state.
  useEffect(() => {
    const linkEl = document.getElementById('favicon');
    if (linkEl) {
      linkEl.href = frame;
    }
  }, [frame]);

  return (
    <FaviconContext.Provider value={frame}>
      {children}
    </FaviconContext.Provider>
  );
}
