import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();

  useEffect(() => {
    // Your deep link scheme (Expo Go or standalone app)
    const APP_SCHEME = "myapp://reset-password";

    // Supabase sends tokens in the hash (#...) or query
    const hash = window.location.hash || "";
    const query = window.location.search || "";
    const params = hash ? hash.replace(/^#/, "?") : query;

    // Redirect to app
    window.location.replace(APP_SCHEME + params);
  }, []);

  return <p>Redirecting to app…</p>;
}
