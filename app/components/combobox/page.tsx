'use client'

import { useState } from 'react'
import { Combobox, type ComboboxOption } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable,
  RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const COMBOBOX_PROPS = [
  { name: 'label', type: 'string', default: 'required', description: 'Visible and accessible field label.' },
  { name: 'options', type: 'readonly ComboboxOption[]', default: 'required', description: 'Governed options available for selection.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Enables multiple selection with removable chips.' },
  { name: 'value', type: 'string | readonly string[]', default: 'undefined', description: 'Controlled selected value or values.' },
  { name: 'defaultValue', type: 'string | readonly string[]', default: 'undefined', description: 'Initial uncontrolled selection.' },
  { name: 'onValueChange', type: '(value) => void', default: 'undefined', description: 'Runs whenever selection changes.' },
  { name: 'inputValue', type: 'string', default: 'undefined', description: 'Controlled text query.' },
  { name: 'defaultInputValue', type: 'string', default: "''", description: 'Initial uncontrolled text query.' },
  { name: 'onInputValueChange', type: '(value: string) => void', default: 'undefined', description: 'Runs whenever the query changes.' },
  { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled popup visibility.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial uncontrolled popup visibility.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Runs when popup visibility changes.' },
  { name: 'placeholder', type: 'string', default: "'Search options…'", description: 'Prompt shown when the query is empty.' },
  { name: 'helperText', type: 'ReactNode', default: 'undefined', description: 'Supporting guidance linked to the field.' },
  { name: 'error', type: 'ReactNode', default: 'undefined', description: 'Validation message linked to the field.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows asynchronous option progress.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the field and popup.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the selection required.' },
  { name: 'clearable', type: 'boolean', default: 'true', description: 'Allows the current selection to be cleared.' },
  { name: 'emptyMessage', type: 'ReactNode', default: "'No options found.'", description: 'Content shown when no option matches.' },
  { name: 'filterOption', type: '(option, query) => boolean', default: 'built-in text match', description: 'Custom option filtering logic.' },
  { name: 'variant', type: "'outlined' | 'filled'", default: "'outlined'", description: 'Sets the field surface.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls field height and type scale.' },
] as const

const BASIC_CODE = `import { Combobox, type ComboboxOption } from 'omverse-ui'

const people: ComboboxOption[] = [
  { value: 'maya', label: 'Maya Chen', description: 'Program manager', icon: 'users' },
  { value: 'noah', label: 'Noah Williams', description: 'Platform engineer', icon: 'users' },
]

<Combobox
  label="Project owner"
  options={people}
  value={owner}
  onValueChange={setOwner}
  helperText="Search by person, role, or project."
/>`

const MULTI_CODE = `<Combobox
  label="Reviewers"
  options={people}
  multiple
  value={reviewers}
  onValueChange={setReviewers}
  variant="filled"
/>`

const COMBO_OPTIONS: readonly ComboboxOption[] = [
  { value: 'maya', label: 'Maya Chen', description: 'Program manager' },
  { value: 'noah', label: 'Noah Williams', description: 'Platform engineer' },
  { value: 'aarav', label: 'Aarav Shah', description: 'Security lead' },
]

function ComboboxPreview() {
  const [selected, setSelected] = useState('maya')
  const [query, setQuery] = useState('')

  return (
    <Combobox
      label="Project owner"
      options={COMBO_OPTIONS}
      value={selected}
      inputValue={query}
      onValueChange={(value) => setSelected(value as string)}
      onInputValueChange={setQuery}
      helperText="Search by person, role, or project."
    />
  )
}

export default function ComboboxPage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'Combobox']} title="Combobox" description="Combobox combines text search and governed option selection in one accessible enterprise field." tags={['ARIA combobox', 'Single + multiple', 'Async states', 'Custom filtering', '3 sizes']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use Combobox when people need to search a governed option set faster than they can scan it, while retaining a valid selection."><div className="component-doc-stack"><ComponentPreview title="Choose a project owner" description="Open the popup, search by name or role, and select a person." layout="start"><ComboboxPreview /></ComponentPreview><CodeBlock filename="OwnerCombobox.tsx" code={BASIC_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="anatomy" title="Anatomy" description="Combobox connects a visible label, editable field, selected values, popup disclosure, and governed listbox."><Anatomy preview={<div className="component-anatomy-visual combobox-anatomy"><label>Project owner</label><div><i>⌕</i><span>Maya Chen</span><b>⌄</b></div><section><p><span>Maya Chen</span><strong>✓</strong></p><p><span>Noah Williams</span></p></section><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 2, left: -34 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 92 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 38, right: -34 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 8, right: -34 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 104 }}>5</span></div>} items={[
        { number: 1, name: 'Label', description: 'Names the field and communicates required context.' },
        { number: 2, name: 'Search input', description: 'Filters options while keeping keyboard focus in the field.' },
        { number: 3, name: 'Selected value', description: 'Displays the governed value or removable multi-select chips.' },
        { number: 4, name: 'Disclosure', description: 'Opens or closes the available option list.' },
        { number: 5, name: 'Listbox', description: 'Shows matching options, descriptions, and selected state.' },
      ]} /></ComponentDocSection>
      <ComponentDocSection id="when-to-use" title="When to use" description="Use Combobox for searchable governed choices, especially when the list is long, dynamic, or unfamiliar."><GuidanceList tone="do" items={[{ title: 'Search large option sets', description: 'Use for people, accounts, assets, locations, or governed codes.' }, { title: 'Show distinguishing metadata', description: 'Add descriptions when labels alone are ambiguous.' }, { title: 'Support multi-selection', description: 'Use chips when several values from the same governed set may be chosen.' }]} /></ComponentDocSection>
      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer simpler fields when search or governed selection is unnecessary."><GuidanceList tone="dont" items={[{ title: 'Do not use for short lists', description: 'Use Select or Radio when all options are easy to scan.' }, { title: 'Do not use for unrestricted text', description: 'Use Input when any value is valid.' }, { title: 'Do not hide essential commands', description: 'Use CommandBar or search when results are actions rather than values.' }]} /></ComponentDocSection>
      <ComponentDocSection id="variants" title="Variants" description="Surface and density options align Combobox with forms, filter bars, and compact enterprise workspaces."><BehaviorGrid items={[{ icon: 'ti-border-all', title: 'Outlined', description: 'Provides the clearest field boundary on open surfaces.' }, { icon: 'ti-paint-filled', title: 'Filled', description: 'Uses a tonal surface in dense forms and filter areas.' }, { icon: 'ti-tags', title: 'Multiple', description: 'Represents selected values as individually removable chips.' }, { icon: 'ti-line-height', title: 'Sizes', description: 'Small, medium, and large preserve readable text and usable targets.' }]} /></ComponentDocSection>
      <ComponentDocSection id="states" title="States" description="Combobox coordinates field, popup, option, validation, and asynchronous states without moving focus away from the input."><StateMatrix rows={[{ state: 'Closed', trigger: 'Field is inactive', visual: 'Selected value or placeholder', interaction: 'Focus or disclosure opens' }, { state: 'Open', trigger: 'Field is focused or disclosed', visual: 'Filtered listbox appears', interaction: 'Input retains focus' }, { state: 'Active option', trigger: 'Keyboard navigation', visual: 'Tonal option highlight', interaction: 'Enter selects' }, { state: 'Selected', trigger: 'Value is chosen', visual: 'Label or chips and option check', interaction: 'Clear or remove updates value' }, { state: 'Loading', trigger: 'Options are being retrieved', visual: 'Progress and loading status', interaction: 'Current value remains visible' }, { state: 'Empty', trigger: 'No option matches', visual: 'No-results message', interaction: 'Query remains editable' }, { state: 'Error', trigger: 'Selection is invalid', visual: 'Error outline and linked message', interaction: 'Field remains operable' }, { state: 'Disabled', trigger: 'Field is unavailable', visual: 'Reduced emphasis', interaction: 'Cannot open or edit' }]} /></ComponentDocSection>
      <ComponentDocSection id="behavior" title="Behavior" description="Combobox separates text query, popup visibility, and selection so each can be controlled independently for local or remote data."><BehaviorGrid items={[{ icon: 'ti-search', title: 'Filtering', description: 'Default matching uses label, description, and hidden keywords; applications can override it.' }, { icon: 'ti-focus-2', title: 'Active descendant', description: 'Keyboard focus stays on the input while the active option is announced.' }, { icon: 'ti-tags', title: 'Multiple values', description: 'Selection stays open and the query clears after each chosen value.' }, { icon: 'ti-cloud-download', title: 'Remote options', description: 'Controlled query and loading props support debounced server search.' }]} /></ComponentDocSection>
      <ComponentDocSection id="accessibility" title="Accessibility" description="Combobox follows the WAI-ARIA editable combobox pattern with named input, controlled listbox, active descendant, and announced option state."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves focus into or out of the field.' }, { keys: ['↑', '↓'], action: 'Opens the popup and moves the active option.' }, { keys: ['Home', 'End'], action: 'Moves to the first or last matching option.' }, { keys: ['Enter'], action: 'Selects the active enabled option.' }, { keys: ['Esc'], action: 'Closes the popup without clearing selection.' }]} /><AccessibilityChecklist items={['Provide a persistent visible label.', 'Connect the combobox to its listbox with aria-controls.', 'Expose popup visibility and active option state.', 'Announce selected and disabled options.', 'Link helper or error text with aria-describedby.', 'Keep keyboard focus in the input while navigating results.']} /></div></ComponentDocSection>
      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Labels, placeholders, option text, and feedback should make the governed choice easy to understand before searching."><ContentGuidelines rules={[{ label: 'Name the value', guidance: 'Use a concise noun phrase for the field.', example: 'Project owner' }, { label: 'Prompt the action', guidance: 'Use placeholder text that describes the searchable set.', example: 'Search people…' }, { label: 'Distinguish options', guidance: 'Use short metadata when names can repeat.', example: 'Platform engineer' }, { label: 'State empty results', guidance: 'Name the searched object in the message.', example: 'No people found' }]} /></ComponentDocSection>
      <ComponentDocSection id="examples" title="Examples" description="Multiple selection uses the same option model and keyboard behavior while representing chosen values as chips."><div className="component-doc-stack"><ComponentPreview title="Searchable owner field" description="The live preview demonstrates controlled popup, query, and selection state." layout="start"><ComboboxPreview /></ComponentPreview><CodeBlock filename="ReviewerCombobox.tsx" code={MULTI_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="props-api" title="Props / API" description="Combobox extends div attributes; ComboboxOption defines value, label, optional description, icon, keywords, and disabled state."><PropsTable props={COMBOBOX_PROPS} /></ComponentDocSection>
      <ComponentDocSection id="related-components" title="Related components" description="Choose the input pattern based on whether values are governed, searchable, multiple, or unrestricted."><RelatedComponents items={[{ name: 'Select', href: '/components/select', description: 'Choose from a short governed list', icon: 'ti-selector' }, { name: 'Input', href: '/components/input', description: 'Enter unrestricted text', icon: 'ti-cursor-text' }, { name: 'FilterBar', href: '/components/filter-bar', description: 'Coordinate multiple collection filters', icon: 'ti-filter' }, { name: 'Chip', href: '/components/chip', description: 'Represent compact selected values', icon: 'ti-tag' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
