// Keep these in sync with public/_headers for Cloudflare-served assets.
export const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

export const productionHostname = "sanhithamarathunge.net";
export const hstsHeader = {
  key: "Strict-Transport-Security",
  value: "max-age=31536000",
};
