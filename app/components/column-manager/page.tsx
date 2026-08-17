'use client'

import { useState } from 'react'
import { ColumnManager } from 'omverse-ui'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { PageHeader } from '@/components/ui/PageHeader'
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

const COLS = [
  { id: 'name', label: 'Name', description: 'Project title and identifier' },
  { id: 'owner', label: 'Owner', description: 'Assigned owner' },
  { id: 'status', label: 'Status', description: 'Delivery state', required: true },
  { id: 'budget', label: 'Budget', description: 'Allocated spend', disabled: true },
]

const PROPS = [
  { name: 'columns', type: 'readonly ColumnManagerColumn[]', default: 'required', description: 'Available column definitions.' },
  { name: 'value', type: 'readonly string[]', default: 'undefined', description: 'Controlled visible IDs in order.' },
  { name: 'defaultValue', type: 'readonly string[]', default: 'all', description: 'Initial visible IDs.' },
  { name: 'onValueChange', type: '(ids) => void', default: 'undefined', description: 'Runs after visibility or order changes.' },
  { name: 'title', type: 'ReactNode', default: "'Manage columns'", description: 'Visible heading.' },
  { name: 'searchable', type: 'boolean', default: 'true', description: 'Enables column search.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables changes.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading status.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No columns'", description: 'Empty result content.' },
  { name: 'onReset', type: '() => void', default: 'undefined', description: 'Shows reset control.' },
  { name: 'variant', type: "'outlined' | 'filled' | 'raised'", default: "'outlined'", description: 'Surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Row density.' },
]

const CODE = `import { ColumnManager } from 'omverse-ui'

const columns = [
  { id: 'name', label: 'Name', required: true },
  { id: 'owner', label: 'Owner' },
  { id: 'status', label: 'Status' },
]

<ColumnManager columns={columns} defaultValue={['name', 'owner', 'status']} />`

function Demo() {
  const [value, setValue] = useState(['name', 'owner', 'status'])

  return (
    <ColumnManager
      columns={COLS}
      value={value}
      onValueChange={setValue}
      onReset={() => setValue(['name', 'owner', 'status'])}
    />
  )
}

export default function Page() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'ColumnManager']}
        title="ColumnManager"
        description="ColumnManager controls visible table columns and their presentation order."
        tags={['Visibility', 'Ordering', 'Required columns', 'Search', 'Controlled']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use ColumnManager to personalize dense data tables without losing governed required columns."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Project table columns">
              <Demo />
            </ComponentPreview>
            <CodeBlock filename="ProjectColumns.tsx" code={CODE} />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="The manager combines collection status, search, visibility, identity, and ordering controls."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual column-anatomy">
                <header>
                  <span>Manage columns</span>
                  <small>3 of 4 visible</small>
                  <button>Reset</button>
                </header>
                <label>⌕ Search columns</label>
                <section>
                  <i>✓</i>
                  <span>
                    <b>Owner</b>
                    <small>Accountable person</small>
                  </span>
                  <button>↑</button>
                  <button>↓</button>
                </section>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -28, left: 40 }}>
                  1
                </span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -28, right: 25 }}>
                  2
                </span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 65, left: -25 }}>
                  3
                </span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -28, left: 60 }}>
                  4
                </span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -28, right: 30 }}>
                  5
                </span>
              </div>
            }
            items={[
              { number: 1, name: 'Collection status', description: 'States visible and available counts.' },
              { number: 2, name: 'Reset', description: 'Restores application defaults.' },
              { number: 3, name: 'Search', description: 'Filters columns by name.' },
              { number: 4, name: 'Visibility control', description: 'Shows or hides one column.' },
              { number: 5, name: 'Order controls', description: 'Moves a visible column.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Use ColumnManager when people need personalized table views without losing required data visibility."
        >
          <GuidanceList
            tone="do"
            items={[
              { title: 'Personalize dense tables', description: 'Let people focus on relevant fields.' },
              { title: 'Preserve required data', description: 'Lock essential identity columns.' },
              { title: 'Control column order', description: 'Set scanning priority without drag-only interaction.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="Avoid using ColumnManager for fixed data displays or when ordering belongs to the system."
        >
          <GuidanceList
            tone="dont"
            items={[
              { title: 'Keep layout fixed', description: 'Use regular tables when column structure is fixed.' },
              { title: 'Do not edit dataset values', description: 'Use row actions or forms instead.' },
              { title: 'Do not manage persisted layouts alone', description: 'Pair with SavedViews.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="variants" title="Variants" description="Surface and density options for governed workspaces.">
          <BehaviorGrid
            items={[
              { icon: 'ti-border-all', title: 'Outlined', description: 'Bounded panel.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal panel.' },
              { icon: 'ti-shadow', title: 'Raised', description: 'Independent manager.' },
              { icon: 'ti-arrows-minimize', title: 'Density', description: 'Three row sizes.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="states" title="States" description="Visibility and ordering are interactive states, while loading disables all edits.">
          <StateMatrix
            rows={[
              { state: 'Visible', trigger: 'ID selected', visual: 'Checked row', interaction: 'Hide or move' },
              { state: 'Hidden', trigger: 'ID absent', visual: 'Unchecked row', interaction: 'Show' },
              { state: 'Required', trigger: 'Column required', visual: 'Required label', interaction: 'Cannot hide' },
              { state: 'Filtered', trigger: 'Search entered', visual: 'Matching rows', interaction: 'Manage match' },
              { state: 'Loading', trigger: 'Columns resolving', visual: 'Status', interaction: 'Disabled' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="behavior" title="Behavior">
          <BehaviorGrid
            items={[
              { icon: 'ti-eye', title: 'Visibility', description: 'Checked IDs render as visible columns.' },
              { icon: 'ti-arrows-sort', title: 'Order', description: 'Selected IDs determine presentation order.' },
              { icon: 'ti-search', title: 'Search', description: 'Filtering never commits selection.' },
              { icon: 'ti-refresh', title: 'Reset', description: 'Host restores default visibility.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="accessibility" title="Accessibility">
          <div className="component-doc-stack">
            <KeyboardTable
              rows={[
                { keys: ['Tab'], action: 'Moves through search, visibility, and ordering controls.' },
                { keys: ['Space'], action: 'Toggles a checkbox.' },
                { keys: ['Enter'], action: 'Moves a row up or down when focused.' },
              ]}
            />
            <AccessibilityChecklist
              items={[
                'Name checkboxes with column labels.',
                'Name movement direction and column.',
                'Express required state in text.',
                'Avoid drag-and-drop as the only interaction.',
                'Announce loading and empty results.',
              ]}
            />
          </div>
        </ComponentDocSection>
        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ContentGuidelines
            rules={[
              { label: 'Match table headers', guidance: 'Use exact column names from the table.', example: 'Owner' },
              { label: 'Describe unfamiliar fields', guidance: 'Explain each non-obvious field.', example: 'Fiscal quarter' },
              { label: 'State locked fields', guidance: 'Show why these cannot be hidden.', example: 'Required for compliance.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="examples" title="Examples">
          <ComponentPreview title="Required identity column">
            <div className="column-example">☑ Owner <small>Required · cannot be hidden</small></div>
          </ComponentPreview>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API" description="ColumnManager extends section attributes.">
          <PropsTable props={PROPS} />
        </ComponentDocSection>
        <ComponentDocSection id="related-components" title="Related components">
          <RelatedComponents
            items={[
              { name: 'DataTable', href: '/components/data-table', description: 'Renders configured columns', icon: 'ti-table' },
              { name: 'SavedViews', href: '/components/saved-views', description: 'Persists layouts', icon: 'ti-bookmark' },
              { name: 'Checkbox', href: '/components/checkbox', description: 'Controls visibility', icon: 'ti-checkbox' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
