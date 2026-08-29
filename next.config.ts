import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1MB — too small for cover image / logo uploads via the
      // admin forms (they submit the file as part of the Server Action's
      // FormData body).
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
