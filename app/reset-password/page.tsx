"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export const dynamic = "force-dynamic";

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    console.log("Reset token:", token);
  }, [token]);

  return (
    <div>
      <h1>Reset your password</h1>
      <p>Token: {token}</p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
