import type { Metadata } from 'next'
import { DocsShell } from '@/components/layout/DocsShell'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Install, configure, theme, and extend omverse-ui in React applications.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
