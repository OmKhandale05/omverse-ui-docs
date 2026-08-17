'use client'
import { useState } from 'react'
import { SegmentedControl } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import { AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection, ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable, RelatedComponents, StateMatrix } from '@/components/docs/ComponentDocumentation'

const PROPS = [{ name: 'items', type: 'readonly SegmentedControlItem[]', default: 'required', description: 'Mutually exclusive choices.' }, { name: 'value', type: 'string', default: 'undefined', description: 'Controlled selected value.' }, { name: 'defaultValue', type: 'string', default: 'first enabled', description: 'Initial uncontrolled selection.' }, { name: 'onValueChange', type: '(value: string) => void', default: 'undefined', description: 'Runs when selection changes.' }, { name: 'aria-label', type: 'string', default: 'required', description: 'Accessible radiogroup name.' }, { name: 'variant', type: "'tonal' | 'outlined' | 'underline'", default: "'tonal'", description: 'Controls group and selected treatment.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls target height and spacing.' }, { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Controls layout and arrow-key axis.' }, { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Distributes items equally across available width.' }] as const
const BASIC = `import { SegmentedControl } from 'omverse-ui'

<SegmentedControl
  aria-label="Project view"
  items={[
    { value: 'list', label: 'List', icon: 'file-text' },
    { value: 'board', label: 'Board', icon: 'folder' },
    { value: 'timeline', label: 'Timeline', icon: 'refresh' },
  ]}
  value={view}
  onValueChange={setView}
/>`
const VERTICAL = `<SegmentedControl aria-label="Report interval" orientation="vertical" variant="outlined" items={intervals} />`
const VIEW_ITEMS = [
  { value: 'list', label: 'List', icon: 'file-text' },
  { value: 'board', label: 'Board', icon: 'folder' },
  { value: 'timeline', label: 'Timeline', icon: 'refresh' },
]

const INTERVAL_ITEMS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

function SegmentPreview() {
  const [view, setView] = useState('list')

  return <SegmentedControl aria-label="Project view" items={VIEW_ITEMS} value={view} onValueChange={setView} />
}

function VerticalPreview() {
  const [interval, setInterval] = useState('daily')

  return <SegmentedControl aria-label="Report interval" orientation="vertical" variant="outlined" items={INTERVAL_ITEMS} value={interval} onValueChange={setInterval} />
}
export default function SegmentedControlPage() { return <div><PageHeader breadcrumb={['Components', 'Enterprise', 'SegmentedControl']} title="SegmentedControl" description="SegmentedControl switches between a small set of mutually exclusive views or modes." tags={['Radiogroup', '3 variants', '3 sizes', '2 orientations', 'Roving focus']} /><ComponentDocumentation>
<ComponentDocSection id="overview" title="Overview" description="Use SegmentedControl when two to five peer choices change the current view, mode, density, or scope immediately."><div className="component-doc-stack"><ComponentPreview title="Project view" description="Switch between equivalent representations of the same project collection."><SegmentPreview /></ComponentPreview><CodeBlock filename="ProjectView.tsx" code={BASIC} /></div></ComponentDocSection>
<ComponentDocSection id="anatomy" title="Anatomy" description="The control combines a named group, equal-priority segments, optional icons, a selected treatment, and optional compact metadata."><Anatomy preview={<div className="component-anatomy-visual segmented-anatomy"><section><button className="active"><i>▤</i><span>List</span></button><button><i>▦</i><span>Board</span><b>8</b></button><button><i>↝</i><span>Timeline</span></button></section><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 20 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 50 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 108 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, right: 76 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, right: 20 }}>5</span></div>} items={[{ number: 1, name: 'Group', description: 'Provides one accessible name for the related choices.' }, { number: 2, name: 'Selected segment', description: 'Identifies the active mode and only tab stop.' }, { number: 3, name: 'Icon', description: 'Reinforces a concise visible label.' }, { number: 4, name: 'Metadata', description: 'Adds a short count or status only when useful.' }, { number: 5, name: 'Unselected segment', description: 'Remains available at equal hierarchy.' }]} /></ComponentDocSection>
<ComponentDocSection id="when-to-use" title="When to use" description="Use for a small stable set of peer modes whose selection takes effect immediately."><GuidanceList tone="do" items={[{ title: 'Switch representations', description: 'Move between list, board, timeline, or chart views.' }, { title: 'Change display density', description: 'Choose comfortable or compact presentation.' }, { title: 'Select a short scope', description: 'Switch between a few comparable data ranges.' }]} /></ComponentDocSection>
<ComponentDocSection id="when-not-to-use" title="When not to use" description="Use another control for navigation, multi-selection, large sets, or form submission choices."><GuidanceList tone="dont" items={[{ title: 'Do not navigate pages', description: 'Use Tabs or Navbar for destinations and content panels.' }, { title: 'Do not select several values', description: 'Use Checkbox or FilterBar for independent choices.' }, { title: 'Do not crowd many options', description: 'Use Select when choices cannot remain concise and visible.' }]} /></ComponentDocSection>
<ComponentDocSection id="variants" title="Variants" description="Treatment, orientation, size, and distribution adapt the control without changing its exclusive-selection model."><BehaviorGrid items={[{ icon: 'ti-palette', title: 'Tonal', description: 'Default selected surface with subtle container.' }, { icon: 'ti-border-all', title: 'Outlined', description: 'Defined group on neutral surfaces.' }, { icon: 'ti-underline', title: 'Underline', description: 'Restrained embedded mode switch.' }, { icon: 'ti-layout-columns', title: 'Layout', description: 'Horizontal or vertical, intrinsic or full width.' }]} /></ComponentDocSection>
<ComponentDocSection id="states" title="States" description="One enabled segment remains selected while roving focus keeps keyboard navigation efficient."><StateMatrix rows={[{ state: 'Selected', trigger: 'Value is active', visual: 'High-emphasis treatment', interaction: 'Single tab stop' }, { state: 'Unselected', trigger: 'Peer value inactive', visual: 'Lower emphasis', interaction: 'Pointer or Arrow selects' }, { state: 'Focused', trigger: 'Keyboard navigation', visual: 'Visible focus outline', interaction: 'Arrow changes selection' }, { state: 'Hover', trigger: 'Pointer rests on item', visual: 'Tonal surface', interaction: 'Click selects' }, { state: 'Disabled', trigger: 'Choice unavailable', visual: 'Reduced emphasis', interaction: 'Skipped by navigation' }]} /></ComponentDocSection>
<ComponentDocSection id="behavior" title="Behavior" description="SegmentedControl follows radio-group selection and focus behavior while applications own the resulting view or mode."><BehaviorGrid items={[{ icon: 'ti-arrows-horizontal', title: 'Roving focus', description: 'Arrow keys move focus and selection among enabled segments.' }, { icon: 'ti-home', title: 'Boundaries', description: 'Home and End select the first and last enabled choices.' }, { icon: 'ti-repeat', title: 'Controlled state', description: 'Value can be application-owned or initialized internally.' }, { icon: 'ti-responsive', title: 'Distribution', description: 'Full width gives every segment equal available space.' }]} /></ComponentDocSection>
<ComponentDocSection id="accessibility" title="Accessibility" description="The component exposes a named radiogroup and radio items with one roving tab stop."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves focus to the selected segment.' }, { keys: ['←','→'], action: 'Moves and selects in horizontal orientation.' }, { keys: ['↑','↓'], action: 'Moves and selects in vertical orientation.' }, { keys: ['Home','End'], action: 'Selects the first or last enabled segment.' }]} /><AccessibilityChecklist items={['Give every control a concise aria-label.', 'Keep visible item labels even when icons are present.', 'Maintain exactly one selected value when enabled items exist.', 'Skip disabled items during roving navigation.', 'Do not use color alone for selected state.', 'Ensure labels remain readable at 200% zoom.']} /></div></ComponentDocSection>
<ComponentDocSection id="content-guidelines" title="Content guidelines" description="Segment labels should be short, parallel, and understandable outside their selected treatment."><ContentGuidelines rules={[{ label: 'Use parallel nouns', guidance: 'Name comparable representations consistently.', example: 'List, Board, Timeline' }, { label: 'Stay concise', guidance: 'Prefer one or two words per segment.', example: 'Compact' }, { label: 'Avoid instructions', guidance: 'Name the mode rather than the action.', example: 'Chart' }, { label: 'Use metadata sparingly', guidance: 'Include only stable helpful counts.', example: 'Board 8' }]} /></ComponentDocSection>
  <ComponentDocSection id="examples" title="Examples" description="Vertical orientation supports narrow inspectors when the same choices cannot fit horizontally."><div className="component-doc-stack"><ComponentPreview title="Vertical interval"><VerticalPreview /></ComponentPreview><CodeBlock filename="ReportInterval.tsx" code={VERTICAL} /></div></ComponentDocSection>
<ComponentDocSection id="props-api" title="Props / API" description="SegmentedControl extends div attributes; each item defines value, label, icon, badge, and disabled state."><PropsTable props={PROPS} /></ComponentDocSection>
<ComponentDocSection id="related-components" title="Related components" description="Choose based on navigation, choice count, and whether multiple selections are allowed."><RelatedComponents items={[{ name: 'Tabs', href: '/components/tabs', description: 'Navigate related content panels', icon: 'ti-layout-bottombar' }, { name: 'Radio', href: '/components/radio', description: 'Choose one form value', icon: 'ti-circle-dot' }, { name: 'Select', href: '/components/select', description: 'Choose from a larger option set', icon: 'ti-selector' }, { name: 'Toolbar', href: '/components/toolbar', description: 'Group independent view actions', icon: 'ti-layout-navbar' }]} /></ComponentDocSection>
</ComponentDocumentation></div> }
