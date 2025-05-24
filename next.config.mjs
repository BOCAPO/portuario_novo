/**
 * @type {import('next').NextConfig}
 */

import withPWA from 'next-pwa';
import withFonts from 'nextjs-fonts';

const config = {
  reactStrictMode: true,
  env: {
    STAGE: process.env.STAGE,
  },
  sassOptions: {
    cssModules: true,
    includePaths: ['./src'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx', 'js'],
  images: {
    domains: ['s3.sa-east-1.amazonaws.com'],
    loader: 'akamai',
    path: '',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const nextConfig = withFonts(
  withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.STAGE === 'DEV',
  })(config)
);

export default nextConfig;
