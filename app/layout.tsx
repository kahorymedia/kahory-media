import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://kahorymedia.in'),
  title: {
    default: 'Kahory Media | High-Converting Content Agency',
    template: '%s | Kahory Media'
  },
  // ✅ CHANGE 2: template literal fixes the broken apostrophe in brand's
  description: `Stop posting. Start converting. We shoot, shape, and scale your brand's story through high-end short-form video production and elite media strategy.`,
  keywords: [
    'Content Production Agency',
    'Short-Form Video Agency',
    'Instagram Reels Strategist',
    'YouTube Shorts Editor',
    'Media Production Company',
    'Creative Agency',
    'Brand Growth'
  ],
  authors: [{ name: 'Kahory Media' }],
  creator: 'Kahory Media',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kahorymedia.in',
    title: 'Kahory Media | High-Converting Content Agency',
    // ✅ CHANGE 3: same fix applied to OpenGraph description
    description: `We shoot, shape, and scale your brand's story through high-end short-form video production and elite media strategy.`,
    siteName: 'Kahory Media',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kahory Media | High-Converting Content Agency',
    description: 'Stop posting. Start converting. High-end short-form video production and elite media strategy.',
    creator: '@kahorymedia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black antialiased font-sans select-none">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}