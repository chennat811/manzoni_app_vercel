'use client';

import { useEffect } from 'react';

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://';

export default function ResetPasswordRedirect() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      // Preferred: if you send a precise target from the app (e.g., exp://.../--/reset-password)
      // via redirectTo ?target=<encoded URL>, we forward to it.
      const target = url.searchParams.get('target');
      if (target) {
        const params = new URLSearchParams(url.search.replace(/^\?/, ''));
        params.delete('target');
        const forwardQuery = params.toString();
        const finalUrl = `${target}${forwardQuery ? `?${forwardQuery}` : ''}${url.hash}`;
        window.location.replace(finalUrl);
        return;
      }

      // Fallback: scheme + fixed path, preserve both query and hash exactly
      const scheme = url.searchParams.get('scheme') || DEFAULT_SCHEME;
      const finalUrl = `${scheme}reset-password${url.search}${url.hash}`;
      window.location.replace(finalUrl);
    } catch (e) {
      console.error('Reset password redirect error:', e);
      document.body.innerHTML =
        '<p>Link redirect failed. Please reopen the app and try again.</p>';
    }
  }, []);

  return <p>Redirecting…</p>;
}