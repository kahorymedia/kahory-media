import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Short-Form Video Production | Kahory Media',
  description: 'High-converting TikToks, Reels, and Shorts designed to turn attention into retention. Elite short-form production agency.',
  alternates: {
    canonical: 'https://kahorymedia.in/services/short-form',
  }
}

export default function ShortFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}