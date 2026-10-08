import type { Metadata } from "next";

export const siteUrl = "https://sanhithamarathunge.net";
export const homeTitle = "Sanhith Amarathunge — Curiosity. Code. Possibility.";
export const homeDescription =
  "Computer science student building thoughtful software and turning data into useful insights.";

const socialImage = {
  url: "/branding/social-preview.png",
  width: 1200,
  height: 630,
  alt: "Sanhith Amarathunge — Curiosity. Code. Possibility. — with Midnight Coder, a curly-haired character with a glowing violet eye behind a laptop.",
  type: "image/png",
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Sanhith Amarathunge",
      title,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
