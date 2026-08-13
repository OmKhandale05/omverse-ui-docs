import Link from 'next/link'

export function EnterpriseFooter() {
  return (
    <footer className="enterprise-footer">
      <div className="enterprise-container enterprise-footer-inner">
        <Link href="/" className="enterprise-footer-brand">omverse-ui</Link>
        <p>Accessible React foundations for ambitious product teams.</p>
        <div>
          <Link href="/components/button">Components</Link>
          <Link href="/docs/introduction">Documentation</Link>
          <a href="https://github.com/OmKhandale05/omverse-ui-docs" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
