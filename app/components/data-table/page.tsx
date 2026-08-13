'use client'

import { useMemo, useState } from 'react'
import { Badge, Button } from 'omverse-ui'
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

interface ProjectRow {
  id: string
  project: string
  owner: string
  status: 'Active' | 'At risk' | 'Complete'
  updated: string
}

const PROJECTS: ProjectRow[] = [
  { id: 'PRJ-1042', project: 'Enterprise migration', owner: 'Maya Chen', status: 'Active', updated: '2026-08-14' },
  { id: 'PRJ-1038', project: 'Billing controls', owner: 'Noah Williams', status: 'At risk', updated: '2026-08-12' },
  { id: 'PRJ-1024', project: 'Identity refresh', owner: 'Aarav Shah', status: 'Complete', updated: '2026-08-08' },
  { id: 'PRJ-1019', project: 'Audit reporting', owner: 'Sofia Martin', status: 'Active', updated: '2026-08-05' },
]

const DATA_TABLE_PROPS = [
  { name: 'columns', type: 'readonly DataTableColumn<T>[]', default: 'required', description: 'Typed header, accessor, cell, alignment, and sorting definitions.' },
  { name: 'data', type: 'readonly T[]', default: 'required', description: 'Rows displayed by the table.' },
  { name: 'getRowId', type: '(row: T, index: number) => Key', default: 'required', description: 'Returns a stable identifier for each row.' },
  { name: 'caption', type: 'string', default: 'required', description: 'Accessible name rendered as a visually hidden caption.' },
  { name: 'variant', type: "'plain' | 'bordered' | 'striped'", default: "'plain'", description: 'Sets the table surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls row height, padding, and type size.' },
  { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Keeps headers visible during vertical scrolling.' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Adds select-all and row-selection checkboxes.' },
  { name: 'selectedRowIds', type: 'readonly Key[]', default: 'undefined', description: 'Controlled selected row identifiers.' },
  { name: 'defaultSelectedRowIds', type: 'readonly Key[]', default: '[]', description: 'Initial selection for uncontrolled usage.' },
  { name: 'onSelectionChange', type: '(rowIds: readonly Key[]) => void', default: 'undefined', description: 'Runs whenever selection changes.' },
  { name: 'isRowDisabled', type: '(row: T) => boolean', default: 'undefined', description: 'Prevents selection for unavailable rows.' },
  { name: 'sort', type: 'DataTableSortState | null', default: 'undefined', description: 'Controlled sort column and direction.' },
  { name: 'defaultSort', type: 'DataTableSortState | null', default: 'null', description: 'Initial sort for uncontrolled usage.' },
  { name: 'onSortChange', type: '(sort: DataTableSortState | null) => void', default: 'undefined', description: 'Runs whenever sorting changes.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Replaces rows with an announced loading state.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No data available.'", description: 'Content displayed when data is empty.' },
  { name: 'errorState', type: 'ReactNode', default: 'undefined', description: 'Assertive content displayed when loading fails.' },
  { name: 'rowClassName', type: '(row: T) => string | undefined', default: 'undefined', description: 'Adds a class based on row data.' },
] as const

const BASIC_CODE = `import { DataTable, type DataTableColumn } from 'omverse-ui'

const columns: DataTableColumn<Project>[] = [
  { id: 'project', header: 'Project', accessor: 'project', sortable: true },
  { id: 'owner', header: 'Owner', accessor: 'owner', sortable: true },
  { id: 'status', header: 'Status', cell: (row) => <Badge>{row.status}</Badge> },
]

<DataTable
  columns={columns}
  data={projects}
  getRowId={(row) => row.id}
  caption="Enterprise projects"
  variant="bordered"
/>`

const CONTROLLED_CODE = `const [selected, setSelected] = useState<readonly Key[]>([])
const [sort, setSort] = useState<DataTableSortState | null>(null)

<DataTable
  columns={columns}
  data={projects}
  getRowId={(row) => row.id}
  caption="Enterprise projects"
  selectable
  selectedRowIds={selected}
  onSelectionChange={setSelected}
  sort={sort}
  onSortChange={setSort}
  stickyHeader
/>`

function DataTablePreview() {
  const [selected, setSelected] = useState<string[]>([])
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc')
  const rows = useMemo(() => [...PROJECTS].sort((a, b) => a.project.localeCompare(b.project) * (direction === 'asc' ? 1 : -1)), [direction])
  const allSelected = selected.length === PROJECTS.length

  return (
    <div className="data-table-preview" role="region" aria-label="Enterprise projects data table" tabIndex={0}>
      <table>
        <caption className="sr-only">Enterprise projects</caption>
        <thead><tr>
          <th scope="col"><input type="checkbox" aria-label="Select all rows" checked={allSelected} onChange={() => setSelected(allSelected ? [] : PROJECTS.map((row) => row.id))} /></th>
          <th scope="col" aria-sort={direction === 'asc' ? 'ascending' : 'descending'}><button type="button" onClick={() => setDirection((value) => value === 'asc' ? 'desc' : 'asc')}>Project <i className={`ti ti-chevron-${direction === 'asc' ? 'up' : 'down'}`} aria-hidden="true" /></button></th>
          <th scope="col">Owner</th><th scope="col">Status</th><th scope="col">Updated</th><th scope="col"><span className="sr-only">Actions</span></th>
        </tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id} aria-selected={selected.includes(row.id)}>
          <td><input type="checkbox" aria-label={`Select ${row.project}`} checked={selected.includes(row.id)} onChange={() => setSelected((value) => value.includes(row.id) ? value.filter((id) => id !== row.id) : [...value, row.id])} /></td>
          <td><strong>{row.project}</strong><small>{row.id}</small></td><td>{row.owner}</td><td><Badge variant="tonal" color={row.status === 'At risk' ? 'warning' : row.status === 'Complete' ? 'success' : 'default'}>{row.status}</Badge></td><td>{row.updated}</td><td><Button size="sm" variant="text" aria-label={`Open ${row.project}`}>Open</Button></td>
        </tr>)}</tbody>
      </table>
      <p className="data-table-preview-summary" aria-live="polite">{selected.length} of {PROJECTS.length} rows selected</p>
    </div>
  )
}

export default function DataTablePage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Display', 'DataTable']} title="DataTable" description="DataTable presents structured enterprise data for scanning, comparison, sorting, and selection while preserving native table semantics." tags={['Generic API', 'Sorting', 'Selection', 'Sticky header', '3 densities', 'Responsive']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use DataTable when people need to compare structured values across many records and act on individual or selected rows.">
        <div className="component-doc-stack"><ComponentPreview title="Enterprise projects" description="Sortable headers, selection, status, and row actions support a common operational workflow." layout="start"><DataTablePreview /></ComponentPreview><CodeBlock filename="ProjectsTable.tsx" code={BASIC_CODE} /></div>
      </ComponentDocSection>

      <ComponentDocSection id="anatomy" title="Anatomy" description="A data table combines a caption, column headers, rows, cells, optional selection, status, and row actions.">
        <Anatomy preview={
          <div className="component-anatomy-visual data-table-anatomy">
            <div className="data-table-anatomy-caption">Enterprise projects</div>
            <div className="data-table-anatomy-header">☐　Project　 Owner　 Status　 Actions</div>
            <div className="data-table-anatomy-row">☐　Migration　 Maya　 Active　 Open</div>
            <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 39, right: -38 }}>1</span>
            <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 84, left: -20 }}>2</span>
            <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 84, right: -38 }}>3</span>
            <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 39, left: -20 }}>4</span>
            <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -38, left: 36 }}>5</span>
          </div>
        } items={[
          { number: 1, name: 'Header row', description: 'Names columns and exposes sorting state.', required: true },
          { number: 2, name: 'Data row', description: 'Represents one record with a stable identifier.', required: true },
          { number: 3, name: 'Cell', description: 'Displays one value or a contextual action.', required: true },
          { number: 4, name: 'Selection control', description: 'Selects one row or all eligible rows.' },
          { number: 5, name: 'Caption', description: 'Programmatically names the table.', required: true },
        ]} />
      </ComponentDocSection>

      <ComponentDocSection id="when-to-use" title="When to use" description="Choose DataTable for structured records where column alignment materially improves comparison."><GuidanceList tone="do" items={[
        { title: 'Compare records', description: 'Use when values share a consistent schema and people scan across columns.' },
        { title: 'Manage operational data', description: 'Support sorting, selection, status, and row-level actions.' },
        { title: 'Handle changing data volumes', description: 'Combine with filtering and Pagination at the workflow level.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer simpler structures when records are sparse, highly visual, or do not share comparable fields."><GuidanceList tone="dont" items={[
        { title: 'Do not use for simple key-value details', description: 'Use a description list or structured detail view for one record.' },
        { title: 'Do not use for media-first collections', description: 'Use Card or List when imagery and narrative content drive recognition.' },
        { title: 'Do not force every action into a column', description: 'Keep rare actions in an accessible row menu.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="variants" title="Variants" description="Surface and density variants adapt the same semantic structure to hierarchy and information volume."><BehaviorGrid items={[
        { icon: 'ti-table', title: 'Plain', description: 'Default for tables already contained by a page section.' },
        { icon: 'ti-border-all', title: 'Bordered', description: 'Creates a clear boundary on open surfaces.' },
        { icon: 'ti-row-insert-bottom', title: 'Striped', description: 'Supports horizontal tracking across wide tables.' },
        { icon: 'ti-line-height', title: 'Density', description: 'Small, medium, and large preserve a minimum 44px interaction target.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="states" title="States" description="Table state explains data availability, row interaction, selection, and active sorting."><StateMatrix rows={[
        { state: 'Default', trigger: 'Data is available', visual: 'Headers and rows at selected density', interaction: 'Cells and actions can be scanned' },
        { state: 'Hover', trigger: 'Pointer enters a row', visual: 'Row surface is emphasized', interaction: 'Supports horizontal tracking' },
        { state: 'Selected', trigger: 'Selection checkbox changes', visual: 'Selection control and row surface update', interaction: 'Bulk actions can consume selected IDs' },
        { state: 'Sorted', trigger: 'Sortable header is activated', visual: 'Direction icon and aria-sort update', interaction: 'Rows reorder by the active column' },
        { state: 'Loading', trigger: 'Data request is pending', visual: 'Announced loading row', interaction: 'Duplicate operations are prevented' },
        { state: 'Empty or error', trigger: 'No results or request failure', visual: 'Message spans the table width', interaction: 'Recovery guidance remains available' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="behavior" title="Behavior" description="Sorting and selection support controlled and uncontrolled usage while row identity remains stable across reordering."><BehaviorGrid items={[
        { icon: 'ti-arrows-sort', title: 'Sort cycle', description: 'Sortable headers cycle ascending, descending, and unsorted.' },
        { icon: 'ti-checkbox', title: 'Selection', description: 'Select-all affects eligible rows and preserves disabled-row state.' },
        { icon: 'ti-columns', title: 'Overflow', description: 'Wide tables scroll horizontally without collapsing column meaning.' },
        { icon: 'ti-pinned', title: 'Sticky header', description: 'Headers remain visible when a containing region scrolls vertically.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="accessibility" title="Accessibility" description="DataTable uses native table elements so header relationships and navigation remain available to browsers and assistive technology.">
        <div className="component-doc-stack"><KeyboardTable rows={[
          { keys: ['Tab'], action: 'Moves through sortable headers, selection controls, and row actions.' },
          { keys: ['Enter', 'Space'], action: 'Activates the focused sort, selection, or row action.' },
          { keys: ['Shift', 'Tab'], action: 'Moves to the previous interactive table control.' },
        ]} /><AccessibilityChecklist items={['Provide a descriptive caption.', 'Use th with scope="col" for every header.', 'Expose active sorting with aria-sort.', 'Give selection and row actions unique accessible names.', 'Do not communicate status or selection with color alone.', 'Keep horizontal overflow keyboard reachable.', 'Preserve at least 44px interactive targets.']} /></div>
      </ComponentDocSection>

      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Headers and cells should make comparison fast without sacrificing precision."><ContentGuidelines rules={[
        { label: 'Use concise headers', guidance: 'Name the value rather than describing the column.', example: 'Updated' },
        { label: 'Keep formats consistent', guidance: 'Use one date, currency, number, and status format within a column.', example: '14 Aug 2026' },
        { label: 'Align by data type', guidance: 'Start-align text and end-align comparable numeric values.', example: '₹48,200' },
        { label: 'Explain empty results', guidance: 'Differentiate no data from no filter matches and loading failure.', example: 'No projects match these filters.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="examples" title="Examples" description="Controlled sorting and selection let application state coordinate bulk actions, filters, and persistence."><div className="component-doc-stack"><ComponentPreview title="Interactive selection and sorting" description="Select rows and sort the Project column in the live semantic preview." layout="start"><DataTablePreview /></ComponentPreview><CodeBlock filename="ControlledProjectsTable.tsx" code={CONTROLLED_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="props-api" title="Props / API" description="DataTable is generic over the row type and extends div attributes for its responsive container."><PropsTable props={DATA_TABLE_PROPS} /></ComponentDocSection>

      <ComponentDocSection id="related-components" title="Related components" description="Compose DataTable with workflow controls rather than expanding the table API for every surrounding task."><RelatedComponents items={[
        { name: 'Pagination', href: '/components/pagination', description: 'Navigate server or client result pages', icon: 'ti-dots-circle-horizontal' },
        { name: 'Select', href: '/components/select', description: 'Choose filters and bulk values', icon: 'ti-selector' },
        { name: 'Checkbox', href: '/components/checkbox', description: 'Select independent rows', icon: 'ti-checkbox' },
        { name: 'Card', href: '/components/card', description: 'Present less structured or media-rich records', icon: 'ti-layout-cards' },
      ]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
