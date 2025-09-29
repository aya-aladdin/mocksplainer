import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Navbar from "./Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const kanit = Kanit({ subsets: ["latin"], weight: ['400', '600', '700'], variable: '--font-kanit' });

export const metadata: Metadata = {
  title: "Mocksplainer",
  description: "AI-Powered Study Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-ink">
      <body
        className={`${inter.variable} ${kanit.variable} bg-panel font-sans text-ink antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
