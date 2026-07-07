import { createContext, useContext } from 'react';

export const FAVICON_FRAMES = [
  '/favicon-frames/icon1.png',
  '/favicon-frames/icon2.png',
  '/favicon-frames/icon3.png',
  '/favicon-frames/icon4.png',
];
export const FAVICON_INTERVAL_MS = 1500;

export const FaviconContext = createContext(FAVICON_FRAMES[0]);

export function useFaviconFrame() {
  return useContext(FaviconContext);
}
