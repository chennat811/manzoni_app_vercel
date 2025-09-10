// app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';

const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://';

function safeDecodeTwice(s: string) {
  try {
    const once = decodeURIComponent(s);
    try {
      return decodeURIComponent(once);
    } catch {
      return once;
    }
  } catch {
    return s;
  }
}

export default function AuthCallback() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);

      // 1) Preferred: forward to exact deep link from app, if valid
      const targetParamRaw = url.searchParams.get('target');
      if (targetParamRaw) {
        const targetParam = safeDecodeTwice(targetParamRaw); // handle double-encoding
        try {
          const t = new URL(targetParam);
          const isBareExpNoHost = t.protocol === 'exp:' && !t.hostname; // exp://signin (no host)
          if (!isBareExpNoHost) {
            const allParams = new URLSearchParams(url.search.replace(/^\?/, ''));
            allParams.delete('target');
            const forwardQuery = allParams.toString();
            const finalUrl = `${targetParam}${forwardQuery ? `?${forwardQuery}` : ''}${url.hash}`;
            window.location.replace(finalUrl);
            return;
          }
        } catch {
          // invalid target → fall through to scheme fallback
        }
      }

      // 2) Fallback: infer path from type and build using scheme
      const type = url.searchParams.get('type');
      const targetPath = type === 'recovery' ? 'reset-password' : 'signin';

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