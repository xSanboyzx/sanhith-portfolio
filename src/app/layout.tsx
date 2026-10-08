import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { StarField } from "@/components/star-field";
import { ReticleCursor } from "@/components/reticle-cursor";
import {
  createPageMetadata,
  homeDescription,
  homeTitle,
  siteUrl,
} from "@/lib/site-metadata";

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});
const jetBrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: homeTitle,
    description: homeDescription,
    path: "/",
  }),
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | Sanhith Amarathunge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <StarField />
        <SiteShell>{children}</SiteShell>
        <ReticleCursor />
      </body>
    </html>
  );
}
