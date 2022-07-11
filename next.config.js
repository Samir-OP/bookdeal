/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "i.postimg.cc"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
