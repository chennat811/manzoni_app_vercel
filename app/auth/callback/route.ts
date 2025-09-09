// app/auth/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";

// Default scheme per env
// - Dev (Expo Go): exp+new_ai_food_app://
// - Dev/prod standalone app: newaifoodapp://
const DEFAULT_SCHEME =
  process.env.NODE_ENV !== "production"
    ? "exp+new_ai_food_app://"
    : "newaifoodapp://";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  // Allow ?scheme= override in case you want to test with a different one
  const scheme = url.searchParams.get("scheme") || DEFAULT_SCHEME;

  // Supabase passes these in the URL after email link:
  // access_token, refresh_token, type (e.g. signup|recovery)
  const queryString = url.search; // keeps everything intact (?access_token=...&type=...)

  // Decide where to send user inside the app
  // If type=recovery → send to reset password screen
  // Otherwise → send to signin screen
  const type = url.searchParams.get("type");
  const targetPath =
    type === "recovery" ? "reset-password" : "signin";

  // Build final deep link
  const target = `${scheme}${targetPath}${queryString}`;

  return NextResponse.redirect(target, { status: 302 });
}
