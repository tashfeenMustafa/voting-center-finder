import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Better handling for static exports
  distDir: '.next',
  // Ensure proper base path handling
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
