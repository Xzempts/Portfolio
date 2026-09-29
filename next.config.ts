import type { NextConfig } from "next";

// Security headers applied to every response. Tuned for a public portfolio:
//   - HSTS forces HTTPS on future visits (the reverse proxy / Traefik handles
//     the actual TLS — this locks browsers in once they've seen one response).
//   - DENY framing prevents clickjacking.
//   - nosniff stops MIME-type confusion attacks.
//   - strict-origin-when-cross-origin limits what the Referer leaks.
//   - Permissions-Policy closes browser APIs we don't use so a future
//     dependency update can't silently start using them.
// CSP intentionally omitted for now — it tends to break Next.js inline
// hydration scripts and Tailwind's injected styles without careful tuning.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
];

// When EXPORT=true we emit a fully static site to `out/` (`next build`) for
// GitHub Pages and other static hosts. Otherwise we emit the standalone
// server bundle used by the Docker image. Static export can't apply
// `headers()` or next/image optimization, so those are only enabled on the
// server build.
const isExport = process.env.EXPORT === "true";

const nextConfig: NextConfig = {
  // export → static `out/` for GitHub Pages; otherwise a minimal standalone
  // server bundle at `.next/standalone/` for the Docker runtime image.
  output: isExport ? "export" : "standalone",

  // next/image isn't used (the carousel uses plain <img>), but disable the
  // optimizer under static export so nothing tries to hit a runtime service.
  ...(isExport ? { images: { unoptimized: true } } : {}),

  // Next 16 blocks cross-origin requests to /_next/* dev resources by
  // default. When the dev server is reached through a proxy/preview the
  // client chunks get blocked, hydration never runs, and scroll-reveal
  // sections stay invisible. Allow the local/preview hosts so dev works
  // when opened via a tunnel. (No effect on production builds.)
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.cursor.sh",
    "*.cursor.com",
    "*.trycloudflare.com",
  ],

  // Security headers only apply to the server build. On a static host like
  // GitHub Pages these must be configured at the CDN/host level instead.
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default nextConfig;
