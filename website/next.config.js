/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true,  // Required for static export
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    LEMON_SQUEEZY_STORE_ID: process.env.LEMON_SQUEEZY_STORE_ID,
    LEMON_SQUEEZY_PRODUCT_ID: process.env.LEMON_SQUEEZY_PRODUCT_ID
  },
  basePath: process.env.NODE_ENV === 'production' ? '/SideSwitch' : '',  // Add repo name for GH Pages
}

module.exports = nextConfig
