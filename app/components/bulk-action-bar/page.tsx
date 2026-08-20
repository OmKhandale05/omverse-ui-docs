'use client'

import { useState } from 'react'
import { BulkActionBar, Button } from 'omverse-ui'
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
  { name: 'selectedCount', type: 'number', default: 'required', description: 'Current selection size; zero hides the bar.' },
  { name: 'totalCount', type: 'number', default: 'undefined', description: 'Total records available in the current collection or result set.' },
  { name: 'selectionLabel', type: 'ReactNode', default: 'generated count', description: 'Domain-specific replacement for the generated selection message.' },
  { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Supporting scope, exclusion, or permission context.' },
  { name: 'actions', type: 'ReactNode', default: 'required', description: 'Primary and secondary bulk operations.' },
  { name: 'overflowActions', type: 'ReactNode', default: 'undefined', description: 'Lower-frequency operations disclosed from More actions.' },
  { name: 'overflowLabel', type: 'string', default: "'More bulk actions'", description: 'Accessible name for the overflow trigger.' },
  { name: 'overflowOpen', type: 'boolean', default: 'undefined', description: 'Controlled overflow visibility.' },
  { name: 'defaultOverflowOpen', type: 'boolean', default: 'false', description: 'Initial uncontrolled overflow visibility.' },
  { name: 'onOverflowOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Runs whenever overflow visibility changes.' },
  { name: 'onClearSelection', type: '() => void', default: 'undefined', description: 'Clears selection and enables Escape-to-clear behavior.' },
  { name: 'clearLabel', type: 'string', default: "'Clear selection'", description: 'Visible and accessible clear-control label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents all bulk action input.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Announces progress and prevents duplicate operations.' },
  { name: 'loadingLabel', type: 'string', default: "'Applying bulk action'", description: 'Status announced during execution.' },
  { name: 'variant', type: "'bordered' | 'filled' | 'raised'", default: "'bordered'", description: 'Controls surface emphasis.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls density and type scale.' },
  { name: 'sticky', type: 'boolean', default: 'false', description: 'Keeps the bar near the viewport bottom in scrolling workspaces.' },
] as const

const BASIC_CODE = `import { BulkActionBar, Button } from 'omverse-ui'

<BulkActionBar
  selectedCount={selectedIds.length}
  totalCount={results.length}
  description="Across the current filtered result set"
  onClearSelection={() => setSelectedIds([])}
  actions={
    <>
      <Button variant="outlined">Export</Button>
      <Button>Assign owner</Button>
    </>
  }
  overflowActions={<BulkOverflowActions />}
/>`

const CONTROLLED_CODE = `const [running, setRunning] = useState(false)

<BulkActionBar
  selectedCount={selectedIds.length}
  loading={running}
  loadingLabel={\`Archiving \${selectedIds.length} records\`}
  onClearSelection={() => setSelectedIds([])}
  actions={<Button onClick={archiveSelection}>Archive</Button>}
/>

async function archiveSelection() {
  setRunning(true)
  const result = await archiveRecords(selectedIds)
  setRunning(false)
  showBulkResult(result)
}`

function BulkActionBarPreview() {
  const [selected, setSelected] = useState(4)
  const [loading, setLoading] = useState(false)

  if (selected === 0) {
    return <Button onClick={() => setSelected(4)}>Select four records</Button>
  }

  return (
    <div className="bulk-action-bar-demo">
      <BulkActionBar
        selectedCount={selected}
        totalCount={18}
        description="Across the current filtered result set"
        loading={loading}
        loadingLabel="Assigning selected records"
        onClearSelection={() => setSelected(0)}
        actions={
          <>
            <Button variant="outlined" onClick={() => setLoading(true)}>Export</Button>
            <Button onClick={() => setLoading(true)}>Assign owner</Button>
          </>
        }
        overflowActions={
          <>
            <Button variant="text" className="w-full justify-start">Add label</Button>
            <Button variant="text" className="w-full justify-start">Move to queue</Button>
            <Button variant="destructive" className="w-full justify-start">Delete records</Button>
          </>
        }
      />
      {loading && <Button variant="text" onClick={() => setLoading(false)}>Reset preview</Button>}
    </div>
  )
}

export default function BulkActionBarPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'BulkActionBar']}
        title="BulkActionBar"
        description="BulkActionBar makes multi-record selection, available operations, execution progress, and the escape path clear in one governed surface."
        tags={['Selection-aware', 'Keyboard navigation', 'Overflow', 'Loading', '3 variants', '3 sizes']}
      />
      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Use BulkActionBar when selecting one or more records changes the available actions and their scope.">
          <div className="component-doc-stack">
            <ComponentPreview title="Selected work items" description="Open More actions, start an operation, reset the preview, or clear the selection." layout="start"><BulkActionBarPreview /></ComponentPreview>
            <CodeBlock filename="WorkItemsBulkActions.tsx" code={BASIC_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy" description="Keep scope, context, frequent actions, overflow, and the clear path in one predictable order.">
          <Anatomy preview={<div className="component-anatomy-visual bulk-action-bar-anatomy"><span className="bulk-action-anatomy-scope">✓</span><span className="bulk-action-anatomy-context"><strong>4 of 18 selected</strong><small>Current filtered results</small></span><span className="bulk-action-anatomy-actions"><i>Export</i><strong>Assign</strong></span><span className="bulk-action-anatomy-more">•••</span><span className="bulk-action-anatomy-clear">×</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: 4, left: 7 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: 4, left: 78 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ right: 94, bottom: 4 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 29, right: 38 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 29, right: 4 }}>5</span></div>} items={[
            { number: 1, name: 'Selection indicator', description: 'Signals that the interface has entered a multi-record action mode.' },
            { number: 2, name: 'Selection scope', description: 'States how many records are affected and which result set they belong to.' },
            { number: 3, name: 'Visible actions', description: 'Keeps the safest and most frequent operations immediately available.' },
            { number: 4, name: 'Overflow actions', description: 'Contains lower-frequency or higher-risk operations.' },
            { number: 5, name: 'Clear selection', description: 'Returns the collection to its normal browsing state.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Use when several selected records share a safe, clearly bounded operation."><GuidanceList tone="do" items={[
          { title: 'Act on table or list selections', description: 'Connect the bar to stable record identifiers from DataTable or another selectable collection.' },
          { title: 'Make scope explicit', description: 'State selected and total counts before users commit a high-volume change.' },
          { title: 'Separate action frequency', description: 'Keep common operations visible and move occasional actions into overflow.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer direct or guided workflows when bulk scope is absent, ambiguous, or unsafe."><GuidanceList tone="dont" items={[
          { title: 'Do not use for one record', description: 'Use row actions, object actions, or a detail-page toolbar.' },
          { title: 'Do not bypass confirmation', description: 'Use a review dialog or wizard for destructive, regulated, or irreversible operations.' },
          { title: 'Do not mix selection scopes', description: 'Never combine records from unrelated collections without explaining the boundary.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Surface and density treatments adapt the same behavior to embedded and floating workspaces."><BehaviorGrid items={[
          { icon: 'ti-border-all', title: 'Bordered', description: 'Default contained bar above or below a collection.' },
          { icon: 'ti-square-filled', title: 'Filled', description: 'Uses a tonal surface to emphasize selection mode.' },
          { icon: 'ti-shadow', title: 'Raised', description: 'Floats above scrolling content or layered floorplans.' },
          { icon: 'ti-line-height', title: 'Sizes', description: 'Small, medium, and large preserve minimum action targets.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="The bar communicates selection readiness, action availability, and asynchronous execution without losing context."><StateMatrix rows={[
          { state: 'Hidden', trigger: 'selectedCount is zero', visual: 'Bar is not rendered', interaction: 'Collection remains in browsing mode' },
          { state: 'Active', trigger: 'One or more eligible records selected', visual: 'Scope and available actions appear', interaction: 'Actions apply to stated selection' },
          { state: 'Overflow open', trigger: 'More actions activated', visual: 'Additional action group appears', interaction: 'Escape closes overflow first' },
          { state: 'Loading', trigger: 'Operation is executing', visual: 'Progress indicator and stable scope', interaction: 'Duplicate actions are prevented' },
          { state: 'Disabled', trigger: 'Selection cannot be modified', visual: 'Reduced emphasis', interaction: 'Controls cannot receive input' },
          { state: 'Partial availability', trigger: 'Some actions do not apply', visual: 'Individual actions disabled', interaction: 'Available actions remain usable' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="BulkActionBar owns presentation and toolbar interaction; applications own policy, confirmation, execution, results, and undo."><BehaviorGrid items={[
          { icon: 'ti-checkbox', title: 'Selection-driven visibility', description: 'The bar enters with the first selection and leaves after selection is cleared.' },
          { icon: 'ti-arrows-horizontal', title: 'Keyboard movement', description: 'Arrow keys move through actions; Home and End reach boundaries.' },
          { icon: 'ti-loader', title: 'Execution lock', description: 'Loading prevents duplicate operations while preserving visible scope.' },
          { icon: 'ti-shield-check', title: 'Policy-owned actions', description: 'Applications supply only operations allowed for the current user and records.' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="A named toolbar, live selection count, native controls, and predictable Escape behavior keep bulk mode understandable.">
          <div className="component-doc-stack"><KeyboardTable rows={[
            { keys: ['Tab'], action: 'Moves into or out of the bulk-action region.' },
            { keys: ['←', '→'], action: 'Moves between visible toolbar actions and wraps at the ends.' },
            { keys: ['Home', 'End'], action: 'Moves to the first or last visible action.' },
            { keys: ['Enter', 'Space'], action: 'Activates the focused native control.' },
            { keys: ['Esc'], action: 'Closes overflow first; otherwise clears selection when configured.' },
          ]} /><AccessibilityChecklist items={['Keep the toolbar label concise and unique.', 'Announce selection-count changes politely.', 'State scope in text rather than color alone.', 'Give icon-only overflow actions accessible names.', 'Preserve record identifiers while sorting or filtering.', 'Return focus to a sensible collection control after clearing.', 'Explain why individually disabled actions are unavailable.']} /></div>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Selection and action language should make consequences clear before execution."><ContentGuidelines rules={[
          { label: 'Quantify the scope', guidance: 'State selected and total records when both are known.', example: '4 of 18 selected' },
          { label: 'Name actions precisely', guidance: 'Use verb-first labels that describe the result.', example: 'Assign owner' },
          { label: 'Explain exclusions', guidance: 'State why some selected records will not change.', example: '2 locked records will be skipped' },
          { label: 'Describe progress', guidance: 'Include the operation and affected count.', example: 'Archiving 14 records' },
        ]} /></ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="Coordinate progress and result reporting outside the bar while keeping the selected scope stable."><div className="component-doc-stack"><ComponentPreview title="Raised action context" description="A higher-emphasis treatment for a scrolling operational workspace." layout="start"><BulkActionBar selectedCount={14} totalCount={14} variant="raised" description="All eligible results selected" actions={<Button variant="destructive">Archive</Button>} onClearSelection={() => undefined} /></ComponentPreview><CodeBlock filename="AsyncBulkAction.tsx" code={CONTROLLED_CODE} /></div></ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="BulkActionBar extends div attributes and composes application-owned controls through explicit action slots."><PropsTable props={PROPS} /></ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Use collection, filtering, confirmation, and feedback components to complete a safe bulk workflow."><RelatedComponents items={[
          { name: 'DataTable', href: '/components/data-table', description: 'Provide stable selectable records', icon: 'ti-table' },
          { name: 'FilterBar', href: '/components/filter-bar', description: 'Define the current result scope', icon: 'ti-filter' },
          { name: 'Dialog', href: '/components/dialog', description: 'Review high-impact operations', icon: 'ti-layout-sidebar-right' },
          { name: 'Alert', href: '/components/alert', description: 'Report completed or partial outcomes', icon: 'ti-alert-circle' },
        ]} /></ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
