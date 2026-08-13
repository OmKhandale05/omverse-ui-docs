import { SectionIntro } from './SectionIntro'

const capabilities = [
  {
    icon: 'ti-brand-asana',
    title: 'Governed foundations',
    description: 'Give every team one reviewed component API, clear ownership, and shared implementation guidance.',
    detail: 'Shared component contracts',
  },
  {
    icon: 'ti-palette',
    title: 'Brand at scale',
    description: 'Roll out product themes with CSS variables instead of maintaining forks or duplicating component code.',
    detail: 'Token-driven theming',
  },
  {
    icon: 'ti-accessible',
    title: 'Accessible by default',
    description: 'Start with keyboard-aware, screen-reader-conscious primitives and documented interaction patterns.',
    detail: 'Automated a11y checks',
  },
  {
    icon: 'ti-code-circle-2',
    title: 'Developer confidence',
    description: 'Typed props, live examples, and copyable patterns reduce ambiguity from design handoff to production.',
    detail: 'Strict TypeScript APIs',
  },
  {
    icon: 'ti-rocket',
    title: 'Predictable delivery',
    description: 'Validate documentation coverage, builds, and critical journeys before changes reach product teams.',
    detail: 'Release-ready checks',
  },
  {
    icon: 'ti-stack-2',
    title: 'Framework-native',
    description: 'Ship with React, Next.js App Router, and Tailwind CSS without a runtime styling layer.',
    detail: 'Zero CSS-in-JS runtime',
  },
]

export function CapabilityGrid() {
  return (
    <section className="enterprise-section" aria-labelledby="capabilities-title">
      <div className="enterprise-container">
        <SectionIntro
          id="capabilities-title"
          eyebrow="Platform"
          title="A system teams can trust and extend."
          description="omverse-ui gives product organizations a stable foundation while leaving room for each product to express its own brand and workflows."
          align="center"
        />
        <div className="enterprise-capability-grid">
          {capabilities.map((capability, index) => (
            <article className="enterprise-capability-card" key={capability.title}>
              <div className="enterprise-capability-number">0{index + 1}</div>
              <div className="enterprise-capability-icon" aria-hidden="true">
                <i className={`ti ${capability.icon}`} />
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <div className="enterprise-capability-detail">
                <i className="ti ti-check" aria-hidden="true" />
                {capability.detail}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
