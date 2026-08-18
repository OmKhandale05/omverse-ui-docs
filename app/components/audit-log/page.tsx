'use client'

import { useState } from 'react'

import { AuditLog, type AuditLogEntry } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist,
  Anatomy,
  BehaviorGrid,
  ComponentDocSection,
  ComponentDocumentation,
  ContentGuidelines,
  GuidanceList,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const AUDIT_LOG_PROPS = [
  { name: 'entries', type: 'readonly AuditLogEntry[]', default: 'required', description: 'Ordered events, normally newest first.' },
  { name: 'groupByDate', type: 'boolean', default: 'true', description: 'Groups events under localized calendar dates.' },
  { name: 'formatTimestamp', type: '(timestamp) => ReactNode', default: 'localized time', description: 'Formats the event time shown to people.' },
  { name: 'formatDate', type: '(timestamp) => ReactNode', default: 'localized date', description: 'Formats date group headings.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows activity while events resolve.' },
  { name: 'loadingState', type: 'ReactNode', default: "'Loading activity…'", description: 'Replaces the default loading message.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No activity to show.'", description: 'Replaces the default no-events message.' },
  { name: 'errorState', type: 'ReactNode', default: 'undefined', description: 'Displays a retrieval failure instead of entries.' },
  { name: 'onEntrySelect', type: '(entry) => void', default: 'undefined', description: 'Handles selection for entries without an href.' },
  { name: 'variant', type: "'plain' | 'bordered' | 'raised'", default: "'plain'", description: 'Controls container emphasis.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls event spacing, type, and marker scale.' },
] as const

const AUDIT_ENTRIES: readonly AuditLogEntry[] = [
  {
    id: 'evt_2048',
    actor: 'Maya Chen',
    action: 'approved',
    target: 'Production access',
    timestamp: '2026-08-14T10:42:00+05:30',
    tone: 'success',
    description: 'The request passed the two-reviewer policy.',
  },
  {
    id: 'evt_2047',
    actor: 'Noah Williams',
    action: 'changed the owner of',
    target: 'Cloud migration',
    timestamp: '2026-08-14T09:18:00+05:30',
    tone: 'info',
    metadata: 'Owner: Priya Shah → Maya Chen',
  },
  {
    id: 'evt_2046',
    actor: 'Policy service',
    action: 'blocked an export from',
    target: 'Customer accounts',
    timestamp: '2026-08-13T17:04:00+05:30',
    tone: 'warning',
    description: 'The export included restricted identity fields.',
  },
]

const BASIC_CODE = `import { AuditLog, type AuditLogEntry } from 'omverse-ui'

const entries: readonly AuditLogEntry[] = ${JSON.stringify(AUDIT_ENTRIES, null, 2)}

<AuditLog
  entries={entries}
  groupByDate
  variant="bordered"
/>`

function AuditLogPreview() {
  const [selected, setSelected] = useState<string | undefined>('No item selected')

  return (
    <div className="component-doc-stack">
      <AuditLog
        entries={AUDIT_ENTRIES}
        groupByDate
        variant="bordered"
        onEntrySelect={(entry) => setSelected(entry.id)}
      />
      <p className="audit-log-preview-selected">
        <strong>Selected:</strong> {selected}
      </p>
    </div>
  )
}

export default function AuditLogPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'AuditLog']}
        title="AuditLog"
        description="AuditLog presents immutable system and user events in a chronological, inspectable timeline."
        tags={['Date groups', '5 tones', '3 variants', '3 sizes', 'Custom formatting']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use AuditLog to make security, governance, configuration, and operational changes traceable without turning the component into a general collaboration feed."
        >
          <div className="component-doc-stack">
            <ComponentPreview
              title="Workspace activity"
              description="Select an event to mirror the interaction and confirmation path."
              layout="start"
            >
              <AuditLogPreview />
            </ComponentPreview>
            <CodeBlock filename="WorkspaceAuditLog.tsx" code={BASIC_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="Each event combines an outcome marker, actor-action statement, affected target, timestamp, and optional evidence in a chronological rail."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual audit-log-anatomy">
                <header>14 August 2026</header>
                <section><i>✓</i><span><strong>Maya Chen</strong> approved <b>Production access</b><small>Passed the two-reviewer policy.</small></span><time>10:42</time></section>
                <section><i>!</i><span><strong>Policy service</strong> blocked an export<code>Fields: customer_email</code></span><time>09:18</time></section>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 110 }}>1</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 68, left: -34 }}>2</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 68, right: -34 }}>3</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 112, right: -34 }}>4</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 110 }}>5</span>
              </div>
            }
            items={[
              { number: 1, name: 'Date group', description: 'Segments chronology into scannable localized dates.' },
              { number: 2, name: 'Event marker', description: 'Identifies event type or outcome while the rail preserves sequence.' },
              { number: 3, name: 'Event statement', description: 'Connects the actor, action, and affected target.' },
              { number: 4, name: 'Timestamp', description: 'Provides a visible time and machine-readable value.' },
              { number: 5, name: 'Evidence', description: 'Adds a reason, changed value, or policy detail when useful.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Use AuditLog when people must establish who or what changed a governed resource and when it happened."
        >
          <GuidanceList
            tone="do"
            items={[
              { title: 'Trace administrative changes', description: 'Record access, ownership, policy, configuration, and lifecycle events.' },
              { title: 'Support investigation', description: 'Expose stable event identity and relevant evidence for review.' },
              { title: 'Explain automated decisions', description: 'Represent services and policy engines as actors with clear outcomes.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="AuditLog is not a substitute for social feeds, notifications, or dense analytical exploration."
        >
          <GuidanceList
            tone="dont"
            items={[
              { title: 'Do not use as a social feed', description: 'Use a purpose-built activity feed for comments, reactions, and collaboration.' },
              { title: 'Do not replace notifications', description: 'Use Toast or a notification center for time-sensitive awareness.' },
              { title: 'Do not force large-scale analysis', description: 'Use DataTable when events need columns, bulk scanning, sorting, or export.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Container and scale adapt the same event grammar to page regions and elevated review surfaces.">
          <BehaviorGrid
            items={[
              { icon: 'ti-layout-list', title: 'Plain', description: 'Integrates into a page region with an existing boundary.' },
              { icon: 'ti-border-all', title: 'Bordered', description: 'Defines a standalone audit region.' },
              { icon: 'ti-shadow', title: 'Raised', description: 'Supports an elevated review or investigation surface.' },
              { icon: 'ti-arrows-maximize', title: 'Sizes', description: 'Small, medium, and large tune spacing and marker scale.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="AuditLog separates data-resolution states from semantic event outcomes.">
          <StateMatrix
            rows={[
              { state: 'Populated', trigger: 'Events are available', visual: 'Grouped chronological list', interaction: 'Inspect or open entries' },
              { state: 'Interactive entry', trigger: 'href or selection handler exists', visual: 'Hover and focus surface', interaction: 'Opens event detail' },
              { state: 'Loading', trigger: 'Events are resolving', visual: 'Progress and loading message', interaction: 'Entries are withheld' },
              { state: 'Empty', trigger: 'No events exist', visual: 'Neutral no-activity message', interaction: 'No event action' },
              { state: 'Error', trigger: 'Retrieval fails', visual: 'Assertive error feedback', interaction: 'Recovery remains application-owned' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="behavior"
          title="Behavior"
          description="AuditLog owns chronology and event presentation while applications own retrieval, authorization, pagination, filtering, and retention."
        >
          <BehaviorGrid
            items={[
              { icon: 'ti-calendar', title: 'Date grouping', description: 'Events retain their supplied order and group under localized date headings.' },
              { icon: 'ti-clock', title: 'Time formatting', description: 'Visible time can be localized or made relative without losing datetime data.' },
              { icon: 'ti-user-shield', title: 'Actor identity', description: 'People, integrations, and services use the same explicit actor slot.' },
              { icon: 'ti-link', title: 'Inspection', description: 'An href or selection handler makes the complete event target actionable.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="accessibility"
          title="Accessibility"
          description="AuditLog uses date sections, ordered lists, headings, and time elements so chronology remains understandable without visual markers."
        >
          <AccessibilityChecklist
            items={[
              'Keep event statements complete when read without the marker or timeline rail.',
              'Use a real time element with an ISO-compatible datetime value.',
              'Preserve a logical newest-first or oldest-first order and document the chosen convention.',
              'Give custom actor visuals and event markers appropriate text alternatives only when they add meaning.',
              'Do not communicate event outcome through color alone.',
              'Ensure an interactive event has one clear focus target and a descriptive accessible name.',
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Event language should be factual, durable, and consistent enough to support investigation months later."
        >
          <ContentGuidelines
            rules={[
              { label: 'Name the actor', guidance: 'Use a recognizable person, integration, or service identity.', example: 'Policy service' },
              { label: 'Use past-tense actions', guidance: 'Describe the completed event directly.', example: 'changed the owner of' },
              { label: 'Name the target', guidance: 'Identify the affected resource, not just its type.', example: 'Cloud migration' },
              { label: 'Record evidence', guidance: 'Add relevant changed values or policy reasons without interpretation.', example: 'Owner: Priya Shah → Maya Chen' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Use examples that mirror operational review and incident workflows."
        >
          <div className="component-doc-stack">
            <ComponentPreview
              title="Review workflow with immutable audit context"
              description="Open a selected event and keep a stable action log for investigators."
            >
              <AuditLogPreview />
            </ComponentPreview>
            <CodeBlock filename="ReviewedAction.tsx" code={BASIC_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="props-api"
          title="Props / API"
          description="AuditLog extends div attributes; AuditLogEntry defines event identity, actor, action, target, timestamp, evidence, marker, and optional destination."
        >
          <PropsTable props={AUDIT_LOG_PROPS} />
        </ComponentDocSection>

        <ComponentDocSection
          id="related-components"
          title="Related components"
          description="Choose adjacent patterns based on whether events need chronological reading, tabular analysis, contextual inspection, or transient notification."
        >
          <RelatedComponents
            items={[
              { name: 'DataTable', href: '/components/data-table', description: 'Analyze dense event records in columns', icon: 'ti-table' },
              { name: 'SidePanel', href: '/components/side-panel', description: 'Inspect one event without leaving context', icon: 'ti-layout-sidebar-right' },
              { name: 'Badge', href: '/components/badge', description: 'Label outcome or event classification', icon: 'ti-badge' },
              { name: 'Toast', href: '/components/toast', description: 'Announce transient operation results', icon: 'ti-bell' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
