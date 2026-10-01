/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next-prod",
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
