import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanhith | Portfolio",
  description: "Sanhith's personal portfolio. Coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
