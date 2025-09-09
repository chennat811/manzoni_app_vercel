"use client";

import { useEffect } from "react";

export default function AuthCallbackPage() {
  useEffect(() => {
    // Scheme for Expo Go vs production app
    const DEFAULT_SCHEME =
      process.env.NODE_ENV !== "production"
        ? "exp+new_ai_food_app://"
        : "newaifoodapp://";

    // Parse tokens from Supabase redirect
    const hash = window.location.hash || "";
    const query = window.location.search || "";
    const params = hash ? hash.replace(/^#/, "?") : query;

    // Build target deep link
    const target = `${DEFAULT_SCHEME}signin${params}`;

    // Redirect into app
    window.location.replace(target);
  }, []);

  return <p>Redirecting to app…</p>;
}
