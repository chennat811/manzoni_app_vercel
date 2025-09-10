// app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://';

export default function AuthCallback() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      // Preferred: forward to exact deep link from the app
      // App sends: .../auth/callback?target=<encodeURIComponent(Linking.createURL('signin', { scheme }))>
      const target = url.searchParams.get('target');
      if (target) {
        // Preserve other params (?code=...) and the hash (#access_token=...)
        const allParams = new URLSearchParams(url.search.replace(/^\?/, ''));
        allParams.delete('target'); // avoid echoing target back
        const forwardQuery = allParams.toString();
        const finalUrl = `${target}${forwardQuery ? `?${forwardQuery}` : ''}${url.hash}`;
        window.location.replace(finalUrl);
        return;
      }

      // Fallback: use scheme + inferred path from type (signup|recovery)
      const type = url.searchParams.get('type');
      const targetPath = type === 'recovery' ? 'reset-password' : 'signin';

      // Normalize '+' which can be decoded as spaces in some flows
      const rawScheme = url.searchParams.get('scheme') || DEFAULT_SCHEME;
      const scheme = decodeURIComponent(rawScheme).replace(/ /g, '+');

      const finalUrl = `${scheme}${targetPath}${url.search}${url.hash}`;
      window.location.replace(finalUrl);
    } catch (e) {
      console.error('Auth callback redirect error:', e);
      document.body.innerHTML = '<p>Link redirect failed. Please reopen the app and try again.</p>';
    }
  }, []);

  return <p>Redirecting…</p>;
}