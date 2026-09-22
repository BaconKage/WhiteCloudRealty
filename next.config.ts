import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — deployable to Vercel, Netlify, Cloudflare Pages or any
  // plain static host. See README "Deploying" for the DNS cutover steps.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image cannot run the optimizer in an export build.
    unoptimized: true,
  },
};

export default nextConfig;
