/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/centrala-prototyp',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
