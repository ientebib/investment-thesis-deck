"use client";

import { DeckPlayer } from "@/components/deck/DeckPlayer";
import { deckSections, deckSlides } from "@/components/deck/slideRegistry";

export function ReactDeck() {
  return <DeckPlayer sections={deckSections} slides={deckSlides} />;
}
