'use client'

import { useState } from 'react'
import { NotificationCenter, type NotificationCenterItem } from 'omverse-ui'
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

const NOTICES: readonly NotificationCenterItem[] = [
  {
    id: 'risk',
    title: 'Project moved to at risk',
    description: 'Enterprise migration needs your review.',
    timestamp: '10 minutes ago',
    dateTime: '2026-08-18T10:20:00Z',
    category: 'Projects',
    tone: 'critical',
    actionLabel: 'Review',
  },
  {
    id: 'access',
    title: 'Access request approved',
    description: 'Maya can now manage workspace billing.',
    timestamp: '1 hour ago',
    dateTime: '2026-08-18T09:30:00Z',
    category: 'Security',
    tone: 'success',
    actionLabel: 'View request',
  },
]

const PROPS = [
  { name: 'items', type: 'readonly NotificationCenterItem[]', default: 'required', description: 'Notice collection.' },
  { name: 'readIds', type: 'readonly string[]', default: 'undefined', description: 'Controlled read identifiers.' },
  { name: 'defaultReadIds', type: 'readonly string[]', default: '[]', description: 'Initial read identifiers.' },
  { name: 'onReadIdsChange', type: '(ids) => void', default: 'undefined', description: 'Runs after read state changes.' },
  { name: 'title', type: 'ReactNode', default: "'Notifications'", description: 'Visible heading.' },
  { name: 'defaultFilter', type: "'all' | 'unread'", default: "'all'", description: 'Initial filter.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading status.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No notifications'", description: 'Empty all-filter content.' },
  { name: 'onItemClick', type: '(item) => void', default: 'undefined', description: 'Opens a notice.' },
  { name: 'onAction', type: '(item) => void', default: 'undefined', description: 'Runs its primary action.' },
  { name: 'onDismiss', type: '(item) => void', default: 'undefined', description: 'Dismisses a notice.' },
  { name: 'showMarkAllRead', type: 'boolean', default: 'true', description: 'Shows bulk read action.' },
  { name: 'variant', type: "'outlined' | 'filled' | 'raised'", default: "'outlined'", description: 'Surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Item density.' },
]

const CODE = `import { NotificationCenter } from 'omverse-ui'

const notices = [/* ... */]

<NotificationCenter
  items={notices}
  readIds={readIds}
  onReadIdsChange={setReadIds}
  onAction={handleAction}
/>`

function Demo() {
  const [readIds, setReadIds] = useState<readonly string[]>(['access'])

  return (
    <div className="notification-center-preview">
      <NotificationCenter
        items={NOTICES}
        readIds={readIds}
        onReadIdsChange={setReadIds}
        onItemClick={() => {}}
        onAction={() => {}}
        onDismiss={() => {}}
      />
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'NotificationCenter']}
        title="NotificationCenter"
        description="NotificationCenter collects time-sensitive notices and their read and action state."
        tags={['All / unread', 'Controlled read state', 'Priority tones', 'Item actions', 'Bulk read']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use NotificationCenter as a persistent inbox for relevant notices that people may need to review, act on, or revisit."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Workspace notifications">
              <Demo />
            </ComponentPreview>
            <CodeBlock filename="WorkspaceNotifications.tsx" code={CODE} />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="The center combines unread summary and filtering with notices that expose priority, content, metadata, and actions."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual notification-anatomy">
                <header>
                  <span>Notifications</span>
                  <small>2 unread</small>
                  <button>Mark all read</button>
                </header>
                <nav>All · Unread</nav>
                <section>
                  <strong>Project moved to at risk</strong>
                  <small>Enterprise migration needs review.</small>
                  <time>Projects · 10 minutes ago</time>
                </section>
              </div>
            }
            items={[
              { number: 1, name: 'Unread summary', description: 'States pending attention.' },
              { number: 2, name: 'Bulk action', description: 'Marks visible notices read.' },
              { number: 3, name: 'Filter', description: 'Switches all and unread views.' },
              { number: 4, name: 'Notification content', description: 'Explains event and context.' },
              { number: 5, name: 'Notice action', description: 'Opens the relevant workflow.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Use NotificationCenter for attention management where notices need tracking and action."
        >
          <GuidanceList
            tone="do"
            items={[
              { title: 'Collect asynchronous notices', description: 'Keep updates available after they arrive.' },
              { title: 'Support follow-up actions', description: 'Link directly to relevant work.' },
              { title: 'Manage attention', description: 'Track read and unread state.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="NotificationCenter should be reserved for actionable updates that need triage."
        >
          <GuidanceList
            tone="dont"
            items={[
              { title: 'Do not use for inline feedback', description: 'Use Alert or Toast.' },
              { title: 'Do not narrate all collaboration', description: 'Use ActivityFeed.' },
              { title: 'Do not store immutable evidence', description: 'Use AuditLog.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="variants" title="Variants">
          <BehaviorGrid
            items={[
              { icon: 'ti-border-all', title: 'Outlined', description: 'Bounded inbox.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal panel.' },
              { icon: 'ti-shadow', title: 'Raised', description: 'Popover-style center.' },
              { icon: 'ti-arrows-minimize', title: 'Density', description: 'Three item sizes.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="states" title="States">
          <StateMatrix
            rows={[
              { state: 'Unread', trigger: 'ID absent from readIds', visual: 'Tonal item and indicator', interaction: 'Open or act' },
              { state: 'Read', trigger: 'ID in readIds', visual: 'Standard item', interaction: 'Can revisit' },
              { state: 'Filtered', trigger: 'Unread selected', visual: 'Unread notices only', interaction: 'Switch filter' },
              { state: 'All caught up', trigger: 'No unread notices', visual: 'Positive empty message', interaction: 'Return to all' },
              { state: 'Loading', trigger: 'Fetch in progress', visual: 'Status', interaction: 'Wait' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="behavior"
          title="Behavior"
          description="Opening or acting can be tied to read-state transitions while filtering remains internal to the collection."
        >
          <BehaviorGrid
            items={[
              { icon: 'ti-eye', title: 'Read state', description: 'Opening or acting marks a notice read.' },
              { icon: 'ti-filter', title: 'Filtering', description: 'All and unread views preserve the collection.' },
              { icon: 'ti-checks', title: 'Bulk read', description: 'Marks every current notice as read.' },
              { icon: 'ti-external-link', title: 'Actions', description: 'Host owns navigation and mutation.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="accessibility" title="Accessibility">
          <div className="component-doc-stack">
            <KeyboardTable
              rows={[
                { keys: ['Tab'], action: 'Moves through filters, notices, and actions.' },
                { keys: ['Enter', 'Space'], action: 'Opens, acts on, dismisses, or filters.' },
              ]}
            />
            <AccessibilityChecklist
              items={[
                'Announce the unread count politely.',
                'Expose active filters with aria-pressed.',
                'State unread status in text.',
                'Give dismissal controls notice-specific names.',
                'Keep item and secondary actions separate.',
              ]}
            />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Keep each notice concise, with outcome, impact, and next action."
        >
          <ContentGuidelines
            rules={[
              { label: 'Lead with the outcome', guidance: 'State what changed clearly.', example: 'Access request approved' },
              { label: 'Add actionable context', guidance: 'Explain impact or next step.', example: 'Review payment details before renewal.' },
              { label: 'Name direct actions', guidance: 'Use concise verbs.', example: 'Review, Open, Dismiss' },
              { label: 'Use categories consistently', guidance: 'Identify product domain.', example: 'Security' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Use an empty-state section for teams with catch-up workflows."
        >
          <ComponentPreview title="All caught up">
            <div className="notification-empty">✓ <b>You are all caught up</b><small>No unread notifications</small></div>
          </ComponentPreview>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API" description="NotificationCenter extends section attributes.">
          <PropsTable props={PROPS} />
        </ComponentDocSection>
        <ComponentDocSection
          id="related-components"
          title="Related components"
          description="Use these when you need related communication or evidence components."
        >
          <RelatedComponents
            items={[
              { name: 'ActivityFeed', href: '/components/activity-feed', description: 'Shows collaboration history', icon: 'ti-activity' },
              { name: 'Alert', href: '/components/alert', description: 'Shows contextual feedback', icon: 'ti-alert-circle' },
              { name: 'Toast', href: '/components/toast', description: 'Shows transient confirmation', icon: 'ti-bell' },
              { name: 'AuditLog', href: '/components/audit-log', description: 'Records compliance evidence', icon: 'ti-history' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
