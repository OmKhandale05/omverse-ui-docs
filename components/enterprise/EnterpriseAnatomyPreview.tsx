import type { EnterpriseResource } from '@/lib/enterprise-experiences'

function Marker({ number, className }: { number: number; className: string }) {
  return <span className={`component-anatomy-marker ${className}`}>{number}</span>
}

function FilteringAnatomy() {
  return (
    <div className="enterprise-filter-anatomy" aria-label="Filtering records anatomy diagram">
      <div className="enterprise-filter-anatomy-toolbar">
        <span>Search records</span>
        <span>Status</span>
        <button type="button" tabIndex={-1}>Add filter</button>
      </div>
      <div className="enterprise-filter-anatomy-chips">
        <span>Status: Open</span><span>Team: Platform</span>
      </div>
      <div className="enterprise-filter-anatomy-results">
        <strong>24 records</strong><span>Updated just now</span>
      </div>
      <div className="enterprise-filter-anatomy-rows"><span /><span /><span /></div>
      <button type="button" className="enterprise-filter-anatomy-reset" tabIndex={-1}>Clear all</button>
      <Marker number={1} className="enterprise-anatomy-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-anatomy-marker--two component-anatomy-marker--leader-down" />
      <Marker number={3} className="enterprise-anatomy-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-anatomy-marker--four component-anatomy-marker--leader-up" />
      <Marker number={5} className="enterprise-anatomy-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}

function BulkActionsAnatomy() {
  return (
    <div className="enterprise-bulk-anatomy" aria-label="Bulk actions anatomy diagram">
      <div className="enterprise-bulk-anatomy-table"><span /><span data-selected /><span data-selected /><span /></div>
      <div className="enterprise-bulk-anatomy-bar"><strong>2 selected</strong><span>Export</span><span>Assign</span><i>•••</i><i>×</i></div>
      <Marker number={1} className="enterprise-bulk-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-bulk-marker--two component-anatomy-marker--leader-up" />
      <Marker number={3} className="enterprise-bulk-marker--three component-anatomy-marker--leader-up" />
      <Marker number={4} className="enterprise-bulk-marker--four component-anatomy-marker--leader-left" />
      <Marker number={5} className="enterprise-bulk-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}

function ApprovalFlowAnatomy() {
  return (
    <div className="enterprise-approval-anatomy" aria-label="Approval flow anatomy diagram">
      <div className="enterprise-approval-anatomy-request"><span><small>APR-2048</small><strong>Access exception</strong></span><b>In review</b></div>
      <div className="enterprise-approval-anatomy-stages"><span>✓ Request</span><span>● Finance</span><span>→ Security</span></div>
      <div className="enterprise-approval-anatomy-checks"><span>✓ Manager</span><span>! Evidence</span></div>
      <div className="enterprise-approval-anatomy-actions"><i>Timeline</i><button type="button" tabIndex={-1}>Return</button><button type="button" tabIndex={-1}>Approve</button></div>
      <Marker number={1} className="enterprise-approval-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-approval-marker--two component-anatomy-marker--leader-down" />
      <Marker number={3} className="enterprise-approval-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-approval-marker--four component-anatomy-marker--leader-up" />
      <Marker number={5} className="enterprise-approval-marker--five component-anatomy-marker--leader-right" />
    </div>
  )
}

function RoleBasedAccessAnatomy() {
  return (
    <div className="enterprise-access-anatomy" aria-label="Role-based access anatomy diagram">
      <header><span>Identity: Viewer</span><strong>Workspace policy</strong></header>
      <section><div><small>Analytics</small><b>View</b></div><div className="restricted"><small>Billing export</small><b>Restricted</b></div></section>
      <footer><span>Finance Admin access required</span><button type="button" tabIndex={-1}>Request access</button></footer>
      <Marker number={1} className="enterprise-access-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-access-marker--two component-anatomy-marker--leader-down" />
      <Marker number={3} className="enterprise-access-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-access-marker--four component-anatomy-marker--leader-up" />
      <Marker number={5} className="enterprise-access-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}

function EmptyNoResultsAnatomy() {
  return (
    <div className="enterprise-empty-anatomy" aria-label="Empty no-results anatomy diagram">
      <div className="enterprise-empty-anatomy-visual"><i className="ti ti-filter-off" aria-hidden="true" /></div>
      <strong>No exceptions match</strong>
      <p>Clear a filter or broaden the environment.</p>
      <div className="enterprise-empty-anatomy-actions"><button type="button" tabIndex={-1}>Clear filters</button><span>View all</span></div>
      <small>Search and scope remain available.</small>
      <Marker number={1} className="enterprise-empty-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-empty-marker--two component-anatomy-marker--leader-right" />
      <Marker number={3} className="enterprise-empty-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-empty-marker--four component-anatomy-marker--leader-right" />
      <Marker number={5} className="enterprise-empty-marker--five component-anatomy-marker--leader-up" />
    </div>
  )
}

function ObjectDetailAnatomy() {
  return (
    <div className="enterprise-object-anatomy" aria-label="Object detail preview anatomy diagram">
      <header><span><small>WRK-1842</small><strong>Renewal risk review</strong></span><b>In review</b></header>
      <section><div><small>Owner</small><strong>Maya Chen</strong></div><div><small>Value</small><strong>$128,400</strong></div><div><small>Updated</small><strong>12m ago</strong></div></section>
      <div className="enterprise-object-anatomy-summary"><small>NEXT STEP</small><span>Confirm executive sponsor.</span></div>
      <footer><button type="button" tabIndex={-1}>Quick action</button><strong>Open full details →</strong></footer>
      <Marker number={1} className="enterprise-object-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-object-marker--two component-anatomy-marker--leader-left" />
      <Marker number={3} className="enterprise-object-marker--three component-anatomy-marker--leader-up" />
      <Marker number={4} className="enterprise-object-marker--four component-anatomy-marker--leader-left" />
      <Marker number={5} className="enterprise-object-marker--five component-anatomy-marker--leader-up" />
    </div>
  )
}

function ActivityAuditAnatomy() {
  return (
    <div className="enterprise-audit-anatomy" aria-label="Activity audit history anatomy diagram">
      <div className="enterprise-audit-anatomy-filters"><span>Search events</span><b>Actor</b><b>Policy</b></div>
      <header><strong>Today</strong><button type="button" tabIndex={-1}>Export</button></header>
      <section><i>MC</i><span><strong>Maya approved Production access</strong><small>Two-reviewer policy completed</small></span><time>09:42</time></section>
      <section><i>PS</i><span><strong>Policy service blocked an export</strong><small>Restricted identity fields</small></span><time>09:18</time></section>
      <Marker number={1} className="enterprise-audit-marker--one component-anatomy-marker--leader-right" />
      <Marker number={2} className="enterprise-audit-marker--two component-anatomy-marker--leader-left" />
      <Marker number={3} className="enterprise-audit-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-audit-marker--four component-anatomy-marker--leader-down" />
      <Marker number={5} className="enterprise-audit-marker--five component-anatomy-marker--leader-down" />
    </div>
  )
}

function SavedViewsAnatomy() {
  return (
    <div className="enterprise-saved-anatomy" aria-label="Saved views anatomy diagram">
      <header><span><strong>Renewals this month</strong><small>You · Updated 12m ago</small></span><b>Default</b><button type="button" tabIndex={-1}>•••</button></header>
      <section><div><small>FILTERS</small><span>Stage: Renewal</span><span>Close: This month</span></div><div><small>SORT</small><strong>Value ↓</strong></div></section>
      <footer><span><i className="ti ti-user" aria-hidden="true" />Personal</span><strong>4 columns configured</strong></footer>
      <Marker number={1} className="enterprise-saved-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-saved-marker--two component-anatomy-marker--leader-right" />
      <Marker number={3} className="enterprise-saved-marker--three component-anatomy-marker--leader-up" />
      <Marker number={4} className="enterprise-saved-marker--four component-anatomy-marker--leader-left" />
      <Marker number={5} className="enterprise-saved-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}

function DashboardAnatomy() {
  return (
    <div className="enterprise-dashboard-anatomy" aria-label="Dashboard floorplan anatomy diagram">
      <header><span><small>OPERATIONS</small><strong>Workspace health</strong></span><b>7 days</b></header>
      <section className="enterprise-dashboard-anatomy-metrics"><div><small>Requests</small><strong>1,248</strong></div><div><small>SLA</small><strong>98.6%</strong></div><div><small>Exceptions</small><strong>7</strong></div></section>
      <section className="enterprise-dashboard-anatomy-main"><div><small>TREND</small><i /><i /><i /><i /><i /></div><aside><small>ACTION REQUIRED</small><span /><span /></aside></section>
      <footer><div><small>WORK QUEUE</small><span /><span /></div><aside><small>INSIGHT</small><strong>18 min faster</strong></aside></footer>
      <Marker number={1} className="enterprise-dashboard-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-dashboard-marker--two component-anatomy-marker--leader-left" />
      <Marker number={3} className="enterprise-dashboard-marker--three component-anatomy-marker--leader-up" />
      <Marker number={4} className="enterprise-dashboard-marker--four component-anatomy-marker--leader-up" />
      <Marker number={5} className="enterprise-dashboard-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}

function ListReportAnatomy() {
  return (
    <div className="enterprise-list-report-anatomy" aria-label="List report floorplan anatomy diagram">
      <header><span>Search requests</span><b>Status</b><b>Risk</b></header>
      <div className="enterprise-list-report-anatomy-toolbar"><small>24 RECORDS</small><span>Compact</span><span data-action>Export</span></div>
      <section><div><i /><strong>Request</strong><strong>Owner</strong><strong>Status</strong></div><div><i /><span /><span /><b /></div><div><i /><span /><span /><b /></div><div><i /><span /><span /><b /></div></section>
      <div className="enterprise-list-report-anatomy-pager"><small>Showing 1–5 of 24</small><span>‹ 1 2 3 ›</span></div>
      <footer><span>Snapshot verified</span><strong>Generated 2m ago</strong></footer>
      <Marker number={1} className="enterprise-list-report-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-list-report-marker--two component-anatomy-marker--leader-left" />
      <Marker number={3} className="enterprise-list-report-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-list-report-marker--four component-anatomy-marker--leader-up" />
      <Marker number={5} className="enterprise-list-report-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}

function ObjectDetailFloorplanAnatomy() {
  return (
    <div className="enterprise-object-floorplan-anatomy" aria-label="Object detail floorplan anatomy diagram">
      <header><span><small>INC-4832</small><strong>Payment reconciliation delay</strong></span><b>Investigating</b></header>
      <section><div><small>Impact</small><strong>Limited</strong></div><div><small>Elapsed</small><strong>46 min</strong></div><div><small>Lag</small><strong>24 min</strong></div></section>
      <main><div><small>ACTIVITY</small><i /><i /><i /></div><aside><small>RELATIONSHIPS</small><span /><span /></aside></main>
      <footer><span><small>ACTIONS</small><strong>Edit incident</strong></span><b>Escalate</b></footer>
      <Marker number={1} className="enterprise-object-floorplan-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-object-floorplan-marker--two component-anatomy-marker--leader-left" />
      <Marker number={3} className="enterprise-object-floorplan-marker--three component-anatomy-marker--leader-up" />
      <Marker number={4} className="enterprise-object-floorplan-marker--four component-anatomy-marker--leader-left" />
      <Marker number={5} className="enterprise-object-floorplan-marker--five component-anatomy-marker--leader-up" />
    </div>
  )
}

export function EnterpriseAnatomyPreview({ resource }: { resource: EnterpriseResource }) {
  if (resource.slug === 'filtering-records') return <FilteringAnatomy />
  if (resource.slug === 'bulk-actions') return <BulkActionsAnatomy />
  if (resource.slug === 'approval-flow') return <ApprovalFlowAnatomy />
  if (resource.slug === 'role-based-access') return <RoleBasedAccessAnatomy />
  if (resource.slug === 'empty-no-results') return <EmptyNoResultsAnatomy />
  if (resource.slug === 'object-detail-preview') return <ObjectDetailAnatomy />
  if (resource.slug === 'activity-audit-history') return <ActivityAuditAnatomy />
  if (resource.slug === 'saved-views') return <SavedViewsAnatomy />
  if (resource.slug === 'dashboard') return <DashboardAnatomy />
  if (resource.slug === 'list-report') return <ListReportAnatomy />
  if (resource.slug === 'object-detail') return <ObjectDetailFloorplanAnatomy />

  return (
    <div className="enterprise-floorplan-diagram" aria-label={`${resource.title} anatomy diagram`}>
      <div>Context and title</div>
      <div>Primary controls</div>
      <div>Working area</div>
      <div>Outcome and feedback</div>
      <Marker number={1} className="enterprise-generic-marker--one component-anatomy-marker--leader-down" />
      <Marker number={2} className="enterprise-generic-marker--two component-anatomy-marker--leader-right" />
      <Marker number={3} className="enterprise-generic-marker--three component-anatomy-marker--leader-left" />
      <Marker number={4} className="enterprise-generic-marker--four component-anatomy-marker--leader-up" />
      <Marker number={5} className="enterprise-generic-marker--five component-anatomy-marker--leader-left" />
    </div>
  )
}
