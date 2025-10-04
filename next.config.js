/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://fakestoreapi.com',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
