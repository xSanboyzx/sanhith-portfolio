import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import {
  hstsHeader,
  productionHostname,
  securityHeaders,
} from "./src/lib/security-headers";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [
                {
                  type: "host" as const,
                  value: productionHostname.replaceAll(".", "\\."),
                },
              ],
              headers: [hstsHeader],
            },
          ]
        : []),
    ];
  },
  redirects() {
    return [
      {
        source: "/resume",
        destination: "/resume.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
