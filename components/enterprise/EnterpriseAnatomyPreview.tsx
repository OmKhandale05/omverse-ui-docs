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

export function EnterpriseAnatomyPreview({ resource }: { resource: EnterpriseResource }) {
  if (resource.slug === 'filtering-records') return <FilteringAnatomy />
  if (resource.slug === 'bulk-actions') return <BulkActionsAnatomy />

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
