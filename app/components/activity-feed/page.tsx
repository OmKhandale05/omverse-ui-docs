'use client'
import { useState } from 'react'
import { ActivityFeed } from 'omverse-ui'

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
  KeyboardTable,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const UPDATES = [
  {
    id: 'a1',
    actor: 'Maya Chen',
    action: 'changed the status of',
    subject: 'Enterprise migration',
    description: 'In progress → At risk',
    timestamp: '10 minutes ago',
    dateTime: '2026-08-18T10:30:00Z',
    dateLabel: 'Today',
    unread: true,
  },
  {
    id: 'a2',
    actor: 'Noah Williams',
    action: 'commented on',
    subject: 'Security review',
    description: 'The control evidence is ready for review.',
    timestamp: '1 hour ago',
    dateTime: '2026-08-18T09:40:00Z',
    dateLabel: 'Today',
  },
  {
    id: 'a3',
    actor: 'Policy Engine',
    action: 'blocked an export',
    subject: 'Customer accounts',
    description: 'Restricted identity fields were excluded.',
    timestamp: 'Yesterday · 4:30 PM',
    dateTime: '2026-08-17T16:30:00Z',
    dateLabel: 'Yesterday',
  },
]

const EARLIER_UPDATES = [
  {
    id: 'a4',
    actor: 'Ari Patel',
    action: 'approved',
    subject: 'Policy update',
    description: 'Risk threshold aligned with new controls.',
    timestamp: '2 days ago',
    dateTime: '2026-08-16T11:10:00Z',
    dateLabel: 'Monday',
  },
]

const PROPS = [
  { name: 'items', type: 'readonly ActivityFeedItem[]', default: 'required', description: 'Chronological updates.' },
  { name: 'title', type: 'ReactNode', default: "'Activity'", description: 'Visible feed heading.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows initial loading.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No activity yet'", description: 'Empty content.' },
  { name: 'onItemClick', type: '(item) => void', default: 'undefined', description: 'Makes updates actionable.' },
  { name: 'onLoadMore', type: '(...) => void', default: 'undefined', description: 'Loads older updates.' },
  { name: 'hasMore', type: 'boolean', default: 'false', description: 'Shows load-more control.' },
  { name: 'loadingMore', type: 'boolean', default: 'false', description: 'Shows incremental loading.' },
  { name: 'variant', type: "'plain' | 'outlined' | 'filled'", default: "'outlined'", description: 'Surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Item density.' },
]

const CODE = `import { ActivityFeed } from 'omverse-ui'

const updates = [/* ... */]

<ActivityFeed
  items={updates}
  hasMore={true}
  onLoadMore={loadNextPage}
/>`

function Demo() {
  const [items, setItems] = useState(UPDATES)
  const [hasMore, setHasMore] = useState(true)

  return (
    <ActivityFeed
      items={items}
      hasMore={hasMore}
      onItemClick={() => {}}
      onLoadMore={() => {
        setItems((current) => [...current, ...EARLIER_UPDATES])
        setHasMore(false)
      }}
    />
  )
}

export default function Page() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'ActivityFeed']}
        title="ActivityFeed"
        description="ActivityFeed presents chronological, human-readable collaboration updates."
        tags={['Actors and actions', 'Date groups', 'Unread state', 'Metadata', 'Incremental loading']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use ActivityFeed to help people understand recent collaborative changes in the context of a project or workspace."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Project activity">
              <Demo />
            </ComponentPreview>
            <CodeBlock filename="ProjectActivity.tsx" code={CODE} />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="Each update connects an actor, action, subject, supporting detail, time, and unread state."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual activity-anatomy">
                <h4>Today</h4>
                <section>
                  <strong>MC</strong>
                  <span>
                    <b>Maya Chen</b> changed the status of <strong>Enterprise migration</strong>
                  </span>
                  <small>In progress → At risk</small>
                  <time>10 minutes ago</time>
                </section>
              </div>
            }
            items={[
              { number: 1, name: 'Date group', description: 'Segments chronology.' },
              { number: 2, name: 'Actor visual', description: 'Identifies the person or source.' },
              { number: 3, name: 'Activity sentence', description: 'Connects actor, action, and subject.' },
              { number: 4, name: 'Detail and time', description: 'Adds outcome and recency.' },
              { number: 5, name: 'Unread indicator', description: 'Marks unseen updates.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Choose this component for human-readable collaboration signals and workstream continuity."
        >
          <GuidanceList
            tone="do"
            items={[
              { title: 'Show collaboration history', description: 'Summarize comments and record changes.' },
              { title: 'Provide contextual recency', description: 'Keep updates beside the affected work.' },
              { title: 'Support progressive history', description: 'Load older activity on demand.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="Avoid ActivityFeed for compliance evidence or urgent transient alerts."
        >
          <GuidanceList
            tone="dont"
            items={[
              { title: 'Do not use for immutable evidence', description: 'Use AuditLog.' },
              { title: 'Do not use for urgent actions', description: 'Use NotificationCenter or Alert.' },
              { title: 'Do not show conversations', description: 'Use threaded communication UI for chats.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="variants" title="Variants" description="Surface, size, and chronology controls are configurable.">
          <BehaviorGrid
            items={[
              { icon: 'ti-line-dashed', title: 'Plain', description: 'Embedded timeline.' },
              { icon: 'ti-border-all', title: 'Outlined', description: 'Bounded feed.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal feed.' },
              { icon: 'ti-arrows-minimize', title: 'Density', description: 'Three item sizes.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="states" title="States" description="Read/unread, loading, and empty states are clearly represented.">
          <StateMatrix
            rows={[
              { state: 'Read', trigger: 'Previously seen', visual: 'Standard row', interaction: 'Open if actionable' },
              { state: 'Unread', trigger: 'New update', visual: 'Tonal row and dot', interaction: 'Open or act via host controls.' },
              { state: 'Loading', trigger: 'Initial fetch', visual: 'Status', interaction: 'Wait' },
              { state: 'Loading more', trigger: 'Older page requested', visual: 'Load more state', interaction: 'Current items remain.' },
              { state: 'Empty', trigger: 'No updates', visual: 'Empty content', interaction: 'None' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="behavior"
          title="Behavior"
          description="Chronology and date grouping stay stable while older entries are appended in order."
        >
          <BehaviorGrid
            items={[
              { icon: 'ti-clock', title: 'Chronology', description: 'Newest updates appear first.' },
              { icon: 'ti-calendar', title: 'Grouping', description: 'Repeated dates are grouped for scanning.' },
              { icon: 'ti-link', title: 'Navigation', description: 'Item click can open related context.' },
              { icon: 'ti-loader', title: 'Pagination', description: 'Load more appends older updates.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="accessibility" title="Accessibility">
          <div className="component-doc-stack">
            <KeyboardTable
              rows={[
                { keys: ['Tab'], action: 'Moves through actionable updates and load-more.' },
                { keys: ['Enter', 'Space'], action: 'Opens an actionable update.' },
              ]}
            />
            <AccessibilityChecklist
              items={[
                'Use an ordered list for chronology.',
                'Write complete activity sentences.',
                'Use semantic time with dateTime when known.',
                'Expose unread state in text.',
                'Announce loading states.',
              ]}
            />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Keep update language factual and concise for rapid scannability."
        >
          <ContentGuidelines
            rules={[
              { label: 'Lead with actor', guidance: 'Name who acted first.', example: 'Maya Chen changed' },
              { label: 'Use action + subject', guidance: 'Keep object language concrete.', example: 'approved the policy' },
              { label: 'Add outcome in brief', guidance: 'Include the result or next step.', example: 'In progress → At risk' },
              { label: 'Label chronology', guidance: 'Prefer grouped date labels for long feeds.', example: 'Yesterday' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Use `ActivityFeed` for collaboration timeline contexts outside formal audit systems."
        >
          <ComponentPreview title="System activity">
            <div className="activity-example">⚙ Automation updated <b>Renewal forecast</b><small>Yesterday at 4:30 PM · Workflow</small></div>
          </ComponentPreview>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API" description="ActivityFeed extends section attributes.">
          <PropsTable props={PROPS} />
        </ComponentDocSection>
        <ComponentDocSection id="related-components" title="Related components" description="Choose based on intent: collaboration stream, notifications, or evidence records.">
          <RelatedComponents
            items={[
              { name: 'AuditLog', href: '/components/audit-log', description: 'Records compliance evidence', icon: 'ti-history' },
              { name: 'NotificationCenter', href: '/components/notification-center', description: 'Collects actionable notices', icon: 'ti-bell' },
              { name: 'Alert', href: '/components/alert', description: 'Shows contextual feedback', icon: 'ti-alert-circle' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
