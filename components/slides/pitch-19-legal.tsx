import { SectionHeader, SourceLine } from "@/components/ui";

const requirements = [
  { label: "Investor Eligibility", value: "Accredited investors only (SEC Rule 501)" },
  { label: "Domicile", value: "Fund domiciled in the United States" },
  { label: "Custody", value: "Assets held with a qualified U.S. custodian" },
  { label: "Administrator", value: "Independent third-party fund administrator" },
  { label: "Auditor", value: "Annual audit by a registered public accounting firm" },
  { label: "Legal Counsel", value: "U.S.-qualified fund counsel" }
];

export function PitchSlide19Legal() {
  return (
    <>
      <SectionHeader
        sectionLabel="LEGAL & COMPLIANCE"
        title="Legal structure & investor eligibility"
        subtitle="U.S.-domiciled fund with institutional-grade governance"
      />

      <div className="pitch-legal-grid">
        {requirements.map((r) => (
          <div key={r.label} className="pitch-legal-item">
            <div className="pitch-legal-label">{r.label}</div>
            <div className="pitch-legal-value">{r.value}</div>
          </div>
        ))}
      </div>

      <SourceLine text="" />
    </>
  );
}
