'use client';

import { useEffect } from 'react';

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://';

export default function ResetPasswordRedirect() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      // Preferred: forward to the exact runtime deep link if provided by the app
      // App should send redirectTo like:
      //   https://manzoni-nutrition.vercel.app/reset-password?target=<encodeURIComponent(Linking.createURL('reset-password'))>
      const target = url.searchParams.get('target');
      if (target) {
        // Preserve Supabase’s other query params (e.g. ?code=...) and hash (#access_token=...)
        const allParams = new URLSearchParams(url.search.replace(/^\?/, ''));
        allParams.delete('target'); // avoid echoing target
        const forwardQuery = allParams.toString();
        const finalUrl = `${target}${forwardQuery ? `?${forwardQuery}` : ''}${url.hash}`;
        window.location.replace(finalUrl);
        return;
      }

      // Fallback: use a scheme, but normalize any accidental spaces where '+' might have been decoded
      const rawScheme = url.searchParams.get('scheme') || DEFAULT_SCHEME;
      const scheme = decodeURIComponent(rawScheme).replace(/ /g, '+'); // normalize '+' if needed
      const finalUrl = `${scheme}reset-password${url.search}${url.hash}`;
      window.location.replace(finalUrl);
    } catch (e) {
      console.error('Reset password redirect error:', e);
      document.body.innerHTML = '<p>Link redirect failed. Please reopen the app and try again.</p>';
    }
  }, []);

  return <p>Redirecting…</p>;
}