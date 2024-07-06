/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: ["*","upload.wikimedia.org"], // Allow any external domain
  },
};

export default nextConfig;
