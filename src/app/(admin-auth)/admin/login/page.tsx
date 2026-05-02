"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const sp = useSearchParams();
  const nextPath = useMemo(() => sp.get("next") || "/admin", [sp]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }
      window.location.href = nextPath;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-14">
      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">
          Use the email + password configured in `.env` (can be changed later).
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              autoComplete="email"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-2 text-sm"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          <button
            disabled={loading}
            className="w-full rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

