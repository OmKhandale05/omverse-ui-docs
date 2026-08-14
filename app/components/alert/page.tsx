'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import { AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection, ComponentDocumentation, ContentGuidelines, GuidanceList, RelatedComponents, StateMatrix } from '@/components/docs/ComponentDocumentation'

const PROPS = [
  { name: 'title', type: 'ReactNode', default: 'undefined', description: 'Short summary of the condition.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Supporting guidance or condition detail.' },
  { name: 'tone', type: "'neutral' | 'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Sets semantic emphasis, icon, color, and default announcement role.' },
  { name: 'variant', type: "'tonal' | 'outlined' | 'filled'", default: "'tonal'", description: 'Controls visual emphasis.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls spacing and icon scale.' },
  { name: 'layout', type: "'inline' | 'block'", default: "'block'", description: 'Arranges compact or descriptive alert content.' },
  { name: 'icon', type: 'IconName | null', default: 'tone icon', description: 'Overrides or removes the semantic visual.' },
  { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Contextual action such as a Button or Link.' },
  { name: 'dismissible', type: 'boolean', default: 'false', description: 'Shows a close control.' },
  { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Runs when the close control is activated.' },
  { name: 'dismissLabel', type: 'string', default: "'Dismiss alert'", description: 'Accessible label for the close control.' },
] as const

const BASIC = `import { Alert, Button } from 'omverse-ui'

<Alert
  tone="warning"
  title="Certificate expires in 8 days"
  action={<Button variant="text" size="sm">Rotate certificate</Button>}
  dismissible
  onDismiss={() => setVisible(false)}
>
  Rotate the certificate to avoid service interruption.
</Alert>`

const INLINE = `<Alert tone="success" layout="inline" title="Policy published">
  The policy now applies to every workspace member.
</Alert>`

function AlertPreview() {
  const [visible, setVisible] = useState(true)
  return visible ? <div className="alert-demo" role="status"><span aria-hidden>!</span><div><strong>Certificate expires in 8 days</strong><p>Rotate the certificate to avoid service interruption.</p></div><button type="button">Rotate certificate</button><button type="button" aria-label="Dismiss alert" onClick={() => setVisible(false)}>×</button></div> : <button type="button" className="alert-demo-reset" onClick={() => setVisible(true)}>Show alert again</button>
}

export default function AlertPage() {
  return <div><PageHeader breadcrumb={['Components', 'Enterprise', 'Alert']} title="Alert / Banner" description="Alert communicates persistent contextual information, success, warning, or failure." tags={['5 tones', '3 variants', '3 sizes', 'Inline + block', 'Actions + dismissal']} /><ComponentDocumentation>
    <ComponentDocSection id="overview" title="Overview" description="Use Alert for important information that should remain near the affected content until people act, dismiss it, or the underlying condition changes."><div className="component-doc-stack"><ComponentPreview title="Expiring credential" description="The warning remains visible and offers a relevant recovery action."><AlertPreview /></ComponentPreview><CodeBlock filename="CertificateAlert.tsx" code={BASIC} /></div></ComponentDocSection>
    <ComponentDocSection id="anatomy" title="Anatomy" description="A complete alert combines semantic status, a concise summary, useful detail, an optional action, and optional dismissal."><Anatomy preview={<div className="component-anatomy-visual alert-anatomy"><i>!</i><span><strong>Certificate expires soon</strong><small>Rotate it to avoid interruption.</small></span><b>Rotate</b><em>×</em><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 28 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 78 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 132 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, right: 46 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, right: 10 }}>5</span></div>} items={[{ number: 1, name: 'Status icon', description: 'Reinforces tone without carrying meaning alone.' }, { number: 2, name: 'Title', description: 'Summarizes the condition in a scannable phrase.' }, { number: 3, name: 'Description', description: 'Explains impact or the most useful next step.' }, { number: 4, name: 'Action', description: 'Offers one contextual response when needed.' }, { number: 5, name: 'Dismiss', description: 'Removes non-critical, recoverable information.' }]} /></ComponentDocSection>
    <ComponentDocSection id="when-to-use" title="When to use" description="Use Alert when a condition affects the current page, task, or region and must remain discoverable."><GuidanceList tone="do" items={[{ title: 'Explain page-level conditions', description: 'Communicate maintenance, policy, availability, or configuration states.' }, { title: 'Keep recovery in context', description: 'Place the alert close to affected content and offer one direct action.' }, { title: 'Confirm durable outcomes', description: 'Show success when confirmation must remain visible after a transient toast would disappear.' }]} /></ComponentDocSection>
    <ComponentDocSection id="when-not-to-use" title="When not to use" description="Choose a different feedback pattern when information is transient, blocking, field-specific, or merely decorative."><GuidanceList tone="dont" items={[{ title: 'Do not replace validation', description: 'Place field errors beside the relevant input.' }, { title: 'Do not interrupt with a banner', description: 'Use Dialog only when immediate confirmation or input is required.' }, { title: 'Do not duplicate transient feedback', description: 'Use Toast for brief operation results that need no persistent action.' }]} /></ComponentDocSection>
    <ComponentDocSection id="variants" title="Variants" description="Tone communicates meaning while treatment and layout control emphasis and density."><BehaviorGrid items={[{ icon: 'ti-palette', title: 'Tonal', description: 'Default container for contextual persistent feedback.' }, { icon: 'ti-border-all', title: 'Outlined', description: 'Lower-fill treatment for visually dense pages.' }, { icon: 'ti-square-filled', title: 'Filled', description: 'Highest emphasis for rare, important conditions.' }, { icon: 'ti-layout-align-middle', title: 'Inline or block', description: 'Adapts compact statements and richer guidance.' }]} /></ComponentDocSection>
    <ComponentDocSection id="states" title="States" description="Alert tone reflects the meaning of the condition rather than workflow progress alone."><StateMatrix rows={[{ state: 'Neutral', trigger: 'General contextual note', visual: 'Surface treatment', interaction: 'Optional action' }, { state: 'Information', trigger: 'Relevant non-critical update', visual: 'Primary tonal treatment', interaction: 'Optional details' }, { state: 'Success', trigger: 'Durable positive outcome', visual: 'Success treatment', interaction: 'Continue or inspect' }, { state: 'Warning', trigger: 'Risk requires attention', visual: 'Warning treatment', interaction: 'Prevent or resolve' }, { state: 'Error', trigger: 'Failure requires awareness', visual: 'Error treatment and alert role', interaction: 'Recover or get help' }]} /></ComponentDocSection>
    <ComponentDocSection id="behavior" title="Behavior" description="Alert owns semantic presentation; applications own visibility, timing, recovery, persistence, and telemetry."><BehaviorGrid items={[{ icon: 'ti-bell', title: 'Announcement', description: 'Error defaults to alert; other tones default to polite status.' }, { icon: 'ti-x', title: 'Controlled dismissal', description: 'Dismiss invokes a callback and leaves visibility to the parent.' }, { icon: 'ti-focus-2', title: 'Action focus', description: 'Actions and close controls retain native keyboard behavior.' }, { icon: 'ti-arrows-maximize', title: 'Responsive flow', description: 'Content and controls reflow without truncating the message.' }]} /></ComponentDocSection>
    <ComponentDocSection id="accessibility" title="Accessibility" description="Every alert must remain understandable without color, iconography, or visual position."><AccessibilityChecklist items={['Use alert only for urgent, dynamically introduced failures; use status for other updates.', 'Include the condition in visible text instead of relying on the status icon.', 'Do not move focus to an alert unless the workflow genuinely requires immediate attention.', 'Give dismissal a specific accessible label when several alerts are present.', 'Keep action labels explicit and unique in context.', 'Do not automatically dismiss content before people can read or operate it.']} /></ComponentDocSection>
    <ComponentDocSection id="content-guidelines" title="Content guidelines" description="State the condition first, explain impact briefly, and offer a specific next step only when one exists."><ContentGuidelines rules={[{ label: 'Lead with the condition', guidance: 'Use a factual, concise title.', example: 'Certificate expires in 8 days' }, { label: 'Explain impact', guidance: 'Say what happens if the condition continues.', example: 'Service connections may stop.' }, { label: 'Name the response', guidance: 'Use an action-and-object label.', example: 'Rotate certificate' }, { label: 'Avoid alarmism', guidance: 'Match urgency to actual consequence.', example: 'Deployment blocked' }]} /></ComponentDocSection>
    <ComponentDocSection id="examples" title="Examples" description="Inline layout supports concise confirmation while retaining the same semantic structure."><div className="component-doc-stack"><ComponentPreview title="Inline success"><div className="alert-demo alert-demo--success"><span aria-hidden>✓</span><div><strong>Policy published</strong><p>The policy now applies to every workspace member.</p></div></div></ComponentPreview><CodeBlock filename="PublishedAlert.tsx" code={INLINE} /></div></ComponentDocSection>
    <ComponentDocSection id="props-api" title="Props / API" description="Alert extends div attributes and composes application-owned actions."><PropsTable props={PROPS} /></ComponentDocSection>
    <ComponentDocSection id="related-components" title="Related components" description="Select feedback based on duration, urgency, interaction, and scope."><RelatedComponents items={[{ name: 'Toast', href: '/components/toast', description: 'Transient operation feedback', icon: 'ti-bell' }, { name: 'Dialog', href: '/components/dialog', description: 'Blocking confirmation or input', icon: 'ti-layout-sidebar-right' }, { name: 'EmptyState', href: '/components/empty-state', description: 'Explain an unavailable outcome', icon: 'ti-layout-align-middle' }, { name: 'Badge', href: '/components/badge', description: 'Label status within compact content', icon: 'ti-badge' }]} /></ComponentDocSection>
  </ComponentDocumentation></div>
}
