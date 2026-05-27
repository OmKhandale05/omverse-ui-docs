import { Navbar } from '@/components/layout/Navbar'
import { Sidebar, SidebarProvider } from '@/components/layout/Sidebar'

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
    <SidebarProvider>
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
            className="flex-1 overflow-y-auto"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
