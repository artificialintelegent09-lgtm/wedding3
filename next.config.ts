import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out, deployable anywhere.
  output: "export",
  // /amelia-rafael/ → out/amelia-rafael/index.html: works on every static host without rewrite rules.
  trailingSlash: true,
  images: {
    // The default image optimizer needs a server. Instead, `npm run images:responsive` pre-generates 640 / 1080 /
    // 1440 px variants of every photo in /public/images, and this loader picks one per srcset entry.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1080, 1440],
    imageSizes: [320],
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
