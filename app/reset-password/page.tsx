"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Same default scheme convention as your /auth/callback route:
const DEFAULT_SCHEME =
  process.env.NODE_ENV !== "production" ? "exp+new_ai_food_app://" : "newaifoodapp://";

function parseHashParams(hash: string) {
  // hash comes like "#access_token=...&refresh_token=...&type=recovery"
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  const params = new URLSearchParams(trimmed);
  return {
    access_token: params.get("access_token") || undefined,
    refresh_token: params.get("refresh_token") || undefined,
    type: params.get("type") || undefined,
  };
}

function ResetPasswordForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Allow ?scheme= override for where to send the user back in the app after success
  const scheme = params.get("scheme") || DEFAULT_SCHEME;

  // Read tokens from the URL hash on the client
  const { access_token, refresh_token } = useMemo(() => {
    if (typeof window === "undefined") return { access_token: undefined, refresh_token: undefined };
    return parseHashParams(window.location.hash || "");
  }, [typeof window !== "undefined" && window.location.hash]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    if (!password || password.length < 6) {
      setMessage("Please enter a password with at least 6 characters.");
      return;
    }
    if (!access_token) {
      setMessage("Missing reset token.");
      return;
    }

    setSubmitting(true);

    // Set the current session with the reset token(s)
    const { error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || access_token, // fallback if refresh_token absent
    });

    if (sessionError) {
      setMessage("Error setting session: " + sessionError.message);
      setSubmitting(false);
      return;
    }

    // Update the password
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Error: " + error.message);
      setSubmitting(false);
      return;
    }

    setMessage("Password updated successfully! Redirecting to app...");
    // Optional: brief delay then deep link back to the app sign-in screen
    setTimeout(() => {
      // You can target a specific route in your app, e.g., "signin"
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

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}