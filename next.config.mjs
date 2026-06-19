/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["ai", "@ai-sdk/react"],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'fal.media' }],
  },
};

export default nextConfig;