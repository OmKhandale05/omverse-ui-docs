'use client'

import { useState } from 'react'
import { Button } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable,
  RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const SIDE_PANEL_PROPS = [
  { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled panel visibility.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial uncontrolled visibility.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Runs whenever visibility changes.' },
  { name: 'title', type: 'ReactNode', default: 'required', description: 'Panel heading used for its accessible name.' },
  { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Supporting context linked to the panel.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Main scrollable panel content.' },
  { name: 'headerActions', type: 'ReactNode', default: 'undefined', description: 'Controls displayed beside the title.' },
  { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Persistent action region at the panel bottom.' },
  { name: 'closeLabel', type: 'string', default: "'Close panel'", description: 'Accessible label for the close action.' },
  { name: 'dismissible', type: 'boolean', default: 'true', description: 'Enables close controls and dismissal gestures.' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Closes an overlay from its backdrop.' },
  { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Closes an overlay when Escape is pressed.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows an updating indicator in the header.' },
  { name: 'initialFocusRef', type: 'RefObject<HTMLElement>', default: 'first focusable', description: 'Element focused when an overlay opens.' },
  { name: 'returnFocusRef', type: 'RefObject<HTMLElement>', default: 'trigger', description: 'Element focused after an overlay closes.' },
  { name: 'mode', type: "'overlay' | 'inline'", default: "'overlay'", description: 'Chooses modal overlay or persistent inspector behavior.' },
  { name: 'placement', type: "'start' | 'end'", default: "'end'", description: 'Places the panel at the logical viewport edge.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the maximum panel width.' },
] as const

const BASIC_CODE = `import { Button, Input, SidePanel } from 'omverse-ui'

<Button ref={triggerRef} onClick={() => setOpen(true)}>Edit project</Button>
<SidePanel
  open={open}
  onOpenChange={setOpen}
  title="Edit migration project"
  description="Update ownership and delivery details."
  returnFocusRef={triggerRef}
  footer={<><Button variant="text">Cancel</Button><Button>Save changes</Button></>}
>
  <Input label="Project name" />
  <Input label="Owner" />
</SidePanel>`

const INLINE_CODE = `<SidePanel
  mode="inline"
  defaultOpen
  size="sm"
  title="Record details"
  description="Persistent inspector"
>
  <ProjectMetadata />
</SidePanel>`

function SidePanelPreview() {
  const [open, setOpen] = useState(true)
  return <div className="side-panel-demo"><div className="side-panel-demo-stage"><span>Project workspace</span>{open && <section role="dialog" aria-labelledby="side-panel-demo-title"><header><span><strong id="side-panel-demo-title">Edit project</strong><small>Migration program</small></span><button type="button" aria-label="Close edit project panel" onClick={() => setOpen(false)}>×</button></header><div className="side-panel-demo-body"><label>Owner<input defaultValue="Maya Chen" /></label><label>Status<select defaultValue="Active"><option>Active</option><option>At risk</option></select></label></div><footer><button type="button" onClick={() => setOpen(false)}>Cancel</button><button type="button" onClick={() => setOpen(false)}>Save</button></footer></section>}</div>{!open && <Button onClick={() => setOpen(true)}>Open edit panel</Button>}</div>
}

export default function SidePanelPage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'SidePanel']} title="SidePanel" description="SidePanel keeps contextual tasks and detail inspection beside the enterprise content they affect." tags={['Overlay + inline', 'Focus trap', 'Focus return', 'Logical placement', '3 widths']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use SidePanel for focused workflows or inspection that benefit from retaining visual context from the underlying workspace."><div className="component-doc-stack"><ComponentPreview title="Edit project details" description="Close and reopen the panel to inspect the contextual overlay behavior." layout="start"><SidePanelPreview /></ComponentPreview><CodeBlock filename="EditProjectPanel.tsx" code={BASIC_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="anatomy" title="Anatomy" description="SidePanel combines a named header, dismissal and header actions, scrollable content, persistent footer, and placement edge."><Anatomy preview={<div className="component-anatomy-visual side-panel-anatomy"><div className="side-panel-anatomy-backdrop" /><section><header><span><strong>Edit project</strong><small>Migration program</small></span><b>×</b></header><main><i>Owner</i><p>Maya Chen</p><i>Status</i><p>Active</p></main><footer><span>Cancel</span><strong>Save</strong></footer></section><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 24, left: -34 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 24, right: -34 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 92, left: -34 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, right: 48 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 32 }}>5</span></div>} items={[
        { number: 1, name: 'Header', description: 'Names the task or inspected object and adds concise context.' },
        { number: 2, name: 'Header actions', description: 'Contains dismissal and optional contextual controls.' },
        { number: 3, name: 'Scrollable body', description: 'Holds the primary form, details, or supporting workflow.' },
        { number: 4, name: 'Footer', description: 'Keeps completion and cancellation actions persistently available.' },
        { number: 5, name: 'Placement edge', description: 'Anchors the panel at the logical start or end of its context.' },
      ]} /></ComponentDocSection>
      <ComponentDocSection id="when-to-use" title="When to use" description="Use SidePanel when people need focused detail or editing while preserving awareness of the source workspace."><GuidanceList tone="do" items={[{ title: 'Edit contextual details', description: 'Use for record editing, assignment, filters, settings, and supporting workflows.' }, { title: 'Inspect without navigating away', description: 'Keep a table, board, or dashboard visible behind the task.' }, { title: 'Provide persistent inspection', description: 'Use inline mode for metadata or tools that remain beside the main workspace.' }]} /></ComponentDocSection>
      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer other surfaces when the task needs full attention, little content, or simple confirmation."><GuidanceList tone="dont" items={[{ title: 'Do not use for critical confirmation', description: 'Use Dialog for short decisions that must interrupt the workflow.' }, { title: 'Do not compress complex pages', description: 'Navigate to a full page when content requires broad layout or several sections.' }, { title: 'Do not use as primary navigation', description: 'Use Navbar or Sidebar for persistent destinations.' }]} /></ComponentDocSection>
      <ComponentDocSection id="variants" title="Variants" description="Mode, placement, and width adapt SidePanel to transient tasks and persistent enterprise inspectors."><BehaviorGrid items={[{ icon: 'ti-layout-sidebar-right', title: 'Overlay', description: 'Creates a modal layer with backdrop, scroll lock, and focus containment.' }, { icon: 'ti-layout-sidebar', title: 'Inline', description: 'Renders a persistent region within the application layout.' }, { icon: 'ti-direction', title: 'Start or end', description: 'Uses logical placement for left-to-right and right-to-left layouts.' }, { icon: 'ti-arrows-horizontal', title: 'Widths', description: 'Small, medium, and large balance context with task space.' }]} /></ComponentDocSection>
      <ComponentDocSection id="states" title="States" description="SidePanel communicates visibility, progress, dismissal policy, and content overflow while preserving its structural regions."><StateMatrix rows={[{ state: 'Closed', trigger: 'Panel is inactive', visual: 'Panel and backdrop absent', interaction: 'Trigger remains available' }, { state: 'Open overlay', trigger: 'Contextual task starts', visual: 'Backdrop and edge panel', interaction: 'Focus is trapped' }, { state: 'Open inline', trigger: 'Inspector is part of layout', visual: 'Contained side region', interaction: 'Normal page focus order' }, { state: 'Loading', trigger: 'Content or save is updating', visual: 'Header progress indicator', interaction: 'Context remains visible' }, { state: 'Scrollable', trigger: 'Body exceeds available height', visual: 'Header and footer stay fixed', interaction: 'Only body scrolls' }, { state: 'Non-dismissible', trigger: 'Workflow requires explicit completion', visual: 'No close action', interaction: 'Backdrop and Escape do not close' }]} /></ComponentDocSection>
      <ComponentDocSection id="behavior" title="Behavior" description="Overlay mode owns focus containment, page scroll lock, dismissal, and return focus; inline mode participates in the normal layout."><BehaviorGrid items={[{ icon: 'ti-focus-2', title: 'Initial focus', description: 'Moves to a supplied target, the first control, or the panel container.' }, { icon: 'ti-keyboard', title: 'Focus trap', description: 'Tab and Shift+Tab wrap through overlay controls.' }, { icon: 'ti-arrow-back-up', title: 'Focus return', description: 'Closing restores focus to the supplied trigger or previously active element.' }, { icon: 'ti-scroll', title: 'Scroll ownership', description: 'Overlay locks the page while its body manages internal overflow.' }]} /></ComponentDocSection>
      <ComponentDocSection id="accessibility" title="Accessibility" description="Overlay SidePanel behaves as a named modal dialog; inline SidePanel is a named region in the page focus order."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves forward through panel controls and wraps in overlay mode.' }, { keys: ['Shift', 'Tab'], action: 'Moves backward and wraps from the first control.' }, { keys: ['Esc'], action: 'Closes a dismissible overlay when enabled.' }, { keys: ['Enter', 'Space'], action: 'Activates focused native controls.' }]} /><AccessibilityChecklist items={['Use a concise title that identifies the task or object.', 'Link supporting description to the panel.', 'Move focus into modal overlays and trap it there.', 'Return focus to the opening trigger after dismissal.', 'Give close and icon-only actions accessible labels.', 'Keep the main body independently scrollable without hiding actions.']} /></div></ComponentDocSection>
      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Panel content should stay contextual, focused, and short enough to complete without becoming a page inside a page."><ContentGuidelines rules={[{ label: 'Name the task', guidance: 'Use a verb-object title for editing workflows.', example: 'Edit migration project' }, { label: 'Preserve context', guidance: 'Use the description to identify the affected object.', example: 'Migration program' }, { label: 'Use explicit actions', guidance: 'Name the outcome in the footer.', example: 'Save changes' }, { label: 'Keep dismissal familiar', guidance: 'Use Cancel when changes can be discarded.', example: 'Cancel' }]} /></ComponentDocSection>
      <ComponentDocSection id="examples" title="Examples" description="Inline mode supports persistent inspectors that do not need a backdrop, focus trap, or page scroll lock."><div className="component-doc-stack"><ComponentPreview title="Contextual editing overlay" description="The preview models a compact project editing workflow." layout="start"><SidePanelPreview /></ComponentPreview><CodeBlock filename="ProjectInspector.tsx" code={INLINE_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="props-api" title="Props / API" description="SidePanel extends div attributes and composes application-owned content into header, scrollable body, and footer regions."><PropsTable props={SIDE_PANEL_PROPS} /></ComponentDocSection>
      <ComponentDocSection id="related-components" title="Related components" description="Choose a surface based on task interruption, persistence, content size, and relationship to the underlying workspace."><RelatedComponents items={[{ name: 'Dialog', href: '/components/dialog', description: 'Handle short interruptive decisions', icon: 'ti-layout-sidebar-right' }, { name: 'Card', href: '/components/card', description: 'Group non-modal contained content', icon: 'ti-layout-cards' }, { name: 'Navbar', href: '/components/navbar', description: 'Provide persistent destinations', icon: 'ti-layout-navbar' }, { name: 'Toolbar', href: '/components/toolbar', description: 'Group contextual workspace actions', icon: 'ti-layout-navbar' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
