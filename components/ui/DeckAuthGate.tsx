"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { NeuralStackLogo } from "@/components/ui/NeuralStackLogo";

const DEFAULT_ACCESS_HASH = "c3RhY2syMDI2";

export function DeckAuthGate({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem("deck_auth") === "1");
    setIsReady(true);
  }, []);

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accessHash = process.env.NEXT_PUBLIC_ACCESS_HASH ?? DEFAULT_ACCESS_HASH;

    if (btoa(password) === accessHash) {
      sessionStorage.setItem("deck_auth", "1");
      setIsAuthenticated(true);
      setPassword("");
      return;
    }

    setPassword("");
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
  }

  if (!isReady) return null;

  if (isAuthenticated) return <>{children}</>;

  return (
    <main className="auth-body">
      <div className="gate">
        <div className="gate-logo-wrap">
          <NeuralStackLogo size={100} interactive animate density="high" />
        </div>
        <div className="title-main">Stack Capital</div>
        <div className="title-underline" />
        <p className="gate-hint">Enter access code to view materials</p>

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
            Enter
          </button>
        </form>

        <div className={`error-msg ${showError ? "show" : ""}`}>Incorrect access code</div>

        <Link href="/" className="gate-back-link">&larr; Back to materials</Link>
      </div>
    </main>
  );
}
