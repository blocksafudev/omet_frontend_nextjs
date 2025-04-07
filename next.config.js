/** @type {import('next').NextConfig} */
const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");
const removeImports = require("next-remove-imports")();

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)", // Terapkan header ini ke semua rute
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // {
          //   key: "Content-Security-Policy",
          //   value:
          //     "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src 'none'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';",
          // },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/js/telegram-web-app.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Encoding",
            value: "gzip",
          },
        ],
      },
    ];
  },
  webpack(config, { dev, isServer }) {
    config.resolve.modules.push(path.resolve("./src"));
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        mergeDuplicateChunks: true,
        splitChunks: {
          chunks: "all",
          minSize: 30000,
          maxSize: 250000,
          minChunks: 1,
          maxAsyncRequests: 20,
          maxInitialRequests: 30,
          automaticNameDelimiter: "~",
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
              name: "vendor_react",
              priority: 20,
              reuseExistingChunk: true,
            },
            common: {
              test: /[\\/]src[\\/]/,
              minChunks: 2,
              priority: -5,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  env: {
    DISABLE_REACT_DEV_TOOLS: process.env.DISABLE_REACT_DEV_TOOLS,
    googleAnalyticsID: "G-EC0W17C16N",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "metti.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "staking.test",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8545",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api-metti.blocksafu.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // sentry: {
  //   hideSourceMaps: true,
  // },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        // destination: `http://127.0.0.1:8000/api/:path*`,
        destination: `https://api-metti.blocksafu.com/api/:path*`,
      },
    ];
  },
};

module.exports = removeImports({
  experimental: { esmExternals: true },
  ...nextConfig,
  // ...withSentryConfig(nextConfig, SentryWebpackPluginOptions),
});
