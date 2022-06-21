/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: ['cdn.sanity.io']
  },
}

// const withCSS = require('@zeit/next-css')
// module.exports = withCSS()

module.exports = nextConfig

