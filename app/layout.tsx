import type { ReactNode } from "react";
import { DM_Sans, Manrope } from "next/font/google";

import "@/app/globals.css";
import { AppProviders } from "@/providers/app-providers";

const heading = Manrope({ subsets: ["latin"], variable: "--font-heading" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="base:app_id" content="69cb25e6a7654b8774320f17" />
        <title>mood-log</title>
        <meta
          name="description"
          content="A moonlit mini app for logging a mood score from one to five on Base."
        />
      </head>
      <body className={`${heading.variable} ${body.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}



