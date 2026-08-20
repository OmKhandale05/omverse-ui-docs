import Link from 'next/link'

export function EnterpriseCTA() {
  return (
    <section className="enterprise-cta-section" aria-labelledby="enterprise-cta-title">
      <div className="enterprise-container">
        <div className="enterprise-cta-card">
          <div className="enterprise-cta-grid" aria-hidden="true" />
          <div>
            <p className="enterprise-eyebrow">Build the standard</p>
            <h2 id="enterprise-cta-title">Give every team a better starting point.</h2>
            <p>Adopt the components today, then shape the governance and support model around your organization.</p>
          </div>
          <div className="enterprise-cta-actions">
            <Link className="enterprise-button enterprise-button--light" href="/docs/installation">
              Read installation guide
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
            <Link className="enterprise-button enterprise-button--dark-outline" href="/enterprise/patterns">
              Browse enterprise patterns
            </Link>
            <a
              className="enterprise-button enterprise-button--dark-outline"
              href="https://github.com/OmKhandale05/omverse-ui-docs/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact maintainers
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
