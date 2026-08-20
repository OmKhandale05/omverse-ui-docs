'use client'

import { useState } from 'react'
import { ApprovalCard, Button, type ApprovalStatus } from 'omverse-ui'
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

const STAGES = [
  { id: 'request', label: 'Request', status: 'complete' as const, detail: 'Submitted 9:12 AM' },
  { id: 'manager', label: 'Manager', status: 'complete' as const, detail: 'Approved by Noah' },
  { id: 'finance', label: 'Finance', status: 'current' as const, detail: 'Priya Shah' },
  { id: 'security', label: 'Security', status: 'upcoming' as const, detail: 'After Finance' },
]

const CHECKS = [
  { id: 'manager', label: 'Manager approval', status: 'passed' as const },
  { id: 'window', label: 'Access window', status: 'passed' as const, description: 'Expires after 8 hours' },
  { id: 'evidence', label: 'Incident evidence', status: 'warning' as const, description: 'One attachment needs review' },
  { id: 'security', label: 'Security review', status: 'pending' as const },
]

const PROPS = [
  { name: 'title', type: 'ReactNode', default: 'required', description: 'Decision request title used as the card accessible name.' },
  { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Concise decision context or proposed change.' },
  { name: 'requestId', type: 'ReactNode', default: 'undefined', description: 'Human-readable request identifier.' },
  { name: 'status', type: 'ApprovalStatus', default: "'pending'", description: 'Current lifecycle state.' },
  { name: 'statusLabel', type: 'ReactNode', default: 'generated', description: 'Replaces the generated lifecycle label.' },
  { name: 'requester', type: 'ReactNode', default: 'undefined', description: 'Person or system that initiated the request.' },
  { name: 'currentApprover', type: 'ReactNode', default: 'undefined', description: 'Current reviewer, group, or decision owner.' },
  { name: 'dueDate', type: 'ReactNode', default: 'undefined', description: 'Visible deadline or SLA value.' },
  { name: 'dueDateTime', type: 'string', default: 'undefined', description: 'Machine-readable due date for the time element.' },
  { name: 'metadata', type: 'ReactNode', default: 'undefined', description: 'Additional read-only request context.' },
  { name: 'stages', type: 'readonly ApprovalStage[]', default: '[]', description: 'Ordered review and handoff stages.' },
  { name: 'checks', type: 'readonly ApprovalCheck[]', default: '[]', description: 'Required validations and their current results.' },
  { name: 'actions', type: 'ReactNode', default: 'undefined', description: 'Application-owned approve, reject, return, or escalation controls.' },
  { name: 'timeline', type: 'ReactNode', default: 'undefined', description: 'Immutable activity or rationale content.' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Prevents supplied decision controls from receiving input.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Marks a decision transition as in progress.' },
  { name: 'loadingLabel', type: 'string', default: "'Updating approval'", description: 'Status announced during a transition.' },
  { name: 'variant', type: "'outlined' | 'filled' | 'raised'", default: "'outlined'", description: 'Controls surface emphasis.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls type density.' },
] as const

const BASIC_CODE = `import { ApprovalCard, Button } from 'omverse-ui'

<ApprovalCard
  requestId="APR-2048"
  title="Production access exception"
  description="Temporary access for an incident response window."
  status="in-review"
  requester="Asha Mehta"
  currentApprover="Priya Shah · Finance Lead"
  dueDate="Today, 5:00 PM"
  stages={approvalStages}
  checks={policyChecks}
  actions={
    <>
      <Button variant="outlined">Return</Button>
      <Button variant="destructive">Reject</Button>
      <Button>Approve</Button>
    </>
  }
/>
`

const ASYNC_CODE = `const [saving, setSaving] = useState(false)

<ApprovalCard
  title={request.title}
  status={request.status}
  loading={saving}
  loadingLabel="Recording approval decision"
  readOnly={!permissions.canDecide}
  actions={<Button onClick={() => decide('approved')}>Approve</Button>}
/>

async function decide(nextStatus: ApprovalStatus) {
  setSaving(true)
  await recordDecision({ requestId: request.id, nextStatus, rationale })
  setSaving(false)
}`

function ApprovalCardPreview() {
  const [status, setStatus] = useState<ApprovalStatus>('in-review')
  const [loading, setLoading] = useState(false)

  function decide(next: ApprovalStatus) {
    setLoading(true)
    window.setTimeout(() => { setStatus(next); setLoading(false) }, 650)
  }

  const finalized = status === 'approved' || status === 'rejected' || status === 'returned'

  return (
    <div className="approval-card-demo">
      <ApprovalCard
        requestId="APR-2048"
        title="Production access exception"
        description="Allow temporary production access for the incident response window."
        status={status}
        requester="Asha Mehta"
        currentApprover="Priya Shah · Finance Lead"
        dueDate="Today, 5:00 PM"
        metadata="High risk · 8 hours"
        stages={STAGES}
        checks={CHECKS}
        loading={loading}
        loadingLabel="Recording decision"
        readOnly={finalized}
        timeline={finalized ? <p className="approval-card-demo-result">Decision recorded. The audit timeline is now immutable.</p> : undefined}
        actions={<><Button variant="outlined" onClick={() => decide('returned')}>Return</Button><Button variant="destructive" onClick={() => decide('rejected')}>Reject</Button><Button onClick={() => decide('approved')}>Approve</Button></>}
      />
      {finalized && <Button variant="text" onClick={() => setStatus('in-review')}>Reset preview</Button>}
    </div>
  )
}

export default function ApprovalCardPage() {
  return (
    <div>
      <PageHeader breadcrumb={['Components', 'Enterprise', 'ApprovalCard']} title="ApprovalCard" description="ApprovalCard creates a governed decision surface with explicit ownership, policy readiness, workflow stages, and durable outcomes." tags={['Governance', 'Stages', 'Policy checks', 'Read-only', 'Loading', '3 variants']} />
      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Use ApprovalCard to give reviewers enough context to make and understand a governed decision."><div className="component-doc-stack"><ComponentPreview title="Production access exception" description="Try approving, rejecting, returning, and resetting the request." layout="grid"><ApprovalCardPreview /></ComponentPreview><CodeBlock filename="AccessApproval.tsx" code={BASIC_CODE} /></div></ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy" description="Keep request context, ownership, readiness, decisions, and history in a stable reading order."><Anatomy preview={<div className="component-anatomy-visual approval-card-anatomy"><header><span><small>APR-2048</small><strong>Production access exception</strong></span><b>In review</b></header><section className="approval-card-anatomy-meta"><span>Requester</span><span>Reviewer</span><span>Due today</span></section><section className="approval-card-anatomy-stages"><i>✓ Request</i><i>● Finance</i><i>→ Security</i></section><section className="approval-card-anatomy-checks"><span>✓ Policy</span><span>! Evidence</span></section><footer><span>Timeline</span><b>Return</b><strong>Approve</strong></footer><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: 4, left: 18 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: 4, right: 18 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 88, right: 4 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ right: 34, bottom: 4 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ left: 4, bottom: 4 }}>5</span></div>} items={[
          { number: 1, name: 'Request context', description: 'Identifies the request and summarizes the proposed change.' },
          { number: 2, name: 'Decision status', description: 'Communicates the current lifecycle outcome in text and color.' },
          { number: 3, name: 'Stages and checks', description: 'Makes handoffs, readiness, warnings, and blockers visible before action.' },
          { number: 4, name: 'Decision actions', description: 'Presents only outcomes allowed for the current reviewer and state.' },
          { number: 5, name: 'Timeline', description: 'Holds immutable actors, timestamps, transitions, and rationale.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Use for decisions that require ownership, policy validation, or an audit trail."><GuidanceList tone="do" items={[
          { title: 'Governed changes', description: 'Review access, budget, compliance, deployment, or policy changes.' },
          { title: 'Multi-stage handoffs', description: 'Show the current reviewer and the next accountable team.' },
          { title: 'Evidence-based decisions', description: 'Expose required checks and missing evidence before actions.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer simpler surfaces when a durable decision model adds no value."><GuidanceList tone="dont" items={[
          { title: 'Do not use for acknowledgements', description: 'Use Alert or NotificationCenter when no decision is required.' },
          { title: 'Do not hide complex editing inside', description: 'Use a form, SidePanel, or dedicated task before returning to the decision.' },
          { title: 'Do not bypass authorization', description: 'The application must validate every decision on the server.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Surface treatments change emphasis without changing the approval contract."><BehaviorGrid items={[
          { icon: 'ti-border-all', title: 'Outlined', description: 'Default card in a page, queue, or detail view.' },
          { icon: 'ti-square-filled', title: 'Filled', description: 'Groups a decision inside a tonal workspace.' },
          { icon: 'ti-shadow', title: 'Raised', description: 'Elevates a focused request above supporting content.' },
          { icon: 'ti-line-height', title: 'Sizes', description: 'Small, medium, and large adjust type density while preserving targets.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="Lifecycle and interaction states must stay distinct and understandable."><StateMatrix rows={[
          { state: 'Draft', trigger: 'Request is editable', visual: 'Neutral status', interaction: 'Owner can refine before routing' },
          { state: 'Pending', trigger: 'Waiting for a reviewer', visual: 'Pending status and next owner', interaction: 'Decision controls follow permissions' },
          { state: 'In review', trigger: 'Reviewer started work', visual: 'Active stage and policy checks', interaction: 'One decision branch at a time' },
          { state: 'Approved / rejected', trigger: 'Decision recorded', visual: 'Durable outcome and timeline', interaction: 'Read-only unless policy permits reopening' },
          { state: 'Returned', trigger: 'More information required', visual: 'Return status and rationale', interaction: 'Requester updates and resubmits' },
          { state: 'Loading', trigger: 'Transition is being recorded', visual: 'Progress status', interaction: 'Duplicate decisions are prevented' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="ApprovalCard presents workflow state; applications own policy, persistence, notifications, and authorization."><BehaviorGrid items={[
          { icon: 'ti-route', title: 'Explicit handoff', description: 'Only one stage is current in a linear workflow.' },
          { icon: 'ti-shield-check', title: 'Policy-aware actions', description: 'Blocked checks should prevent unsafe decisions upstream.' },
          { icon: 'ti-history', title: 'Immutable result', description: 'Final decisions preserve actor, time, rationale, and evidence.' },
          { icon: 'ti-bell', title: 'Application notification', description: 'The application alerts the next actor after persistence succeeds.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="Semantic regions, named status, native controls, and explicit ownership keep decisions understandable."><div className="component-doc-stack"><KeyboardTable rows={[
          { keys: ['Tab'], action: 'Moves through application-supplied decision controls.' },
          { keys: ['Enter', 'Space'], action: 'Activates the focused native action.' },
          { keys: ['Shift', 'Tab'], action: 'Moves backward without entering non-interactive stage content.' },
          { keys: ['Esc'], action: 'Handled by a containing dialog or SidePanel when present.' },
        ]} /><AccessibilityChecklist items={['Use a specific request title as the card accessible name.', 'Keep lifecycle labels visible; do not rely on color.', 'Describe blockers and remediation in plain language.', 'Provide a machine-readable dueDateTime when due dates are shown.', 'Announce loading and status changes politely.', 'Move focus to a durable result summary after a modal decision flow.', 'Require confirmation for irreversible or regulated decisions.']} /></div></ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Decision language should state the object, consequence, owner, and required evidence."><ContentGuidelines rules={[
          { label: 'Name the object', guidance: 'Use a specific request title rather than a generic task.', example: 'Production access exception' },
          { label: 'State action outcomes', guidance: 'Use verbs that describe the resulting lifecycle state.', example: 'Return for changes' },
          { label: 'Identify ownership', guidance: 'Show the accountable reviewer or group.', example: 'Current reviewer: Priya Shah' },
          { label: 'Explain blockers', guidance: 'Tell reviewers what is missing and how to resolve it.', example: 'Attach incident evidence before approval' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="Keep async persistence outside the card and lock decisions while a transition is running."><div className="component-doc-stack"><ComponentPreview title="Finalized decision" description="Read-only outcome with a durable timeline entry." layout="grid"><ApprovalCard title="Approved payment exception" requestId="APR-1932" status="approved" statusLabel="Approved · Final" variant="filled" readOnly currentApprover="Finance operations" dueDate="Completed today" timeline={<p className="approval-card-demo-result">Approved by Priya Shah · Today, 11:42 AM · Policy checks passed</p>} actions={<Button>Reopen</Button>} /></ComponentPreview><CodeBlock filename="AsyncApproval.tsx" code={ASYNC_CODE} /></div></ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="ApprovalCard extends article attributes and keeps workflow data explicit through typed stages and checks."><PropsTable props={PROPS} /></ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Compose approval context with evidence collection, audit history, notifications, and focused review surfaces."><RelatedComponents items={[
          { name: 'ActivityFeed', href: '/components/activity-feed', description: 'Render human-readable review history', icon: 'ti-activity' },
          { name: 'Textarea', href: '/components/textarea', description: 'Collect rationale or return instructions', icon: 'ti-forms' },
          { name: 'SidePanel', href: '/components/side-panel', description: 'Focus a request without losing queue context', icon: 'ti-layout-sidebar-right' },
          { name: 'NotificationCenter', href: '/components/notification-center', description: 'Notify the next accountable reviewer', icon: 'ti-bell' },
        ]} /></ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
