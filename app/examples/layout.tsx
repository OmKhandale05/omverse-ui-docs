import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Examples',
  description: 'Production-style interface examples composed with omverse-ui components.',
  alternates: { canonical: '/examples' },
}

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--color-background)',
      }}
    >
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        style={{
          flex: 1,
          overflowY: 'auto',
          color: 'var(--color-text-primary)',
        }}
      >
        {children}
      </main>
    </div>
  )
}
