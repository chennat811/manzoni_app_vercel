"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

// ✅ force this page to be client-only (no static pre-render)
export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
