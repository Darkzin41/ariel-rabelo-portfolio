export function getCarouselCopyCount(viewport: number, cycle: number) {
  if (cycle <= 0) return 3;
  // Keep a complete spare sequence on both sides of the visible content.
  return Math.max(3, Math.ceil(viewport / cycle) + 2);
}

export function normalizeCarouselPosition(position: number, cycle: number) {
  if (cycle <= 0) return 0;
  return cycle + ((position % cycle) + cycle) % cycle;
}

export function createCarouselClock() {
  let previousTimestamp: number | null = null;

  return {
    step(timestamp: number) {
      const elapsed = previousTimestamp === null ? 0 : Math.max(0, timestamp - previousTimestamp);
      previousTimestamp = timestamp;
      return elapsed * 27 / 1000;
    },
    reset() {
      previousTimestamp = null;
    },
  };
}
