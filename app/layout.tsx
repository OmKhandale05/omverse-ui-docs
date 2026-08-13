import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Providers } from '@/components/Providers'
import { SITE_URL } from '@/lib/site'
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'omverse-ui — React components for product teams',
    template: '%s | omverse-ui',
  },
  description: 'Accessible, themeable React components for building consistent product interfaces with TypeScript and Tailwind CSS.',
  applicationName: 'omverse-ui',
  keywords: ['React', 'component library', 'design system', 'TypeScript', 'Tailwind CSS'],
  creator: 'omverse-ui',
  category: 'technology',
  openGraph: {
    type: 'website',
    siteName: 'omverse-ui',
    title: 'omverse-ui — React components for product teams',
    description: 'Accessible, themeable React components for building consistent product interfaces.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'omverse-ui — React components for product teams',
    description: 'Accessible, themeable React components for building consistent product interfaces.',
  },
}

const themeScript = `
  try {
    const saved = localStorage.getItem('omverse-theme');
    const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch {}
`

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
      <body suppressHydrationWarning style={{ background: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
