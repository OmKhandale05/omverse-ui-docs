import { DocsShell } from '@/components/layout/DocsShell'

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsShell>{children}</DocsShell>
}
