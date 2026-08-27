import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stump the Saturday",
  description: "Daily college football trivia, streaks, and friend leaderboards.",
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
