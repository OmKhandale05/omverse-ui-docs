'use client'

import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  FilterBar,
  type FilterBarFilter,
  Select,
} from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable,
  RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const FILTER_BAR_PROPS = [
  { name: 'searchValue', type: 'string', default: "''", description: 'Current controlled search value.' },
  { name: 'onSearchChange', type: '(value: string) => void', default: 'undefined', description: 'Runs whenever search changes.' },
  { name: 'searchLabel', type: 'string', default: "'Search results'", description: 'Visible and accessible search label.' },
  { name: 'searchPlaceholder', type: 'string', default: "'Search…'", description: 'Prompt shown inside search.' },
  { name: 'filters', type: 'readonly FilterBarFilter[]', default: '[]', description: 'Labelled custom controls with active summaries.' },
  { name: 'resultCount', type: 'number', default: 'undefined', description: 'Number of matching results announced after updates.' },
  { name: 'formatResultCount', type: '(count: number) => string', default: 'result(s)', description: 'Formats result feedback.' },
  { name: 'onReset', type: '() => void', default: 'undefined', description: 'Clears search and every active filter.' },
  { name: 'resetLabel', type: 'string', default: "'Reset filters'", description: 'Labels the reset action.' },
  { name: 'actions', type: 'ReactNode', default: 'undefined', description: 'Additional end-aligned toolbar actions.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows progress and announces result updates.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Marks the group unavailable and disables built-ins.' },
  { name: 'collapsible', type: 'boolean', default: 'true', description: 'Collapses secondary filters on narrow screens.' },
  { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Initial narrow-screen filter visibility.' },
  { name: 'variant', type: "'plain' | 'bordered' | 'raised'", default: "'plain'", description: 'Sets the surrounding surface.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls field height, padding, and type scale.' },
] as const

const BASIC_CODE = `import { FilterBar, Select } from 'omverse-ui'

<FilterBar
  variant="bordered"
  searchValue={search}
  onSearchChange={setSearch}
  searchLabel="Search projects"
  filters={filters}
  resultCount={results.length}
  onReset={resetFilters}
  actions={<Button variant="outlined">Export</Button>}
/>`

const FILTER_CODE = `const filters: FilterBarFilter[] = [
  {
    id: 'status',
    label: 'Status',
    activeLabel: status || undefined,
    onClear: () => setStatus(''),
    control: (
      <Select
        aria-label="Status"
        options={STATUS_OPTIONS}
        value={status}
        onChange={setStatus}
      />
    ),
  },
]`

const RECORDS = [
  { name: 'Enterprise migration', owner: 'Maya Chen', status: 'Active' },
  { name: 'Billing controls', owner: 'Noah Williams', status: 'At risk' },
  { name: 'Identity refresh', owner: 'Aarav Shah', status: 'Complete' },
  { name: 'Audit reporting', owner: 'Maya Chen', status: 'Active' },
]

type StatusOption = {
  value: string
  label: string
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: '', label: 'All statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'At risk', label: 'At risk' },
  { value: 'Complete', label: 'Complete' },
]

function FilterBarPreview() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const results = useMemo(() => RECORDS.filter((record) => record.name.toLowerCase().includes(search.toLowerCase()) && (!status || record.status === status)), [search, status])
  const filters: FilterBarFilter[] = useMemo(() => [
    {
      id: 'status',
      label: 'Status',
      control: (
        <Select
          aria-label="Status"
          value={status}
          options={STATUS_OPTIONS}
          onChange={(value) => setStatus(value)}
          placeholder="All statuses"
        />
      ),
      activeLabel: status || undefined,
      onClear: status ? () => setStatus('') : undefined,
    },
  ], [status])
  return <div className="filter-bar-demo">
    <FilterBar
      searchValue={search}
      onSearchChange={setSearch}
      searchLabel="Search projects"
      searchPlaceholder="Project name…"
      filters={filters}
      resultCount={results.length}
      formatResultCount={(count) => `${count} results`}
      onReset={() => {
        setSearch('')
        setStatus('')
      }}
      resetLabel="Reset filters"
      actions={<Button variant="outlined">Export</Button>}
      collapsible={false}
    />
    <ul>{results.map((record) => <li key={record.name}><span>{record.name}<small>{record.owner}</small></span><Badge variant="tonal" color={record.status === 'At risk' ? 'warning' : record.status === 'Complete' ? 'success' : 'default'}>{record.status}</Badge></li>)}</ul>
  </div>
}

export default function FilterBarPage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'FilterBar']} title="FilterBar" description="FilterBar coordinates search, structured filters, active-filter removal, and result feedback above enterprise collections." tags={['Composition API', 'Responsive', 'Active filters', 'Result feedback', '3 sizes']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use FilterBar to keep search, structured filters, reset, result feedback, and collection actions in one predictable area."><div className="component-doc-stack"><ComponentPreview title="Project filters" description="Search and status update the matching collection while active values remain visible." layout="start"><FilterBarPreview /></ComponentPreview><CodeBlock filename="ProjectsFilterBar.tsx" code={BASIC_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="anatomy" title="Anatomy" description="FilterBar combines a search field, labelled controls, active-filter summary, result feedback, and optional actions."><Anatomy preview={<div className="component-anatomy-visual filter-bar-anatomy"><div className="filter-bar-anatomy-search">⌕ Search projects</div><div className="filter-bar-anatomy-controls"><span>Status ▾</span><strong>Export</strong></div><div className="filter-bar-anatomy-summary"><span>Status: Active ×</span><small>12 results</small></div><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 38 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 50, left: -34 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 50, right: -34 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 32 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, right: 32 }}>5</span></div>} items={[
        { number: 1, name: 'Search', description: 'Finds records using familiar identifying text.' },
        { number: 2, name: 'Filter controls', description: 'Apply structured values through Select, DatePicker, or custom controls.' },
        { number: 3, name: 'Actions', description: 'Contains related collection actions such as export.' },
        { number: 4, name: 'Active filters', description: 'Shows applied values with individual removal.' },
        { number: 5, name: 'Result feedback', description: 'Announces the current matching result count.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="when-to-use" title="When to use" description="Use FilterBar when a collection needs multiple coordinated ways to narrow or act on results."><GuidanceList tone="do" items={[{ title: 'Filter operational collections', description: 'Use above DataTable, List, or Card collections with repeatable fields.' }, { title: 'Keep active criteria visible', description: 'Let people understand why the result set changed and remove criteria individually.' }, { title: 'Support repeated refinement', description: 'Use when people adjust several criteria during one task.' }]} /></ComponentDocSection>

      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer simpler controls when the collection has one obvious narrowing mechanism."><GuidanceList tone="dont" items={[{ title: 'Do not use for one search field', description: 'Place a labelled Input near the collection instead.' }, { title: 'Do not use for form submission', description: 'Use a Form layout when values create or update a record.' }, { title: 'Do not hide essential navigation', description: 'Filters modify results; they do not replace destinations or tabs.' }]} /></ComponentDocSection>

      <ComponentDocSection id="variants" title="Variants" description="Surface and density variants adapt FilterBar without changing its composition or semantics."><BehaviorGrid items={[{ icon: 'ti-layout-navbar', title: 'Plain', description: 'Use when the surrounding page already provides containment.' }, { icon: 'ti-border-all', title: 'Bordered', description: 'Defines the filtering region on open surfaces.' }, { icon: 'ti-shadow', title: 'Raised', description: 'Adds emphasis above complex or scrolling collections.' }, { icon: 'ti-line-height', title: 'Sizes', description: 'Small, medium, and large preserve accessible target sizes.' }]} /></ComponentDocSection>

      <ComponentDocSection id="states" title="States" description="FilterBar communicates availability, applied criteria, responsive disclosure, and asynchronous result updates."><StateMatrix rows={[{ state: 'Default', trigger: 'No criteria applied', visual: 'Empty search and default controls', interaction: 'Ready for refinement' }, { state: 'Active', trigger: 'Search or filter has a value', visual: 'Summary and reset appear', interaction: 'Criteria can be removed' }, { state: 'Expanded', trigger: 'Mobile Filters action', visual: 'Secondary controls become visible', interaction: 'Focus order follows visual order' }, { state: 'Loading', trigger: 'Results are updating', visual: 'Search progress and updating message', interaction: 'Current values remain visible' }, { state: 'Disabled', trigger: 'Filtering is unavailable', visual: 'Reduced emphasis', interaction: 'Built-in controls cannot activate' }, { state: 'No results', trigger: 'No record matches', visual: '0 results announcement', interaction: 'Criteria remain removable' }]} /></ComponentDocSection>

      <ComponentDocSection id="behavior" title="Behavior" description="FilterBar controls filter UI and announcements but leaves data fetching and domain-specific filtering to the application."><BehaviorGrid items={[{ icon: 'ti-search', title: 'Search', description: 'Applications may debounce remote requests while keeping the value controlled.' }, { icon: 'ti-filter', title: 'Composition', description: 'Product teams supply controls appropriate to each field.' }, { icon: 'ti-device-mobile', title: 'Responsive disclosure', description: 'Secondary filters collapse on narrow screens while search remains available.' }, { icon: 'ti-refresh', title: 'Reset', description: 'One action restores every criterion to its default state.' }]} /></ComponentDocSection>

      <ComponentDocSection id="accessibility" title="Accessibility" description="FilterBar exposes a named search region, visible control labels, keyboard-operable removal, and polite result feedback."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves through search, filter controls, summaries, reset, and actions.' }, { keys: ['Enter', 'Space'], action: 'Activates disclosure, removal, reset, or toolbar actions.' }, { keys: ['Esc'], action: 'Preserves the focused control’s native dismissal behavior.' }]} /><AccessibilityChecklist items={['Provide a visible label for search and every filter.', 'Use native or accessible design-system controls.', 'Announce result count changes politely.', 'Give removal actions the filter name and active value.', 'Keep collapsed filters out of the focus order.', 'Maintain 44px minimum interactive targets.']} /></div></ComponentDocSection>

      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Labels and summaries should make applied criteria understandable without opening controls."><ContentGuidelines rules={[{ label: 'Name the field', guidance: 'Use concise nouns for filter labels.', example: 'Status' }, { label: 'Use inclusive defaults', guidance: 'Make the unfiltered option explicit.', example: 'All statuses' }, { label: 'Show label and value', guidance: 'Active summaries need enough context to stand alone.', example: 'Status: Active' }, { label: 'Report useful results', guidance: 'Use the collection’s noun when it adds clarity.', example: '12 projects' }]} /></ComponentDocSection>

      <ComponentDocSection id="examples" title="Examples" description="Compose controls from the design system and keep their values controlled by the collection owner."><div className="component-doc-stack"><ComponentPreview title="Active project filter" description="Try search, status, individual removal, and reset in the live example." layout="start"><FilterBarPreview /></ComponentPreview><CodeBlock filename="ProjectFilters.tsx" code={FILTER_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="props-api" title="Props / API" description="FilterBar extends div attributes; FilterBarFilter supplies a stable ID, label, control, and optional active summary."><PropsTable props={FILTER_BAR_PROPS} /></ComponentDocSection>

      <ComponentDocSection id="related-components" title="Related components" description="FilterBar coordinates collection controls built from focused components."><RelatedComponents items={[{ name: 'DataTable', href: '/components/data-table', description: 'Display and manage structured results', icon: 'ti-table' }, { name: 'Input', href: '/components/input', description: 'Enter search text', icon: 'ti-cursor-text' }, { name: 'Select', href: '/components/select', description: 'Choose governed filter values', icon: 'ti-selector' }, { name: 'DatePicker', href: '/components/date-picker', description: 'Filter by dates or ranges', icon: 'ti-calendar' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
