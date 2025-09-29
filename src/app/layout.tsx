import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
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
    <html lang="en">
      <body className={`${inter.variable} ${kanit.variable} bg-bg-main font-sans text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}