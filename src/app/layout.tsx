import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SideSwitch - Switch Smarter. Stream Stronger.",
  description: "The creator-first browser built for speed, privacy, and peace of mind. One click swaps. Blur on tap. Stream-safe by design. Start free — 7 days on us.",
  keywords: ["streaming", "OBS", "creator tools", "browser", "privacy", "content creation", "live streaming", "blur tool"],
  authors: [{ name: "SideSwitch" }],
  openGraph: {
    title: "SideSwitch - Switch Smarter. Stream Stronger.",
    description: "The creator-first browser built for speed, privacy, and peace of mind. Professional streaming tools for creators, educators, and power users.",
    type: "website",
    url: "https://www.sideswitch.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "SideSwitch - Switch Smarter. Stream Stronger.",
    description: "The creator-first browser built for speed, privacy, and peace of mind.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}