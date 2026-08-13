import Link from 'next/link'
import { OnThisPage } from './OnThisPage'

export const COMPONENT_DOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'when-to-use', label: 'When to use' },
  { id: 'when-not-to-use', label: 'When not to use' },
  { id: 'variants', label: 'Variants' },
  { id: 'states', label: 'States' },
  { id: 'behavior', label: 'Behavior' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'content-guidelines', label: 'Content guidelines' },
  { id: 'examples', label: 'Examples' },
  { id: 'props-api', label: 'Props / API' },
  { id: 'related-components', label: 'Related components' },
] as const

export type ComponentDocSectionId = (typeof COMPONENT_DOC_SECTIONS)[number]['id']

export function ComponentDocumentation({ children }: { children: React.ReactNode }) {
  return (
    <div className="component-doc-layout">
      <article className="component-doc-article">{children}</article>
      <OnThisPage items={COMPONENT_DOC_SECTIONS} />
    </div>
  )
}

interface ComponentDocSectionProps {
  id: ComponentDocSectionId
  title: string
  description?: string
  children: React.ReactNode
}

export function ComponentDocSection({ id, title, description, children }: ComponentDocSectionProps) {
  const index = COMPONENT_DOC_SECTIONS.findIndex((section) => section.id === id) + 1

  return (
    <section id={id} className="component-doc-section" aria-labelledby={`${id}-title`}>
      <header className="component-doc-section-header">
        <span aria-hidden="true">{String(index).padStart(2, '0')}</span>
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </header>
      <div className="component-doc-section-content">{children}</div>
    </section>
  )
}

interface AnatomyItem {
  number: number
  name: string
  description: string
  required?: boolean
}

export function Anatomy({ preview, items }: { preview: React.ReactNode; items: AnatomyItem[] }) {
  return (
    <div className="component-anatomy">
      <div className="component-anatomy-preview">{preview}</div>
      <ol className="component-anatomy-list">
        {items.map((item) => (
          <li key={item.number}>
            <span>{item.number}</span>
            <div>
              <strong>{item.name}</strong>
              {item.required && <small>Required</small>}
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

interface GuidanceItem {
  title: string
  description: string
}

export function GuidanceList({ tone, items }: { tone: 'do' | 'dont'; items: GuidanceItem[] }) {
  const title = tone === 'do' ? 'Recommended' : 'Avoid'
  const icon = tone === 'do' ? 'ti-check' : 'ti-x'

  return (
    <div className={`component-guidance component-guidance--${tone}`}>
      <h3><i className={`ti ${icon}`} aria-hidden="true" />{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface StateRow {
  state: string
  trigger: string
  visual: string
  interaction: string
}

export function StateMatrix({ rows }: { rows: StateRow[] }) {
  return (
    <div className="component-doc-table-wrap" tabIndex={0} role="region" aria-label="Component state matrix">
      <table className="component-doc-table">
        <thead><tr><th>State</th><th>Trigger</th><th>Visual response</th><th>Interaction</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.state}><th scope="row">{row.state}</th><td>{row.trigger}</td><td>{row.visual}</td><td>{row.interaction}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface BehaviorItem {
  icon: string
  title: string
  description: string
}

export function BehaviorGrid({ items }: { items: BehaviorItem[] }) {
  return (
    <div className="component-behavior-grid">
      {items.map((item) => (
        <article key={item.title}>
          <i className={`ti ${item.icon}`} aria-hidden="true" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  )
}

interface KeyboardRow {
  keys: string[]
  action: string
}

export function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <div className="component-doc-table-wrap" tabIndex={0} role="region" aria-label="Keyboard interactions">
      <table className="component-doc-table component-keyboard-table">
        <thead><tr><th>Key</th><th>Action</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.keys.join('-')}>
              <th scope="row">{row.keys.map((key) => <kbd key={key}>{key}</kbd>)}</th>
              <td>{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AccessibilityChecklist({ items }: { items: string[] }) {
  return (
    <ul className="component-accessibility-list">
      {items.map((item) => <li key={item}><i className="ti ti-check" aria-hidden="true" />{item}</li>)}
    </ul>
  )
}

interface ContentRule {
  label: string
  guidance: string
  example: string
}

export function ContentGuidelines({ rules }: { rules: ContentRule[] }) {
  return (
    <div className="component-content-rules">
      {rules.map((rule) => (
        <article key={rule.label}>
          <h3>{rule.label}</h3>
          <p>{rule.guidance}</p>
          <div><span>Example</span><q>{rule.example}</q></div>
        </article>
      ))}
    </div>
  )
}

interface RelatedComponent {
  name: string
  href: string
  description: string
  icon: string
}

export function RelatedComponents({ items }: { items: RelatedComponent[] }) {
  return (
    <div className="component-related-grid">
      {items.map((item) => (
        <Link href={item.href} key={item.href}>
          <i className={`ti ${item.icon}`} aria-hidden="true" />
          <span><strong>{item.name}</strong><small>{item.description}</small></span>
          <i className="ti ti-arrow-right" aria-hidden="true" />
        </Link>
      ))}
    </div>
  )
}
