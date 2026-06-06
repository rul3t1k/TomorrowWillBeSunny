/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer AVIF, fall back to WebP — served automatically by next/image
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // OG image — short cache so A/B rotates for new visitors
        source: "/api/og",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
