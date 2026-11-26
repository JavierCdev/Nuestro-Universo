// Estado compartido entre módulos
export const isSmall = matchMedia('(max-width: 700px)').matches;

export const state = {
  paused: matchMedia('(prefers-reduced-motion: reduce)').matches,
  entered: false,
  lastFocused: null,
  found: new Set(),
};