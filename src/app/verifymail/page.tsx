'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Verifymail() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  
  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("token") ?? "";
  }, []);

  
  const verifyUserEmail = useCallback(async () => {
    if (!token) return;

    try {
      await axios.post('/api/users/verifymail', { token });
      setIsVerified(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Verification failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }, [token]);


  useEffect(() => {
    verifyUserEmail();
  }, [verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>

      {isVerified && (
        <div>
          <h2 className="text-2xl mb-8">Email verified</h2>
          <Link
            href="/login"
            className="p-2 bg-purple-600 rounded-lg mb-4 text-white hover:bg-purple-700"
          >
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-700 text-white">{error}</h2>
        </div>
      )}
    </div>
  );
}
