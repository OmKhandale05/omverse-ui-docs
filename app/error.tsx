'use client'

import { useEffect } from 'react'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 text-sm font-medium" style={{ color: 'var(--color-error)' }}>Something went wrong</p>
      <h1 className="mb-3 text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>This page could not be loaded</h1>
      <p className="mb-8 text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
        Try the request again. If the problem continues, return to the documentation index.
      </p>
      <button type="button" onClick={reset} className="rounded-md border-0 px-4 py-2 text-sm font-medium" style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)', cursor: 'pointer' }}>
        Try again
      </button>
    </main>
  )
}
