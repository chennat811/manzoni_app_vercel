// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== "production"
    ? "exp+new_ai_food_app://"
    : "newaifoodapp://";

export default function AuthCallback() {
  useEffect(() => {
    // Read everything from the browser, including the hash fragment
    const { search, hash } = window.location;
    const url = new URL(window.location.href);

    // Allow ?scheme= override for dev/testing
    const scheme = url.searchParams.get("scheme") || DEFAULT_SCHEME;

    // Supabase sends type=signup|recovery to indicate flow
    const type = url.searchParams.get("type");
    const targetPath = type === "recovery" ? "reset-password" : "signin";

    // Build deep link preserving both search (?...) and hash (#...)
    const target = `${scheme}${targetPath}${search}${hash}`;

    // Use replace so back button won’t return here
    window.location.replace(target);
  }, []);

  return null;
}