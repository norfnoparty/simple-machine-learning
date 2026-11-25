'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah login
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: 'GET',
      });

      // Kalo 401 (unathorized) berarti belum login, redirect ke login
      if (res.status === 401) {
        router.push("/login");
        setLoading(false);
        return;
      }

      setLoading(false); // User sudah login, lanjutkan ke halaman yang diminta
    } catch (error) {
      router.push("/login");
      setLoading(false);
    }
  };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {children}
    </div>
  )
}