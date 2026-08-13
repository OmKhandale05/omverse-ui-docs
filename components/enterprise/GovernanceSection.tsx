import { SectionIntro } from './SectionIntro'

const releases = [
  { version: 'v0.1.6', label: 'Current', state: 'Approved', active: true },
  { version: 'v0.1.5', label: 'Previous', state: 'Supported', active: false },
  { version: 'v0.1.4', label: 'Legacy', state: 'Upgrade', active: false },
]

export function GovernanceSection() {
  return (
    <section className="enterprise-section enterprise-section--tinted" aria-labelledby="governance-title">
      <div className="enterprise-container enterprise-split-grid">
        <div>
          <SectionIntro
            id="governance-title"
            eyebrow="Governance"
            title="Move quickly without losing control."
            description="Create a dependable path from a shared design decision to every production application. Teams get autonomy inside clear, visible guardrails."
          />
          <div className="enterprise-check-list">
            <div><i className="ti ti-route" aria-hidden="true" /><span><strong>One source of truth</strong>Centralized navigation, examples, and API references stay aligned with the package.</span></div>
            <div><i className="ti ti-git-merge" aria-hidden="true" /><span><strong>Reviewable change</strong>Typed contracts and automated checks make upgrades easier to assess.</span></div>
            <div><i className="ti ti-chart-dots-3" aria-hidden="true" /><span><strong>Visible adoption</strong>Give platform teams a clear inventory of supported components and patterns.</span></div>
          </div>
        </div>

        <div className="enterprise-release-panel">
          <div className="enterprise-release-header">
            <div>
              <span>Release channels</span>
              <strong>Production policy</strong>
            </div>
            <span className="enterprise-policy-badge"><i className="ti ti-lock" aria-hidden="true" />Protected</span>
          </div>
          <div className="enterprise-release-progress" aria-label="Release readiness 94 percent">
            <div><span>Release readiness</span><strong>94%</strong></div>
            <span><span style={{ width: '94%' }} /></span>
          </div>
          <div className="enterprise-release-list">
            {releases.map((release) => (
              <div className={release.active ? 'is-active' : undefined} key={release.version}>
                <span className="enterprise-release-dot" aria-hidden="true" />
                <span><strong>{release.version}</strong><small>{release.label}</small></span>
                <span>{release.state}</span>
                <i className="ti ti-chevron-right" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="enterprise-release-summary">
            <div><i className="ti ti-circle-check" aria-hidden="true" /><span><strong>58 / 58</strong>exports documented</span></div>
            <div><i className="ti ti-test-pipe" aria-hidden="true" /><span><strong>18</strong>browser checks</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
