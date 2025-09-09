'use client';

import { useEffect } from 'react';

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://';

export default function ResetPasswordRedirect() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      // Allow overriding the scheme via query param from your app
      // e.g., redirectTo = https://.../reset-password?scheme=exp+new_ai_food_app://
      const scheme = url.searchParams.get('scheme') || DEFAULT_SCHEME;

      // Supabase may send ?code=... (PKCE) or hash tokens (#access_token=...)
      const query = url.search; // includes leading '?'
      const hash = url.hash;    // includes leading '#'

      // Match the path configured in App.tsx linking.config.screens.ResetPassword
      const path = 'reset-password';

      // Construct final deep link preserving both query and hash
      const target = `${scheme}${path}${query}${hash}`;

      // Redirect into the app
      window.location.replace(target);
    } catch (e) {
      console.error('Reset password redirect error:', e);
      // Optional: show a friendly fallback message
      document.body.innerHTML = '<p>Link redirect failed. Please reopen the app and try again.</p>';
    }
  }, []);

  return <p>Redirecting to the app…</p>;
}