import type { Slide58PackagingChokepointData } from "@/lib/data/types";

export const slide58PackagingChokepointData: Slide58PackagingChokepointData = {
  sectionLabel: "APPENDIX - SUPPLY CHAIN",
  title: "GPU supply is a packaging story, not just a wafer story",
  subtitle: "CoWoS + HBM is the second chokepoint after leading-edge silicon",
  anatomyTitle: "GPU package anatomy",
  anatomySubtitle: "TSMC CoWoS-S and HBM integration determine shipped accelerator volume",
  hbmTitle: "HBM capacity per GPU - each generation requires more",
  hbmProgression: [
    { model: "H100 (Hopper)", memoryGb: "80 GB", stackConfig: "5 x HBM3", tone: "secondary" },
    { model: "B200 (Blackwell)", memoryGb: "192 GB", stackConfig: "8 x HBM3e", tone: "primary" },
    { model: "R100 (Rubin)", memoryGb: "288 GB", stackConfig: "12 x HBM4", tone: "negative" }
  ],
  metrics: [
    { value: "~90%", label: "SK Hynix HBM3e share" },
    { value: "12-18 mo", label: "HBM allocation lead time" }
  ],
  takeawayTitle: "Portfolio implication",
  takeawayBody:
    "Packaging and memory bottlenecks cap delivered compute, even when wafer starts expand. Capacity pricing power accrues to upstream physical suppliers.",
  sourceLine: "Source: TSMC earnings, SK Hynix disclosures, SemiAnalysis"
};
