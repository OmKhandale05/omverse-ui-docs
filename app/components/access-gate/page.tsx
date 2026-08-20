'use client'

import { useState } from 'react'
import { AccessGate, Button, type AccessGateDeniedMode } from 'omverse-ui'
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

const PROPS = [
  { name: 'allowed', type: 'boolean', default: 'false', description: 'Resolved application-owned capability result; omitted values deny by default.' },
  { name: 'children', type: 'ReactNode', default: 'required', description: 'Capability surface shown when allowed or rendered inert in disable mode.' },
  { name: 'deniedMode', type: "'disable' | 'hide' | 'replace'", default: "'disable'", description: 'Presentation strategy when access is denied.' },
  { name: 'title', type: 'ReactNode', default: "'Access restricted'", description: 'Short restricted-state heading.' },
  { name: 'reason', type: 'ReactNode', default: 'role guidance', description: 'Plain-language explanation and ownership guidance.' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Escalation, help, or access-request control.' },
  { name: 'fallback', type: 'ReactNode', default: 'undefined', description: 'Fully custom content used in replace mode.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Indicates that the application is resolving capability data.' },
  { name: 'loadingLabel', type: 'string', default: "'Checking access'", description: 'Status announced during capability resolution.' },
  { name: 'announceDenied', type: 'boolean', default: 'false', description: 'Announces newly entered denied guidance as an alert.' },
  { name: 'variant', type: "'inline' | 'panel' | 'banner'", default: "'inline'", description: 'Controls restricted-state presentation.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls restricted-state type density.' },
] as const

const BASIC_CODE = `import { AccessGate, Button } from 'omverse-ui'

<AccessGate
  allowed={permissions.canExportBilling}
  deniedMode="disable"
  title="Finance Admin access required"
  reason="Request temporary access from the workspace owner."
  action={<Button variant="outlined">Request access</Button>}
>
  <Button>Export billing report</Button>
</AccessGate>`

const POLICY_CODE = `const capability = await policy.can({
  actor: session.user,
  action: 'billing.export',
  resource: workspace,
})

<AccessGate
  allowed={capability.allowed}
  loading={capability.loading}
  deniedMode={capability.discoverable ? 'disable' : 'hide'}
  reason={capability.reason}
>
  <ExportBillingAction />
</AccessGate>

// Always repeat authorization in the API handler.
await authorize(session.user, 'billing.export', workspace)`

function AccessGatePreview() {
  const [allowed, setAllowed] = useState(false)
  const [mode, setMode] = useState<AccessGateDeniedMode>('disable')

  return (
    <div className="access-gate-demo">
      <div className="access-gate-demo-controls">
        <Button variant={allowed ? 'filled' : 'outlined'} onClick={() => setAllowed((current) => !current)}>{allowed ? 'Finance Admin granted' : 'Viewer role active'}</Button>
        {(['disable', 'replace', 'hide'] as const).map((item) => <Button key={item} variant={mode === item ? 'filled' : 'text'} onClick={() => setMode(item)}>{item}</Button>)}
      </div>
      <AccessGate allowed={allowed} deniedMode={mode} title="Finance Admin access required" reason="Billing exports contain sensitive invoice and tax data." action={<Button variant="outlined">Request temporary access</Button>}>
        <div className="access-gate-demo-capability"><span><strong>Billing export</strong><small>Includes invoices, tax identifiers, and payment status</small></span><Button>Export report</Button></div>
      </AccessGate>
      {mode === 'hide' && !allowed && <p className="access-gate-demo-note">The capability is intentionally absent in hide mode.</p>}
    </div>
  )
}

export default function AccessGatePage() {
  return (
    <div>
      <PageHeader breadcrumb={['Components', 'Enterprise', 'AccessGate']} title="AccessGate" description="AccessGate adapts a capability surface to an application-owned permission decision without pretending UI controls are a security boundary." tags={['Deny by default', 'Disable', 'Hide', 'Replace', 'Escalation', 'Loading']} />
      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Use AccessGate after policy resolution to make allowed and restricted capabilities predictable."><div className="component-doc-stack"><ComponentPreview title="Billing export capability" description="Switch roles and compare disabled, replaced, and hidden denied states." layout="grid"><AccessGatePreview /></ComponentPreview><CodeBlock filename="BillingExport.tsx" code={BASIC_CODE} /></div></ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy" description="A restricted capability should identify the boundary, explain ownership, and provide a safe next step."><Anatomy preview={<div className="component-anatomy-visual access-gate-anatomy"><section><span className="access-gate-anatomy-lock">⌑</span><span><strong>Finance Admin access required</strong><small>Billing exports contain sensitive data.</small></span><button type="button" tabIndex={-1}>Request access</button></section><div><span>Billing export</span><button type="button" tabIndex={-1}>Export report</button></div><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: 4, left: 14 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: 4, left: 90 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 38, right: 4 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ right: 28, bottom: 4 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ left: 4, bottom: 4 }}>5</span></div>} items={[
          { number: 1, name: 'Policy result', description: 'Consumes an already-resolved allowed or denied capability decision.' },
          { number: 2, name: 'Restricted explanation', description: 'Names the required role, condition, or resource boundary.' },
          { number: 3, name: 'Escalation action', description: 'Offers an access request, owner contact, or support path.' },
          { number: 4, name: 'Capability surface', description: 'Renders normally, inert, replaced, or absent according to policy.' },
          { number: 5, name: 'State boundary', description: 'Keeps restricted guidance programmatically associated and visible.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Use when the same capability must adapt consistently across roles, tenants, or resource conditions."><GuidanceList tone="do" items={[
          { title: 'Sensitive actions', description: 'Adapt export, delete, billing, identity, and security capabilities.' },
          { title: 'Discoverable escalation', description: 'Explain restrictions for features users commonly request.' },
          { title: 'Shared multi-role workspaces', description: 'Apply one policy result consistently across repeated surfaces.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="AccessGate is presentation logic, not authorization or a substitute for simpler conditional rendering."><GuidanceList tone="dont" items={[
          { title: 'Do not secure data with UI', description: 'Authorize every read and mutation at the API or service boundary.' },
          { title: 'Do not hard-code role names', description: 'Resolve granular capabilities in a policy layer before rendering.' },
          { title: 'Do not expose sensitive discovery', description: 'Use hide mode when revealing that a capability exists creates risk.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Choose denied behavior from discoverability and security requirements, then choose a surface by available space."><BehaviorGrid items={[
          { icon: 'ti-lock-off', title: 'Disable', description: 'Preserves the capability’s location while preventing interaction.' },
          { icon: 'ti-mask', title: 'Hide', description: 'Removes the capability and all restricted messaging.' },
          { icon: 'ti-replace', title: 'Replace', description: 'Swaps sensitive content for a dedicated restricted state.' },
          { icon: 'ti-layout', title: 'Inline, panel, banner', description: 'Adapts guidance to actions, whole regions, and workflow notices.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="Capability state should remain deterministic while roles and contextual policy data change."><StateMatrix rows={[
          { state: 'Loading', trigger: 'Policy is unresolved', visual: 'Progress status', interaction: 'Capability remains unavailable' },
          { state: 'Allowed', trigger: 'Capability granted', visual: 'Original content', interaction: 'Native behavior remains unchanged' },
          { state: 'Disabled', trigger: 'Denied but discoverable', visual: 'Inert content and explanation', interaction: 'Only escalation remains available' },
          { state: 'Hidden', trigger: 'Denied and undiscoverable', visual: 'No rendered output', interaction: 'No focus or announcement' },
          { state: 'Replaced', trigger: 'Denied region needs guidance', visual: 'Restricted-state surface', interaction: 'Help or access request is available' },
          { state: 'Conditional', trigger: 'Context rule blocks access', visual: 'Reason names unmet condition', interaction: 'User follows remediation path' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="The component reflects policy; the application owns identity, resolution, refresh, authorization, and audit."><BehaviorGrid items={[
          { icon: 'ti-shield-lock', title: 'Fail closed', description: 'Omitted or unresolved allowed values deny access.' },
          { icon: 'ti-refresh', title: 'Refresh safely', description: 'Show loading while updated role and resource claims resolve.' },
          { icon: 'ti-key', title: 'Escalate intentionally', description: 'Request paths identify the capability and granting owner.' },
          { icon: 'ti-server', title: 'Enforce server-side', description: 'Repeat the same authorization before returning data or mutating state.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="Restricted states must be perceivable, understandable, and absent from keyboard order when unavailable."><div className="component-doc-stack"><KeyboardTable rows={[
          { keys: ['Tab'], action: 'Skips inert denied content and reaches an escalation action when supplied.' },
          { keys: ['Enter', 'Space'], action: 'Activates the focused access-request or help control.' },
          { keys: ['Shift', 'Tab'], action: 'Moves backward without entering disabled descendants.' },
        ]} /><AccessibilityChecklist items={['Use visible text in addition to lock icons and color.', 'Explain the required role or unmet condition.', 'Keep disabled descendants out of the focus order.', 'Do not announce intentionally hidden capabilities.', 'Use announceDenied only for a denied state that changes after user action.', 'Retain native semantics for allowed children.', 'Ensure request-access actions describe what will be requested.']} /></div></ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Permission messages should explain eligibility, ownership, and the next safe action without blaming the user."><ContentGuidelines rules={[
          { label: 'Name the capability', guidance: 'Tell users exactly what is restricted.', example: 'Billing export access required' },
          { label: 'Name familiar roles', guidance: 'Use organization terminology users recognize.', example: 'Available to Finance Admins' },
          { label: 'Explain the boundary', guidance: 'State why the capability is controlled.', example: 'Exports contain tax identifiers' },
          { label: 'Offer a next step', guidance: 'Identify who can grant access or how to request it.', example: 'Request access from the workspace owner' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="Resolve granular capabilities outside the component and repeat authorization at the server boundary."><div className="component-doc-stack"><ComponentPreview title="Restricted settings panel" description="Replace an entire sensitive region with owner guidance." layout="grid"><AccessGate deniedMode="replace" variant="panel" title="Workspace settings are restricted" reason="Only Workspace Admins can change identity and security settings." action={<Button>Contact an admin</Button>}><div /></AccessGate></ComponentPreview><CodeBlock filename="PolicyBoundAction.tsx" code={POLICY_CODE} /></div></ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="AccessGate extends div attributes for allowed, loading, and denied capability states."><PropsTable props={PROPS} /></ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Use capability presentation alongside permission administration, guidance, feedback, and navigation."><RelatedComponents items={[
          { name: 'PermissionMatrix', href: '/components/permission-matrix', description: 'Review and edit resource grants', icon: 'ti-lock-access' },
          { name: 'Alert', href: '/components/alert', description: 'Explain contextual policy warnings', icon: 'ti-alert-circle' },
          { name: 'Tooltip', href: '/components/tooltip', description: 'Clarify compact restricted controls', icon: 'ti-message-circle' },
          { name: 'Navbar', href: '/components/navbar', description: 'Compose capability-aware navigation', icon: 'ti-layout-navbar' },
        ]} /></ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
