import { SectionIntro } from './SectionIntro'

const standards = [
  { icon: 'ti-keyboard', label: 'Keyboard journeys', value: 'Covered' },
  { icon: 'ti-file-type-ts', label: 'Type safety', value: 'Strict' },
  { icon: 'ti-layout-grid', label: 'Static routes', value: '40+' },
  { icon: 'ti-shield-check', label: 'Known vulnerabilities', value: '0' },
]

export function ReliabilitySection() {
  return (
    <section className="enterprise-section" aria-labelledby="reliability-title">
      <div className="enterprise-container enterprise-reliability-grid">
        <div className="enterprise-quality-panel">
          <div className="enterprise-quality-orbit enterprise-quality-orbit--one" aria-hidden="true" />
          <div className="enterprise-quality-orbit enterprise-quality-orbit--two" aria-hidden="true" />
          <div className="enterprise-quality-score">
            <span><i className="ti ti-shield-check" aria-hidden="true" /></span>
            <strong>Ready</strong>
            <small>Quality gates passed</small>
          </div>
          <div className="enterprise-quality-standards">
            {standards.map((standard) => (
              <div key={standard.label}>
                <i className={`ti ${standard.icon}`} aria-hidden="true" />
                <span>{standard.label}</span>
                <strong>{standard.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionIntro
            id="reliability-title"
            eyebrow="Reliability"
            title="Confidence built into the delivery loop."
            description="Enterprise adoption depends on more than polished components. The documentation and release workflow are designed to catch regressions before your teams inherit them."
          />
          <div className="enterprise-stat-row">
            <div><strong>58</strong><span>public exports covered</span></div>
            <div><strong>0</strong><span>audit vulnerabilities</span></div>
            <div><strong>2×</strong><span>desktop and mobile QA</span></div>
          </div>
          <p className="enterprise-support-note">
            <i className="ti ti-info-circle" aria-hidden="true" />
            Need a formal support, security, or compliance review? Start a conversation with the maintainers and define the controls your organization requires.
          </p>
        </div>
      </div>
    </section>
  )
}
