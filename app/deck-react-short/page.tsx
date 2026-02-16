"use client";

import { ReactDeckShort } from "@/components/deck/ReactDeckShort";
import { DeckAuthGate } from "@/components/ui/DeckAuthGate";

export default function DeckReactShortPage() {
  return (
    <DeckAuthGate>
      <ReactDeckShort />
    </DeckAuthGate>
  );
}
