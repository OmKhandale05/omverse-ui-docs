import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { DocsPager } from '@/components/layout/DocsPager'

interface DocsShellProps {
  children: React.ReactNode
}

/**
 * Shared shell for /docs and /components routes:
 * Navbar pinned at top, Sidebar on the left (200 px),
 * main content fills the rest — both scrollable independently.
 */
export function DocsShell({ children }: DocsShellProps) {
  return (
    <div
      className="flex flex-col h-screen"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Top bar — 48 px, never scrolls */}
      <Navbar />

      {/* Below the navbar: sidebar + content, each scrolls independently */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {children}
          <DocsPager />
        </main>
      </div>
    </div>
  )
}
