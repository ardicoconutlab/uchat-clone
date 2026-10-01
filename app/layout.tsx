import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConvoFlow — WhatsApp automation",
  description: "WhatsApp-first customer conversations and automation"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
