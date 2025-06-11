/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: false,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.io.bikiran.com",
      },
      {
        protocol: "https",
        hostname: "io.bikiran.com",
      },
      {
        protocol: "https",
        hostname: "io.bikiran.win",
      },
      {
        protocol: "https",
        hostname: "files.bikiran.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "bikiran.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["mysql"] = false;
    config.resolve.alias["react-native-sqlite-storage"] = false;
    config.resolve.alias["@sap/hana-client/extension/Stream"] = false;

    config.ignoreWarnings = [
      {
        module: /typeorm[\\/]util[\\/]DirectoryExportedClassesLoader.js/,
        message: /the request of a dependency is an expression/,
      },
      {
        module: /typeorm[\\/]connection[\\/]ConnectionOptionsReader.js/,
        message: /the request of a dependency is an expression/,
      },
    ];

    return config;
  },
};

export default nextConfig;
