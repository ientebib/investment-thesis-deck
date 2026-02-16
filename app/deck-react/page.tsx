"use client";

import { ReactDeck } from "@/components/deck/ReactDeck";
import { DeckAuthGate } from "@/components/ui/DeckAuthGate";

export default function DeckReactPage() {
  return (
    <DeckAuthGate>
      <ReactDeck />
    </DeckAuthGate>
  );
}
