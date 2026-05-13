import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Kahory Media',
  description: 'Ready to scale your brand? Get in touch with Kahory Media to start your project.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}