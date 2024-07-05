/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*","upload.wikimedia.org"], // Allow any external domain
  },
};

export default nextConfig;
