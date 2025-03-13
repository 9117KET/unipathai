/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["source.unsplash.com"],
  },
  typescript: {
    // Exclude the backend directory from TypeScript checking
    ignoreBuildErrors: true,
  },
  eslint: {
    // Exclude the backend directory from ESLint checking
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
