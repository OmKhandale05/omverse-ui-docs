import type { Metadata } from 'next'
import { DocsShell } from '@/components/layout/DocsShell'

export const metadata: Metadata = {
  title: 'Components',
  description: 'Explore accessible React components, live previews, usage examples, and typed API references.',
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsShell>{children}</DocsShell>
}
