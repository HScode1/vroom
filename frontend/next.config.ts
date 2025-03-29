import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rxuuwjidzvhwrfbdbimr.supabase.co',
        port: '', // Default HTTPS port (443), leave empty
        pathname: '/storage/v1/object/public/**', // Allows any path under public storage
      },
    ],
  },
  
};

export default nextConfig;
