// app/auth/callback/route.ts
import { NextResponse, type NextRequest } from 'next/server'

// Default scheme per env:
// - Dev (Expo Go): exp+new_ai_food_app://
// - Dev/prod build: newaifoodapp://
const DEFAULT_SCHEME =
  process.env.NODE_ENV !== 'production' ? 'exp+new_ai_food_app://' : 'newaifoodapp://'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  // Optional override via ?scheme=...
  const scheme = url.searchParams.get('scheme') || DEFAULT_SCHEME

  // Forward all current query (includes code/access_token etc.) and hash to app
  const target = `${scheme}signin${url.search || ''}${url.hash || ''}`

  return NextResponse.redirect(target, { status: 302 })
}