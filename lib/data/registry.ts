import manifest from "@/migration/slide_manifest.json";

export type SlideDataStatus = "react-dataset";

export type SlideDataSource = {
  slide: number;
  title: string;
  status: SlideDataStatus;
  sources: string[];
};

const reactDatasetSources: Record<number, string[]> = {
  1: ["lib/data/slides/slide01.ts"],
  2: ["lib/data/slides/slide02.ts"],
  3: ["lib/data/slides/slide03.ts"],
  4: ["lib/data/slides/slide04.ts"],
  5: ["lib/data/slides/slide05.ts"],
  6: ["lib/data/slides/slide06.ts"],
  7: ["lib/data/slides/slide07.ts"],
  8: ["lib/data/slides/slide08.ts"],
  9: ["lib/data/slides/slide09.ts"],
  10: ["lib/data/slides/slide10.ts"],
  11: ["lib/data/slides/slide11.ts"],
  12: ["lib/data/slides/slide12.ts"],
  13: ["lib/data/slides/slide13.ts"],
  14: ["lib/data/slides/slide14.ts"],
  15: ["lib/data/slides/slide15.ts"],
  16: ["lib/data/slides/slide16.ts"],
  17: ["lib/data/slides/slide17.ts"],
  18: ["lib/data/slides/slide18.ts"],
  19: ["lib/data/slides/slide19.ts"],
  20: ["lib/data/slides/slide20.ts"],
  21: ["lib/data/slides/slide21.ts"],
  22: ["lib/data/slides/slide22.ts"],
  23: ["lib/data/slides/slide23.ts"],
  24: ["lib/data/slides/slide24.ts"],
  25: ["lib/data/slides/slide25.ts"],
  26: ["lib/data/slides/slide26.ts"],
  27: ["lib/data/slides/slide27.ts"],
  28: ["lib/data/slides/slide28.ts"],
  29: ["lib/data/slides/slide29.ts"],
  30: ["lib/data/slides/slide30.ts"],
  31: ["lib/data/slides/slide31.ts"],
  32: ["lib/data/slides/slide32.ts"],
  33: ["lib/data/slides/slide33.ts"],
  34: ["lib/data/slides/slide34.ts"],
  35: ["lib/data/slides/slide35.ts"],
  36: ["lib/data/slides/slide36.ts"],
  37: ["lib/data/slides/slide37.ts"],
  38: ["lib/data/slides/slide38.ts"],
  39: ["lib/data/slides/slide39.ts"],
  40: ["lib/data/slides/slide40.ts"],
  41: ["lib/data/slides/slide41.ts"],
  42: ["lib/data/slides/slide42.ts"],
  43: ["lib/data/slides/slide43.ts"],
  44: ["lib/data/slides/slide44.ts"],
  45: ["lib/data/slides/slide45.ts"],
  46: ["lib/data/slides/slide46.ts"],
  47: ["lib/data/slides/slide47.ts"],
  48: ["lib/data/slides/slide48.ts"],
  49: ["lib/data/slides/slide49.ts"],
  50: ["lib/data/slides/slide50.ts"],
  51: ["lib/data/slides/slide51.ts"],
  52: ["lib/data/slides/slide52.ts"],
  53: ["lib/data/slides/slide53.ts"],
  54: ["lib/data/slides/slide54.ts"],
  55: ["lib/data/slides/slide55.ts"],
  56: ["lib/data/slides/slide56.ts"],
  57: ["lib/data/slides/slide57.ts"],
  58: ["lib/data/slides/slide58.ts"],
  59: ["lib/data/slides/slide59.ts"],
  60: ["lib/data/slides/slide60.ts"],
  61: ["lib/data/slides/slide61.ts"],
  62: ["lib/data/slides/slide62.ts"]
};

export const slideDataRegistry: SlideDataSource[] = manifest.slides.map((slide) => {
  const deckNumber = slide.slide === 1 ? 1 : slide.slide + 1;
  return {
    slide: deckNumber,
    title: slide.title || `Slide ${deckNumber}`,
    status: "react-dataset",
    sources: reactDatasetSources[deckNumber] ?? []
  };
});
