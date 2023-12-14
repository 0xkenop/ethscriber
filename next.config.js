/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    useFileSystemPublicRoutes: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
}
