/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  headers: async () => {
    return [
      {
        source: "/_next/image(.*)", // Match all image paths served by next/image
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, must-revalidate", // Your custom cache control value
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDIA_URL,
      },
    ],
  },
};

export default nextConfig;
