"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== "production" ? "exp+new_ai_food_app://" : "newaifoodapp://";

function parseHashParams(hash: string) {
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  const params = new URLSearchParams(trimmed);
  return {
    access_token: params.get("access_token") || undefined,
    refresh_token: params.get("refresh_token") || undefined,
    type: params.get("type") || undefined,
  };
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Read from window on the client
  const { scheme, code, access_token, refresh_token } = useMemo(() => {
    if (typeof window === "undefined") {
      return { scheme: DEFAULT_SCHEME, code: undefined, access_token: undefined, refresh_token: undefined };
    }
    const url = new URL(window.location.href);
    const scheme = url.searchParams.get("scheme") || DEFAULT_SCHEME;
    const code = url.searchParams.get("code") || undefined;
    const { access_token, refresh_token } = parseHashParams(window.location.hash || "");
    return { scheme, code, access_token, refresh_token };
  }, [typeof window !== "undefined" && window.location.href]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!password || password.length < 6) {
      setMessage("Please enter a password with at least 6 characters.");
      return;
    }

    setSubmitting(true);

    // 1) If ?code=... (PKCE style), exchange it for a session
  if (code) {
    // code is string | undefined; guard ensures it’s string here
    const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
    if (exErr) {
      setMessage("Error exchanging code: " + exErr.message);
      setSubmitting(false);
      return;
    }
  }
  // 2) Else if tokens are in the hash (#access_token=...), set the session
  else if (access_token) {
    const { error: sessErr } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || access_token,
    });
    if (sessErr) {
      setMessage("Error setting session: " + sessErr.message);
      setSubmitting(false);
      return;
    }
  } else {
    setMessage("Missing reset token.");
    setSubmitting(false);
    return;
  }

  // 3) Update password
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    setMessage("Error: " + error.message);
    setSubmitting(false);
    return;
  }

  setMessage("Password updated successfully! Redirecting to app...");
  setTimeout(() => {
    window.location.href = `${scheme}signin`;
  }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold">Reset your password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-60"
      >
        {submitting ? "Updating..." : "Update password"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}