const process = require('process');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  publicRuntimeConfig: {
    API_BASE_URL: '/api',
  },

  async rewrites() {
    return process.env.API_BASE_URL
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.API_BASE_URL}/:path*`, // Proxy to Backend
          },
        ]
      : [];
  },

  webpack: (config) => {
    // https://react-svgr.com/docs/webpack/#use-svgr-and-asset-svg-in-the-same-project
    config.module.rules.push(
      // @NOTE: Импорт .svg как string
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      // @NOTE: Импорт .svg как ReactComponent
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    return config;
  },

  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
