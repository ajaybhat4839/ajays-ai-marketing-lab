import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* High-Tech Performance Settings */
  transpilePackages: ["ai", "@ai-sdk/react"],
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fal.media' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },

  // Removes the header to make it harder to tell what tech you use
  poweredByHeader: false,
};

export default nextConfig;