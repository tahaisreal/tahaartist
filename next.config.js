/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // static HTML export → works with GitHub Pages
  trailingSlash: true,   // /about → /about/index.html (required for GH Pages)
  images: {
    unoptimized: true,   // Next.js image optimisation requires a server; disable for static
  },
};

module.exports = nextConfig;
