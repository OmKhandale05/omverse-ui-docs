import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['omverse-ui'],
  },
};

export default nextConfig;
