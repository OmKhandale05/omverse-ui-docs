'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable,
  RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const TREE_VIEW_PROPS = [
  { name: 'nodes', type: 'readonly TreeViewNode[]', default: 'required', description: 'Hierarchical node definitions.' },
  { name: 'label', type: 'string', default: 'required', description: 'Accessible name announced for the tree.' },
  { name: 'selectionMode', type: "'none' | 'single' | 'multiple'", default: "'single'", description: 'Determines whether and how nodes can be selected.' },
  { name: 'selectedIds', type: 'readonly string[]', default: 'undefined', description: 'Controlled selected node identifiers.' },
  { name: 'defaultSelectedIds', type: 'readonly string[]', default: '[]', description: 'Initial uncontrolled selection.' },
  { name: 'onSelectionChange', type: '(ids: readonly string[]) => void', default: 'undefined', description: 'Runs whenever selection changes.' },
  { name: 'expandedIds', type: 'readonly string[]', default: 'undefined', description: 'Controlled expanded node identifiers.' },
  { name: 'defaultExpandedIds', type: 'readonly string[]', default: '[]', description: 'Initial uncontrolled expansion.' },
  { name: 'onExpandedChange', type: '(ids: readonly string[]) => void', default: 'undefined', description: 'Runs whenever expansion changes.' },
  { name: 'activeId', type: 'string', default: 'undefined', description: 'Controlled keyboard-active node.' },
  { name: 'defaultActiveId', type: 'string', default: 'first node', description: 'Initial uncontrolled active node.' },
  { name: 'onActiveChange', type: '(id: string) => void', default: 'undefined', description: 'Runs when keyboard focus moves.' },
  { name: 'onNodeActivate', type: '(node: TreeViewNode) => void', default: 'undefined', description: 'Runs when Enter activates an enabled node.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No items available.'", description: 'Content shown when the hierarchy is empty.' },
  { name: 'variant', type: "'plain' | 'bordered' | 'raised'", default: "'plain'", description: 'Sets the surrounding tree surface.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls row height, icon, and type scale.' },
] as const

const BASIC_CODE = `import { TreeView, type TreeViewNode } from 'omverse-ui'

const nodes: TreeViewNode[] = [
  {
    id: 'workspace',
    label: 'Enterprise workspace',
    icon: 'folder-open',
    children: [
      { id: 'projects', label: 'Projects', icon: 'folder', children: projectNodes },
      { id: 'reports', label: 'Reports', icon: 'folder', badge: '4' },
    ],
  },
]

<TreeView
  variant="bordered"
  label="Workspace navigation"
  nodes={nodes}
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
  defaultExpandedIds={['workspace', 'projects']}
/>`

const MULTI_CODE = `<TreeView
  label="Choose report folders"
  nodes={nodes}
  selectionMode="multiple"
  defaultSelectedIds={['audit', 'risk']}
  onSelectionChange={setFolderIds}
/>`

function TreeViewPreview() {
  const [expanded, setExpanded] = useState(true)
  const [selected, setSelected] = useState('migration')
  return <div className="tree-view-demo" role="tree" aria-label="Workspace navigation">
    <div role="treeitem" aria-expanded={expanded} aria-selected={selected === 'workspace'} tabIndex={0}>
      <button type="button" aria-label={`${expanded ? 'Collapse' : 'Expand'} Enterprise workspace`} onClick={() => setExpanded((value) => !value)}>{expanded ? '⌄' : '›'}</button><span aria-hidden>▣</span><span className="tree-view-demo-label"><strong>Enterprise workspace</strong><small>12 items</small></span><em>12</em>
      {expanded && <div role="group">
        <div role="treeitem" aria-selected={selected === 'migration'} tabIndex={-1} onClick={() => setSelected('migration')}><span className="tree-view-demo-spacer" /><span aria-hidden>▤</span><span className="tree-view-demo-label"><strong>Migration program</strong><small>Updated today</small></span></div>
        <div role="treeitem" aria-selected={selected === 'identity'} tabIndex={-1} onClick={() => setSelected('identity')}><span className="tree-view-demo-spacer" /><span aria-hidden>▤</span><span className="tree-view-demo-label"><strong>Identity refresh</strong><small>Updated yesterday</small></span></div>
      </div>}
    </div>
  </div>
}

export default function TreeViewPage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'TreeView']} title="TreeView" description="TreeView presents hierarchical enterprise content with predictable expansion, selection, and keyboard navigation." tags={['WAI-ARIA tree', 'Controlled API', 'Multi-select', 'Keyboard navigation', '3 sizes']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use TreeView to help people inspect and navigate hierarchical data without losing the relationship between parents, children, and siblings."><div className="component-doc-stack"><ComponentPreview title="Workspace hierarchy" description="Expand the workspace and select either project in this live preview." layout="start"><TreeViewPreview /></ComponentPreview><CodeBlock filename="WorkspaceTree.tsx" code={BASIC_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="anatomy" title="Anatomy" description="TreeView rows combine disclosure, identifying visuals, labels, supporting metadata, status, and nested hierarchy."><Anatomy preview={<div className="component-anatomy-visual tree-view-anatomy"><div><i>⌄</i><b>▣</b><span><strong>Projects</strong><small>Workspace</small></span><em>4</em></div><div className="tree-view-anatomy-child"><i /><b>▤</b><span><strong>Migration</strong><small>Updated today</small></span></div><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 18, left: -34 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 58 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 132 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 18, right: -34 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 72 }}>5</span></div>} items={[
        { number: 1, name: 'Disclosure', description: 'Expands or collapses a parent node without changing selection.' },
        { number: 2, name: 'Node icon', description: 'Helps distinguish containers, documents, and domain objects.' },
        { number: 3, name: 'Label and metadata', description: 'Identifies the node and adds concise supporting context.' },
        { number: 4, name: 'Status', description: 'Shows a count, state, or other compact supplementary value.' },
        { number: 5, name: 'Child group', description: 'Uses indentation and a guide to preserve parent-child relationships.' },
      ]} /></ComponentDocSection>

      <ComponentDocSection id="when-to-use" title="When to use" description="Use TreeView when hierarchy is essential to understanding or choosing an item."><GuidanceList tone="do" items={[{ title: 'Navigate nested resources', description: 'Use for workspaces, folders, taxonomies, organization units, or governed assets.' }, { title: 'Preserve visible context', description: 'Let people inspect nearby parents and siblings while moving through a hierarchy.' }, { title: 'Support hierarchical selection', description: 'Use when one or several nodes must be chosen from multiple levels.' }]} /></ComponentDocSection>

      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer flatter patterns when hierarchy does not materially help the task."><GuidanceList tone="dont" items={[{ title: 'Do not use for short navigation', description: 'Use Navbar, Tabs, or a simple link list for a small set of destinations.' }, { title: 'Do not hide unrelated categories', description: 'Use Accordion when sections are independent rather than hierarchical.' }, { title: 'Do not represent tabular relationships', description: 'Use DataTable when comparison across columns is the primary task.' }]} /></ComponentDocSection>

      <ComponentDocSection id="variants" title="Variants" description="Surface and density options adapt TreeView to navigation panels, inspectors, and contained enterprise cards."><BehaviorGrid items={[{ icon: 'ti-hierarchy-2', title: 'Plain', description: 'Fits within a sidebar or panel that already provides containment.' }, { icon: 'ti-border-all', title: 'Bordered', description: 'Defines a self-contained hierarchy on open surfaces.' }, { icon: 'ti-shadow', title: 'Raised', description: 'Separates the hierarchy from layered or scrolling content.' }, { icon: 'ti-line-height', title: 'Sizes', description: 'Small, medium, and large adjust density while retaining usable targets.' }]} /></ComponentDocSection>

      <ComponentDocSection id="states" title="States" description="Each node communicates expansion, selection, focus, availability, and asynchronous loading independently."><StateMatrix rows={[{ state: 'Collapsed', trigger: 'Parent children are hidden', visual: 'Right-pointing disclosure', interaction: 'Right Arrow or disclosure expands' }, { state: 'Expanded', trigger: 'Children are visible', visual: 'Downward disclosure and nested group', interaction: 'Left Arrow collapses' }, { state: 'Selected', trigger: 'Node belongs to the selection', visual: 'Primary-container state layer', interaction: 'Space toggles selection' }, { state: 'Focused', trigger: 'Node is keyboard-active', visual: 'Visible focus ring', interaction: 'Arrow keys move focus' }, { state: 'Loading', trigger: 'Children are being retrieved', visual: 'Progress indicator beside the node', interaction: 'Expansion waits for content' }, { state: 'Disabled', trigger: 'Node is unavailable', visual: 'Reduced emphasis', interaction: 'Discoverable but not selectable' }, { state: 'Empty', trigger: 'No nodes are available', visual: 'Named empty message', interaction: 'No tree navigation' }]} /></ComponentDocSection>

      <ComponentDocSection id="behavior" title="Behavior" description="TreeView maintains separate expansion, selection, and active-focus state so applications can control each concern independently."><BehaviorGrid items={[{ icon: 'ti-arrows-vertical', title: 'Linear focus', description: 'Up and Down move through only the currently visible nodes.' }, { icon: 'ti-corner-down-right', title: 'Hierarchy movement', description: 'Right expands or enters children; Left collapses or returns to the parent.' }, { icon: 'ti-select', title: 'Selection', description: 'Single and multiple modes update independently from disclosure.' }, { icon: 'ti-loader', title: 'Lazy content', description: 'Loading nodes remain stable while their children are retrieved.' }]} /></ComponentDocSection>

      <ComponentDocSection id="accessibility" title="Accessibility" description="TreeView follows the WAI-ARIA tree pattern with one active tab stop, hierarchical roles, announced selection, and complete keyboard movement."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['↑', '↓'], action: 'Moves to the previous or next visible node.' }, { keys: ['→'], action: 'Expands a closed parent or moves to its first child.' }, { keys: ['←'], action: 'Collapses an open parent or moves to its parent.' }, { keys: ['Home', 'End'], action: 'Moves to the first or last visible node.' }, { keys: ['Space'], action: 'Toggles selection according to selectionMode.' }, { keys: ['Enter'], action: 'Selects and activates the focused enabled node.' }]} /><AccessibilityChecklist items={['Give the tree a concise accessible label.', 'Use tree, treeitem, and group roles to preserve hierarchy.', 'Expose expanded, selected, disabled, busy, position, and set-size states.', 'Keep exactly one visible node in the Tab sequence.', 'Do not rely on indentation or icons alone to communicate hierarchy.', 'Keep disabled nodes discoverable without allowing activation.']} /></div></ComponentDocSection>

      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Node labels and metadata should remain short enough to scan at several levels of indentation."><ContentGuidelines rules={[{ label: 'Use object names', guidance: 'Label nodes with the resource people recognize.', example: 'Migration program' }, { label: 'Keep siblings parallel', guidance: 'Use the same naming pattern for nodes at one level.', example: 'Projects, Reports, Archive' }, { label: 'Make metadata useful', guidance: 'Add one short detail that helps distinguish similar items.', example: 'Updated today' }, { label: 'Use compact badges', guidance: 'Reserve badges for counts or terse states.', example: '4' }]} /></ComponentDocSection>

      <ComponentDocSection id="examples" title="Examples" description="Multiple selection is appropriate when people apply one operation to nodes across several branches."><div className="component-doc-stack"><ComponentPreview title="Interactive workspace tree" description="The preview demonstrates disclosure and single selection in a compact hierarchy." layout="start"><TreeViewPreview /></ComponentPreview><CodeBlock filename="ReportFolderTree.tsx" code={MULTI_CODE} /></div></ComponentDocSection>

      <ComponentDocSection id="props-api" title="Props / API" description="TreeView extends div attributes; each TreeViewNode supplies identity, content, optional hierarchy, and availability state."><PropsTable props={TREE_VIEW_PROPS} /></ComponentDocSection>

      <ComponentDocSection id="related-components" title="Related components" description="Choose related patterns based on whether the task emphasizes hierarchy, navigation, disclosure, or comparison."><RelatedComponents items={[{ name: 'Accordion', href: '/components/accordion', description: 'Disclose independent content sections', icon: 'ti-layout-list' }, { name: 'Navbar', href: '/components/navbar', description: 'Navigate a smaller destination set', icon: 'ti-layout-navbar' }, { name: 'DataTable', href: '/components/data-table', description: 'Compare structured records', icon: 'ti-table' }, { name: 'Checkbox', href: '/components/checkbox', description: 'Select independent options', icon: 'ti-checkbox' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
