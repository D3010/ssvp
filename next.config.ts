import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats for rendered art dropped into /public/art.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
