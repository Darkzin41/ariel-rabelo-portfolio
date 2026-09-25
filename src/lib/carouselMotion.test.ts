import assert from "node:assert/strict";
import test from "node:test";
import {
  createCarouselClock,
  getCarouselCopyCount,
  normalizeCarouselPosition,
} from "./carouselMotion.ts";

test("the 1920px viewport has room to cross a complete loop before the scroll boundary", () => {
  const cycle = 1216;
  const viewport = 1920;
  const copies = getCarouselCopyCount(viewport, cycle);
  assert.ok(copies * cycle - viewport >= 2 * cycle);
});

test("the loop stays reachable on narrow, ultrawide, and exact-cycle viewports", () => {
  const cycle = 1216;
  for (const viewport of [320, 768, 1216, 1440, 2560, 3840, 7680]) {
    const maxScroll = getCarouselCopyCount(viewport, cycle) * cycle - viewport;
    assert.ok(maxScroll >= 2 * cycle, `viewport ${viewport} cannot reach the loop`);
  }
});

test("crossing either seam preserves the visible remainder, even during a long drag", () => {
  const cycle = 1216;
  assert.equal(normalizeCarouselPosition(2 * cycle + 37.5, cycle), cycle + 37.5);
  assert.equal(normalizeCarouselPosition(cycle - 37.5, cycle), 2 * cycle - 37.5);
  assert.equal(normalizeCarouselPosition(-3 * cycle + 17, cycle), cycle + 17);
  assert.equal(normalizeCarouselPosition(12 * cycle + 17, cycle), cycle + 17);
});

test("one second of playback travels 27px at 60, 120, and 144Hz", () => {
  for (const refreshRate of [60, 120, 144]) {
    const clock = createCarouselClock();
    let distance = clock.step(0);
    for (let frame = 1; frame <= refreshRate; frame += 1) {
      distance += clock.step(frame * 1000 / refreshRate);
    }
    assert.ok(Math.abs(distance - 27) < 0.000001, `${refreshRate}Hz traveled ${distance}px`);
  }
});

test("a pause discards elapsed time and resumes from the next rendered frame", () => {
  const clock = createCarouselClock();
  clock.step(0);
  assert.equal(clock.step(1000), 27);
  clock.reset();
  assert.equal(clock.step(301000), 0);
  assert.equal(clock.step(302000), 27);
});
