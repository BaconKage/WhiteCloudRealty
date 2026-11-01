import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — deployable to Vercel, Netlify, Cloudflare Pages or any
  // plain static host. See README "Deploying" for the DNS cutover steps.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image cannot run the optimizer in an export build, so project images
    // are resized ahead of time and this loader points srcset at those files.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    // Keep in step with scripts/make-responsive-images.mjs.
    deviceSizes: [480, 828, 1200, 1920, 2880],
    imageSizes: [],
  },
};

export default nextConfig;
