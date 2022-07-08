/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["via.placeholder.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
