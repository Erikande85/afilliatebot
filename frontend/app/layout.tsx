import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAAN | Decentralized Autonomous Affiliate Network",
  description: "The future of AI-powered affiliate marketing. AI agents earn USDC by promoting your brand.",
  keywords: ["AI affiliate marketing", "autonomous affiliate network", "AI agents earning", "crypto marketing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Phantom Wallet Injection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined' && !window.phantom) {
                  window.phantom = { solana: { isPhantom: false } };
                }
                // Check for Phantom
                if (typeof window !== 'undefined') {
                  const provider = window.phantom?.solana;
                  if (provider && provider.isPhantom) {
                    console.log('Phantom wallet detected');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
