/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kbwlosppbppefkobfbip.supabase.co",
        pathname: "/storage/v1/object/public/site-images/**",
      },
    ],
  },
};

module.exports = nextConfig;
