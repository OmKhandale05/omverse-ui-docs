import Link from 'next/link'

const workspaceRows = [
  { label: 'Core product', status: 'Synced', tone: 'green' },
  { label: 'Customer portal', status: 'Review', tone: 'amber' },
  { label: 'Internal tools', status: 'Synced', tone: 'green' },
]

export function EnterpriseHero() {
  return (
    <section className="enterprise-hero" aria-labelledby="enterprise-title">
      <div className="enterprise-hero-glow" aria-hidden="true" />
      <div className="enterprise-container enterprise-hero-grid">
        <div className="enterprise-hero-copy">
          <div className="enterprise-kicker">
            <span aria-hidden="true" />
            omverse-ui for enterprise
          </div>
          <h1 id="enterprise-title">
            One interface system.
            <span> Every product team.</span>
          </h1>
          <p>
            Give teams a governed React foundation without slowing them down.
            Standardize accessible components, brand tokens, and delivery practices
            across every application.
          </p>
          <div className="enterprise-hero-actions">
            <Link className="enterprise-button enterprise-button--primary" href="/docs/installation">
              Start building
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
            <a
              className="enterprise-button enterprise-button--secondary"
              href="https://github.com/OmKhandale05/omverse-ui-docs/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to the team
              <i className="ti ti-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
          <ul className="enterprise-hero-facts" aria-label="Enterprise highlights">
            <li><i className="ti ti-check" aria-hidden="true" />MIT licensed</li>
            <li><i className="ti ti-check" aria-hidden="true" />TypeScript-first</li>
            <li><i className="ti ti-check" aria-hidden="true" />WCAG-aware</li>
          </ul>
        </div>

        <div className="enterprise-console" aria-label="Design system governance preview">
          <div className="enterprise-console-bar">
            <div className="enterprise-console-brand">
              <span className="enterprise-console-mark">O</span>
              Control plane
            </div>
            <span className="enterprise-live-status"><span />All systems ready</span>
          </div>
          <div className="enterprise-console-body">
            <div className="enterprise-console-heading">
              <div>
                <p>Organization</p>
                <h2>Acme design system</h2>
              </div>
              <button type="button" aria-label="Open organization settings">
                <i className="ti ti-settings" aria-hidden="true" />
              </button>
            </div>
            <div className="enterprise-score-grid">
              <div><span>Adoption</span><strong>86%</strong><small>+12% this quarter</small></div>
              <div><span>Components</span><strong>58</strong><small>Public exports</small></div>
              <div><span>Coverage</span><strong>28</strong><small>Documentation pages</small></div>
            </div>
            <div className="enterprise-workspaces">
              <div className="enterprise-workspaces-title">
                <span>Connected workspaces</span>
                <span>Policy status</span>
              </div>
              {workspaceRows.map((workspace) => (
                <div className="enterprise-workspace-row" key={workspace.label}>
                  <span className="enterprise-workspace-icon" aria-hidden="true">
                    {workspace.label.charAt(0)}
                  </span>
                  <span>{workspace.label}</span>
                  <span className={`enterprise-status enterprise-status--${workspace.tone}`}>
                    <span aria-hidden="true" />{workspace.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="enterprise-console-footer">
              <span><i className="ti ti-shield-check" aria-hidden="true" />Policy checks enabled</span>
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
