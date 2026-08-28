import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Tailgate",
  description: "Daily college football trivia, streaks, and friend leaderboards.",
  openGraph: {
    title: "The Tailgate",
    description: "Daily college football trivia, streaks, and friend leaderboards.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tailgate",
    description: "Daily college football trivia, streaks, and friend leaderboards.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2015",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
