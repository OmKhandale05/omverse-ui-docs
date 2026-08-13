import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', '192.168.29.204'],
  experimental: {
    optimizePackageImports: ['omverse-ui'],
  },
};

export default nextConfig;
