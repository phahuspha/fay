/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
      // ... other patterns
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
