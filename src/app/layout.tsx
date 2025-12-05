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

        ██╗░░██╗███████╗██╗░░░██╗  ██╗░░░██╗░█████╗░██╗░░░██╗██╗
        ██║░░██║██╔════╝╚██╗░██╔╝  ╚██╗░██╔╝██╔══██╗██║░░░██║██║
        ███████║█████╗░░░╚████╔╝░  ░╚████╔╝░██║░░██║██║░░░██║██║
        ██╔══██║██╔══╝░░░░╚██╔╝░░  ░░╚██╔╝░░██║░░██║██║░░░██║╚═╝
        ██║░░██║███████╗░░░██║░░░  ░░░██║░░░╚█████╔╝╚██████╔╝██╗
        ╚═╝░░╚═╝╚══════╝░░░╚═╝░░░  ░░░╚═╝░░░░╚════╝░░╚═════╝░╚═╝

        👀

        Yeah you, snooping around in here.

        There's nothing for you.

        Go away.

        ...

        Still here? Weird.

      */}
      <body>
        <Analytics />
        <SourceWarning />
        {children}
      </body>
    </html>
  );
}