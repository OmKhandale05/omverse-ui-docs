import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import './enterprise.css'

export const metadata: Metadata = {
  title: 'Enterprise',
  description: 'A governed, accessible React component foundation for product organizations building at scale.',
  alternates: { canonical: '/enterprise' },
  openGraph: {
    title: 'omverse-ui for Enterprise',
    description: 'Standardize accessible components, brand tokens, and delivery practices across every application.',
    url: '/enterprise',
  },
}

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="enterprise-page-shell">
      <Navbar />
      <main id="main-content" tabIndex={-1}>{children}</main>
    </div>
  )
}
