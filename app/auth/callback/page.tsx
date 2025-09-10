// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== "production"
    ? "exp+new_ai_food_app://"
    : "newaifoodapp://";

export default function AuthCallback() {
  useEffect(() => {
    const { search, hash } = window.location;
    const url = new URL(window.location.href);

    // Allow ?scheme= override (e.g., scheme=exp+new_ai_food_app://)
    const scheme = url.searchParams.get("scheme") || DEFAULT_SCHEME;

    // Supabase sets type=signup|recovery
    const type = url.searchParams.get("type");
    const targetPath = type === "recovery" ? "reset-password" : "signin";

    // Preserve both ?… and #… when bouncing back into the app
    const target = `${scheme}${targetPath}${search}${hash}`;
    window.location.replace(target);
  }, []);

  return null;
}