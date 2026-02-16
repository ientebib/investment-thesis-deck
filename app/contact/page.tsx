"use client";

import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";

export default function ContactPage() {
  return (
    <main className="contact-body">
      <div className="contact-card">
        <p className="contact-kicker">Stack Capital</p>
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
            Stack Capital is a private investment vehicle. Fund materials
            and portal access are extended to qualified investors following
            subscription and KYC review.
          </p>
        </div>

        <div className="contact-footer">
          <a href="/investor-login" className="contact-footer-link">&larr; Back</a>
        </div>
      </div>
    </main>
  );
}
