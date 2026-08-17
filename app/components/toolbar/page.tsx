'use client'

import { useState } from 'react'
import { Button, Checkbox, IconButton, Toolbar } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable,
  RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const TOOLBAR_PROPS = [
  { name: 'label', type: 'string', default: "'Actions'", description: 'Accessible name announced for the toolbar region.' },
  { name: 'leading', type: 'ReactNode', default: 'undefined', description: 'Optional leading visual or selection control.' },
  { name: 'title', type: 'ReactNode', default: 'undefined', description: 'Short title identifying the current action scope.' },
  { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Supporting selection, result, or sync context.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Primary controls in toolbar reading order.' },
  { name: 'trailing', type: 'ReactNode', default: 'undefined', description: 'End-aligned secondary controls or status.' },
  { name: 'overflow', type: 'ReactNode', default: 'undefined', description: 'Additional controls disclosed from More actions.' },
  { name: 'overflowLabel', type: 'string', default: "'More actions'", description: 'Accessible name for the overflow trigger.' },
  { name: 'overflowOpen', type: 'boolean', default: 'undefined', description: 'Controlled overflow visibility.' },
  { name: 'defaultOverflowOpen', type: 'boolean', default: 'false', description: 'Initial uncontrolled overflow visibility.' },
  { name: 'onOverflowOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Runs whenever overflow visibility changes.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Announces updating actions without replacing controls.' },
  { name: 'variant', type: "'plain' | 'bordered' | 'raised'", default: "'plain'", description: 'Sets the toolbar surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls toolbar density and type scale.' },
  { name: 'wrap', type: 'boolean', default: 'true', description: 'Allows controls to wrap when horizontal space is limited.' },
] as const

const BASIC_CODE = `import { Button, IconButton, Toolbar } from 'omverse-ui'

<Toolbar
  variant="bordered"
  label="Project actions"
  title="Migration projects"
  description="3 selected"
  leading={<Checkbox aria-label="Select all projects" />}
  trailing={<IconButton icon="refresh" aria-label="Refresh projects" />}
  overflow={<ProjectOverflowActions />}
>
  <Button variant="outlined">Assign</Button>
  <Button>Add project</Button>
</Toolbar>`

const CONTROLLED_CODE = `const [overflowOpen, setOverflowOpen] = useState(false)

<Toolbar
  label="Document actions"
  overflowOpen={overflowOpen}
  onOverflowOpenChange={setOverflowOpen}
  overflow={<>\n    <Button variant="text">Duplicate</Button>\n    <Button variant="text">Archive</Button>\n  </>}
>
  <Button variant="outlined">Share</Button>
</Toolbar>`

function ToolbarPreview() {
  const [selected, setSelected] = useState(true)
  const [overflowOpen, setOverflowOpen] = useState(false)
  return (
    <Toolbar
      label="Project actions"
      leading={<Checkbox checked={selected} onChange={() => setSelected((value) => !value)} aria-label="Select all projects" />}
      title="Migration projects"
      description={selected ? '3 selected' : 'No selection'}
      overflow={
        <>
          <Button variant="text">Duplicate</Button>
          <Button variant="text">Archive</Button>
          <Button variant="text">Delete</Button>
        </>
      }
      overflowLabel="More project actions"
      overflowOpen={overflowOpen}
      onOverflowOpenChange={setOverflowOpen}
      trailing={<IconButton icon="refresh" aria-label="Refresh projects" />}
    >
      <Button variant="outlined" disabled={!selected}>Assign</Button>
      <Button>Add project</Button>
    </Toolbar>
  )
}

export default function ToolbarPage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'Toolbar']} title="Toolbar" description="Toolbar groups contextual actions, selection feedback, and overflow controls into one predictable enterprise surface." tags={['Composition API', 'Keyboard navigation', 'Overflow', 'Responsive wrapping', '3 sizes']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use Toolbar to keep actions close to the content or selection they affect while preserving a stable reading and keyboard order."><div className="component-doc-stack"><ComponentPreview title="Project actions" description="Change the selection state and open the overflow actions in this live preview." layout="start"><ToolbarPreview /></ComponentPreview><CodeBlock filename="ProjectsToolbar.tsx" code={BASIC_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="anatomy" title="Anatomy" description="Toolbar combines optional selection, context, primary actions, supporting status, and secondary overflow in one horizontal region."><Anatomy preview={<div className="component-anatomy-visual toolbar-anatomy"><span className="toolbar-anatomy-leading">□</span><span className="toolbar-anatomy-context"><strong>Projects</strong><small>3 selected</small></span><span className="toolbar-anatomy-actions"><i>Assign</i><strong>Add</strong></span><span className="toolbar-anatomy-overflow">•••</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 23, left: -34 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 60 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, right: 64 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 23, right: -34 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 78 }}>5</span></div>} items={[
        { number: 1, name: 'Leading control', description: 'Selects the current scope or identifies the action context.' },
        { number: 2, name: 'Context title', description: 'Names the collection, object, or mode affected by the actions.' },
        { number: 3, name: 'Primary actions', description: 'Keeps the most frequent and important actions immediately available.' },
        { number: 4, name: 'Overflow', description: 'Discloses lower-frequency actions without crowding the toolbar.' },
        { number: 5, name: 'Supporting status', description: 'Communicates selection, result, or synchronization context.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="when-to-use" title="When to use" description="Use Toolbar when several actions share a clear object, selection, or collection scope."><GuidanceList tone="do" items={[{ title: 'Act on a collection or selection', description: 'Place above DataTable, List, or content workspaces where actions affect the current scope.' }, { title: 'Keep repeated actions stable', description: 'Give frequent actions a predictable location across states and screen sizes.' }, { title: 'Separate primary and secondary actions', description: 'Keep high-value actions visible and move occasional actions into overflow.' }]} /></ComponentDocSection>

      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer focused controls when there is no shared action scope or only one obvious action."><GuidanceList tone="dont" items={[{ title: 'Do not replace page navigation', description: 'Use Navbar, Tabs, or Breadcrumb for destinations and hierarchy.' }, { title: 'Do not wrap form submission', description: 'Place form actions near their fields or in the form footer.' }, { title: 'Do not collect unrelated actions', description: 'Every control should affect the same object, selection, or workspace.' }]} /></ComponentDocSection>

      <ComponentDocSection id="variants" title="Variants" description="Surface and density variants adapt Toolbar to page, panel, and floating workspace contexts."><BehaviorGrid items={[{ icon: 'ti-layout-navbar', title: 'Plain', description: 'Blends into a page or panel that already provides containment.' }, { icon: 'ti-border-all', title: 'Bordered', description: 'Defines the action region on open or mixed surfaces.' }, { icon: 'ti-shadow', title: 'Raised', description: 'Keeps actions prominent above scrolling or layered content.' }, { icon: 'ti-line-height', title: 'Sizes', description: 'Small, medium, and large tune density without changing semantics.' }]} /></ComponentDocSection>

      <ComponentDocSection id="states" title="States" description="Toolbar preserves context while individual controls communicate their own availability and progress."><StateMatrix rows={[{ state: 'Default', trigger: 'No transient operation', visual: 'Context and available actions', interaction: 'Tab or arrow keys reach controls' }, { state: 'Selection', trigger: 'One or more objects selected', visual: 'Count and bulk actions appear', interaction: 'Actions apply to the stated scope' }, { state: 'Overflow open', trigger: 'More actions activated', visual: 'Secondary action group is disclosed', interaction: 'Escape closes and restores focus' }, { state: 'Loading', trigger: 'Actions are updating', visual: 'Progress status appears', interaction: 'Existing context stays visible' }, { state: 'Disabled action', trigger: 'Action is unavailable', visual: 'Individual control loses emphasis', interaction: 'Disabled control cannot activate' }, { state: 'Wrapped', trigger: 'Horizontal space is limited', visual: 'Actions continue on a new line', interaction: 'Reading order remains logical' }]} /></ComponentDocSection>

      <ComponentDocSection id="behavior" title="Behavior" description="Toolbar manages grouping, overflow disclosure, and toolbar-level keyboard movement while composed controls retain their native behavior."><BehaviorGrid items={[{ icon: 'ti-arrows-horizontal', title: 'Keyboard movement', description: 'Left and Right arrows move between visible toolbar controls; Home and End jump to boundaries.' }, { icon: 'ti-dots', title: 'Overflow', description: 'Secondary actions open from a named trigger and close with Escape.' }, { icon: 'ti-layout-grid', title: 'Wrapping', description: 'Controls wrap in DOM order instead of shrinking below usable sizes.' }, { icon: 'ti-direction', title: 'RTL', description: 'Arrow direction follows the document writing direction.' }]} /></ComponentDocSection>

      <ComponentDocSection id="accessibility" title="Accessibility" description="Toolbar provides a named toolbar region, native controls, predictable focus order, and status announcements."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves into or out of the toolbar and through disclosed overflow controls.' }, { keys: ['←', '→'], action: 'Moves between visible toolbar controls and wraps at the ends.' }, { keys: ['Home', 'End'], action: 'Moves to the first or last visible toolbar control.' }, { keys: ['Enter', 'Space'], action: 'Activates the focused control using its native behavior.' }, { keys: ['Esc'], action: 'Closes overflow and restores focus to More actions.' }]} /><AccessibilityChecklist items={['Give every toolbar a concise accessible label.', 'Use native buttons, links, inputs, and selects inside the toolbar.', 'Give every icon-only action an aria-label.', 'Keep DOM order aligned with visual and responsive order.', 'Disable individual actions rather than the whole region.', 'Announce loading or selection feedback without replacing context.']} /></div></ComponentDocSection>

      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Action labels should be concise, specific, and understandable within the toolbar’s stated scope."><ContentGuidelines rules={[{ label: 'Name the scope', guidance: 'Use a short object or collection title.', example: 'Migration projects' }, { label: 'Use verb-first actions', guidance: 'Describe the result of activating the control.', example: 'Assign owner' }, { label: 'Quantify selections', guidance: 'State the current bulk-action scope.', example: '3 selected' }, { label: 'Keep overflow neutral', guidance: 'Use a familiar accessible label for secondary actions.', example: 'More project actions' }]} /></ComponentDocSection>

      <ComponentDocSection id="examples" title="Examples" description="Toolbar supports controlled overflow when applications need to coordinate disclosure with other workspace state."><div className="component-doc-stack"><ComponentPreview title="Selection toolbar" description="The same project action composition shown in a contained enterprise surface." layout="start"><ToolbarPreview /></ComponentPreview><CodeBlock filename="ControlledToolbar.tsx" code={CONTROLLED_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="props-api" title="Props / API" description="Toolbar extends div attributes and composes application-owned native or design-system controls through named slots."><PropsTable props={TOOLBAR_PROPS} /></ComponentDocSection>

      <ComponentDocSection id="related-components" title="Related components" description="Toolbar coordinates focused controls and collection patterns without owning their domain behavior."><RelatedComponents items={[{ name: 'Button', href: '/components/button', description: 'Trigger named primary and secondary actions', icon: 'ti-square-rounded' }, { name: 'IconButton', href: '/components/icon-button', description: 'Represent familiar compact actions', icon: 'ti-click' }, { name: 'DataTable', href: '/components/data-table', description: 'Provide collection and selection context', icon: 'ti-table' }, { name: 'FilterBar', href: '/components/filter-bar', description: 'Narrow the collection before acting', icon: 'ti-filter' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
