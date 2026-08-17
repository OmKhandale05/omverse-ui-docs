'use client'

import { useState } from 'react'

import { QueryBuilder, type QueryBuilderConjunction, type QueryBuilderField, type QueryBuilderRule } from 'omverse-ui'
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

const QUERY_BUILDER_PROPS = [
  { name: 'fields', type: 'readonly QueryBuilderField[]', default: 'required', description: 'Governed field definitions.' },
  { name: 'value', type: 'readonly QueryBuilderRule[]', default: 'undefined', description: 'Controlled rules.' },
  { name: 'defaultValue', type: 'readonly QueryBuilderRule[]', default: '[]', description: 'Initial rules.' },
  { name: 'onValueChange', type: '(rules) => void', default: 'undefined', description: 'Runs when rules change.' },
  { name: 'conjunction', type: "'all' | 'any'", default: 'undefined', description: 'Controlled matching logic.' },
  { name: 'defaultConjunction', type: "'all' | 'any'", default: "'all'", description: 'Initial matching logic.' },
  { name: 'onConjunctionChange', type: '(value) => void', default: 'undefined', description: 'Runs when matching changes.' },
  { name: 'title', type: 'ReactNode', default: "'Advanced filters'", description: 'Visible heading.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading.' },
  { name: 'variant', type: "'outlined' | 'filled' | 'raised'", default: "'outlined'", description: 'Surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control density.' },
] as const

const QUERY_FIELDS: readonly QueryBuilderField[] = [
  {
    value: 'status',
    label: 'Status',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'is not', label: 'is not' },
      { value: 'contains', label: 'contains' },
    ],
    options: [
      { value: 'active', label: 'Active' },
      { value: 'blocked', label: 'Blocked' },
      { value: 'archived', label: 'Archived' },
    ],
  },
  {
    value: 'owner',
    label: 'Owner',
    operators: [
      { value: 'equals', label: 'equals' },
      { value: 'contains', label: 'contains' },
    ],
    placeholder: 'Project owner',
  },
  {
    value: 'risk',
    label: 'Risk level',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'is not', label: 'is not' },
    ],
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
]

const BASIC_CODE = `import { QueryBuilder, type QueryBuilderField, type QueryBuilderRule } from 'omverse-ui'

const fields: readonly QueryBuilderField[] = ${JSON.stringify(QUERY_FIELDS, null, 2)}
const rules: readonly QueryBuilderRule[] = ${JSON.stringify(
  [
    { id: 'status-1', field: 'status', operator: 'is', value: 'active' },
    { id: 'risk-1', field: 'risk', operator: 'is', value: 'high' },
  ],
  null,
  2,
)}

<QueryBuilder fields={fields} value={rules} onValueChange={(next) => console.log(next)} />`

function QueryBuilderPreview() {
  const [rules, setRules] = useState<readonly QueryBuilderRule[]>([
    { id: 'status-1', field: 'status', operator: 'is', value: 'active' },
    { id: 'risk-1', field: 'risk', operator: 'is', value: 'high' },
  ])

  const [conjunction, setConjunction] = useState<QueryBuilderConjunction>('all')

  return (
    <div className="query-builder-preview-stack">
      <QueryBuilder
        title="Advanced filters"
        fields={QUERY_FIELDS}
        value={rules}
        conjunction={conjunction}
        onValueChange={(next) => setRules(next)}
        onConjunctionChange={(next) => setConjunction(next)}
      />
    </div>
  )
}

export default function QueryBuilderPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'QueryBuilder']}
        title="AdvancedFilter / QueryBuilder"
        description="QueryBuilder creates explicit, reviewable field-operator-value filter expressions."
        tags={['Typed fields', 'Governed operators', 'All / any', 'Controlled rules']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use QueryBuilder for compound filters that cannot be expressed clearly by a compact filter bar."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Portfolio conditions">
              <QueryBuilderPreview />
            </ComponentPreview>
            <CodeBlock filename="PortfolioQuery.tsx" code={BASIC_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="Matching logic coordinates repeatable field, operator, value, and removal controls."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual query-anatomy">
                <header><b>Advanced filters</b><span>All | Any</span></header>
                <section><i>Status</i><i>is</i><i>Active</i><button>×</button></section>
                <button>＋ Add condition</button>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -28, left: 36 }}>1</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -28, right: 28 }}>2</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 58, left: -26 }}>3</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -28, left: 98 }}>4</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 58, right: -20 }}>5</span>
              </div>
            }
            items={[
              { number: 1, name: 'Heading', description: 'Names the expression.' },
              { number: 2, name: 'Conjunction', description: 'Matches all or any rules.' },
              { number: 3, name: 'Condition', description: 'Combines field, operator, and value.' },
              { number: 4, name: 'Add control', description: 'Appends a rule.' },
              { number: 5, name: 'Remove control', description: 'Deletes one rule.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <GuidanceList
            tone="do"
            items={[
              { title: 'Build compound queries', description: 'Combine explicit conditions.' },
              { title: 'Govern expressions', description: 'Limit operators by field.' },
              { title: 'Review logic', description: 'Keep the full expression visible.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <GuidanceList
            tone="dont"
            items={[
              { title: 'Do not filter by one value', description: 'Use Select.' },
              { title: 'Do not hide common filters', description: 'Use FilterBar.' },
              { title: 'Do not expose raw syntax', description: 'Reserve code for experts.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <BehaviorGrid
            items={[
              { icon: 'ti-border-all', title: 'Outlined', description: 'Bounded surface.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal surface.' },
              { icon: 'ti-shadow', title: 'Raised', description: 'Standalone composer.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="states"
          title="States"
          description="QueryBuilder reflects query composition state while users build rules."
        >
          <StateMatrix
            rows={[
              { state: 'Empty', trigger: 'No rules', visual: 'Add control', interaction: 'Add condition' },
              { state: 'Editing', trigger: 'Rules change', visual: 'Updated controls', interaction: 'Compose' },
              { state: 'Incomplete', trigger: 'Value missing', visual: 'Validation', interaction: 'Complete rule' },
              { state: 'Loading', trigger: 'Fields resolving', visual: 'Status', interaction: 'Disabled' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <BehaviorGrid
            items={[
              { icon: 'ti-list', title: 'Rules', description: 'Stable identity.' },
              { icon: 'ti-binary-tree', title: 'Matching', description: 'All is AND; any is OR.' },
              { icon: 'ti-refresh', title: 'Field changes', description: 'Reset dependent values.' },
              { icon: 'ti-lock', title: 'Governance', description: 'Definitions constrain input.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <div className="component-doc-stack">
            <KeyboardTable
              rows={[
                { keys: ['Tab'], action: 'Moves through controls.' },
                { keys: ['Arrow keys'], action: 'Changes choices.' },
                { keys: ['Enter', 'Space'], action: 'Adds or removes rules.' },
              ]}
            />
            <AccessibilityChecklist items={[
              'Label every condition control.',
              'State matching logic in text.',
              'Connect validation to values.',
              'Name removal actions by condition.',
            ]} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Use fields and operators that are immediately understandable by your policy owners."
        >
          <ContentGuidelines
            rules={[
              { label: 'Use domain fields', guidance: 'Match product labels.', example: 'Renewal date' },
              { label: 'Write operators as phrases', guidance: 'Prefer readable language.', example: 'is before' },
              { label: 'Format values', guidance: 'Respect data type.', example: '₹50,000' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API">
          <PropsTable props={QUERY_BUILDER_PROPS} />
        </ComponentDocSection>

        <ComponentDocSection
          id="related-components"
          title="Related components"
          description="Use these patterns for related filter and persistence workflows."
        >
          <RelatedComponents
            items={[
              { name: 'FilterBar', href: '/components/filter-bar', description: 'Apply common filters', icon: 'ti-filter' },
              { name: 'SavedViews', href: '/components/saved-views', description: 'Persist configurations', icon: 'ti-bookmark' },
              { name: 'DataTable', href: '/components/data-table', description: 'Display matches', icon: 'ti-table' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
