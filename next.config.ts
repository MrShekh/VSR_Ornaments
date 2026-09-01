import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.22"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 95],
  },
};

export default nextConfig;
