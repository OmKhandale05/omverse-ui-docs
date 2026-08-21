'use client'

import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  DataTable,
  FilterBar,
  SavedViews,
  Select,
  type DataTableColumn,
  type FilterBarFilter,
  type SavedView,
} from 'omverse-ui'

const RECORDS = [
  { id: 'WK-1048', name: 'Quarterly access review', team: 'Security', status: 'Open', updated: '8 min ago' },
  { id: 'WK-1047', name: 'Vendor risk assessment', team: 'Finance', status: 'In review', updated: '24 min ago' },
  { id: 'WK-1046', name: 'Platform migration checklist', team: 'Platform', status: 'Open', updated: '1 hr ago' },
  { id: 'WK-1045', name: 'Renewal approval', team: 'Finance', status: 'Closed', updated: '2 hrs ago' },
  { id: 'WK-1044', name: 'Incident follow-up', team: 'Security', status: 'In review', updated: 'Yesterday' },
  { id: 'WK-1043', name: 'Workspace provisioning', team: 'Platform', status: 'Closed', updated: 'Yesterday' },
] as const

type WorkItem = (typeof RECORDS)[number]

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'In review', label: 'In review' },
  { value: 'Closed', label: 'Closed' },
]

const TEAM_OPTIONS = [
  { value: '', label: 'All teams' },
  { value: 'Security', label: 'Security' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Platform', label: 'Platform' },
]

const SAVED_VIEWS: SavedView[] = [
  { id: 'all', name: 'All work items', description: 'No filters applied', isDefault: true },
  { id: 'open', name: 'Open work', description: 'Status is Open', owner: 'You' },
  { id: 'finance-review', name: 'Finance review', description: 'Team is Finance · In review', shared: true },
]

export function FilteringRecordsPreview() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [team, setTeam] = useState('')
  const [activeView, setActiveView] = useState('all')
  const [viewsOpen, setViewsOpen] = useState(false)

  const results = useMemo(() => RECORDS.filter((record) => {
    const matchesQuery = `${record.id} ${record.name}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = !status || record.status === status
    const matchesTeam = !team || record.team === team
    return matchesQuery && matchesStatus && matchesTeam
  }), [query, status, team])

  const filters: FilterBarFilter[] = useMemo(() => [
    {
      id: 'status',
      label: 'Status',
      activeLabel: status || undefined,
      onClear: status ? () => setStatus('') : undefined,
      control: <Select aria-label="Status" value={status} options={STATUS_OPTIONS} onChange={setStatus} placeholder="All statuses" />,
    },
    {
      id: 'team',
      label: 'Team',
      activeLabel: team || undefined,
      onClear: team ? () => setTeam('') : undefined,
      control: <Select aria-label="Team" value={team} options={TEAM_OPTIONS} onChange={setTeam} placeholder="All teams" />,
    },
  ], [status, team])

  const columns: DataTableColumn<WorkItem>[] = useMemo(() => [
    {
      id: 'work-item',
      header: 'Work item',
      accessor: 'name',
      sortable: true,
      cell: (record) => <span className="enterprise-filter-record"><strong>{record.name}</strong><small>{record.id}</small></span>,
    },
    { id: 'team', header: 'Team', accessor: 'team', sortable: true },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      sortable: true,
      cell: (record) => (
        <Badge variant="tonal" color={record.status === 'Closed' ? 'success' : record.status === 'In review' ? 'warning' : 'default'}>
          {record.status}
        </Badge>
      ),
    },
    { id: 'updated', header: 'Updated', accessor: 'updated' },
  ], [])

  function clearAll() {
    setQuery('')
    setStatus('')
    setTeam('')
    setActiveView('all')
  }

  function applySavedView(id: string) {
    setActiveView(id)
    setQuery('')
    if (id === 'open') {
      setStatus('Open')
      setTeam('')
    } else if (id === 'finance-review') {
      setStatus('In review')
      setTeam('Finance')
    } else {
      setStatus('')
      setTeam('')
    }
  }

  return (
    <div className="enterprise-filter-preview">
      <div className="enterprise-filter-preview-topbar">
        <div><span>OPERATIONS</span><h3>Work items</h3></div>
        <Button variant="outlined" onClick={() => setViewsOpen((value) => !value)} aria-expanded={viewsOpen}>
          <i className="ti ti-bookmark" aria-hidden="true" />Saved views
        </Button>
      </div>

      <div className="enterprise-filter-preview-workspace" data-views-open={viewsOpen || undefined}>
        {viewsOpen && (
          <aside className="enterprise-filter-preview-views" aria-label="Saved filtering views">
            <SavedViews
              title="Saved views"
              views={SAVED_VIEWS}
              value={activeView}
              onValueChange={applySavedView}
              size="sm"
            />
          </aside>
        )}
        <div className="enterprise-filter-preview-content">
          <FilterBar
            variant="plain"
            size="sm"
            searchValue={query}
            onSearchChange={setQuery}
            searchLabel="Search work items"
            searchPlaceholder="ID or work item"
            filters={filters}
            resultCount={results.length}
            formatResultCount={(count) => `${count} ${count === 1 ? 'record' : 'records'}`}
            onReset={clearAll}
            resetLabel="Clear all filters"
            collapsible={false}
            actions={<Button variant="outlined">Export</Button>}
          />

          <div className="enterprise-filter-preview-table-wrap">
            <DataTable
              columns={columns}
              data={results}
              getRowId={(record) => record.id}
              caption="Filtered work items"
              variant="plain"
              size="sm"
              defaultSort={{ columnId: 'work-item', direction: 'asc' }}
              emptyState={
                <div className="enterprise-filter-empty">
                  <i className="ti ti-filter-off" aria-hidden="true" />
                  <strong>No matching work items</strong>
                  <span>Adjust or clear the filters to broaden your results.</span>
                  <Button variant="outlined" onClick={clearAll}>Clear all filters</Button>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <p className="enterprise-filter-preview-note"><i className="ti ti-info-circle" aria-hidden="true" />Try changing status and team filters. Every criterion stays visible and reversible.</p>
    </div>
  )
}
