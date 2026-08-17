'use client'

import { useState } from 'react'
import { PermissionMatrix } from 'omverse-ui'
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

const CAPABILITIES = [
  { id: 'read', label: 'Read' },
  { id: 'edit', label: 'Edit' },
  { id: 'delete', label: 'Delete' },
]

const RESOURCES = [
  {
    id: 'projects',
    label: 'Projects',
    description: 'Portfolio records',
    inherited: ['read'],
  },
  {
    id: 'billing',
    label: 'Billing',
    description: 'Invoices and plans',
    unavailable: ['delete'],
  },
]

const PROPS = [
  { name: 'permissions', type: 'readonly PermissionMatrixPermission[]', default: 'required', description: 'Capability columns.' },
  { name: 'resources', type: 'readonly PermissionMatrixResource[]', default: 'required', description: 'Resource rows and constraints.' },
  { name: 'value', type: 'PermissionMatrixValue', default: 'undefined', description: 'Controlled direct grants.' },
  { name: 'defaultValue', type: 'PermissionMatrixValue', default: '{}', description: 'Initial direct grants.' },
  { name: 'onValueChange', type: '(value) => void', default: 'undefined', description: 'Runs after grant changes.' },
  { name: 'caption', type: 'ReactNode', default: "'Permissions by resource'", description: 'Accessible table caption.' },
  { name: 'readOnly', type: 'boolean', default: 'false', description: 'Prevents grant changes.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading status.' },
  { name: 'showBulkControls', type: 'boolean', default: 'true', description: 'Shows row and column toggles.' },
  { name: 'variant', type: "'outlined' | 'filled' | 'raised'", default: "'outlined'", description: 'Surface treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Cell density.' },
]

const CODE = `import { PermissionMatrix } from 'omverse-ui'

const permissions = [
  { id: 'read', label: 'Read' },
  { id: 'edit', label: 'Edit' },
]

const resources = [
  { id: 'projects', label: 'Projects' },
  { id: 'billing', label: 'Billing', unavailable: ['edit'] },
]

<PermissionMatrix permissions={permissions} resources={resources} defaultValue={{ projects: ['read'] }} />`

function Demo() {
  const [grants, setGrants] = useState({
    projects: ['read'],
    billing: ['read'],
  })

  return (
    <PermissionMatrix
      permissions={CAPABILITIES}
      resources={RESOURCES}
      value={grants}
      onValueChange={setGrants}
    />
  )
}

export default function Page() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'PermissionMatrix']}
        title="PermissionMatrix"
        description="PermissionMatrix reviews and edits grants across resources and capabilities."
        tags={['Semantic table', 'Inherited grants', 'Unavailable cells', 'Bulk controls', 'Read-only']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use PermissionMatrix when administrators must compare and edit the same capabilities across multiple governed resources."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Workspace role">
              <Demo />
            </ComponentPreview>
            <CodeBlock filename="RolePermissions.tsx" code={CODE} />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="A semantic matrix relates resource rows to capability columns and distinguishes direct, inherited, and unavailable cells."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual permission-anatomy">
                <header>
                  <b>Resource</b>
                  <b>View</b>
                  <b>Edit</b>
                  <b>Delete</b>
                </header>
                <section>
                  <span>Projects</span>
                  <i>✓</i>
                  <i>□</i>
                  <i>□</i>
                </section>
                <section>
                  <span>Billing</span>
                  <i>✓</i>
                  <i>□</i>
                  <i>—</i>
                </section>
              </div>
            }
            items={[
              { number: 1, name: 'Resource header', description: 'Names the row dimension.' },
              { number: 2, name: 'Capability headers', description: 'Names permission columns.' },
              { number: 3, name: 'Resource identity', description: 'Labels each governed object.' },
              { number: 4, name: 'Grant cell', description: 'Shows and changes access.' },
              { number: 5, name: 'Unavailable cell', description: 'Explains an invalid pairing.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="PermissionMatrix is best when role and policy decisions need direct side-by-side comparison."
        >
          <GuidanceList
            tone="do"
            items={[
              { title: 'Configure roles', description: 'Compare capabilities across resources.' },
              { title: 'Review inherited access', description: 'Keep policy grants visible.' },
              { title: 'Identify exceptions', description: 'Reveal direct and unavailable combinations.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="Avoid this component for single booleans or conversational history."
        >
          <GuidanceList
            tone="dont"
            items={[
              { title: 'Do not use for one-off permission', description: 'Use Checkbox for isolated toggles.' },
              { title: 'Do not hide policy origin', description: 'Keep inherited state visible.' },
              { title: 'Do not replace event history', description: 'Use AuditLog for evidence timelines.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="variants" title="Variants">
          <BehaviorGrid
            items={[
              { icon: 'ti-border-all', title: 'Outlined', description: 'Default bordered grid.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal policy surface.' },
              { icon: 'ti-shadow', title: 'Raised', description: 'Independent floating block.' },
              { icon: 'ti-arrows-minimize', title: 'Density', description: 'Three row heights.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="states" title="States" description="Track direct grants, inherited access, unavailable pairs, and read-only mode states.">
          <StateMatrix
            rows={[
              { state: 'Granted', trigger: 'Direct grant', visual: 'Checked', interaction: 'Can revoke' },
              { state: 'Not granted', trigger: 'No grant', visual: 'Unchecked', interaction: 'Can grant' },
              { state: 'Inherited', trigger: 'Parent policy', visual: 'Checked and labeled', interaction: 'Cannot edit here' },
              { state: 'Unavailable', trigger: 'Invalid pairing', visual: 'Dash', interaction: 'No control' },
              { state: 'Read-only', trigger: 'Review mode', visual: 'Resolved grants', interaction: 'No changes' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="behavior" title="Behavior">
          <BehaviorGrid
            items={[
              { icon: 'ti-check', title: 'Direct grants', description: 'Controlled value stores editable grants.' },
              { icon: 'ti-hierarchy', title: 'Inheritance', description: 'Resource metadata resolves policy.' },
              { icon: 'ti-row-insert-bottom', title: 'Bulk rows', description: 'Toggle all editable permissions in one resource.' },
              { icon: 'ti-column-insert-right', title: 'Bulk columns', description: 'Toggle one permission across resources.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection id="accessibility" title="Accessibility">
          <div className="component-doc-stack">
            <KeyboardTable
              rows={[
                { keys: ['Tab'], action: 'Moves through editable grants and bulk controls.' },
                { keys: ['Space'], action: 'Toggles the focused checkbox.' },
                { keys: ['Enter'], action: 'Activates bulk operations.' },
              ]}
            />
            <AccessibilityChecklist
              items={[
                'Use table, caption, row headers, and column headers.',
                'Name every checkbox by capability and resource.',
                'State inherited status in text.',
                'Represent unavailable pairs without hidden controls.',
              ]}
            />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Use concise governance language that maps to policy and product structure."
        >
          <ContentGuidelines
            rules={[
              { label: 'Use capability verbs', guidance: 'Name the allowed operation.', example: 'Read, Edit, Delete' },
              { label: 'Use resource nouns', guidance: 'Use product objects consistently.', example: 'Projects, Billing' },
              { label: 'Name policy origin', guidance: 'Explain inherited grants.', example: 'Inherited from Workspace admin' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Use inherited grants to show which permissions are inherited versus directly assigned."
        >
          <ComponentPreview title="Read-only inherited grant">
            <div className="permission-example">☑ View projects <small>Inherited from Workspace admin</small></div>
          </ComponentPreview>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API" description="PermissionMatrix extends div attributes.">
          <PropsTable props={PROPS} />
        </ComponentDocSection>
        <ComponentDocSection id="related-components" title="Related components">
          <RelatedComponents
            items={[
              { name: 'Checkbox', href: '/components/checkbox', description: 'Represents a direct grant', icon: 'ti-checkbox' },
              { name: 'DataTable', href: '/components/data-table', description: 'Displays general tabular data', icon: 'ti-table' },
              { name: 'AuditLog', href: '/components/audit-log', description: 'Records policy changes', icon: 'ti-history' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
