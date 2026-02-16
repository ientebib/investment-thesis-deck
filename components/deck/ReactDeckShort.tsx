"use client";

import { DeckPlayer } from "@/components/deck/DeckPlayer";
import { shortDeckSections, shortDeckSlides } from "@/components/deck/shortDeckRegistry";

export function ReactDeckShort() {
  return (
    <div className="pitch-deck">
      <DeckPlayer sections={shortDeckSections} slides={shortDeckSlides} desktopViewHref="/deck-react-short?desktop=1" />
    </div>
  );
}
