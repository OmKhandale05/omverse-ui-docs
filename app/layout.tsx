import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/Providers'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'omverse-ui',
  description: 'A modern React component library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body style={{ background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}