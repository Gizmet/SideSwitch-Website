import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "SideSwitch — Switch Smarter. Stream Stronger.",
  description: "The creator-first browser for live work. One-click site swaps, blur on tap, OBS-friendly, and stream-safe by design.",
  openGraph: {
    title: "SideSwitch — Switch Smarter. Stream Stronger.",
    description: "The creator-first browser for live work. One-click site swaps, blur on tap, OBS-friendly, and stream-safe by design.",
    type: "website",
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
