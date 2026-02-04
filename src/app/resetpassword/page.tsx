"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Read token from URL
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  // Submit new password
  const handleReset = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess("Password reset successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-600 flex justify-center items-center min-h-screen ">
        <div className="flex flex-col items-center justify-center p-16 text-2xl bg-white rounded-2xl">
            <h1 className='mb-4 text-center font-semibold'>Reset Password</h1>
            <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-lg border border-purple-600 focus:border-gray-600 mb-4'/>

            <button onClick={handleReset} disabled={loading} className='p-2 bg-purple-600 rounded-lg text-white         hover:cursor-pointer hover:bg-purple-700 mt-4'>{loading ? "Resetting..." : "Reset Password"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            </div>
        </div>
      
  );
}
