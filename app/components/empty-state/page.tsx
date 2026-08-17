'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import { Button, EmptyState } from 'omverse-ui'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const EMPTY_STATE_PROPS = [
  { name: 'title', type: 'ReactNode', default: 'required', description: 'Concise outcome that explains the current state.' },
  { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Supporting context or a useful next step.' },
  { name: 'status', type: "'empty' | 'search' | 'error' | 'permission' | 'success'", default: "'empty'", description: 'Selects the semantic default visual treatment.' },
  { name: 'icon', type: 'IconName', default: 'status icon', description: 'Overrides the icon associated with the status.' },
  { name: 'visual', type: 'ReactNode', default: 'status icon', description: 'Replaces the icon with an illustration or product asset.' },
  { name: 'primaryAction', type: 'ReactNode', default: 'undefined', description: 'Highest-priority recovery or creation action.' },
  { name: 'secondaryAction', type: 'ReactNode', default: 'undefined', description: 'Lower-priority alternative action.' },
  { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Optional contextual detail after the actions.' },
  { name: 'variant', type: "'plain' | 'bordered' | 'raised'", default: "'plain'", description: 'Controls container emphasis.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls spacing, minimum height, and visual scale.' },
] as const

const BASIC_CODE = `import { Button, EmptyState } from 'omverse-ui'

<EmptyState
  variant="bordered"
  title="No projects yet"
  description="Create your first project to coordinate work and delivery."
  primaryAction={<Button leadingIcon="plus">Create project</Button>}
  secondaryAction={<Button variant="outlined">Import projects</Button>}
/>`

const STATUS_CODE = `<EmptyState
  status="search"
  size="sm"
  title="No matching projects"
  description="Try removing a filter or using a broader search term."
  primaryAction={<Button variant="text" onClick={clearFilters}>Clear filters</Button>}
/>`

function EmptyStatePreview() {
  const [created, setCreated] = useState(false)
  return created
    ? <EmptyState
      variant="bordered"
      title="Project created"
      description="Your workspace is ready for configuration."
      status="success"
      primaryAction={<Button onClick={() => setCreated(false)}>Reset example</Button>}
    />
    : <EmptyState
      variant="bordered"
      title="No projects yet"
      description="Create your first enterprise project to coordinate work, owners, and delivery milestones."
      primaryAction={<Button onClick={() => setCreated(true)}>＋ Create project</Button>}
      secondaryAction={<Button variant="outlined">Import projects</Button>}
    />
}

export default function EmptyStatePage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'EmptyState']} title="EmptyState" description="EmptyState explains an unavailable outcome and gives people a clear, contextual route forward." tags={['5 statuses', '3 variants', '3 sizes', 'Action slots', 'Custom visual']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use EmptyState when a region has no content to show, a search returns no results, or access and system conditions prevent the expected outcome."><div className="component-doc-stack"><ComponentPreview title="First-use project state" description="The message explains why the region is empty and offers a direct next step." layout="start"><EmptyStatePreview /></ComponentPreview><CodeBlock filename="ProjectsEmptyState.tsx" code={BASIC_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="anatomy" title="Anatomy" description="A useful empty state pairs a recognizable visual with a concise outcome, supporting guidance, and proportionate actions."><Anatomy preview={<div className="component-anatomy-visual empty-state-anatomy"><i aria-hidden>▤</i><strong>No projects yet</strong><p>Create a project to coordinate work.</p><div><b>Create project</b><span>Import</span></div><small>Visible to workspace members.</small><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 112 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 65, left: -34 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 92, right: -34 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 126, left: -34 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 112 }}>5</span></div>} items={[
        { number: 1, name: 'Visual', description: 'Reinforces the state without carrying meaning alone.' },
        { number: 2, name: 'Title', description: 'Names the outcome in a short, direct phrase.' },
        { number: 3, name: 'Description', description: 'Explains why it happened or what to do next.' },
        { number: 4, name: 'Actions', description: 'Offer one primary path and an optional alternative.' },
        { number: 5, name: 'Context', description: 'Adds low-emphasis detail only when it supports a decision.' },
      ]} /></ComponentDocSection>
      <ComponentDocSection id="when-to-use" title="When to use" description="Use EmptyState for a meaningful absence that benefits from explanation or recovery guidance."><GuidanceList tone="do" items={[{ title: 'Introduce an unused area', description: 'Help people understand the value of creating their first item.' }, { title: 'Resolve a zero-result search', description: 'Confirm that filtering completed and suggest a way to broaden it.' }, { title: 'Explain blocked outcomes', description: 'Describe permission or system conditions and provide a safe next step.' }]} /></ComponentDocSection>
      <ComponentDocSection id="when-not-to-use" title="When not to use" description="Do not use EmptyState when absence is expected, temporary, or too small to justify a full message."><GuidanceList tone="dont" items={[{ title: 'Do not replace loading feedback', description: 'Use Spinner or Skeleton while data is still being resolved.' }, { title: 'Do not interrupt brief gaps', description: 'Leave intentionally optional or self-explanatory regions quiet.' }, { title: 'Do not report transient operations', description: 'Use Toast for short-lived success or failure feedback.' }]} /></ComponentDocSection>
      <ComponentDocSection id="variants" title="Variants" description="Container emphasis and semantic status adapt EmptyState to page-level, bounded, and elevated regions."><BehaviorGrid items={[{ icon: 'ti-layout-align-middle', title: 'Plain', description: 'Integrates into a region whose boundary is already clear.' }, { icon: 'ti-border-all', title: 'Bordered', description: 'Defines an otherwise ambiguous empty region.' }, { icon: 'ti-shadow', title: 'Raised', description: 'Supports a contained state on an elevated workspace surface.' }, { icon: 'ti-status-change', title: 'Semantic status', description: 'Empty, search, error, permission, and success select a relevant visual.' }]} /></ComponentDocSection>
      <ComponentDocSection id="states" title="States" description="The component communicates stable outcomes; asynchronous transitions remain owned by the surrounding workflow."><StateMatrix rows={[{ state: 'First use', trigger: 'No records exist', visual: 'Neutral visual and creation guidance', interaction: 'Primary creation action' }, { state: 'No results', trigger: 'Filters match nothing', visual: 'Search visual and query guidance', interaction: 'Clear or edit filters' }, { state: 'Error', trigger: 'Content cannot be retrieved', visual: 'Error treatment and explanation', interaction: 'Retry or get help' }, { state: 'Permission', trigger: 'Access is restricted', visual: 'Lock treatment and policy context', interaction: 'Request access when allowed' }, { state: 'Success', trigger: 'A completion replaces content', visual: 'Success treatment and outcome', interaction: 'Continue to next task' }]} /></ComponentDocSection>
      <ComponentDocSection id="behavior" title="Behavior" description="EmptyState structures content and visual hierarchy while applications own conditions, actions, analytics, and navigation."><BehaviorGrid items={[{ icon: 'ti-priority', title: 'Action priority', description: 'Render one primary action before a lower-emphasis alternative.' }, { icon: 'ti-arrows-maximize', title: 'Responsive centering', description: 'Content remains centered while actions wrap on narrow surfaces.' }, { icon: 'ti-photo', title: 'Visual override', description: 'Product illustrations can replace the status icon without changing structure.' }, { icon: 'ti-box-padding', title: 'Bounded scale', description: 'Three sizes provide predictable minimum height and spacing.' }]} /></ComponentDocSection>
      <ComponentDocSection id="accessibility" title="Accessibility" description="EmptyState is a semantic section whose heading names the region; action components retain their native keyboard behavior."><AccessibilityChecklist items={['Connect the section to a visible heading when the surrounding page does not already provide one.', 'Treat decorative icons and illustrations as hidden from assistive technology.', 'Include meaningful alternative text only when a custom visual contributes unique information.', 'Do not rely on status color or iconography to communicate the outcome.', 'Use descriptive action labels such as “Clear filters” instead of “Click here”.', 'Move focus only when the surrounding workflow requires a newly important announcement.']} /></ComponentDocSection>
      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Write for the next decision: confirm the outcome, add only useful context, and label the best available action."><ContentGuidelines rules={[{ label: 'State the outcome', guidance: 'Use a direct title without blame or alarm.', example: 'No matching projects' }, { label: 'Explain the next step', guidance: 'Keep supporting text to one or two short sentences.', example: 'Try removing a filter.' }, { label: 'Use specific actions', guidance: 'Name the action and its object.', example: 'Create project' }, { label: 'Avoid dead ends', guidance: 'When no action is possible, explain when or how the state can change.', example: 'Ask a workspace admin for access.' }]} /></ComponentDocSection>
      <ComponentDocSection id="examples" title="Examples" description="Status and size can create a compact zero-result message without changing the action model."><div className="component-doc-stack"><ComponentPreview title="Search with no results" description="A compact search state points directly to filter recovery." layout="start"><EmptyState
            status="search"
            size="sm"
            title="No matching projects"
            description="Try removing a filter or using a broader search term."
            primaryAction={<Button variant="text">Clear filters</Button>}
          /></ComponentPreview><CodeBlock filename="SearchEmptyState.tsx" code={STATUS_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="props-api" title="Props / API" description="EmptyState extends section attributes and composes design-system actions without owning their behavior."><PropsTable props={EMPTY_STATE_PROPS} /></ComponentDocSection>
      <ComponentDocSection id="related-components" title="Related components" description="Choose adjacent feedback patterns based on whether content is absent, loading, transient, or requires confirmation."><RelatedComponents items={[{ name: 'Spinner', href: '/components/spinner', description: 'Communicate short asynchronous loading', icon: 'ti-loader' }, { name: 'Toast', href: '/components/toast', description: 'Report transient operation feedback', icon: 'ti-bell' }, { name: 'Dialog', href: '/components/dialog', description: 'Request focused confirmation or input', icon: 'ti-layout-sidebar-right' }, { name: 'Button', href: '/components/button', description: 'Provide recovery and creation actions', icon: 'ti-square-rounded' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
