import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "therabadigroup.com",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "www.compass.com",
        pathname: "/m/**",
      },
      {
        protocol: "https",
        hostname: "media.relahq.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dlajgvw9htjpb.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.cotality.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
