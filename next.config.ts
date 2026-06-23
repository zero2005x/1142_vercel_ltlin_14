import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self' https://*.stripe.com https://*.accounts.dev https://*.clerk.accounts.dev https://*.clerk.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.accounts.dev https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.course-api.com https://images.pexels.com https://img.clerk.com https://i.imgur.com https://picsum.photos https://loremflickr.com https://*.supabase.co https://*.stripe.com https://*.accounts.dev https://*.clerk.accounts.dev https://*.clerk.com",
  "font-src 'self' data:",
  "worker-src 'self' blob:",
  "connect-src 'self' https://*.supabase.co https://*.accounts.dev https://*.clerk.accounts.dev https://*.clerk.com https://clerk-telemetry.com https://*.stripe.com https://api.stripe.com",
  "frame-src 'self' https://*.stripe.com https://js.stripe.com https://*.accounts.dev https://*.clerk.accounts.dev https://*.clerk.com",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.course-api.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
