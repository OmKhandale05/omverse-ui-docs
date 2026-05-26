import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--color-background-primary)',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
