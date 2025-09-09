"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token"); // or "access_token" depending on Supabase link

  useEffect(() => {
    if (!token) {
      // No token, maybe redirect or show error
      router.push("/");
    }
  }, [token, router]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      {token ? (
        <form>
          <input
            type="password"
            placeholder="New password"
            className="border p-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </form>
      ) : (
        <p>Invalid or missing reset token.</p>
      )}
    </div>
  );
}
