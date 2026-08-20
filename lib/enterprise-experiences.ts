export type EnterpriseCategory = 'patterns' | 'floorplans' | 'templates'

interface AnatomyItem {
  number: number
  name: string
  description: string
  required?: boolean
}

interface GuidanceItem {
  title: string
  description: string
}

interface VariantItem {
  icon: string
  title: string
  description: string
}

interface StateItem {
  state: string
  trigger: string
  visual: string
  interaction: string
}

interface BehaviorItem {
  icon: string
  title: string
  description: string
}

interface KeyboardRow {
  keys: string[]
  action: string
}

interface RuleItem {
  label: string
  guidance: string
  example: string
}

interface ExampleItem {
  heading: string
  points: string[]
  code?: string
  filename?: string
  language?: string
}

export interface EnterpriseProp {
  name: string
  type: string
  default: string
  description: string
}

export interface EnterpriseRelated {
  name: string
  href: string
  description: string
  icon: string
}

export interface EnterpriseResource {
  slug: string
  title: string
  summary: string
  icon: string
  tags: string[]
  overview: string[]
  anatomy: AnatomyItem[]
  whenToUse: GuidanceItem[]
  whenNotToUse: GuidanceItem[]
  variants: VariantItem[]
  states: StateItem[]
  behavior: BehaviorItem[]
  keyboard: KeyboardRow[]
  accessibilityChecklist: string[]
  contentGuidelines: RuleItem[]
  examples: ExampleItem[]
  props: EnterpriseProp[]
  related: EnterpriseRelated[]
}

export interface EnterpriseCategoryConfig {
  label: string
  subtitle: string
  description: string
  categoryPath: EnterpriseCategory
  items: EnterpriseResource[]
}

export const ENTERPRISE_EXPERIENCE_CATALOG: Record<EnterpriseCategory, EnterpriseCategoryConfig> = {
  patterns: {
    label: 'Patterns',
    subtitle: 'Reusable operational patterns for enterprise teams.',
    description:
      'Move repetitive interaction logic into shared patterns so teams ship new flows with less variance and fewer edge-case bugs.',
    categoryPath: 'patterns',
    items: [
      {
        slug: 'filtering-records',
        title: 'Filtering records',
        summary:
          'Persisted filter controls that help users narrow large datasets without changing where they are or losing context.',
        icon: 'ti-filter',
        tags: ['Data', 'Search', 'Query state'],
        overview: [
          'Filtering records keeps focus on what matters now while preserving a full audit trail of active criteria.',
          'A strong filtering pattern reduces cognitive load by making query intent explicit and reversible.',
        ],
        anatomy: [
          { number: 1, name: 'Filter source', description: 'Defines searchable fields, available operators, and domain rules.' },
          { number: 2, name: 'Condition builder', description: 'Collects field, operator, and value as one explicit clause.' },
          { number: 3, name: 'Active chip stack', description: 'Displays current constraints with one-click clear actions.' },
          { number: 4, name: 'Result summary', description: 'Shows matching count and explains why an empty result occurred.' },
          { number: 5, name: 'Reset command', description: 'Returns users to a known base state and removes uncertainty.' },
        ],
        whenToUse: [
          { title: 'Large operational datasets', description: 'Use for tables, lists, and reports with frequent query pivots.' },
          { title: 'Compliance-heavy screens', description: 'Apply when filters must be auditable and repeatable.' },
          { title: 'Multi-role systems', description: 'Use for domain objects that can be sliced by organization, team, period, or status.' },
        ],
        whenNotToUse: [
          { title: 'Very small collections', description: 'Use a plain list or card stack when count is always tiny.' },
          { title: 'Purely navigational sorting', description: 'Use tabs or segmented controls for fixed views.' },
          { title: 'One-off toggles', description: 'Avoid full filtering pattern for single boolean controls.' },
        ],
        variants: [
          { icon: 'ti-layout-list', title: 'Inline bar', description: 'Compact controls next to the collection header for fast query edits.' },
          { icon: 'ti-layout-distribute-horizontal', title: 'Side panel', description: 'Deep filter configuration without crowding a data-dense workspace.' },
          { icon: 'ti-adjustments', title: 'Smart panel', description: 'Progressive filters with recency-based shortcuts and presets.' },
        ],
        states: [
          { state: 'Default', trigger: 'No criteria selected', visual: 'Empty active stack and neutral count', interaction: 'Users can add the first condition.' },
          { state: 'Filtering', trigger: 'Typing or changing criteria', visual: 'Live result counter or in-progress indicator', interaction: 'Input updates are reflected with debounce safeguards.' },
          { state: 'No results', trigger: 'All records filtered out', visual: 'Zero-result UI with alternate actions', interaction: 'People can reset and receive guidance.' },
          { state: 'Saved query', trigger: 'User saves a configuration', visual: 'Named query indicator and quick re-open button', interaction: 'Future sessions can restore view quickly.' },
        ],
        behavior: [
          { icon: 'ti-search', title: 'Incremental querying', description: 'Debounce expensive remote calls while preserving immediate local feedback.' },
          { icon: 'ti-refresh', title: 'Deterministic reset', description: 'Clear applies defaults defined by role and permissions.' },
          { icon: 'ti-shield-check', title: 'Permission-aware fields', description: 'Render only criteria available to the current access profile.' },
        ],
        keyboard: [
          { keys: ['Alt', 'F'], action: 'Move focus to the first filter control.' },
          { keys: ['Tab'], action: 'Progress through all filter controls in a consistent sequence.' },
          { keys: ['Esc'], action: 'Close advanced filter overlays without applying changes.' },
        ],
        accessibilityChecklist: [
          'Announce active criteria counts when filters change.',
          'Ensure each filter input has a visible label and error messaging.',
          'Avoid color-only communication in status chips.',
        ],
        contentGuidelines: [
          { label: 'Field names', guidance: 'Use the same terms as your domain model.', example: 'Workspace status' },
          { label: 'Operator clarity', guidance: 'Prefer natural language operators and visible scope.', example: 'Status is Active' },
          { label: 'Reset affordance', guidance: 'Place one clear global clear action near filters.', example: 'Clear all filters' },
        ],
        examples: [
          {
            heading: 'Compose the pattern',
            points: [
              'Keep query state in the application so the URL, saved views, and data request can share it.',
              'Let FilterBar announce the result count and DataTable preserve semantic table behavior.',
              'Use the same reset function for active chips, empty-state recovery, and saved-view changes.',
            ],
            filename: 'WorkItemsView.tsx',
            language: 'tsx',
            code: `import { DataTable, FilterBar, Select } from 'omverse-ui'

export function WorkItemsView() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const results = filterWorkItems(workItems, { query, status })

  return (
    <>
      <FilterBar
        searchValue={query}
        onSearchChange={setQuery}
        searchLabel="Search work items"
        filters={[{
          id: 'status',
          label: 'Status',
          activeLabel: status || undefined,
          onClear: () => setStatus(''),
          control: <Select value={status} options={statusOptions} onChange={setStatus} />,
        }]}
        resultCount={results.length}
        onReset={() => { setQuery(''); setStatus('') }}
      />
      <DataTable columns={columns} data={results} getRowId={(row) => row.id}
        caption="Filtered work items" emptyState="No work items match these filters." />
    </>
  )
}`,
          },
          {
            heading: 'Persist a query contract',
            points: [
              'Store readable field, operator, and value clauses rather than component-specific state.',
              'Validate restored fields against the current user’s permissions before applying them.',
              'Version persisted query contracts when operators or domain fields change.',
            ],
            filename: 'saved-view.json',
            language: 'json',
            code: `{
  "filters": [
    { "field": "status", "operator": "equals", "value": "open" },
    { "field": "ownerTeam", "operator": "in", "value": ["sales", "customer-success"] }
  ],
  "pageSize": 25,
  "sort": { "field": "updatedAt", "order": "desc" }
}`,
          },
        ],
        props: [
          { name: 'initialFilter', type: 'FilterState', default: '() => undefined', description: 'Hydrates initial query model.' },
          { name: 'querySchema', type: 'FilterSchema', default: 'required', description: 'Controlled definition of fields and operators.' },
          { name: 'onChange', type: '(next: FilterState) => void', default: 'undefined', description: 'Called on each accepted filter mutation.' },
          { name: 'persistKey', type: 'string', default: 'undefined', description: 'Storage key for restoring user preference.' },
        ],
        related: [
          { name: 'FilterBar', href: '/components/filter-bar', description: 'Composable UI foundation for basic filtering.', icon: 'ti-filter' },
          { name: 'DataTable', href: '/components/data-table', description: 'Surface filtered records with stable selection behavior.', icon: 'ti-table' },
          { name: 'SavedViews', href: '/components/saved-views', description: 'Persist and restore query states.', icon: 'ti-bookmark' },
        ],
      },
      {
        slug: 'bulk-actions',
        title: 'Bulk actions',
        summary:
          'Selection-aware actions designed for high-volume operations with clear outcomes and reversible workflows.',
        icon: 'ti-list-check',
        tags: ['Workflow', 'Governance', 'Operations'],
        overview: [
          'Bulk actions should reduce repeated work while making mass changes transparent.',
          'A safe bulk layer communicates what will change before execution and supports recovery paths.',
        ],
        anatomy: [
          { number: 1, name: 'Selection model', description: 'Maintains which records are included in the current scope.' },
          { number: 2, name: 'Scope summary', description: 'States the selected count and collection boundary in plain language.' },
          { number: 3, name: 'Available actions', description: 'Shows safe, frequent operations allowed across the full selection.' },
          { number: 4, name: 'Overflow and review', description: 'Contains lower-frequency actions and routes high-risk changes to confirmation.' },
          { number: 5, name: 'Clear and result path', description: 'Leaves bulk mode predictably and reports complete or partial outcomes.' },
        ],
        whenToUse: [
          { title: 'Repetitive updates', description: 'When many records need the same operational adjustment.' },
          { title: 'Administrative moderation', description: 'For review queues and support interventions at scale.' },
          { title: 'Compliance corrections', description: 'For controlled batch updates with audit obligations.' },
        ],
        whenNotToUse: [
          { title: 'One-off edits', description: 'Use direct item actions for single-row operations.' },
          { title: 'Irreversible destructive actions', description: 'Avoid inline mass deletion without explicit review.' },
          { title: 'Unclear scope', description: 'Do not expose bulk controls before selection boundaries are clear.' },
        ],
        variants: [
          { icon: 'ti-list', title: 'Toolbar batch', description: 'Floating toolbar with contextual action set.' },
          { icon: 'ti-checklist', title: 'Modal batch', description: 'Review all pending items before execution.' },
          { icon: 'ti-briefcase', title: 'Wizard batch', description: 'Guided multi-step bulk update in regulated contexts.' },
        ],
        states: [
          { state: 'Idle', trigger: 'No rows selected', visual: 'Bulk control hidden or disabled', interaction: 'Prompt to select rows first.' },
          { state: 'Ready', trigger: 'Selection exists', visual: 'Count label and action menu appears', interaction: 'Bulk action candidates become available by permission.' },
          { state: 'Running', trigger: 'User confirms execution', visual: 'In-progress progress and disabled controls', interaction: 'Prevent duplicate submissions and partial edits.' },
          { state: 'Mixed result', trigger: 'Partial success', visual: 'Success and error counts', interaction: 'Allow retries for failed records only.' },
        ],
        behavior: [
          { icon: 'ti-shield-lock', title: 'Permission gates', description: 'Filter actions by action policy and row-level permissions.' },
          { icon: 'ti-refresh', title: 'Idempotent handlers', description: 'Repeated submit should not create duplicate updates.' },
          { icon: 'ti-list-check', title: 'Undo surface', description: 'Offer fallback action whenever possible.' },
        ],
        keyboard: [
          { keys: ['Ctrl/Cmd', 'A'], action: 'Select all currently matched rows when support policy allows.' },
          { keys: ['Shift'], action: 'Enable range selection inside list views for fast setup.' },
          { keys: ['Esc'], action: 'Cancel bulk mode and clear selection.' },
        ],
        accessibilityChecklist: [
          'Expose selection count in plain language, not color only.',
          'Disable actions by default when selection includes non-actionable records.',
          'Announce bulk operation starts and completion in status messaging.',
        ],
        contentGuidelines: [
          { label: 'Action verbs', guidance: 'Use verbs that describe end outcome.', example: 'Archive selected tickets' },
          { label: 'Scope transparency', guidance: 'Call out how many records will change.', example: 'Applying to 12 projects' },
          { label: 'Risk framing', guidance: 'Label irreversible actions with warning text.', example: 'This will close all selected cases' },
        ],
        examples: [
          {
            heading: 'Connect selection to actions',
            points: [
              'Keep selected row identifiers in controlled application state.',
              'Supply only actions permitted across the entire current selection.',
              'Clear selection after a successful operation and show a durable result summary.',
            ],
            filename: 'BulkWorkItems.tsx',
            language: 'tsx',
            code: `const [selectedIds, setSelectedIds] = useState<readonly Key[]>([])

<DataTable
  data={workItems}
  columns={columns}
  getRowId={(row) => row.id}
  caption="Work items"
  selectable
  selectedRowIds={selectedIds}
  onSelectionChange={setSelectedIds}
/>

<BulkActionBar
  selectedCount={selectedIds.length}
  totalCount={workItems.length}
  onClearSelection={() => setSelectedIds([])}
  actions={<Button onClick={() => assign(selectedIds)}>Assign reviewer</Button>}
/>`,
          },
        ],
        props: [
          { name: 'selectedIds', type: 'readonly string[]', default: '[]', description: 'Current selection used for operation payload.' },
          { name: 'actions', type: 'BulkAction[]', default: '[]', description: 'Configured actions filtered by policy and context.' },
          { name: 'onExecute', type: '(actionId: string, ids: string[]) => Promise<BulkResult>', default: 'required', description: 'Runs each operation and returns status.' },
          { name: 'showUndo', type: 'boolean', default: 'true', description: 'Enable rollback-oriented feedback when possible.' },
        ],
        related: [
          { name: 'BulkActionBar', href: '/components/bulk-action-bar', description: 'Selection-aware action scope and keyboard behavior.', icon: 'ti-list-check' },
          { name: 'Table', href: '/components/data-table', description: 'Row selection and summary patterns.', icon: 'ti-table' },
          { name: 'SidePanel', href: '/components/side-panel', description: 'Review and confirm batch details.', icon: 'ti-layout-sidebar-right' },
        ],
      },
      {
        slug: 'approval-flow',
        title: 'Approval flow',
        summary:
          'Structured multi-stage approval with explicit handoffs, state transitions, and traceability.',
        icon: 'ti-forms',
        tags: ['Governance', 'Workflow', 'Audit'],
        overview: [
          'Approval flows require visible checkpoints: who approved, what changed, and why.',
          'A strong flow balances speed with escalation, exception handling, and traceability.',
        ],
        anatomy: [
          { number: 1, name: 'Request card', description: 'Summarizes decision context and proposed changes.' },
          { number: 2, name: 'Decision lane', description: 'Tracks reviewer state and current owner.' },
          { number: 3, name: 'Policy check rail', description: 'Shows required validations and blockers before action.' },
          { number: 4, name: 'Decision actions', description: 'Approve, reject, or return with clear result states.' },
          { number: 5, name: 'Timeline', description: 'Immutable activity log with actor and rationale.' },
        ],
        whenToUse: [
          { title: 'Governed changes', description: 'Use for anything that affects policy, budget, or risk.' },
          { title: 'Sequential approvals', description: 'Use when each request has multiple approvers.' },
          { title: 'Cross-team handoff', description: 'Use for handoffs that need owner and comment metadata.' },
        ],
        whenNotToUse: [
          { title: 'Simple acknowledgements', description: 'Use lightweight notifications instead of approval states.' },
          { title: 'Anonymous collaboration', description: 'Avoid when actions are fully open and irreversible.' },
          { title: 'Single-click operations', description: 'Keep flows minimal when no compliance state exists.' },
        ],
        variants: [
          { icon: 'ti-arrow-right', title: 'Linear flow', description: 'Single reviewer path with explicit pass/fail checkpoints.' },
          { icon: 'ti-arrows-split', title: 'Parallel review', description: 'Concurrent reviewers with independent outcomes.' },
          { icon: 'ti-repeat', title: 'Escalation flow', description: 'Supports timeout and re-route to senior owner.' },
        ],
        states: [
          { state: 'Draft', trigger: 'Submitted not yet routed', visual: 'Editable request summary', interaction: 'Owner can refine and resubmit.' },
          { state: 'Pending', trigger: 'Awaiting reviewer input', visual: 'Pending badge and review queue index', interaction: 'Reviewer receives contextual actions.' },
          { state: 'In review', trigger: 'Review started', visual: 'Action lock and active reviewer details', interaction: 'System enforces one decision branch at a time.' },
          { state: 'Finalized', trigger: 'Decision made', visual: 'Immutable decision summary', interaction: 'No additional edits unless re-opened through policy.' },
        ],
        behavior: [
          { icon: 'ti-bell', title: 'Alerting', description: 'Notify next responsible actor and show SLA hints.' },
          { icon: 'ti-history', title: 'Immutable timeline', description: 'Every decision writes a timestamped audit record.' },
          { icon: 'ti-message-2', title: 'Comment threading', description: 'Supports inline rationale and follow-up questions.' },
        ],
        keyboard: [
          { keys: ['K'], action: 'Focus review comment input in some command-focused designs.' },
          { keys: ['Ctrl/Cmd', 'Enter'], action: 'Submit decision with required comment when required.' },
          { keys: ['Esc'], action: 'Close decision sheet without saving comments.' },
        ],
        accessibilityChecklist: [
          'Expose decision outcome and required reason text programmatically in heading and status.',
          'Pair icon-only decision states with visible text labels.',
          'Use live region to announce stage transitions.',
        ],
        contentGuidelines: [
          { label: 'Decision clarity', guidance: 'Describe the action outcome in one sentence.', example: 'Approve payout for invoice #A-492' },
          { label: 'Rationale required', guidance: 'Ask for reason on exceptions and critical approvals.', example: 'Exception: expedited deployment needed' },
          { label: 'Ownership', guidance: 'Show owner and next actor at each step.', example: 'Current reviewer: Priya (Finance Lead)' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Attach request metadata as read-only fields to prevent tampering.',
              'Log every transition to the audit stream before API commit.',
              'Show timeout warnings near the next required action.',
            ],
          },
        ],
        props: [
          { name: 'request', type: 'ApprovalRequest', default: 'required', description: 'Workflow data including lifecycle and actors.' },
          { name: 'decisionStates', type: 'DecisionStateConfig[]', default: 'required', description: 'Defines sequence and transitions.' },
          { name: 'onDecision', type: '(nextState: string, comment: string) => Promise<void>', default: 'required', description: 'Persist decision and rationale.' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Locks actions while still rendering timeline.' },
        ],
        related: [
          { name: 'NotificationCenter', href: '/components/notification-center', description: 'Keep approvers informed of pending actions.', icon: 'ti-bell' },
          { name: 'SidePanel', href: '/components/side-panel', description: 'Review context and decision controls in one surface.', icon: 'ti-layout-sidebar-right' },
          { name: 'CommandBar', href: '/components/command-bar', description: 'Global actions for routing and quick review assignment.', icon: 'ti-command' },
        ],
      },
      {
        slug: 'role-based-access',
        title: 'Role-based access',
        summary:
          'Role-aware patterns for safe self-service UIs that show only what a user is authorized to do.',
        icon: 'ti-lock-access',
        tags: ['Security', 'Authorization', 'UX'],
        overview: [
          'Role-based access reduces confusion by removing unactionable controls at the source.',
          'It also strengthens security posture by limiting accidental execution paths in complex applications.',
        ],
        anatomy: [
          { number: 1, name: 'Identity claim', description: 'Holds authenticated user roles and entitlements.' },
          { number: 2, name: 'Policy map', description: 'Matches routes and controls to allowed capabilities.' },
          { number: 3, name: 'Capability surface', description: 'Displays controls with permissions-aware states.' },
          { number: 4, name: 'Justification messaging', description: 'Explains why items are hidden or disabled.' },
          { number: 5, name: 'Fallback action', description: 'Escalation options for users needing elevated rights.' },
        ],
        whenToUse: [
          { title: 'Multi-tenant systems', description: 'Different customers or teams need different visibility.' },
          { title: 'Sensitive operations', description: 'Only authorized staff can execute critical actions.' },
          { title: 'Shared workspaces', description: 'Different roles collaborate in same surface with distinct boundaries.' },
        ],
        whenNotToUse: [
          { title: 'Public info screens', description: 'Do not overfit RBAC where all data is intentionally public.' },
          { title: 'Experimental demos', description: 'Use placeholder flags, not hard-coded role checks.' },
          { title: 'Tiny admin tools', description: 'Keep custom role checks simple for very small apps.' },
        ],
        variants: [
          { icon: 'ti-mask', title: 'Hide controls', description: 'Complete suppression of unavailable actions for reduced noise.' },
          { icon: 'ti-lock-off', title: 'Disable controls', description: 'Keep discoverability with explicit access hint.' },
          { icon: 'ti-key', title: 'Escalation', description: 'Action request path for temporary permission needs.' },
        ],
        states: [
          { state: 'Permitted', trigger: 'Role grants capability', visual: 'Active action control appears', interaction: 'Action can be executed.' },
          { state: 'Restricted', trigger: 'Capability blocked', visual: 'Disabled control with tooltip', interaction: 'User can request access.' },
          { state: 'Conditional', trigger: 'Context-based checks fail', visual: 'Warning label and alternative path', interaction: 'Support path routes to authorization owner.' },
          { state: 'Delegated', trigger: 'Temporary role override', visual: 'Status chip and expiry', interaction: 'Restricted actions become available briefly.' },
        ],
        behavior: [
          { icon: 'ti-key', title: 'Fail-safe defaults', description: 'Always deny by default, then grant explicitly.' },
          { icon: 'ti-refresh', title: 'Live policy refresh', description: 'Reflect role changes without full reload where possible.' },
          { icon: 'ti-shield-lock', title: 'Action rationale', description: 'Keep rationale visible for governance review.' },
        ],
        keyboard: [
          { keys: ['Tab'], action: 'Navigate only enabled controls in disabled-state contexts where possible.' },
          { keys: ['?'], action: 'Open permission help for inaccessible sections if available.' },
        ],
        accessibilityChecklist: [
          'Do not rely on color or cursor to signal permission state.',
          'Explain unavailable actions in text and provide next steps.',
          'Ensure error and warning messages are assertive enough for screen readers.',
        ],
        contentGuidelines: [
          { label: 'Permission language', guidance: 'Use "You can request access" instead of "No permission".', example: 'Request approval to access billing details.' },
          { label: 'Clear ownership', guidance: 'Show who can grant rights.', example: 'Request access from Workspace Admin.' },
          { label: 'Role naming', guidance: 'Use familiar role names already known by users.', example: 'Finance Admin' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Role checks happen at both UI and API layers.',
              'Display disabled state rather than hard removal for frequently requested features.',
              'Pair each restricted control with a request escalation action.',
            ],
          },
        ],
        props: [
          { name: 'sessionRoles', type: 'readonly string[]', default: '[]', description: 'Roles available in current authentication context.' },
          { name: 'permissions', type: 'readonly PermissionCheck[]', default: '[]', description: 'Granular capability matrix for resource-level checks.' },
          { name: 'onRequest', type: '(permission: string) => Promise<void>', default: 'undefined', description: 'Request path for elevated access.' },
          { name: 'onRetry', type: '() => void', default: 'undefined', description: 'Refresh policy after role change.' },
        ],
        related: [
          { name: 'PermissionMatrix', href: '/components/permission-matrix', description: 'Reference matrix interface for access decisions.', icon: 'ti-lock-access' },
          { name: 'Toast', href: '/components/toast', description: 'Surface permission escalation status.', icon: 'ti-check' },
          { name: 'Navbar', href: '/components/navbar', description: 'Role-aware navigation presentation.', icon: 'ti-layout-navbar' },
        ],
      },
      {
        slug: 'empty-no-results',
        title: 'Empty no-results',
        summary:
          'Intentional empty states that reduce abandonment and guide next action when queries return nothing.',
        icon: 'ti-folder-off',
        tags: ['UX', 'Recovery', 'Empty state'],
        overview: [
          'No results is often a context-setting moment, not an error.',
          'A helpful empty state explains why and gives a clear recovery path within the same goal.',
        ],
        anatomy: [
          { number: 1, name: 'State headline', description: 'Direct statement of current condition.' },
          { number: 2, name: 'Context reason', description: 'Why this empty state is expected or unexpected.' },
          { number: 3, name: 'Primary action', description: 'Most likely path to recover or create content.' },
          { number: 4, name: 'Secondary action', description: 'Alternative route such as clearing filters or changing scope.' },
          { number: 5, name: 'Helpful cues', description: 'Optional examples, tips, or onboarding links.' },
        ],
        whenToUse: [
          { title: 'Filtered data screens', description: 'Show after scoped criteria returns zero records.' },
          { title: 'Fresh onboarding', description: 'On first visit before data exists, suggest first setup action.' },
          { title: 'Permission filters', description: 'Explain expected emptiness due to role boundaries.' },
        ],
        whenNotToUse: [
          { title: 'Loading failures', description: 'Use error states when requests fail.' },
          { title: 'System outages', description: 'Use maintenance or outage messaging.' },
          { title: 'Critical blockers', description: 'Use explicit alerts if action is not possible.' },
        ],
        variants: [
          { icon: 'ti-bullseye', title: 'No data yet', description: 'Guided creation flow for first-time use.' },
          { icon: 'ti-filter-off', title: 'No match', description: 'Shows filter reset and alternative search suggestions.' },
          { icon: 'ti-shield-x', title: 'No access', description: 'Explains restrictions and request path.' },
        ],
        states: [
          { state: 'Neutral', trigger: 'Empty without user action', visual: 'Calm neutral message', interaction: 'Primary action remains prominent.' },
          { state: 'Filtered', trigger: 'Query constraints applied', visual: 'Reason + clear-filters action', interaction: 'One-click reset is available.' },
          { state: 'Permission-limited', trigger: 'No matching visible results', visual: 'Access indicator and support hint', interaction: 'User can request broader scope.' },
        ],
        behavior: [
          { icon: 'ti-refresh', title: 'Filter-aware copy', description: 'Copy and actions adjust automatically to active query state.' },
          { icon: 'ti-arrow-right', title: 'Primary next step', description: 'Keep one primary action and one optional recovery action.' },
          { icon: 'ti-help-circle', title: 'Context help', description: 'Offer docs or suggestions only when helpful.' },
        ],
        keyboard: [
          { keys: ['Tab'], action: 'Move to primary action from empty state summary quickly.' },
          { keys: ['Enter'], action: 'Activate the recommended recovery action.' },
          { keys: ['Ctrl/Cmd', 'Shift', 'R'], action: 'Optional quick reset when supported.' },
        ],
        accessibilityChecklist: [
          'Use semantic headings for state title and action area.',
          'Keep recovery actions in keyboard order immediately after state text.',
          'Announce state changes when filters are applied and cleared.',
        ],
        contentGuidelines: [
          { label: 'Tone', guidance: 'Use reassuring language; avoid blame.', example: 'No matches found for those filters yet.' },
          { label: 'Action clarity', guidance: 'Offer one clear next action.', example: 'Create first workspace' },
          { label: 'Context fit', guidance: 'Mention active constraints directly.', example: 'Try removing "Archived" filter.' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'After a narrow filter, keep the same page structure and add a one-line reason.',
              'If role restrictions caused emptiness, include a request-access path.',
              'Track empty-state events to identify missing onboarding moments.',
            ],
          },
        ],
        props: [
          { name: 'isEmpty', type: 'boolean', default: 'false', description: 'Explicit mode flag for empty render logic.' },
          { name: 'emptyType', type: "'fresh' | 'filtered' | 'restricted'", default: "'fresh'", description: 'Copies and actions adjust by empty category.' },
          { name: 'primaryAction', type: '() => void', default: 'undefined', description: 'Main recovery or creation callback.' },
          { name: 'onResetFilters', type: '() => void', default: 'undefined', description: 'Clears constraints in filtered mode.' },
        ],
        related: [
          { name: 'EmptyState', href: '/components/empty-state', description: 'Baseline empty state component behavior.', icon: 'ti-layout-align-middle' },
          { name: 'FilterBar', href: '/components/filter-bar', description: 'Drive empty states from filter interactions.', icon: 'ti-filter' },
          { name: 'SavedViews', href: '/components/saved-views', description: 'Offer saved query alternatives to reduce dead ends.', icon: 'ti-bookmark' },
        ],
      },
      {
        slug: 'object-detail-preview',
        title: 'Object detail preview',
        summary:
          'A lightweight object summary card that gives fast context before users open the full detail flow.',
        icon: 'ti-layout-details',
        tags: ['Navigation', 'Context', 'Efficiency'],
        overview: [
          'Preview reduces context switching by showing key metadata before committing to detail navigation.',
          'It helps teams move quickly through long lists with minimal cognitive overhead.',
        ],
        anatomy: [
          { number: 1, name: 'Header', description: 'Object title, code, and priority marker.' },
          { number: 2, name: 'Snapshot fields', description: 'Top three to five values people need to act on.' },
          { number: 3, name: 'Action affordances', description: 'Direct actions without opening full drawer.' },
          { number: 4, name: 'State chips', description: 'Concise status and owner metadata.' },
          { number: 5, name: 'Deep-link anchor', description: 'Primary route to full detail context.' },
        ],
        whenToUse: [
          { title: 'Long master lists', description: 'Use for quick context on each row or card.' },
          { title: 'Read-heavy workflows', description: 'Useful when users compare many objects rapidly.' },
          { title: 'Navigation heavy flows', description: 'When full page loads are expensive or unnecessary.' },
        ],
        whenNotToUse: [
          { title: 'Sensitive detail fields', description: 'Use gated view if data is confidential.' },
          { title: 'Deep form review', description: 'Open full object only when editing complex fields.' },
          { title: 'Low-data cards', description: 'Don’t use when summary cannot help.' },
        ],
        variants: [
          { icon: 'ti-eye', title: 'Popover preview', description: 'Contextual peek for hover/focus interactions.' },
          { icon: 'ti-layout-board', title: 'Inline row preview', description: 'Expandable row in table or list context.' },
          { icon: 'ti-file-unknown', title: 'Side rail preview', description: 'Persistent preview panel with synchronized selection.' },
        ],
        states: [
          { state: 'Collapsed', trigger: 'Browse mode', visual: 'Compact summary card', interaction: 'Open for details or select object.' },
          { state: 'Expanded', trigger: 'User requests detail', visual: 'More fields and action list', interaction: 'Keep route to full detail visible.' },
          { state: 'Unavailable', trigger: 'No read permission', visual: 'Restricted state indicator', interaction: 'Request access or show alternate object set.' },
        ],
        behavior: [
          { icon: 'ti-zoom-in', title: 'Progressive disclosure', description: 'Show only critical fields until expansion is needed.' },
          { icon: 'ti-arrow-right', title: 'Stable navigation', description: 'Preserve table selection when opening a preview.' },
          { icon: 'ti-bulb', title: 'Predictable refresh', description: 'Preview updates reflect latest object changes.' },
        ],
        keyboard: [
          { keys: ['Enter'], action: 'Open object detail from the active preview card.' },
          { keys: ['Space'], action: 'Toggle inline preview state.' },
          { keys: ['Esc'], action: 'Collapse preview and return to list context.' },
        ],
        accessibilityChecklist: [
          'Keep preview trigger clearly labeled as preview and not full selection.',
          'When expanded, manage focus to first new actionable control.',
          'Avoid overloading previews with too many fields that impact legibility.',
        ],
        contentGuidelines: [
          { label: 'Useful fields', guidance: 'Only include fields needed for immediate decisions.', example: 'Owner, state, last updated, critical metric' },
          { label: 'Time references', guidance: 'Use relative or absolute time consistently.', example: 'Updated 2 hours ago' },
          { label: 'Action wording', guidance: 'Use destination language for links.', example: 'Open object details' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Keep preview height stable across list rows for easier scanning.',
              'Lazy-load heavy metadata in expanded preview only.',
              'Include owner and status in all previews for handoff contexts.',
            ],
          },
        ],
        props: [
          { name: 'object', type: 'Record<string, unknown>', default: 'required', description: 'Core object data used to render the preview.' },
          { name: 'primaryFields', type: 'readonly string[]', default: "['id', 'name', 'status']", description: 'Default fields shown in compact mode.' },
          { name: 'previewMode', type: "'inline' | 'panel' | 'popover'", default: "'inline'", description: 'Determines how expanded details are surfaced.' },
          { name: 'onOpen', type: '(id: string) => void', default: 'required', description: 'Navigate to full object detail.' },
        ],
        related: [
          { name: 'SidePanel', href: '/components/side-panel', description: 'Useful host for inline preview patterns.', icon: 'ti-layout-sidebar-right' },
          { name: 'Dialog', href: '/components/dialog', description: 'Escalate previews into full inspection mode.', icon: 'ti-layout-sidebar-right' },
          { name: 'Card', href: '/components/card', description: 'Surface object summary in consistent card patterns.', icon: 'ti-layout-cards' },
        ],
      },
      {
        slug: 'activity-audit-history',
        title: 'Activity audit history',
        summary:
          'Chronological, filterable logs that let teams understand who changed what and when.',
        icon: 'ti-history',
        tags: ['Audit', 'Compliance', 'Traceability'],
        overview: [
          'Good audit histories make investigations faster by surfacing meaningful context without hunting through unrelated records.',
          'They should be searchable, understandable, and immutable once written.',
        ],
        anatomy: [
          { number: 1, name: 'Actor timeline', description: 'Shows who initiated each event.' },
          { number: 2, name: 'Action descriptor', description: 'Clear action label and object impacted.' },
          { number: 3, name: 'Timestamp', description: 'Sortable and searchable event time information.' },
          { number: 4, name: 'Filters', description: 'Narrow by actor, action type, time window, and severity.' },
          { number: 5, name: 'Export hooks', description: 'Optional attachment for compliance evidence.' },
        ],
        whenToUse: [
          { title: 'High-trust operations', description: 'Use when every action may require review.' },
          { title: 'Customer support', description: 'Use for post-incident traceability.' },
          { title: 'Configuration management', description: 'Use for permission or policy edits.' },
        ],
        whenNotToUse: [
          { title: 'Real-time analytics', description: 'Use dedicated event streams where full event semantics differ.' },
          { title: 'Simple changelog', description: 'Do not overload with audit requirements when lightweight history suffices.' },
          { title: 'No retention policy', description: 'Avoid audit UI where retention policy is absent.' },
        ],
        variants: [
          { icon: 'ti-list', title: 'Linear log', description: 'Single stream with search and sort controls.' },
          { icon: 'ti-calendar-time', title: 'Windowed audit', description: 'Date-window constrained view with preconfigured buckets.' },
          { icon: 'ti-download', title: 'Exporter', description: 'Governed export for review packets and case files.' },
        ],
        states: [
          { state: 'Streaming', trigger: 'New events arriving', visual: 'Top-updates appear by most recent', interaction: 'User can pause if desired.' },
          { state: 'Filtering', trigger: 'Log query applied', visual: 'Filtered results count and noise reduction', interaction: 'Filters preserve current position for context.' },
          { state: 'Exported', trigger: 'Evidence requested', visual: 'Generated artifact and status', interaction: 'User can copy or download artifact.' },
        ],
        behavior: [
          { icon: 'ti-filter', title: 'Contextual filters', description: 'Filter by actor, event type, and severity in one panel.' },
          { icon: 'ti-search', title: 'Searchable payload', description: 'Full-text hints for common investigation queries.' },
          { icon: 'ti-lock', title: 'Tamper evidence', description: 'Immutable display from source event IDs.' },
        ],
        keyboard: [
          { keys: ['/'], action: 'Focus the audit search field.' },
          { keys: ['Tab'], action: 'Advance through filters and list content in sequence.' },
          { keys: ['Ctrl/Cmd', 'F'], action: 'Open quick search within visible entries.' },
        ],
        accessibilityChecklist: [
          'Describe event status with text and symbols.',
          'Keep timestamps in a consistent and localized format.',
          'Announce newly arrived rows when auto-refresh is enabled.',
        ],
        contentGuidelines: [
          { label: 'Event language', guidance: 'Use active voice and clear object references.', example: 'Alice approved invoice INV-102.' },
          { label: 'Priority labels', guidance: 'Use terms your support team already uses.', example: 'Critical change' },
          { label: 'Export naming', guidance: 'Use timestamps in export file naming.', example: 'audit-events-2026-08-18.csv' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Show actor, action, object, and result in a single sentence-like row.',
              'Add retention range controls aligned with compliance policy.',
              'Allow secure export for incident handover.',
            ],
            code: `{
  "event": "permission.changed",
  "actor": "ops-admin",
  "objectType": "workspace",
  "objectId": "ws_91",
  "metadata": { "scope": "billing", "role": "FinanceAdmin" },
  "result": "granted",
  "timestamp": "2026-08-18T08:12:44.000Z"
}`,
          },
        ],
        props: [
          { name: 'events', type: 'readonly AuditEvent[]', default: 'required', description: 'Chronological log entries with actor/action metadata.' },
          { name: 'filters', type: 'AuditFilter', default: '{}', description: 'Current filtered query applied by users.' },
          { name: 'onExport', type: '(query: AuditFilter) => Promise<void>', default: 'undefined', description: 'Export events for review or compliance.' },
          { name: 'pollIntervalMs', type: 'number', default: '0', description: 'Set > 0 to enable polling for live streams.' },
        ],
        related: [
          { name: 'AuditLog', href: '/components/audit-log', description: 'Baseline component for event listing.', icon: 'ti-history' },
          { name: 'NotificationCenter', href: '/components/notification-center', description: 'Signal critical events from audit monitors.', icon: 'ti-bell' },
          { name: 'ActivityFeed', href: '/components/activity-feed', description: 'Human activity stream for day-to-day collaboration.', icon: 'ti-activity' },
        ],
      },
      {
        slug: 'saved-views',
        title: 'Saved views',
        summary:
          'Reusable user-defined views that preserve filters, sort, and UI preferences for recurring work.',
        icon: 'ti-bookmark',
        tags: ['Personalization', 'Productivity', 'State'],
        overview: [
          'Saved views reduce repetitive setup and improve consistency across teams.',
          'They should be lightweight, shareable, and easy to manage at scale.',
        ],
        anatomy: [
          { number: 1, name: 'View record', description: 'Name, owner, tags, and visibility level.' },
          { number: 2, name: 'Configuration payload', description: 'Filters, sorting, columns, and hidden settings.' },
          { number: 3, name: 'Scope', description: 'Personal or team/shared visibility status.' },
          { number: 4, name: 'Default indicator', description: 'Signals default startup view when available.' },
          { number: 5, name: 'Actions', description: 'Rename, duplicate, delete, and set default.' },
        ],
        whenToUse: [
          { title: 'Operational dashboards', description: 'For users who return to the same workspace context.' },
          { title: 'Complex filter trees', description: 'When setup is too expensive for each session.' },
          { title: 'Team templates', description: 'Standardize onboarding views for common tasks.' },
        ],
        whenNotToUse: [
          { title: 'Highly dynamic contexts', description: 'Avoid for screens where conditions change every minute.' },
          { title: 'Very simple lists', description: 'Use no-view mode for single list layouts.' },
          { title: 'Strict security scopes', description: 'Avoid exposing cross-tenant config snapshots without checks.' },
        ],
        variants: [
          { icon: 'ti-user', title: 'Personal', description: 'Visible only to creating user.' },
          { icon: 'ti-users', title: 'Shared', description: 'Team-wide reusable query and view profile.' },
          { icon: 'ti-lock', title: 'Locked', description: 'Standardized and non-editable governance views.' },
        ],
        states: [
          { state: 'No views', trigger: 'First use', visual: 'Empty list + create CTA', interaction: 'Prompt user to save current state.' },
          { state: 'Synchronized', trigger: 'View selected', visual: 'Controls apply immediately', interaction: 'Selection stays in sync with active view.' },
          { state: 'Stale', trigger: 'Source schema changes', visual: 'Warning indicator', interaction: 'Offer view refresh or remap.' },
        ],
        behavior: [
          { icon: 'ti-save', title: 'Context persistence', description: 'Persist as a deterministic config object.' },
          { icon: 'ti-reload', title: 'Conflict-aware restore', description: 'Reconcile deleted fields and stale columns gracefully.' },
          { icon: 'ti-share', title: 'Sharing workflows', description: 'Handoff team views with minimal setup.' },
        ],
        keyboard: [
          { keys: ['Ctrl/Cmd', 'S'], action: 'Save current UI state as a new view if supported.' },
          { keys: ['ArrowDown'], action: 'Navigate quickly between saved view list items.' },
          { keys: ['Enter'], action: 'Apply focused saved view.' },
        ],
        accessibilityChecklist: [
          'Announce if a saved view fails validation after schema changes.',
          'Use explicit labels for sharing and visibility state.',
          'Provide sufficient contrast for default indicators and status chips.',
        ],
        contentGuidelines: [
          { label: 'Naming', guidance: 'Use team terminology and context.', example: 'Regional open incidents - EMEA' },
          { label: 'Descriptions', guidance: 'Capture intent and scope in one line.', example: 'Monitored view for escalated high-priority incidents.' },
          { label: 'Ownership', guidance: 'Show owner and last edited details.', example: 'Shared by Maya · updated 2h ago' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Persist at save points to avoid accidental snapshots during transient setup.',
              'Use shared templates for on-call and release teams.',
              'Mark stale saved views with recovery actions instead of silent breakage.',
            ],
          },
        ],
        props: [
          { name: 'views', type: 'readonly SavedView[]', default: 'required', description: 'Persisted collection of user/team views.' },
          { name: 'onCreate', type: '(view: SavedViewInput) => Promise<void>', default: 'required', description: 'Create or duplicate a new view definition.' },
          { name: 'onDelete', type: '(id: string) => Promise<void>', default: 'required', description: 'Delete a stored view.' },
          { name: 'onApply', type: '(id: string) => void', default: 'required', description: 'Apply selected configuration to the workspace.' },
        ],
        related: [
          { name: 'SavedViews', href: '/components/saved-views', description: 'The core UI component foundation.', icon: 'ti-bookmark' },
          { name: 'FilterBar', href: '/components/filter-bar', description: 'Captures filter segments for persistence.', icon: 'ti-filter' },
          { name: 'DataTable', href: '/components/data-table', description: 'Applies persisted sorting and column metadata.', icon: 'ti-table' },
        ],
      },
    ],
  },
  floorplans: {
    label: 'Floorplans',
    subtitle: 'Reusable screens and workspace blueprints.',
    description:
      'These floorplans help teams assemble dependable enterprise pages with predictable hierarchy and interaction density.',
    categoryPath: 'floorplans',
    items: [
      {
        slug: 'dashboard',
        title: 'Dashboard',
        summary: 'Executive and operations view that keeps status, decisions, and action queues in one glance.',
        icon: 'ti-layout-dashboard',
        tags: ['Landing', 'Overview', 'Performance'],
        overview: [
          'A dashboard floorplan gives teams fast context across health, throughput, and action risk.',
          'It should reduce decision latency through clear prioritization and limited motion.',
        ],
        anatomy: [
          { number: 1, name: 'Hero metric row', description: 'Top-level KPIs with unit and trend context.' },
          { number: 2, name: 'Action rail', description: 'Quick path to most critical operational actions.' },
          { number: 3, name: 'Trend modules', description: 'Mini charts and alerts with relative recency.' },
          { number: 4, name: 'Work queue', description: 'Prioritized items with status and ownership.' },
          { number: 5, name: 'Secondary insights', description: 'Contextual modules for exceptions and next checks.' },
        ],
        whenToUse: [
          { title: 'Executive review', description: 'Use for quick periodic status checks across multiple streams.' },
          { title: 'On-call rotation', description: 'Use with triage indicators and criticality tags.' },
          { title: 'Product operations', description: 'Use for recurring release and support standups.' },
        ],
        whenNotToUse: [
          { title: 'Single transaction flow', description: 'Use detail pages for step-by-step tasks.' },
          { title: 'Highly dense operational tables', description: 'Use list-report floorplan instead.' },
          { title: 'Read-only portals', description: 'Avoid heavy controls when no actions are needed.' },
        ],
        variants: [
          { icon: 'ti-chart-line', title: 'Executive', description: 'Top-level snapshots with strategic metrics.' },
          { icon: 'ti-activity', title: 'Operations', description: 'Action-first view with urgent queues and escalation status.' },
          { icon: 'ti-template', title: 'Configurable', description: 'Widget-level editing by role and workspace.' },
        ],
        states: [
          { state: 'Loading', trigger: 'Fresh data fetch', visual: 'Skeleton cards and fallback totals', interaction: 'Keep CTA available if safe.' },
          { state: 'Healthy', trigger: 'No blocking alerts', visual: 'Green trend and confidence indicators', interaction: 'Encourage routine review actions.' },
          { state: 'Alert', trigger: 'SLA breach or backlog', visual: 'Contrast-heavy badges', interaction: 'Expose quick remediation actions.' },
        ],
        behavior: [
          { icon: 'ti-refresh', title: 'Refresh strategy', description: 'Use pull-to-refresh and interval sync with clear staleness states.' },
          { icon: 'ti-layout-grid', title: 'Composable cards', description: 'Allow layout-level config for role-specific dashboards.' },
          { icon: 'ti-link', title: 'Traceability', description: 'Each metric links to the underlying detail source.' },
        ],
        keyboard: [
          { keys: ['g', 'h'], action: 'Navigate to dashboard home section when keyboard bindings are configured.' },
          { keys: ['1'], action: 'Jump to first primary widget in keyboard mode.' },
          { keys: ['R'], action: 'Refresh dashboard data manually if supported.' },
        ],
        accessibilityChecklist: [
          'Do not show critical alerts only through color.',
          'Use headings and landmarks to group metric groups.',
          'Keep widget ordering stable to reduce screen reader disorientation.',
        ],
        contentGuidelines: [
          { label: 'Metric copy', guidance: 'Prefer nouns + verbs that indicate actionability.', example: 'SLA breaches this week' },
          { label: 'Trend language', guidance: 'Use plain trend language in addition to sparklines.', example: 'Down 4% from last week' },
          { label: 'Prioritization', guidance: 'Order cards by business urgency, not alphabet.', example: 'Open incidents first, then usage metrics.' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Show one clear callout for escalation before less critical metrics.',
              'Cap concurrent widgets to reduce cognitive load.',
              'Surface unresolved incidents with direct action links.',
            ],
          },
        ],
        props: [
          { name: 'widgets', type: 'readonly DashboardWidget[]', default: 'required', description: 'Ordered layout cards with metadata and drill links.' },
          { name: 'health', type: 'DashboardHealth', default: 'required', description: 'Defines overall status used in page chrome.' },
          { name: 'refreshEveryMs', type: 'number', default: '30000', description: 'Interval for periodic updates.' },
          { name: 'onAction', type: '(widgetId: string, action: string) => void', default: 'required', description: 'Action callback from quick actions.' },
        ],
        related: [
          { name: 'Overview Dashboard', href: '/', description: 'Landing style for entry-level dashboard patterns.', icon: 'ti-home' },
          { name: 'Charts and KPIs', href: '/examples?id=dashboard', description: 'Dashboard examples with metrics and cards.', icon: 'ti-chart-bar' },
          { name: 'CommandBar', href: '/components/command-bar', description: 'Global operations with keyboard-first access.', icon: 'ti-command' },
        ],
      },
      {
        slug: 'list-report',
        title: 'List report',
        summary: 'Structured report pages for large queryable lists with configurable columns and export controls.',
        icon: 'ti-list-details',
        tags: ['Reporting', 'Listing', 'Data'],
        overview: [
          'A list-report floorplan standardizes table-first workflows: search, filter, review, and export.',
          'Keep row density and action density balanced so people can process many rows quickly.',
        ],
        anatomy: [
          { number: 1, name: 'Filter header', description: 'Primary controls for scope and query intent.' },
          { number: 2, name: 'Report toolbar', description: 'Exports, density, and display mode controls.' },
          { number: 3, name: 'Data grid', description: 'Main content row rendering with row-level and bulk actions.' },
          { number: 4, name: 'Pager', description: 'Pagination with summary and jump points.' },
          { number: 5, name: 'Footer meta', description: 'Totals, generation details, and refresh state.' },
        ],
        whenToUse: [
          { title: 'Audit and operations reporting', description: 'Use for periodic analysis and review tasks.' },
          { title: 'Large dataset management', description: 'Use when users filter and sort often.' },
          { title: 'Governance exports', description: 'Use when data snapshots must be exported.' },
        ],
        whenNotToUse: [
          { title: 'Single item editors', description: 'Use detail floors for complex mutation flows.' },
          { title: 'Informational pages', description: 'Use cards and callouts for static content.' },
          { title: 'High-frequency events', description: 'Use streaming views for real-time logs.' },
        ],
        variants: [
          { icon: 'ti-layout-rows', title: 'Analytic', description: 'Denser row model for internal operations.' },
          { icon: 'ti-adjustments-horizontal', title: 'Configurable', description: 'Column and filter customization.' },
          { icon: 'ti-columns', title: 'Minimal', description: 'Reduced columns for quick triage.' },
        ],
        states: [
          { state: 'Initial', trigger: 'Page load', visual: 'Filter placeholders and skeleton', interaction: 'Collect filters before rendering heavy rows.' },
          { state: 'Filtered', trigger: 'User applies query', visual: 'Updated row subset and totals', interaction: 'Preserve selected rows when possible.' },
          { state: 'Export ready', trigger: 'Export command', visual: 'Export confirmation and filename preview', interaction: 'Offer download and audit trace IDs.' },
        ],
        behavior: [
          { icon: 'ti-search', title: 'Filter precedence', description: 'Deterministic order of filters prevents accidental surprises.' },
          { icon: 'ti-download', title: 'Export policy', description: 'Apply policy-based masking before file generation.' },
          { icon: 'ti-table', title: 'Selection memory', description: 'Keep selection state by ID across pagination.' },
        ],
        keyboard: [
          { keys: ['Ctrl/Cmd', 'A'], action: 'Select all rows in page or active result set when supported.' },
          { keys: ['PageDown'], action: 'Move to next row set where paging is keyboard accessible.' },
          { keys: ['Ctrl/Cmd', 'E'], action: 'Trigger report export flow.' },
        ],
        accessibilityChecklist: [
          'Ensure table headers are exposed and sortable semantics are clear.',
          'Keep action buttons announced and grouped by row context.',
          'Use row/column navigation patterns for screen readers where feasible.',
        ],
        contentGuidelines: [
          { label: 'Row naming', guidance: 'Use entity-first naming for quick scanning.', example: 'REQ-1024 · Payout request' },
          { label: 'Totals', guidance: 'Place totals where users expect them.', example: 'Showing 15–30 of 248 items' },
          { label: 'Export language', guidance: 'Use explicit retention and scope language.', example: 'Export current filtered list' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Persist column arrangement per user role.',
              'Use server-side pagination for large organizations.',
              'Add row-level action columns for common operations.',
            ],
          },
        ],
        props: [
          { name: 'rows', type: 'readonly ReportRow[]', default: 'required', description: 'Rows rendered in the main report body.' },
          { name: 'columns', type: 'readonly ReportColumn[]', default: 'required', description: 'Configurable columns and accessibility labels.' },
          { name: 'exportEnabled', type: 'boolean', default: 'true', description: 'Feature flag for export controls.' },
          { name: 'onPageChange', type: '(page: number) => void', default: 'required', description: 'Page navigation state update.' },
        ],
        related: [
          { name: 'DataTable', href: '/components/data-table', description: 'Core structured list and selection behaviors.', icon: 'ti-table' },
          { name: 'FilterBar', href: '/components/filter-bar', description: 'Query-first controls for list-report layout.', icon: 'ti-filter' },
          { name: 'Toolbar', href: '/components/toolbar', description: 'High-level report controls and actions.', icon: 'ti-layout-navbar' },
        ],
      },
      {
        slug: 'object-detail',
        title: 'Object detail',
        summary: 'Primary detail shell for single-record workflows, including metadata, timeline, and task actions.',
        icon: 'ti-layout-details',
        tags: ['Detail', 'Object', 'Context'],
        overview: [
          'Object-detail floorplans balance comprehensive context and focused actions.',
          'The objective is quick understanding before edits, approvals, and related object navigation.',
        ],
        anatomy: [
          { number: 1, name: 'Header', description: 'Object identity, status, and highest priority actions.' },
          { number: 2, name: 'Overview columns', description: 'Key metrics and attributes in one glance.' },
          { number: 3, name: 'Activity timeline', description: 'Recent events and communication history.' },
          { number: 4, name: 'Relationship panel', description: 'Associated entities and quick links.' },
          { number: 5, name: 'Action rail', description: 'Primary object commands by role and state.' },
        ],
        whenToUse: [
          { title: 'Customer records', description: 'Use for records requiring rich context and action.' },
          { title: 'Incident workflows', description: 'Use for troubleshooting and progression tracking.' },
          { title: 'Approval artifacts', description: 'Use where details + review actions are co-located.' },
        ],
        whenNotToUse: [
          { title: 'Overview-only modules', description: 'Use dashboard floorplan when no object-specific actions exist.' },
          { title: 'High-cardinality lists', description: 'Use list-report for batch operations.' },
          { title: 'Simple forms', description: 'Use form screens for one-step edits.' },
        ],
        variants: [
          { icon: 'ti-layout-sidebar-right', title: 'Split view', description: 'Primary content plus side details.' },
          { icon: 'ti-layout', title: 'Tabbed detail', description: 'Sections for overview, history, settings.' },
          { icon: 'ti-device-floppy', title: 'Editable detail', description: 'Inline edits with explicit save checkpoints.' },
        ],
        states: [
          { state: 'Loading', trigger: 'Fetching details', visual: 'Skeleton header and summary', interaction: 'Keep action controls disabled.' },
          { state: 'Loaded', trigger: 'Data ready', visual: 'Complete object sections available', interaction: 'Enable contextual controls.' },
          { state: 'Read-only', trigger: 'Permission restrictions', visual: 'Disabled edit affordances', interaction: 'Show request-access path.' },
        ],
        behavior: [
          { icon: 'ti-target', title: 'Predictable layout', description: 'Keep section order stable across object types.' },
          { icon: 'ti-switch', title: 'State-aware actions', description: 'Action availability driven by object status and user role.' },
          { icon: 'ti-link', title: 'Context links', description: 'Cross-link related entities for workflow continuity.' },
        ],
        keyboard: [
          { keys: ['Tab'], action: 'Navigate sections in logical object order.' },
          { keys: ['E'], action: 'Open primary edit path when authorized.' },
          { keys: ['Ctrl/Cmd', 'S'], action: 'Save local edits.' },
        ],
        accessibilityChecklist: [
          'Use landmark regions for header, main content, and related sections.',
          'Keep required fields marked in label and helper text.',
          'Announce transition from read-only to editable state.',
        ],
        contentGuidelines: [
          { label: 'Object title', guidance: 'Keep object titles unique and actionable.', example: 'Invoice INV-1122 — Payment pending' },
          { label: 'Section naming', guidance: 'Use short and stable section titles.', example: 'Timeline' },
          { label: 'Action wording', guidance: 'Use verbs matching user intent.', example: 'Approve invoice' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Show status chips and owner in header to reduce hunt time.',
              'Keep history section visible but compact on first paint.',
              'Avoid placing destructive actions next to neutral controls.',
            ],
          },
        ],
        props: [
          { name: 'object', type: 'Record<string, unknown>', default: 'required', description: 'Source object data used in header and sections.' },
          { name: 'sections', type: 'readonly DetailSection[]', default: 'required', description: 'Ordered content sections for the detail screen.' },
          { name: 'isEditable', type: 'boolean', default: 'false', description: 'Controls if edit and save actions are available.' },
          { name: 'onSectionAction', type: '(id: string) => void', default: 'undefined', description: 'Runs section-level action commands.' },
        ],
        related: [
          { name: 'SidePanel', href: '/components/side-panel', description: 'Supplementary details without losing context.', icon: 'ti-layout-sidebar-right' },
          { name: 'Tabs', href: '/components/tabs', description: 'Segment object sections cleanly.', icon: 'ti-layout-bottombar' },
          { name: 'PermissionMatrix', href: '/components/permission-matrix', description: 'Read-only vs editable guardrails.', icon: 'ti-lock-access' },
        ],
      },
      {
        slug: 'user-management',
        title: 'User management',
        summary: 'Operational floorplan for creating, managing, and deprovisioning user access with audit support.',
        icon: 'ti-users',
        tags: ['Identity', 'Administration', 'IAM'],
        overview: [
          'User management should combine quick profile actions with safe guardrails for role changes.',
          'The floorplan supports bulk review, per-user detail, and traceability.',
        ],
        anatomy: [
          { number: 1, name: 'Identity list', description: 'Primary roster with search and role pills.' },
          { number: 2, name: 'Bulk panel', description: 'Mass role or team updates where permitted.' },
          { number: 3, name: 'User detail', description: 'Identity, permissions, and activity summary.' },
          { number: 4, name: 'Audit summary', description: 'Recent access changes with operator context.' },
          { number: 5, name: 'Invite actions', description: 'Create and onboard new users safely.' },
        ],
        whenToUse: [
          { title: 'Organization administration', description: 'Use in any workspace with role assignment responsibilities.' },
          { title: 'Tenant management', description: 'Use for membership and team membership workflows.' },
          { title: 'Compliance monitoring', description: 'Use when access updates need audit trails.' },
        ],
        whenNotToUse: [
          { title: 'Single app settings', description: 'Use profile screens for personal preferences.' },
          { title: 'Public directories', description: 'Avoid in purely public-facing contexts.' },
          { title: 'Unmanaged directories', description: 'Do not duplicate identity management from external IdPs.' },
        ],
        variants: [
          { icon: 'ti-user-plus', title: 'Invite-first', description: 'Focused onboarding and activation flow.' },
          { icon: 'ti-shield', title: 'Role-first', description: 'Prioritize role and access assignment actions.' },
          { icon: 'ti-file-analytics', title: 'Audit-first', description: 'Detailed change summary and event history.' },
        ],
        states: [
          { state: 'Invite', trigger: 'New user added', visual: 'Pending acceptance state and action reminders', interaction: 'Enable reminder and reminder actions.' },
          { state: 'Active', trigger: 'Verified user', visual: 'Active badge and accessible role state', interaction: 'User can perform allowed actions.' },
          { state: 'Locked', trigger: 'Admin lock', visual: 'Clear blocked state', interaction: 'Only admin override unlock available.' },
        ],
        behavior: [
          { icon: 'ti-lock', title: 'Least privilege', description: 'Expose only roles allowed in current workspace policy.' },
          { icon: 'ti-refresh', title: 'State reconciliation', description: 'Refresh identity state after sync or directory changes.' },
          { icon: 'ti-history', title: 'Change log', description: 'Immediate logging of role and status changes.' },
        ],
        keyboard: [
          { keys: ['N'], action: 'Focus quick user invite flow.' },
          { keys: ['Shift', 'F'], action: 'Open advanced filter within roster.' },
          { keys: ['Ctrl/Cmd', 'R'], action: 'Refresh user data.' },
        ],
        accessibilityChecklist: [
          'Clearly identify destructive actions with explicit text and confirmation.',
          'Group roster controls with clear labels and table headers.',
          'Ensure role badges are text-readable and announced as status.',
        ],
        contentGuidelines: [
          { label: 'User title', guidance: 'Use full name first, then role.', example: 'Maya Patel — Admin' },
          { label: 'Invite wording', guidance: 'Show expected next action clearly.', example: 'Invite sent — pending activation' },
          { label: 'Role language', guidance: 'Use approved role terminology.', example: 'Workspace Owner' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Separate admin and member views to reduce accidental overexposure.',
              'Use soft-lock states before disabling critical users.',
              'Keep bulk role changes in guarded confirmation flows.',
            ],
          },
        ],
        props: [
          { name: 'users', type: 'readonly UserRecord[]', default: 'required', description: 'List of users with roles and status.' },
          { name: 'roles', type: 'readonly RoleDefinition[]', default: 'required', description: 'Available roles with allowed actions.' },
          { name: 'onInvite', type: '(email: string, role: string) => Promise<void>', default: 'required', description: 'Send onboarding invite with role assignment.' },
          { name: 'onRevoke', type: '(id: string) => Promise<void>', default: 'required', description: 'Revoke access with confirmation.' },
        ],
        related: [
          { name: 'PermissionMatrix', href: '/components/permission-matrix', description: 'View role matrix and ownership boundaries.', icon: 'ti-lock-access' },
          { name: 'Card', href: '/components/card', description: 'Profile and identity grouping surface.', icon: 'ti-layout-cards' },
          { name: 'CommandBar', href: '/components/command-bar', description: 'Quick actions and global user search.', icon: 'ti-command' },
        ],
      },
      {
        slug: 'approval-queue',
        title: 'Approval queue',
        summary: 'Central queue for pending requests with triage grouping and SLA-aware urgency.',
        icon: 'ti-clipboard-list',
        tags: ['Queue', 'Approvals', 'SLA'],
        overview: [
          'Approval queues prioritize operational speed and fairness by ordering work consistently.',
          'Use clear grouping and action paths to avoid long-tail delays.',
        ],
        anatomy: [
          { number: 1, name: 'Queue buckets', description: 'Group by priority, age, and owner assignment.' },
          { number: 2, name: 'Request cards', description: 'Compact detail + action buttons for each request.' },
          { number: 3, name: 'SLA tags', description: 'Visual indicator for pending and expired windows.' },
          { number: 4, name: 'Bulk controls', description: 'Mass reassignment and follow-up support.' },
          { number: 5, name: 'Activity trail', description: 'Recent state changes and comments for queue health.' },
        ],
        whenToUse: [
          { title: 'High-volume approvals', description: 'When requests flow in constantly and need triage.' },
          { title: 'Multi-stage approvals', description: 'When multiple roles interact in sequence.' },
          { title: 'Operational oversight', description: 'When supervisors need queue snapshots by SLA.' },
        ],
        whenNotToUse: [
          { title: 'Small ad hoc requests', description: 'Use inline task confirmation for few actions.' },
          { title: 'Complex forms', description: 'Use full detail layout when each item needs deeper review.' },
          { title: 'No urgency tracking', description: 'Avoid queue structure if no SLA applies.' },
        ],
        variants: [
          { icon: 'ti-flag', title: 'Priority-first', description: 'Sort by criticality and age simultaneously.' },
          { icon: 'ti-user', title: 'Owner-first', description: 'Group by assigned user or queue.' },
          { icon: 'ti-clock', title: 'SLA-first', description: 'Highlight near-breach items prominently.' },
        ],
        states: [
          { state: 'Backlog', trigger: 'New requests', visual: 'Unassigned and awaiting triage', interaction: 'Users claim requests into active handling.' },
          { state: 'Review', trigger: 'Assigned', visual: 'Reviewer panel and decision controls', interaction: 'Decision actions unlock based on role.' },
          { state: 'Escalated', trigger: 'SLA breached', visual: 'Urgency highlight and escalation cue', interaction: 'Management path becomes visible.' },
        ],
        behavior: [
          { icon: 'ti-sort-ascending', title: 'Predictable ordering', description: 'Stable ranking by priority, age, and assignment.' },
          { icon: 'ti-note', title: 'Queue comments', description: 'Shared context before final decision.' },
          { icon: 'ti-arrows-transfer-up', title: 'Owner reassignment', description: 'Allow safe reassignment with audit capture.' },
        ],
        keyboard: [
          { keys: ['Shift', 'J'], action: 'Move to next queue bucket with focus.' },
          { keys: ['A'], action: 'Approve focused request if policy allows.' },
          { keys: ['R'], action: 'Open request reassignment dialog.' },
        ],
        accessibilityChecklist: [
          'Mark queue priority and SLA state with visible text labels.',
          'Keep action availability clear for each focused request.',
          'Avoid auto-expanding all cards; preserve predictable focus order.',
        ],
        contentGuidelines: [
          { label: 'Queue naming', guidance: 'Use operational language for teams.', example: 'Pending review (critical)' },
          { label: 'SLA labels', guidance: 'Prefer explicit labels over ambiguous time terms.', example: 'Due in 4 hours' },
          { label: 'Action text', guidance: 'Use "Approve", "Reject", and "Return" with short scope.', example: 'Approve spend request' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Keep claim and decline actions primary and separated from archive actions.',
              'Use automated reminders when requests remain unclaimed.',
              'Add quick filters by queue SLA and team in the header.',
            ],
          },
        ],
        props: [
          { name: 'requests', type: 'readonly ApprovalRequest[]', default: 'required', description: 'Queued items with status and owners.' },
          { name: 'columns', type: 'readonly string[]', default: "['title', 'owner', 'priority', 'age']", description: 'Visible queue columns.' },
          { name: 'onAction', type: '(id: string, action: string, comment?: string) => Promise<void>', default: 'required', description: 'Runs queue actions with optional note.' },
          { name: 'slaByPriority', type: 'Record<string, number>', default: '{}', description: 'Config for urgency thresholds.' },
        ],
        related: [
          { name: 'ActivityFeed', href: '/components/activity-feed', description: 'Queue events and update stream.', icon: 'ti-activity' },
          { name: 'Toolbar', href: '/components/toolbar', description: 'Queue-level action rail and quick operations.', icon: 'ti-layout-navbar' },
          { name: 'EmptyState', href: '/components/empty-state', description: 'Graceful handling when queue has no items.', icon: 'ti-layout-align-middle' },
        ],
      },
      {
        slug: 'settings',
        title: 'Settings',
        summary: 'Reusable settings floorplan balancing global controls, scoped preferences, and safety confirmation.',
        icon: 'ti-settings',
        tags: ['Admin', 'Preferences', 'Configuration'],
        overview: [
          'Enterprise settings pages should keep unrelated controls separated by section while preserving a coherent hierarchy.',
          'A strong settings floorplan improves discoverability for infrequently used controls.',
        ],
        anatomy: [
          { number: 1, name: 'Section shell', description: 'Primary grouping by domain: account, security, integrations.' },
          { number: 2, name: 'Preference controls', description: 'Inputs with clear defaults and restore options.' },
          { number: 3, name: 'Safety prompts', description: 'Confirmation dialogs for irreversible preferences.' },
          { number: 4, name: 'Save state', description: 'Draft/saved indicators to prevent accidental loss.' },
          { number: 5, name: 'Rollback action', description: 'Reset path for mistakes and stale defaults.' },
        ],
        whenToUse: [
          { title: 'Complex applications', description: 'Many settings categories and role restrictions.' },
          { title: 'Compliance configurations', description: 'Settings with policy or security impact.' },
          { title: 'Self-service admin', description: 'Where support load drops with clear grouped controls.' },
        ],
        whenNotToUse: [
          { title: 'Onboarding micro-settings', description: 'Use compact forms for initial setup.' },
          { title: 'Single-purpose screens', description: 'Use dedicated workflows for rare actions.' },
          { title: 'High-frequency changes', description: 'Use faster command surfaces for repeated toggles.' },
        ],
        variants: [
          { icon: 'ti-layout-grid', title: 'Tabbed', description: 'Category sections with deep-linking and stable order.' },
          { icon: 'ti-list-details', title: 'Accordion', description: 'Progressive discovery for dense options.' },
          { icon: 'ti-shield-check', title: 'Security-first', description: 'Additional confirmation for sensitive operations.' },
        ],
        states: [
          { state: 'Draft', trigger: 'Changes in progress', visual: 'Unsaved marker and secondary save option', interaction: 'Prompt on navigation if unsaved.' },
          { state: 'Saved', trigger: 'Submit successful', visual: 'Confirmation toast and sync summary', interaction: 'Continue to other settings.' },
          { state: 'Risk change', trigger: 'Critical toggle', visual: 'Explicit warning modal', interaction: 'Require explicit confirmation step.' },
        ],
        behavior: [
          { icon: 'ti-save', title: 'Explicit save model', description: 'Separate draft and publish steps when risk is non-trivial.' },
          { icon: 'ti-refresh', title: 'Reset paths', description: 'Offer reset to defaults and section resets.' },
          { icon: 'ti-lock', title: 'Audit capture', description: 'Log critical preference changes.' },
        ],
        keyboard: [
          { keys: ['G', 'S'], action: 'Save setting changes quickly when supported.' },
          { keys: ['Esc'], action: 'Cancel edited section and return to saved state.' },
          { keys: ['Tab'], action: 'Move through grouped controls in logical order.' },
        ],
        accessibilityChecklist: [
          'Pair toggle controls with explicit labels and explanatory text.',
          'Avoid modal-only confirmation for safety actions without focus return.',
          'Keep section headings and error text discoverable in flow.',
        ],
        contentGuidelines: [
          { label: 'Confirmation language', guidance: 'Use plain language for critical risks.', example: 'Turning off 2FA disables login protection.' },
          { label: 'Grouping', guidance: 'Keep related controls in one section.', example: 'Security → Access methods.' },
          { label: 'Default labels', guidance: 'Indicate when a control is inherited or managed.', example: 'Managed by your organization' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Use side-by-side layout for dense settings to reduce scroll.',
              'Add a visible unsaved state with one exit confirmation.',
              'Lock destructive controls behind explicit confirmation and audit event.',
            ],
          },
        ],
        props: [
          { name: 'sections', type: 'readonly SettingsSection[]', default: 'required', description: 'List of setting categories and controls.' },
          { name: 'onSave', type: '(payload: Record<string, unknown>) => Promise<void>', default: 'required', description: 'Save changes for one or more sections.' },
          { name: 'onReset', type: '(sectionId: string) => void', default: 'undefined', description: 'Reset a section to organization defaults.' },
          { name: 'dirty', type: 'boolean', default: 'false', description: 'Global unsaved-changes state.' },
        ],
        related: [
          { name: 'Switch', href: '/components/switch', description: 'Reliable boolean controls for preferences.', icon: 'ti-toggle-right' },
          { name: 'Dialog', href: '/components/dialog', description: 'Safety confirmations for high-risk changes.', icon: 'ti-layout-sidebar-right' },
          { name: 'Input', href: '/components/input', description: 'Text settings with helper and validation guidance.', icon: 'ti-cursor-text' },
        ],
      },
    ],
  },
  templates: {
    label: 'Templates',
    subtitle: 'Reusable page-level layouts to speed team consistency.',
    description:
      'These templates provide starting points for common enterprise experiences and can be adapted for product-specific needs.',
    categoryPath: 'templates',
    items: [
      {
        slug: 'work-items',
        title: 'Work items',
        summary: 'Template for triaging and tracking actionable work with assignee, due date, and status.',
        icon: 'ti-checkbox',
        tags: ['Productivity', 'Queue', 'Task'],
        overview: [
          'Work item templates improve consistency across teams by combining planning and execution.',
          'Use this as a baseline for engineering, customer, and support workflows.',
        ],
        anatomy: [
          { number: 1, name: 'Header metrics', description: 'Current queue and health indicators.' },
          { number: 2, name: 'Filter workspace', description: 'Team, owner, and status selection.' },
          { number: 3, name: 'Item list', description: 'Row cards showing due dates and state.' },
          { number: 4, name: 'Quick actions', description: 'Most common actions at each row or bulk level.' },
          { number: 5, name: 'Drill-down', description: 'Open full detail without losing list context.' },
        ],
        whenToUse: [
          { title: 'Cross-functional workflows', description: 'When teams need one consistent work intake surface.' },
          { title: 'Project tracking', description: 'When status and ownership need frequent updates.' },
          { title: 'Ops triage', description: 'When items arrive continuously and require classification.' },
        ],
        whenNotToUse: [
          { title: 'Passive dashboards', description: 'Use dashboard template for monitoring-only views.' },
          { title: 'Single-purpose forms', description: 'Use form-driven templates for one-off actions.' },
          { title: 'Financial reporting', description: 'Use list-report for heavy data analysis.' },
        ],
        variants: [
          { icon: 'ti-layout-list', title: 'Kanban', description: 'Board-style swimlanes for visual tracking.' },
          { icon: 'ti-list', title: 'List', description: 'Linear list for high row counts.' },
          { icon: 'ti-columns', title: 'Compact', description: 'High-density cards for fast triage.' },
        ],
        states: [
          { state: 'Ready', trigger: 'Unassigned items', visual: 'Unclaimed list and quick assign action', interaction: 'Enable assignment workflows.' },
          { state: 'In progress', trigger: 'Active work selected', visual: 'Progress indicators and blockers', interaction: 'Use update actions in place.' },
          { state: 'Done', trigger: 'Completed', visual: 'Archived visibility and close summary', interaction: 'Optional reopen action available.' },
        ],
        behavior: [
          { icon: 'ti-target', title: 'Consistent routing', description: 'Maintain one action vocabulary across item sources.' },
          { icon: 'ti-bolt', title: 'Rapid updates', description: 'Quick inline edits for status and assignee.' },
          { icon: 'ti-history', title: 'History capture', description: 'Log assignment and status changes.' },
        ],
        keyboard: [
          { keys: ['N'], action: 'Create new work item quickly.' },
          { keys: ['A'], action: 'Open assignment controls for focused item.' },
          { keys: ['Esc'], action: 'Discard inline edit and return to list.' },
        ],
        accessibilityChecklist: [
          'Ensure each item state is visible in text and icon.',
          'Preserve tab order when drag-and-drop is optional but available.',
          'Use consistent live feedback for state transitions.',
        ],
        contentGuidelines: [
          { label: 'Item titles', guidance: 'Keep titles action-oriented.', example: 'Resolve billing exception' },
          { label: 'Priority labels', guidance: 'Avoid too many categories.', example: 'High', },
          { label: 'Due date copy', guidance: 'Use clear date language.', example: 'Due Friday 5:00 PM' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Expose default quick status actions aligned with team rituals.',
              'Surface blockers and assignee on the same row for faster triage.',
              'Keep completed items searchable for audit and review.',
            ],
          },
        ],
        props: [
          { name: 'items', type: 'readonly WorkItem[]', default: 'required', description: 'List of active and completed work items.' },
          { name: 'layout', type: "'list' | 'kanban' | 'compact'", default: "'list'", description: 'Template render mode.' },
          { name: 'onAssign', type: '(itemId: string, userId: string) => void', default: 'required', description: 'Assign owner to an item.' },
          { name: 'onStatusChange', type: '(itemId: string, status: string) => void', default: 'required', description: 'Update task state and track state transitions.' },
        ],
        related: [
          { name: 'DataTable', href: '/components/data-table', description: 'Reusable row and action foundation.', icon: 'ti-table' },
          { name: 'Badge', href: '/components/badge', description: 'Priority and status labeling.', icon: 'ti-badge' },
          { name: 'Chip', href: '/components/chip', description: 'Assignee and label chips.', icon: 'ti-tag' },
        ],
      },
      {
        slug: 'users',
        title: 'Users',
        summary: 'Template for user profiles and directory operations with role-aware actions and invite flows.',
        icon: 'ti-users',
        tags: ['Directory', 'Identity', 'Admin'],
        overview: [
          'A users template aligns directory, profile, and invitation workflows for faster onboarding.',
          'The pattern supports safe editing and auditability for identity operations.',
        ],
        anatomy: [
          { number: 1, name: 'Directory table', description: 'Searchable list with essential identifiers.' },
          { number: 2, name: 'Profile summary', description: 'Quick snapshot of selected user context.' },
          { number: 3, name: 'Role actions', description: 'Assign, revoke, and escalate with policy checks.' },
          { number: 4, name: 'Invite flow', description: 'Onboard via email and role mapping.' },
          { number: 5, name: 'Compliance panel', description: 'MFA, reset, and ownership metadata.' },
        ],
        whenToUse: [
          { title: 'Administration consoles', description: 'Use for internal user management tasks.' },
          { title: 'Support tooling', description: 'Use when support teams manage user outcomes.' },
          { title: 'Tenant setup', description: 'Use to onboard teams with roles and access.' },
        ],
        whenNotToUse: [
          { title: 'Customer self-service account', description: 'Use profile setting screens for user-centric tasks.' },
          { title: 'Single sign-on only', description: 'Use dedicated SSO and directory administration tooling.' },
          { title: 'Simple lists', description: 'Avoid for read-only user browsing.' },
        ],
        variants: [
          { icon: 'ti-user-plus', title: 'Directory-first', description: 'Primary focus on users and search.' },
          { icon: 'ti-user-cog', title: 'Governance-first', description: 'Role and policy emphasis.' },
          { icon: 'ti-messages', title: 'Support-first', description: 'Communication and status emphasis for requests.' },
        ],
        states: [
          { state: 'Invited', trigger: 'User pending activation', visual: 'Pending status and activation action', interaction: 'Resend invites and reminders.' },
          { state: 'Active', trigger: 'Verification complete', visual: 'Active badge and permissions visible', interaction: 'Enable role and reset actions.' },
          { state: 'Suspended', trigger: 'Manual disablement', visual: 'Lock indicator and restricted actions', interaction: 'Enable with approvals.' },
        ],
        behavior: [
          { icon: 'ti-search', title: 'Search-heavy', description: 'Support direct query and advanced filters.' },
          { icon: 'ti-users', title: 'Scoped actions', description: 'Action surface constrained by policy context.' },
          { icon: 'ti-repeat', title: 'Invite lifecycle', description: 'Invite and reset operations are recoverable and auditable.' },
        ],
        keyboard: [
          { keys: ['I'], action: 'Open user invite panel.' },
          { keys: ['S'], action: 'Set focus on search field.' },
          { keys: ['Ctrl/Cmd', 'R'], action: 'Refresh users from directory provider.' },
        ],
        accessibilityChecklist: [
          'Clearly label role changes as advisory or final.',
          'Keep list headers discoverable and sortable.',
          'Avoid showing only icons for profile state.',
        ],
        contentGuidelines: [
          { label: 'Names', guidance: 'Use full name and handle in profile headers.', example: 'Sasha Tan (sasha.t)' },
          { label: 'Invite messaging', guidance: 'State expected next steps.', example: 'Invite sent. User can activate via email.' },
          { label: 'Policy text', guidance: 'Use plain terms for role effects.', example: 'Can approve expenses up to $10,000' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Surface compliance state (MFA, SSO state) beside user role.',
              'Use bulk role actions for large org changes.',
              'Require confirmations before suspension and privilege removals.',
            ],
          },
        ],
        props: [
          { name: 'users', type: 'readonly UserRecord[]', default: 'required', description: 'Paged user records with profile metadata.' },
          { name: 'search', type: 'string', default: "''", description: 'Directory search query.' },
          { name: 'inviteEnabled', type: 'boolean', default: 'true', description: 'Feature toggle for new invites.' },
          { name: 'onSuspend', type: '(userId: string) => Promise<void>', default: 'required', description: 'Suspend access with audit callback.' },
        ],
        related: [
          { name: 'PermissionMatrix', href: '/components/permission-matrix', description: 'Permission context and role mapping.', icon: 'ti-lock-access' },
          { name: 'Input', href: '/components/input', description: 'Search and invite form controls.', icon: 'ti-cursor-text' },
          { name: 'Avatar', href: '/components/avatar', description: 'User identity display patterns.', icon: 'ti-user-circle' },
        ],
      },
      {
        slug: 'approvals',
        title: 'Approvals',
        summary: 'Template for decision queues, audit trails, and reusable approval card interactions.',
        icon: 'ti-checkup-list',
        tags: ['Workflow', 'Governance', 'Decision'],
        overview: [
          'Approvals templates reduce rework by standardizing queue layout, decision controls, and evidence collection.',
          'They also support auditability by coupling each decision with reason fields and history pointers.',
        ],
        anatomy: [
          { number: 1, name: 'Queue summary', description: 'Counts by stage and urgency.' },
          { number: 2, name: 'Approver list', description: 'Assigned roles and current reviewer context.' },
          { number: 3, name: 'Decision card', description: 'Item summary and action controls.' },
          { number: 4, name: 'Rationale field', description: 'Structured note with required details.' },
          { number: 5, name: 'History section', description: 'Immutable comments and state transitions.' },
        ],
        whenToUse: [
          { title: 'Risk-sensitive systems', description: 'Use where governance is mandatory.' },
          { title: 'Repetitive approvals', description: 'Use when teams review many similar request types.' },
          { title: 'Cross-team handoffs', description: 'Use when approvals pass across functional roles.' },
        ],
        whenNotToUse: [
          { title: 'Automated decisions', description: 'Use alert templates for low-touch automation cases.' },
          { title: 'Non-governed tasks', description: 'For purely operational actions, use quick actions.' },
          { title: 'Single-user workflows', description: 'Use simple confirmation modals for one person decisions.' },
        ],
        variants: [
          { icon: 'ti-list-check', title: 'Card queue', description: 'One decision card per request.' },
          { icon: 'ti-layout-list', title: 'Compact list', description: 'High density mode for busy decision makers.' },
          { icon: 'ti-sparkles', title: 'Guided flow', description: 'Step-by-step decision and evidence collection.' },
        ],
        states: [
          { state: 'Awaiting', trigger: 'Waiting action', visual: 'Unresolved decision cards', interaction: 'Assign reviewer and add notes.' },
          { state: 'Under review', trigger: 'Comment exists', visual: 'Decision in progress', interaction: 'Allow updates and additional context.' },
          { state: 'Resolved', trigger: 'Action final', visual: 'Final state and audit lock', interaction: 'Only comments or related references remain.' },
        ],
        behavior: [
          { icon: 'ti-shield-check', title: 'Decision integrity', description: 'Prevent duplicate decisions and track source request.' },
          { icon: 'ti-message-circle', title: 'Rationale capture', description: 'Attach reason before commit.' },
          { icon: 'ti-history', title: 'Audit continuity', description: 'Preserve each attempt and final outcome.' },
        ],
        keyboard: [
          { keys: ['A'], action: 'Approve focused item.' },
          { keys: ['R'], action: 'Return for revision with reason form focus.' },
          { keys: ['Esc'], action: 'Exit focused decision card.' },
        ],
        accessibilityChecklist: [
          'Announce required rationale fields programmatically.',
          'Make critical and irreversible actions explicit through button labeling.',
          'Keep decision result and actor details visible for assistive users.',
        ],
        contentGuidelines: [
          { label: 'Decision phrase', guidance: 'Use direct decision verbs.', example: 'Approve deployment request' },
          { label: 'Reason field', guidance: 'Always include why this decision happened.', example: 'Budget approved after risk check.' },
          { label: 'Queue labels', guidance: 'Use stable priority labels.', example: 'High priority · Needs finance review' },
        ],
        examples: [
          {
            heading: 'Production use',
            points: [
              'Use templates for recurring request types with consistent required fields.',
              'Ensure audit details update in timeline as decisions are made.',
              'Bundle approval reminders and escalation in the queue summary.',
            ],
          },
        ],
        props: [
          { name: 'requests', type: 'readonly ApprovalRequest[]', default: 'required', description: 'Queue items and their current decision state.' },
          { name: 'defaultPriority', type: "'low' | 'medium' | 'high'", default: "'medium'", description: 'Default priority for new entries.' },
          { name: 'onApprove', type: '(requestId: string, note: string) => Promise<void>', default: 'required', description: 'Approve request and capture rationale.' },
          { name: 'onReject', type: '(requestId: string, note: string) => Promise<void>', default: 'required', description: 'Reject request with mandatory notes.' },
        ],
        related: [
          { name: 'NotificationCenter', href: '/components/notification-center', description: 'Decision and queue notifications.', icon: 'ti-bell' },
          { name: 'Dialog', href: '/components/dialog', description: 'Decision confirmation and note capture.', icon: 'ti-layout-sidebar-right' },
          { name: 'CommandBar', href: '/components/command-bar', description: 'Global queue actions and quick filters.', icon: 'ti-command' },
        ],
      },
    ],
  },
}

export const ENTERPRISE_CATEGORIES: EnterpriseCategory[] = ['patterns', 'floorplans', 'templates']

export function formatEnterprisePath(category: EnterpriseCategory, slug: string) {
  return `/enterprise/${category}/${slug}`
}

export function getEnterpriseResource(category: EnterpriseCategory, slug: string) {
  return ENTERPRISE_EXPERIENCE_CATALOG[category].items.find((item) => item.slug === slug)
}
