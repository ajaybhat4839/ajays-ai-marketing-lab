/** @type {import('next').NextConfig} */
const nextConfig = {
  // IGNORE EVERYTHING BLOCK
  typescript: {
    ignoreBuildErrors: true,
  },
  
  transpilePackages: ["ai", "@ai-sdk/react"],
  
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'fal.media' }],
  },
};

export default nextConfig;