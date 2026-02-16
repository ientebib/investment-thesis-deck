"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { DeckSection, DeckSlide } from "@/components/deck/types";
import { SlideHeaderBar } from "@/components/ui";

type DeckPlayerProps = {
  sections: DeckSection[];
  slides: DeckSlide[];
  desktopViewHref?: string;
};

const NEXT_KEYS = new Set(["ArrowRight", "ArrowDown"]);
const PREV_KEYS = new Set(["ArrowLeft", "ArrowUp"]);

export function DeckPlayer({ sections, slides, desktopViewHref = "/deck-react?desktop=1" }: DeckPlayerProps) {
  const [currentSlideNumber, setCurrentSlideNumber] = useState(slides[0]?.number ?? 1);
  const [showNav, setShowNav] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => new Set([slides[0]?.number ?? 1]));
  const rootRef = useRef<HTMLElement>(null);
  const navTimerRef = useRef<number | null>(null);

  const orderedSlideNumbers = useMemo(
    () => [...slides.map((slide) => slide.number)].sort((a, b) => a - b),
    [slides]
  );
  const slideNumberSet = useMemo(() => new Set(orderedSlideNumbers), [orderedSlideNumbers]);

  const currentSlide = slides.find((slide) => slide.number === currentSlideNumber) ?? slides[0];
  const totalSlides = slides.length;

  const slideIndexByNumber = useMemo(() => {
    const map = new Map<number, number>();
    slides.forEach((slide, index) => {
      map.set(slide.number, index);
    });
    return map;
  }, [slides]);

  const currentIndex = slideIndexByNumber.get(currentSlideNumber) ?? 0;
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;
  const displaySlideNumber = currentIndex + 1;

  function setSlideByNumber(target: number) {
    if (!slideNumberSet.has(target)) {
      return;
    }
    setCurrentSlideNumber(target);
  }

  const stepSlide = useCallback(
    (direction: 1 | -1) => {
      setCurrentSlideNumber((previous) => {
        const current = orderedSlideNumbers.indexOf(previous);
        if (current === -1) {
          return orderedSlideNumbers[0] ?? previous;
        }
        const target = Math.max(0, Math.min(orderedSlideNumbers.length - 1, current + direction));
        return orderedSlideNumbers[target];
      });
    },
    [orderedSlideNumbers]
  );

  const nextSlide = useCallback(() => stepSlide(1), [stepSlide]);
  const prevSlide = useCallback(() => stepSlide(-1), [stepSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => undefined);
      return;
    }
    document.exitFullscreen().catch(() => undefined);
  }, []);

  const revealNav = useCallback(() => {
    setShowNav(true);
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current);
    }
    navTimerRef.current = window.setTimeout(() => setShowNav(false), 800);
  }, []);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceDesktop = params.get("desktop") === "1";
    const mediaQuery = window.matchMedia("(max-width: 980px)");

    const applyLayout = () => {
      setIsMobileLayout(mediaQuery.matches && !forceDesktop);
    };

    applyLayout();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", applyLayout);
      return () => mediaQuery.removeEventListener("change", applyLayout);
    }
    mediaQuery.addListener(applyLayout);
    return () => mediaQuery.removeListener(applyLayout);
  }, []);

  // Dev helper: expose navigation to console for QA
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__deckGoTo = (n: number) => setSlideByNumber(n);
    return () => { delete (window as unknown as Record<string, unknown>).__deckGoTo; };
  });

  useEffect(() => {
    if (!isMobileLayout) {
      setShowMobileHint(false);
      return;
    }
    setVisitedSlides(new Set(slides.map((slide) => slide.number)));
  }, [isMobileLayout, slides]);

  useEffect(() => {
    if (!isMobileLayout) {
      return;
    }

    const key = "deck-mobile-hint-seen";
    const alreadySeen = window.sessionStorage.getItem(key) === "1";
    if (alreadySeen) {
      setShowMobileHint(false);
      return;
    }

    setShowMobileHint(true);
    const timer = window.setTimeout(() => {
      setShowMobileHint(false);
      window.sessionStorage.setItem(key, "1");
    }, 3500);

    function hideHint() {
      setShowMobileHint(false);
      window.sessionStorage.setItem(key, "1");
      window.clearTimeout(timer);
    }

    window.addEventListener("scroll", hideHint, { passive: true, once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", hideHint);
    };
  }, [isMobileLayout]);

  useEffect(() => {
    if (isMobileLayout) {
      return;
    }
    // Lazy-mount: mark slide as visited so its content renders
    // only when the slide is first displayed (visible with real dimensions).
    setVisitedSlides((prev) => {
      if (prev.has(currentSlideNumber)) return prev;
      const next = new Set(prev);
      next.add(currentSlideNumber);
      return next;
    });
    // Chart.js needs a resize event to recalculate dimensions
    const timer = setTimeout(() => window.dispatchEvent(new Event("resize")), 80);
    return () => clearTimeout(timer);
  }, [currentSlideNumber, isMobileLayout]);

  useEffect(() => {
    if (isMobileLayout) {
      return;
    }
    function isEditableTarget(target: EventTarget | null) {
      const element = target as HTMLElement | null;
      if (!element) {
        return false;
      }
      return (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT" ||
        element.isContentEditable
      );
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      // Never hijack browser/system shortcuts like Cmd+J.
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (NEXT_KEYS.has(event.key)) {
        event.preventDefault();
        nextSlide();
        revealNav();
      } else if (PREV_KEYS.has(event.key)) {
        event.preventDefault();
        prevSlide();
        revealNav();
      } else if (event.key === "f" || event.key === "F") {
        toggleFullscreen();
        revealNav();
      } else if (event.key === "d" || event.key === "D") {
        setDebugMode((prev) => !prev);
        revealNav();
      }
    }

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [isMobileLayout, nextSlide, prevSlide, revealNav, toggleFullscreen]);

  useEffect(() => {
    if (isMobileLayout) {
      setShowNav(false);
      return;
    }
    revealNav();

    function onMove() {
      revealNav();
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      if (navTimerRef.current !== null) {
        window.clearTimeout(navTimerRef.current);
      }
      window.removeEventListener("mousemove", onMove);
    };
  }, [isMobileLayout, revealNav]);

  return (
    <main
      className={`deck-react ${isMobileLayout ? "mobile-layout" : ""}`}
      ref={rootRef}
      tabIndex={0}
      onMouseDown={() => rootRef.current?.focus()}
      onTouchStart={() => rootRef.current?.focus()}
    >
      {isMobileLayout && showMobileHint ? (
        <div className="mobile-deck-banner">
          <span>Best experienced on desktop.</span>
          <div className="mobile-deck-banner-actions">
            <a className="mobile-deck-banner-link" href={desktopViewHref}>
              Open Desktop View
            </a>
            <button className="mobile-deck-banner-close" onClick={() => setShowMobileHint(false)} aria-label="Dismiss hint">
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
      <div className="presentation" id="presentation">
        {slides.map((slide, index) => (
          <section
            key={slide.number}
            className={`slide ${isMobileLayout || slide.number === currentSlideNumber ? "active" : ""}`}
            id={`slide-${slide.number}`}
          >
            {debugMode ? (
              <div className="debug-badge">
                <span>Slide {slide.number}</span>
                <span>{slide.migrationStatus.toUpperCase()}</span>
                <span>{slide.title}</span>
              </div>
            ) : null}
            {slide.number !== 1 && (
              <>
                <SlideHeaderBar slideNumber={index + 1} totalSlides={totalSlides} />
                <hr className="slide-separator" />
              </>
            )}
            <div className="slide-content-zone">
              {visitedSlides.has(slide.number) ? slide.content : null}
            </div>
          </section>
        ))}
      </div>

      <div className="deck-bottom-bar" style={{ display: isMobileLayout ? "none" : undefined }}>
        <div className="progress-bar" id="progressBar" style={{ width: `${progressPercent}%` }} />
        <div className="deck-bottom-content">
          <Link className="deck-home-link" href="/" title="Back to materials">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
          <div className="section-nav" id="sectionNav">
            {sections.map((section, index) => {
              const active = currentSlideNumber >= section.from && currentSlideNumber <= section.to;
              const isSecondarySection =
                section.label === "Macro Thesis" ||
                section.label === "AI Infrastructure";
              return (
                <div key={section.label} className="section-nav-group">
                  <button
                    className={`section-nav-btn ${active ? "active-section" : ""} ${active && isSecondarySection ? "active-section--secondary" : ""}`}
                    onClick={() => setSlideByNumber(section.from)}
                  >
                    {section.label}
                  </button>
                  {index < sections.length - 1 ? <div className="section-nav-sep" /> : null}
                </div>
              );
            })}
          </div>
          <div className="controls">
            <button className="fs-btn" onClick={toggleFullscreen} title="Press F">
              ⛶
            </button>
            <div className="slide-counter" id="slideCounter">
              {displaySlideNumber} / {totalSlides}
            </div>
          </div>
        </div>
      </div>

{/* Status pill removed — header bar provides context */}
    </main>
  );
}
