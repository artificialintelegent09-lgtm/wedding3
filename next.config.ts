import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out, deployable anywhere.
  output: "export",
  // /amelia-rafael/ → out/amelia-rafael/index.html: works on every static host without rewrite rules.
  trailingSlash: true,
  images: {
    // The default image optimizer needs a server. Photos are served as-is from /public;
    // run `npm run images:optimize` to resize and compress them before deploying.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
