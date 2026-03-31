import type { ReactNode } from "react";
import { DM_Sans, Manrope } from "next/font/google";

import "@/app/globals.css";
import { BASE_APP_ID } from "@/lib/base-attribution";
import { AppProviders } from "@/providers/app-providers";

const heading = Manrope({ subsets: ["latin"], variable: "--font-heading" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const productionUrl = "https://mood-log-ochre.vercel.app";
const previewImage = `${productionUrl}/preview-card.svg`;
const miniAppMeta = JSON.stringify({
  version: "1",
  imageUrl: previewImage,
  button: {
    title: "Open mood-log",
    action: {
      type: "launch_frame",
      name: "mood-log",
      url: productionUrl,
      splashImageUrl: previewImage,
      splashBackgroundColor: "#243B6B"
    }
  }
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="base:app_id" content={BASE_APP_ID} />
        <title>mood-log</title>
        <meta name="description" content="A moonlit mini app for logging a mood score from one to five on Base." />
        <link rel="canonical" href={productionUrl} />
        <meta property="og:title" content="mood-log" />
        <meta property="og:description" content="Log a mood score from one to five on Base in a calm, private journal flow." />
        <meta property="og:url" content={productionUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={previewImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="mood-log" />
        <meta name="twitter:description" content="Log a mood score from one to five on Base in a calm, private journal flow." />
        <meta name="twitter:image" content={previewImage} />
        <meta name="fc:miniapp" content={miniAppMeta} />
      </head>
      <body className={`${heading.variable} ${body.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
