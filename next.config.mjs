/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Product photography is not yet supplied. When real images are added, host them
  // in /public/products or add the CDN domain to images.remotePatterns and swap
  // <UrnImage /> for next/image inside ProductCard + Gallery.
  images: { formats: ['image/avif', 'image/webp'] },
};
export default nextConfig;
