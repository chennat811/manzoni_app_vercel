"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const APP_SCHEME = "myapp://reset-password";

    // Supabase sometimes sends tokens in the hash (#...), sometimes in query (?)
    const hash = window.location.hash || "";
    const query = window.location.search || "";
    const params = hash ? hash.replace(/^#/, "?") : query;

    window.location.replace(APP_SCHEME + params);
  }, [searchParams]);

  return <p>Redirecting to app…</p>;
}
