import interconnectionSeries from "@/lib/data/series/interconnection_queue_gw_2014_2024.json";
import type { Slide57InterconnectionData } from "@/lib/data/types";

const rows = interconnectionSeries as Array<{
  year: number;
  active_queue_gw: number;
}>;

export const slide57InterconnectionData: Slide57InterconnectionData = {
  sectionLabel: "APPENDIX - POWER",
  title: "Interconnection queues stretch 5-7 years",
  subtitle: "The grid cannot accommodate projected demand without large new transmission investment",
  points: rows.map((row) => ({
    year: row.year,
    activeQueueGw: row.active_queue_gw
  })),
  annotationHeading: "First decline",
  annotationDetail: "Gas projects +72%",
  sourceLine: "Source: Lawrence Berkeley National Lab, PJM, EIA"
};
