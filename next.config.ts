import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/account",
        permanent: false,
      },
    ];
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withSerwist(nextConfig);