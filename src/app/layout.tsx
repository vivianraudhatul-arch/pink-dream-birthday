import type { Metadata } from 'next'
import { Poppins, Dancing_Script } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const dancingScript = Dancing_Script({
  variable: '--font-dancing',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Pink Dream Birthday - Premium Birthday Website',
  description:
    'Create a beautiful, interactive birthday website with photos, timeline, messages, and more. All data stored locally.',
  keywords: [
    'birthday',
    'celebration',
    'photos',
    'timeline',
    'interactive',
    'nextjs',
  ],
  authors: [{ name: 'Pink Dream Birthday' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pink-dream-birthday.vercel.app',
    title: 'Pink Dream Birthday',
    description: 'Create a premium interactive birthday celebration',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Pink Dream Birthday',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pink Dream Birthday',
    description: 'Create a premium interactive birthday celebration',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=630&fit=crop',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dancingScript.variable}`}>
      <head>
        <meta name="theme-color" content="#FB6F92" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23FB6F92'>🎂</text></svg>" />
      </head>
      <body className="font-poppins bg-pink-50 text-gray-900">{children}</body>
    </html>
  )
}
