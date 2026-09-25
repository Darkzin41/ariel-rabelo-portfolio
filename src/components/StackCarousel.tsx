import { useRef, useEffect, useLayoutEffect, useState, useId } from "react"

import { carouselCards, type CarouselCard } from "../data/stack"

import { useScrollReveal, revealStyle } from "../hooks/useScrollReveal"

import {
  createCarouselClock,
  getCarouselCopyCount,
  normalizeCarouselPosition,
} from "../lib/carouselMotion"
import { useLanguage } from "../contexts/language"

/* ─── SVG Icons ──────────────────────────────────────────────── */

const PythonIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path
      d="M24 4C17.6 4 14 6.8 14 10v4h10v2H10c-3.5 0-6 2.8-6 7s2.5 7 6 7h3v-3.5c0-3.8 3.2-6.5 7-6.5h8c3.3 0 6-2.4 6-5.5V10c0-3.2-3.6-6-10-6zM19 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
      fill="#3776AB"
    />
    <path
      d="M24 44c6.4 0 10-2.8 10-6v-4H24v-2h14c3.5 0 6-2.8 6-7s-2.5-7-6-7h-3v3.5c0 3.8-3.2 6.5-7 6.5h-8c-3.3 0-6 2.4-6 5.5V38c0 3.2 3.6 6 10 6zM29 39.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
      fill="#FFD43B"
    />
  </svg>
)

const ReactIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <ellipse
      cx="24"
      cy="24"
      rx="20"
      ry="8"
      stroke="#61DAFB"
      strokeWidth="2"
      fill="none"
    />
    <ellipse
      cx="24"
      cy="24"
      rx="20"
      ry="8"
      stroke="#61DAFB"
      strokeWidth="2"
      fill="none"
      transform="rotate(60 24 24)"
    />
    <ellipse
      cx="24"
      cy="24"
      rx="20"
      ry="8"
      stroke="#61DAFB"
      strokeWidth="2"
      fill="none"
      transform="rotate(120 24 24)"
    />
    <circle cx="24" cy="24" r="3" fill="#61DAFB" />
  </svg>
)

const PhpIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <ellipse
      cx="24"
      cy="24"
      rx="22"
      ry="12"
      fill="#8892BF"
      opacity="0.15"
      stroke="#8892BF"
      strokeWidth="1.5"
    />
    <text
      x="24"
      y="29"
      textAnchor="middle"
      fill="#8892BF"
      fontSize="14"
      fontWeight="bold"
      fontFamily="monospace"
    >
      php
    </text>
  </svg>
)

const HtmlIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path d="M8 5h32l-3 34-13 4-13-4L8 5z" fill="#E34F26" opacity="0.9" />
    <path
      d="M15 13h19l-.5 5H21l.4 4h11.7l-1 11-8.1 2.6-8.2-2.6-.6-7h5l.3 3.2 3.5 1.1 3.5-1.1.3-2.6H15.9L15 13z"
      fill="#fff"
      opacity="0.92"
    />
  </svg>
)

const CssIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path d="M8 5h32l-3 34-13 4-13-4L8 5z" fill="#1572B6" opacity="0.9" />
    <path
      d="M15 13h20l-.5 5.2H21l.3 3.5h12.9l-1 11.2-9.2 2.8-8.4-2.8-.5-6h5l.3 2.6 3.7 1.2 4.1-1.2.3-3H14.8L15 13z"
      fill="#fff"
      opacity="0.92"
    />
  </svg>
)

const JavaScriptIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <rect x="5" y="5" width="38" height="38" rx="3" fill="#F7DF1E" />
    <text
      x="38"
      y="37"
      textAnchor="end"
      fill="#111"
      fontSize="18"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
    >
      JS
    </text>
  </svg>
)

const GitIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path
      d="M44.5 22.2L25.8 3.5a3 3 0 00-4.3 0L17.3 7.7l5.3 5.3A3.5 3.5 0 0127 18.4l5.1 5.1a3.5 3.5 0 11-2.1 3.3 3.5 3.5 0 01.9-2.3l-4.8-4.8v12.5a3.5 3.5 0 11-2.8-.1V19.4a3.5 3.5 0 01-1.9-4.6L16.2 9.6l-12.7 12.7a3 3 0 000 4.2l18.7 18.7a3 3 0 004.2 0L44.5 26.4a3 3 0 000-4.2z"
      fill="#F05033"
      opacity="0.9"
    />
  </svg>
)

const NextIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <circle cx="24" cy="24" r="20" stroke="#F5F6F8" strokeWidth="2" />
    <path
      d="M15 34V15l20 25M33 15v15"
      stroke="#F5F6F8"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LaravelIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path
      d="M7 9l11 3v20l-11-3V9zm11 3l9-5 11 4-10 6-10-5zm10 5v20l10-6V11L28 17zM18 32l10 5-9 5-12-5 11-5z"
      stroke="#FF2D20"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

const SqlIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <ellipse
      cx="24"
      cy="11"
      rx="16"
      ry="6"
      fill="#10B981"
      opacity="0.22"
      stroke="#10B981"
      strokeWidth="2"
    />
    <path
      d="M8 11v13c0 3.3 7.2 6 16 6s16-2.7 16-6V11M8 24v13c0 3.3 7.2 6 16 6s16-2.7 16-6V24"
      stroke="#10B981"
      strokeWidth="2"
    />
  </svg>
)

const N8nIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <circle cx="9" cy="24" r="4" stroke="#EA4B71" strokeWidth="2" />
    <circle cx="24" cy="12" r="4" stroke="#EA4B71" strokeWidth="2" />
    <circle cx="24" cy="36" r="4" stroke="#EA4B71" strokeWidth="2" />
    <circle cx="39" cy="24" r="4" stroke="#EA4B71" strokeWidth="2" />
    <path
      d="M12 21l9-7M12 27l9 7M27 14l9 7M27 34l9-7"
      stroke="#EA4B71"
      strokeWidth="2"
    />
  </svg>
)

const PowerBiIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <rect
      x="7"
      y="28"
      width="7"
      height="14"
      rx="2"
      fill="#F2C811"
      opacity="0.7"
    />
    <rect
      x="17"
      y="21"
      width="7"
      height="21"
      rx="2"
      fill="#F2C811"
      opacity="0.82"
    />
    <rect
      x="27"
      y="13"
      width="7"
      height="29"
      rx="2"
      fill="#F2C811"
      opacity="0.92"
    />
    <rect x="37" y="6" width="7" height="36" rx="2" fill="#F2C811" />
  </svg>
)

const VsCodeIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path
      d="M34 5l10 5v28l-10 5-19-18-7 6-4-3 8-8-8-8 4-3 7 6L34 5z"
      fill="#23A8F2"
      opacity="0.9"
    />
    <path d="M34 14L21 24l13 10V14z" fill="#08111D" opacity="0.8" />
  </svg>
)

const groupIcons: Record<string, typeof PythonIcon> = {
  PYTHON: PythonIcon,

  HTML: HtmlIcon,

  CSS: CssIcon,

  JAVASCRIPT: JavaScriptIcon,

  REACT: ReactIcon,

  "NEXT.JS": NextIcon,

  PHP: PhpIcon,

  LARAVEL: LaravelIcon,

  SQL: SqlIcon,

  N8N: N8nIcon,

  "POWER BI": PowerBiIcon,

  "GIT / GITHUB": GitIcon,

  "VS CODE": VsCodeIcon,
}

function StackGroup({ group, color }: CarouselCard) {
  const Icon = groupIcons[group] ?? PythonIcon

  return (
    <li className="flex w-[140px] shrink-0 flex-col items-center gap-3 px-6 py-5">
      <div aria-hidden="true" style={{ opacity: 0.88 }}>
        <Icon />
      </div>
      <p
        className="text-[9px] tracking-[0.2em] uppercase font-semibold text-center"
        style={{ color, fontFamily: "var(--font-mono)" }}
      >
        {group}
      </p>
    </li>
  )
}

export default function StackCarousel() {
  const { messages } = useLanguage()
  const copy = messages.carousel
  const carouselRef = useRef<HTMLDivElement>(null)

  const trackRef = useRef<HTMLDivElement>(null)

  const firstSequenceRef = useRef<HTMLUListElement>(null)

  const secondSequenceRef = useRef<HTMLUListElement>(null)

  const posRef = useRef(0)

  const cycleRef = useRef(0)

  const manualPauseRef = useRef(false)

  const playbackRef = useRef<((paused: boolean) => void) | null>(null)

  const [manualPaused, setManualPaused] = useState(false)

  const [dragging, setDragging] = useState(false)

  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  const [copyCount, setCopyCount] = useState(3)

  const instructionsId = useId()

  const { ref: headRef, visible: headVisible } = useScrollReveal()

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")

    const onChange = () => setReducedMotion(preference.matches)

    preference.addEventListener("change", onChange)

    return () => preference.removeEventListener("change", onChange)
  }, [])

  useLayoutEffect(() => {
    const carousel = carouselRef.current

    const track = trackRef.current

    const firstSequence = firstSequenceRef.current

    if (!carousel || !track || !firstSequence) return

    const clock = createCarouselClock()

    let animationFrame: number | null = null

    let disposed = false

    let geometryReady = false

    let lastWrittenScroll = track.scrollLeft

    const bounds = carousel.getBoundingClientRect()

    const pauses = {
      hover: carousel.matches(":hover"),

      focus: carousel.contains(document.activeElement),

      drag: false,

      manual: manualPauseRef.current,

      reducedMotion,

      hidden: document.hidden,

      inactive: !document.hasFocus(),

      offscreen: bounds.bottom <= 0 || bounds.top >= window.innerHeight,
    }

    let gesture: {
      pointerId: number

      startX: number

      startY: number

      lastX: number

      horizontal: boolean
    } | null = null

    const isPaused = () =>
      disposed || !geometryReady || Object.values(pauses).some(Boolean)

    const writePosition = (position: number) => {
      posRef.current = reducedMotion
        ? Math.max(0, Math.min(position, track.scrollWidth - track.clientWidth))
        : normalizeCarouselPosition(position, cycleRef.current)

      track.scrollLeft = posRef.current

      // Browsers may round scrollLeft; keep the subpixel position in posRef.

      lastWrittenScroll = track.scrollLeft
    }

    const tick = (timestamp: number) => {
      animationFrame = null

      if (isPaused()) {
        clock.reset()

        return
      }

      writePosition(posRef.current + clock.step(timestamp))

      animationFrame = requestAnimationFrame(tick)
    }

    const syncPlayback = () => {
      if (isPaused()) {
        if (animationFrame !== null) cancelAnimationFrame(animationFrame)

        animationFrame = null

        clock.reset()
      } else if (animationFrame === null) {
        clock.reset()

        animationFrame = requestAnimationFrame(tick)
      }
    }

    const finishGesture = () => {
      const pointerId = gesture?.pointerId

      gesture = null

      pauses.drag = false

      setDragging(false)

      if (pointerId !== undefined && track.hasPointerCapture(pointerId)) {
        track.releasePointerCapture(pointerId)
      }

      syncPlayback()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || gesture) return

      gesture = {
        pointerId: event.pointerId,

        startX: event.clientX,

        startY: event.clientY,

        lastX: event.clientX,

        horizontal: false,
      }

      pauses.drag = true

      track.setPointerCapture(event.pointerId)

      syncPlayback()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.pointerId) return

      if (!gesture.horizontal) {
        const horizontalDistance = Math.abs(event.clientX - gesture.startX)

        const verticalDistance = Math.abs(event.clientY - gesture.startY)

        if (Math.max(horizontalDistance, verticalDistance) < 6) return

        if (verticalDistance >= horizontalDistance) {
          finishGesture()

          return
        }

        gesture.horizontal = true

        setDragging(true)
      }

      event.preventDefault()

      writePosition(posRef.current + gesture.lastX - event.clientX)

      gesture.lastX = event.clientX
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (gesture?.pointerId === event.pointerId) finishGesture()
    }

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return

      pauses.hover = true

      syncPlayback()
    }

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return

      pauses.hover = false

      syncPlayback()
    }

    const onFocusIn = () => {
      pauses.focus = true

      syncPlayback()
    }

    const onFocusOut = (event: FocusEvent) => {
      pauses.focus =
        event.relatedTarget instanceof Node &&
        carousel.contains(event.relatedTarget)

      syncPlayback()
    }

    const onWindowBlur = () => {
      pauses.inactive = true

      finishGesture()
    }

    const onWindowFocus = () => {
      pauses.inactive = false

      pauses.focus = carousel.contains(document.activeElement)

      pauses.hover = carousel.matches(":hover")

      syncPlayback()
    }

    const onVisibilityChange = () => {
      pauses.hidden = document.hidden

      if (document.hidden) finishGesture()

      syncPlayback()
    }

    const onScroll = () => {
      if (track.scrollLeft !== lastWrittenScroll)
        writePosition(track.scrollLeft)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return

      const step = cycleRef.current / carouselCards.length

      const start = reducedMotion ? 0 : cycleRef.current

      const positions: Record<string, number> = {
        ArrowLeft: posRef.current - step,

        ArrowRight: posRef.current + step,

        Home: start,

        End: start + step * (carouselCards.length - 1),
      }

      if (!(event.key in positions)) return

      event.preventDefault()

      writePosition(positions[event.key])
    }

    const measure = () => {
      const firstBounds = firstSequence.getBoundingClientRect()

      const secondBounds = secondSequenceRef.current?.getBoundingClientRect()

      const cycle = secondBounds
        ? secondBounds.left - firstBounds.left
        : firstBounds.width

      if (cycle <= 0) return

      const previousCycle = cycleRef.current

      const phase =
        previousCycle > 0
          ? (((posRef.current % previousCycle) + previousCycle) %
              previousCycle) /
            previousCycle
          : 0

      cycleRef.current = cycle

      const requiredCopies = reducedMotion
        ? 1
        : getCarouselCopyCount(track.clientWidth, cycle)

      if (requiredCopies !== copyCount) {
        geometryReady = false

        setCopyCount(requiredCopies)

        syncPlayback()

        return
      }

      geometryReady = true

      writePosition((reducedMotion ? 0 : cycle) + phase * cycle)

      syncPlayback()
    }

    playbackRef.current = (paused) => {
      manualPauseRef.current = paused

      pauses.manual = paused

      setManualPaused(paused)

      syncPlayback()
    }

    const resizeObserver = new ResizeObserver(measure)

    resizeObserver.observe(track)

    resizeObserver.observe(firstSequence)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      pauses.offscreen = !entry.isIntersecting

      syncPlayback()
    })

    visibilityObserver.observe(carousel)

    carousel.addEventListener("pointerenter", onPointerEnter)

    carousel.addEventListener("pointerleave", onPointerLeave)

    carousel.addEventListener("focusin", onFocusIn)

    carousel.addEventListener("focusout", onFocusOut)

    track.addEventListener("pointerdown", onPointerDown)

    track.addEventListener("pointermove", onPointerMove)

    track.addEventListener("pointerup", onPointerEnd)

    track.addEventListener("pointercancel", onPointerEnd)

    track.addEventListener("lostpointercapture", onPointerEnd)

    track.addEventListener("scroll", onScroll, { passive: true })

    track.addEventListener("keydown", onKeyDown)

    window.addEventListener("blur", onWindowBlur)

    window.addEventListener("focus", onWindowFocus)

    document.addEventListener("visibilitychange", onVisibilityChange)

    measure()

    return () => {
      disposed = true

      const capturedPointer = gesture?.pointerId

      gesture = null

      if (
        capturedPointer !== undefined &&
        track.hasPointerCapture(capturedPointer)
      ) {
        track.releasePointerCapture(capturedPointer)
      }

      if (animationFrame !== null) cancelAnimationFrame(animationFrame)

      animationFrame = null

      playbackRef.current = null

      resizeObserver.disconnect()

      visibilityObserver.disconnect()

      carousel.removeEventListener("pointerenter", onPointerEnter)

      carousel.removeEventListener("pointerleave", onPointerLeave)

      carousel.removeEventListener("focusin", onFocusIn)

      carousel.removeEventListener("focusout", onFocusOut)

      track.removeEventListener("pointerdown", onPointerDown)

      track.removeEventListener("pointermove", onPointerMove)

      track.removeEventListener("pointerup", onPointerEnd)

      track.removeEventListener("pointercancel", onPointerEnd)

      track.removeEventListener("lostpointercapture", onPointerEnd)

      track.removeEventListener("scroll", onScroll)

      track.removeEventListener("keydown", onKeyDown)

      window.removeEventListener("blur", onWindowBlur)

      window.removeEventListener("focus", onWindowFocus)

      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [copyCount, reducedMotion])

  return (
    <section
      id="habilidades"
      className="py-32 overflow-hidden"
      style={{ background: "var(--bg-stack)" }}
    >
      {/* Header */}
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className="w-wide mb-12"
        style={revealStyle(headVisible)}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {copy.eyebrow}
        </p>
        <p
          className="text-xl md:text-2xl font-medium leading-snug"
          style={{ color: "var(--text-secondary)" }}
        >
          {copy.text}{" "}
          <span
            className="font-serif italic"
            style={{ color: "var(--text-primary)" }}
          >
            {copy.emphasis}
          </span>
        </p>
      </div>

      <div ref={carouselRef}>
        <div
          ref={trackRef}
          className="flex select-none pb-2"
          style={{
            cursor: dragging ? "grabbing" : "grab",

            overflowX: "auto",

            scrollbarWidth: "none",

            scrollBehavior: "auto",

            touchAction: "pan-y",

            overscrollBehaviorX: "contain",
          }}
          role="region"
          aria-roledescription={copy.roleDescription}
          aria-label={copy.regionLabel}
          aria-describedby={instructionsId}
          tabIndex={0}
        >
          {Array.from({ length: reducedMotion ? 1 : copyCount }, (_, index) => (
            <ul
              key={index}
              ref={
                index === 0
                  ? firstSequenceRef
                  : index === 1
                    ? secondSequenceRef
                    : undefined
              }
              className="flex w-max shrink-0 list-none gap-3 pr-3"
              aria-hidden={index !== (reducedMotion ? 0 : 1) ? true : undefined}
              aria-label={
                index === (reducedMotion ? 0 : 1) ? copy.listLabel : undefined
              }
            >
              {carouselCards.map((card) => (
                <StackGroup key={card.group} {...card} />
              ))}
            </ul>
          ))}
        </div>

        <div className="w-wide mt-5 flex flex-wrap items-center justify-between gap-4">
          <p
            id={instructionsId}
            className="max-w-xl text-[11px] leading-relaxed"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {reducedMotion ? copy.drag : copy.pauseAndDrag} {copy.keyboard}
          </p>
          {reducedMotion ? (
            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {copy.reducedMotion}
            </span>
          ) : (
            <button
              type="button"
              className="min-h-11 shrink-0 rounded px-3 text-[11px] font-medium underline underline-offset-4"
              style={{ color: "var(--text-primary)" }}
              onClick={() => playbackRef.current?.(!manualPauseRef.current)}
              aria-label={manualPaused ? copy.playAria : copy.pauseAria}
            >
              {manualPaused ? copy.play : copy.pause}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
