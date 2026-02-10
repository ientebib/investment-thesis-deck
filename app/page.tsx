"use client";

import { FormEvent, useEffect, useState } from "react";
import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";

const DEFAULT_ACCESS_HASH = "c3RhY2syMDI2";

export default function HomePage() {
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("deck_auth") === "1") {
      window.location.href = "/deck-react";
    }
  }, []);

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accessHash = process.env.NEXT_PUBLIC_ACCESS_HASH ?? DEFAULT_ACCESS_HASH;

    if (btoa(password) === accessHash) {
      sessionStorage.setItem("deck_auth", "1");
      window.location.href = "/deck-react";
      return;
    }

    setPassword("");
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  }

  return (
    <main className="auth-body">
      <div className="gate">
        <div className="gate-logo-wrap">
          <NeuralStackLogo size={120} interactive animate density="high" />
        </div>
        <div className="title-main">Stack Holdings</div>
        <div className="title-underline" />
        <div className="title-definition">
          <span className="title-definition-term">Stack</span>{" "}
          <span className="title-definition-phonetic">/stak/</span>{" "}
          <span className="title-definition-pos">— noun</span>
          <div className="title-definition-meaning">
            The global infrastructure through which the planet thinks. From earth to cloud.
          </div>
        </div>

        <form id="authForm" onSubmit={handleAuth}>
          <div className="input-group">
            <input
              type="password"
              id="passInput"
              placeholder="Enter password"
              autoComplete="off"
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Enter Presentation
          </button>
        </form>

        <div className={`error-msg ${showError ? "show" : ""}`}>Incorrect access code</div>
        <div className="title-confidential" style={{ marginTop: 28 }}>
          Confidential &middot; February 2026
        </div>
      </div>
    </main>
  );
}
