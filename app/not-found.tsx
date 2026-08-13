import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export default function NotFound() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <p className="mb-3 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>404</p>
        <h1 className="mb-3 text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Page not found</h1>
        <p className="mb-8 text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
          The page may have moved, or the address may be incorrect.
        </p>
        <div className="flex gap-3">
          <Link href="/docs/introduction" className="rounded-md px-4 py-2 text-sm font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}>
            Read the docs
          </Link>
          <Link href="/" className="rounded-md px-4 py-2 text-sm font-medium" style={{ border: '1px solid var(--color-outline-variant)', color: 'var(--color-text-primary)' }}>
            Go home
          </Link>
        </div>
      </main>
    </div>
  )
}
