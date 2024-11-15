import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  domains: ['picsum.photos'],
};

// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
