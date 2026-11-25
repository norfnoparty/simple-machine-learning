import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Mesin ZKTeco hit /iclock/*, rewrite ke /api/iclock/*
      {
        source: "/iclock/:path*",
        destination: "/api/iclock/:path*",
      },
    ];
  },
};

export default nextConfig;
