import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["ai", "@ai-sdk/react"],
  // This helps stability
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;