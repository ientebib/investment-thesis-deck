"use client";

import { DeckPlayer } from "@/components/deck/DeckPlayer";
import { shortDeckSections, shortDeckSlides } from "@/components/deck/shortDeckRegistry";

export function ReactDeckShort() {
  return <DeckPlayer sections={shortDeckSections} slides={shortDeckSlides} desktopViewHref="/deck-react-short?desktop=1" />;
}
