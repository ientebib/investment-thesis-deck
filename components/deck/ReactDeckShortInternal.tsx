"use client";

import { DeckPlayer } from "@/components/deck/DeckPlayer";
import { shortDeckInternalSections, shortDeckInternalSlides } from "@/components/deck/shortDeckInternalRegistry";

export function ReactDeckShortInternal() {
  return (
    <DeckPlayer
      sections={shortDeckInternalSections}
      slides={shortDeckInternalSlides}
      desktopViewHref="/deck-react-short-internal?desktop=1"
    />
  );
}
