'use client'

import { useState } from 'react'
import { Select } from 'omverse-ui'
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

interface SelectOption {
  value: string
  label: string
  description?: string
  avatarSrc?: string
  avatarAlt?: string
  icon?: string
  disabled?: boolean
}

const DEPARTMENTS: SelectOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'product', label: 'Product' },
  { value: 'sales', label: 'Sales' },
  { value: 'archived', label: 'Archived', disabled: true },
]

const TECHNOLOGIES: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'next', label: 'Next.js' },
  { value: 'node', label: 'Node.js' },
  { value: 'postgres', label: 'PostgreSQL' },
]

const SELECT_PROPS = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Visible label above the trigger.' },
  { name: 'placeholder', type: 'string', default: "'Select…'", description: 'Prompt shown when no option is selected.' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Persistent guidance below the field.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the selection as required.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Applies the invalid state.' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Actionable validation feedback.' },
  { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Flat list of available options.' },
  { name: 'optionGroups', type: 'SelectOptionGroup[]', default: 'undefined', description: 'Grouped options; takes priority over options.' },
  { name: 'value', type: 'string', default: 'undefined', description: 'Controlled value in single-select mode.' },
  { name: 'values', type: 'string[]', default: '[]', description: 'Controlled values in multi-select mode.' },
  { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Runs after a single selection changes.' },
  { name: 'onChangeMulti', type: '(values: string[]) => void', default: 'undefined', description: 'Runs after a multi-selection changes.' },
  { name: 'multi', type: 'boolean', default: 'false', description: 'Allows more than one option to be selected.' },
  { name: 'searchable', type: 'boolean', default: 'false', description: 'Adds filtering inside the open list.' },
  { name: 'searchPlaceholder', type: 'string', default: "'Search…'", description: 'Prompt for the filter input.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Adds an action to clear the current selection.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents opening or changing the selection.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls trigger height and type size.' },
  { name: 'maxDisplay', type: 'number', default: '3', description: 'Maximum visible chips before an overflow count.' },
] as const

const BASIC_CODE = `import { Select } from 'omverse-ui'

<Select
  label="Department"
  placeholder="Select a department"
  options={departments}
  value={department}
  onChange={setDepartment}
  clearable
/>`

const ADVANCED_CODE = `<Select
  label="Technologies"
  options={technologies}
  multi
  searchable
  values={technologies}
  onChangeMulti={setTechnologies}
  maxDisplay={3}
  helperText="Choose every technology used by this service."
/>`

const SELECT_STATES = [
  { state: 'Closed', trigger: 'No active interaction', visual: 'Current value or placeholder', interaction: 'Trigger opens the list' },
  { state: 'Open', trigger: 'Trigger is activated', visual: 'Listbox and active option are visible', interaction: 'Arrow keys move through available options' },
  { state: 'Selected', trigger: 'An option is chosen', visual: 'Label or chips replace the placeholder', interaction: 'Selection can be changed or cleared' },
  { state: 'Search', trigger: 'Searchable list is open', visual: 'Filter input and matching options', interaction: 'Typing narrows the available list' },
  { state: 'Error', trigger: 'Required or business validation fails', visual: 'Error treatment and corrective message', interaction: 'Trigger remains available for correction' },
  { state: 'Disabled', trigger: 'Selection is unavailable', visual: 'Reduced emphasis', interaction: 'Cannot open or receive focus' },
]

export default function SelectPage() {
  const [department, setDepartment] = useState('')
  const [technologies, setTechnologies] = useState<string[]>(['react', 'typescript'])

  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Form', 'Select']}
        title="Select"
        description="Select lets people choose one or more values from a predefined list, with optional grouping and search for larger data sets."
        tags={['Single select', 'Multi select', 'Searchable', 'Grouped options', '3 sizes']}
      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Use Select when valid choices are known in advance and showing every choice at once would take too much space.">
          <div className="component-doc-stack">
            <ComponentPreview title="Single selection" description="A label names the field and the placeholder prompts an action without pretending to be a value.">
              <div style={{ width: 'min(100%, 360px)' }}>
                <Select label="Department" placeholder="Select a department" options={DEPARTMENTS} value={department} onChange={setDepartment} clearable helperText="Choose the team responsible for this project." />
              </div>
            </ComponentPreview>
            <CodeBlock filename="ProjectForm.tsx" code={BASIC_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy" description="Select combines a field label, trigger, option list, and supporting feedback into one selection control.">
          <Anatomy
            preview={
              <div className="component-anatomy-visual select-anatomy" style={{ width: 280 }}>
                <Select label="Department" placeholder="Engineering" options={DEPARTMENTS} helperText="Choose one department." />
                <div className="select-anatomy-listbox" aria-hidden="true"><span>Design</span><span>Engineering</span><span>Marketing</span></div>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 24 }}>1</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 34, left: -34 }}>2</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 47, right: -34 }}>3</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 88, left: -34 }}>4</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ bottom: 34, right: -34 }}>5</span>
              </div>
            }
            items={[
              { number: 1, name: 'Label', description: 'Identifies the value being selected.', required: true },
              { number: 2, name: 'Trigger and value', description: 'Displays the placeholder or current selection.', required: true },
              { number: 3, name: 'Disclosure icon', description: 'Signals that activating the field opens a list.' },
              { number: 4, name: 'Supporting text', description: 'Provides guidance or validation feedback.' },
              { number: 5, name: 'Listbox', description: 'Contains options, groups, search, and selection state.', required: true },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Choose Select when selection is safer and faster than recalling and typing an exact value.">
          <GuidanceList tone="do" items={[
            { title: 'Choose from a known list', description: 'Use for departments, statuses, owners, regions, and other governed values.' },
            { title: 'Conserve form space', description: 'Use when radio buttons would make a form unnecessarily long.' },
            { title: 'Search larger lists', description: 'Enable search when scanning the full option set is inefficient.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="Use a more direct control when choices are few, binary, or not predefined.">
          <GuidanceList tone="dont" items={[
            { title: 'Do not hide two to five important choices', description: 'Use Radio so options can be compared without opening a list.' },
            { title: 'Do not use for free-form values', description: 'Use Input when the value is not constrained to a known set.' },
            { title: 'Do not use as primary navigation', description: 'Use Tabs, links, or navigation menus for moving between destinations.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Select supports single and multiple selection, optional search, grouped options, and three field sizes.">
          <BehaviorGrid items={[
            { icon: 'ti-list-check', title: 'Single', description: 'Choose exactly one value from the list.' },
            { icon: 'ti-tags', title: 'Multiple', description: 'Choose independent values displayed as removable chips.' },
            { icon: 'ti-search', title: 'Searchable', description: 'Filter a long list without changing its underlying options.' },
            { icon: 'ti-category', title: 'Grouped', description: 'Organize related options under non-selectable headings.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="Selection state must remain clear before, during, and after the listbox interaction.">
          <StateMatrix rows={SELECT_STATES} />
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="The trigger opens a listbox, maintains the current selection, and returns focus predictably when the list closes.">
          <BehaviorGrid items={[
            { icon: 'ti-chevron-down', title: 'Open and close', description: 'Open from the trigger; close after a single selection, Escape, or an outside interaction.' },
            { icon: 'ti-arrows-move-vertical', title: 'Navigate', description: 'Move through enabled options without losing the current committed value.' },
            { icon: 'ti-filter', title: 'Filter', description: 'Search changes the visible option set, not the stored value.' },
            { icon: 'ti-x', title: 'Clear', description: 'Expose a clear action only when an empty value is valid.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="Select exposes trigger, listbox, option, selection, and validation state to assistive technology.">
          <div className="component-doc-stack">
            <KeyboardTable rows={[
              { keys: ['Enter', 'Space'], action: 'Opens the list or selects the active option.' },
              { keys: ['↑', '↓'], action: 'Moves through enabled options.' },
              { keys: ['Home', 'End'], action: 'Moves to the first or last enabled option.' },
              { keys: ['Esc'], action: 'Closes the list and returns focus to the trigger.' },
            ]} />
            <AccessibilityChecklist items={['Provide a visible, unique label.', 'Keep selected and active option states programmatically available.', 'Do not use color as the only selected-state signal.', 'Keep disabled options discoverable but unavailable.', 'Announce validation feedback and multi-selection changes.', 'Avoid custom option content that obscures the option label.']} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Labels and options should be concise, parallel, and easy to scan.">
          <ContentGuidelines rules={[
            { label: 'Name the field', guidance: 'Use a short noun or noun phrase for the label.', example: 'Department' },
            { label: 'Prompt an action', guidance: 'Write placeholder text that describes selection rather than a fake default.', example: 'Select a department' },
            { label: 'Keep options parallel', guidance: 'Use consistent capitalization, grammar, and specificity across the list.', example: 'Design, Engineering, Marketing' },
            { label: 'Explain invalid choices', guidance: 'Tell people what selection is required and why.', example: 'Select a billing country.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="Add search and multi-selection only when they make the option set easier to complete.">
          <div className="component-doc-stack">
            <ComponentPreview title="Searchable multi-select" description="Selected values remain visible while search helps people find additional options.">
              <div style={{ width: 'min(100%, 420px)' }}><Select label="Technologies" options={TECHNOLOGIES} multi searchable values={technologies} onChangeMulti={setTechnologies} maxDisplay={3} helperText="Choose every technology used by this service." /></div>
            </ComponentPreview>
            <ComponentPreview title="Validation and availability" description="Errors identify the missing choice; disabled fields communicate unavailable configuration.">
              <Select label="Billing country" options={DEPARTMENTS} error errorText="Select a billing country." />
              <Select label="Managed region" options={DEPARTMENTS} value="engineering" disabled helperText="Managed by your organization." />
            </ComponentPreview>
            <CodeBlock filename="ServiceForm.tsx" code={ADVANCED_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="Select extends div attributes except onChange, which uses the selected value rather than a DOM event.">
          <PropsTable props={SELECT_PROPS} />
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Use a control that matches how visible and constrained the option set needs to be.">
          <RelatedComponents items={[
            { name: 'Input', href: '/components/input', description: 'Enter an unconstrained text value', icon: 'ti-cursor-text' },
            { name: 'Radio', href: '/components/radio', description: 'Compare a small visible set', icon: 'ti-circle-dot' },
            { name: 'Checkbox', href: '/components/checkbox', description: 'Choose visible independent options', icon: 'ti-checkbox' },
            { name: 'Autocomplete', href: '/components/autocomplete', description: 'Find suggestions while entering text', icon: 'ti-search' },
          ]} />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
