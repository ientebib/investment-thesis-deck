"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";

export default function InvestorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowBlocked(true);
  }

  return (
    <main className="investor-login-body">
      <div className="investor-login-card">
        <div className="investor-login-logo-wrap">
          <NeuralStackLogo size={64} interactive animate density="high" />
        </div>
        <p className="investor-login-kicker">Stack Capital</p>
        <h1 className="investor-login-title">Investor Portal</h1>

        {showBlocked ? (
          <div className="investor-login-blocked">
            <div className="investor-login-blocked-icon">&#9679;</div>
            <h2 className="investor-login-blocked-title">Access Pending</h2>
            <p className="investor-login-blocked-copy">
              Your account is under review. LP portal access is granted after
              final commitment and onboarding is complete.
            </p>
            <p className="investor-login-blocked-copy">
              If you believe this is an error, please contact{" "}
              <a href="/contact" className="investor-login-blocked-link">
                investor relations
              </a>.
            </p>
            <button
              className="investor-login-back-btn"
              onClick={() => setShowBlocked(false)}
            >
              Try again
            </button>
          </div>
        ) : (
          <form className="investor-login-form" onSubmit={handleSubmit}>
            <div className="investor-login-field">
              <label className="investor-login-label" htmlFor="inv-email">
                Email
              </label>
              <input
                id="inv-email"
                className="investor-login-input"
                type="email"
                placeholder="name@firm.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="investor-login-field">
              <label className="investor-login-label" htmlFor="inv-pass">
                Password
              </label>
              <input
                id="inv-pass"
                className="investor-login-input"
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="investor-login-submit">
              Sign In
            </button>
          </form>
        )}

        <div className="investor-login-become">
          <a href="/contact" className="investor-login-become-link">
            Want to become an investor? Contact us &rarr;
          </a>
        </div>

        <div className="investor-login-footer">
          <Link href="/" className="investor-login-footer-link">&larr; Back</Link>
        </div>
      </div>

    </main>
  );
}
