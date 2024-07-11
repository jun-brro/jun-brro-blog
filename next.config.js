/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [import("remark-math")],
    rehypePlugins: [import("rehype-katex")],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
});

module.exports = withContentlayer({ ...nextConfig });
