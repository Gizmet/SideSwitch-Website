import type { Metadata, Viewport } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import SourceWarning from "@/components/SourceWarning";

export const metadata: Metadata = {
  title: "SideSwitch — Switch Smarter. Stream Stronger.",
  description:
    "The creator-first browser for live work. One-click site swaps, blur on tap, OBS-friendly, and stream-safe by design.",
  openGraph: {
    title: "SideSwitch — Switch Smarter. Stream Stronger.",
    description:
      "The creator-first browser for live work. One-click site swaps, blur on tap, OBS-friendly, and stream-safe by design.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
  themeColor: "#0B0F0F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      {/*

        ██╗  ██╗███████╗██╗   ██╗    ██╗   ██╗ ██████╗ ██╗   ██╗██╗
        ██║  ██║██╔════╝╚██╗ ██╔╝    ╚██╗ ██╔╝██╔═══██╗██║   ██║██║
        ███████║█████╗   ╚████╔╝      ╚████╔╝ ██║   ██║██║   ██║██║
        ██╔══██║██╔══╝    ╚██╔╝        ╚██╔╝  ██║   ██║██║   ██║╚═╝
        ██║  ██║███████╗   ██║          ██║   ╚██████╔╝╚██████╔╝██╗
        ╚═╝  ╚═╝╚══════╝   ╚═╝          ╚═╝    ╚═════╝  ╚═════╝ ╚═╝

        👀 I SEE YOU looking at my source code...

        Looking for secrets? There's nothing here.
        We keep our secrets where they belong - in environment variables.

        But hey, since you're clearly curious:
        - No hardcoded API keys
        - No exposed credentials
        - No secret backdoors
        - Just clean, boring, secure code

        Nice try though! 😏

        P.S. If you're a hacker, maybe use your powers for good?
        P.P.S. If you're a recruiter, we're not hiring... yet.
        P.P.P.S. If you're that guy from Discord - sup? 👋

      */}
      <body>
        <Analytics />
        <SourceWarning />
        {children}
      </body>
    </html>
  );
}