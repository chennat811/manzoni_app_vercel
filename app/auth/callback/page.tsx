// app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://';

export default function AuthCallback() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      // 1) Preferred: if the app provided an exact runtime deep link, forward to it
      // App can send: https://.../auth/callback?target=<encodeURIComponent(Linking.createURL('signin'))>
      const target = url.searchParams.get('target');
      if (target) {
        // Preserve Supabase’s other params and the hash
        const allParams = new URLSearchParams(url.search.replace(/^\?/, ''));
        allParams.delete('target'); // don’t echo target itself
        const forwardQuery = allParams.toString();
        const finalUrl = `${target}${forwardQuery ? `?${forwardQuery}` : ''}${url.hash}`;
        window.location.replace(finalUrl);
        return;
      }

      // 2) Fallback: use a scheme + inferred path based on type
      // type=signup|recovery (from Supabase)
      const type = url.searchParams.get('type');
      const targetPath = type === 'recovery' ? 'reset-password' : 'signin';

      // Normalize any accidental spaces where '+' might be decoded
      const rawScheme = url.searchParams.get('scheme') || DEFAULT_SCHEME;
      const scheme = decodeURIComponent(rawScheme).replace(/ /g, '+');

      // Preserve both ?… and #…
      const finalUrl = `${scheme}${targetPath}${url.search}${url.hash}`;
      window.location.replace(finalUrl);
    } catch (e) {
      console.error('Auth callback redirect error:', e);
      document.body.innerHTML = '<p>Link redirect failed. Please reopen the app and try again.</p>';
    }
  }, []);

  return <p>Redirecting…</p>;
}