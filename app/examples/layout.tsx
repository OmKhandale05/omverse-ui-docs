import { Navbar } from '@/components/layout/Navbar'

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
