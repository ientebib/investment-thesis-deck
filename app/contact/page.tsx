"use client";

import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";

export default function ContactPage() {
  return (
    <main className="contact-body">
      <div className="contact-card">
        <div className="contact-logo-wrap">
          <NeuralStackLogo size={64} interactive animate density="high" />
        </div>
        <p className="contact-kicker">Stack Capital</p>
        <h1 className="contact-title">Investor Relations</h1>
        <p className="contact-subtitle">
          For inquiries about the fund, allocation, or partnership opportunities.
        </p>

        <div className="contact-details">
          <div className="contact-row">
            <span className="contact-row-label">Marcos</span>
            <a className="contact-row-value" href="mailto:marcos@thestack.capital">
              marcos@thestack.capital
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-row-label">Isaac</span>
            <a className="contact-row-value" href="mailto:isaac@thestack.capital">
              isaac@thestack.capital
            </a>
          </div>
        </div>

        <div className="contact-note">
          <p>
            Stack Capital is a private investment vehicle. Access to fund
            materials and the investor portal is available to qualified
            investors upon completion of the onboarding process.
          </p>
        </div>

        <div className="contact-footer">
          <a href="/investor-login" className="contact-footer-link">&larr; Back</a>
        </div>
      </div>
    </main>
  );
}
