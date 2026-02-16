import type { ReactNode } from "react";

export type DeckSection = {
  from: number;
  to: number;
  label: string;
};

export type DeckSlide = {
  number: number;
  title: string;
  sectionLabel: string;
  migrationStatus: "migrated" | "pending";
  content: ReactNode;
};
