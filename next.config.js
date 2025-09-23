/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['assets.lemonsqueezy.com']
  }
};

module.exports = nextConfig;
