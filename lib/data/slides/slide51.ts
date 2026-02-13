import type { Slide51FundStructureData } from "@/lib/data/types";

export const slide51FundStructureData: Slide51FundStructureData = {
  sectionLabel: "FUND STRUCTURE",
  title: "Fund structure",
  subtitle: "Economics, fee mechanics, and liquidity",
  leftSections: [
    {
      title: "Strategy",
      rows: [
        { label: "Type", value: "Liquid global macro, quant and value-oriented" },
        { label: "Instruments", value: "Equities, commodities, FX, bonds, crypto, and derivatives" },
        { label: "Liquidity", value: "Fully liquid under normal market conditions" },
      ],
    },
    {
      title: "Management Fee",
      rows: [
        { label: "Rate", value: "2.00% per annum" },
        { label: "Basis", value: "Average daily NAV" },
        { label: "Accrual", value: "Daily" },
      ],
    },
    {
      title: "Performance Fee",
      rows: [
        { label: "Rate", value: "20% performance fee" },
        { label: "Hurdle", value: "5% annual hard hurdle" },
        { label: "Catch-Up", value: "Full catch-up provision" },
        { label: "HWM", value: "Investor-level High-Water Mark" },
      ],
    },
    {
      title: "Gates",
      rows: [
        { label: "Current", value: "No fund-level gate at launch" },
        { label: "Future", value: "May be introduced if capital concentration increases" },
      ],
    },
  ],
  rightSections: [
    {
      title: "Subscriptions",
      rows: [
        { label: "Frequency", value: "Quarterly" },
        { label: "Effective Date", value: "Last business day of each calendar quarter" },
        { label: "Participation", value: "Starting next quarter" },
      ],
    },
    {
      title: "Redemptions",
      rows: [
        { label: "Frequency", value: "Quarterly" },
        { label: "Redemption Date", value: "Last business day of each quarter" },
        { label: "Notice Period", value: "Minimum 60 days prior" },
        { label: "Effective Window", value: "60\u201390 days depending on submission timing" },
      ],
    },
    {
      title: "Soft Lock-Up",
      rows: [
        { label: "Duration", value: "12 months from subscription date" },
        { label: "Early Redemption Fee", value: "3%" },
        { label: "Fee Recipient", value: "Paid to the fund (not the manager)" },
        { label: "Fee Timing", value: "Applied after performance fee, deducted from proceeds" },
      ],
    },
  ],
  sourceLine: "",
};
