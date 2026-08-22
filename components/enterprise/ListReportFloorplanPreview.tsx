'use client'

import { useMemo, useState, type Key } from 'react'
import {
  Badge,
  BulkActionBar,
  Button,
  ColumnManager,
  DataTable,
  FilterBar,
  Pagination,
  SegmentedControl,
  Select,
  type DataTableColumn,
  type FilterBarFilter,
} from 'omverse-ui'

const REPORT_ROWS = [
  { id: 'REQ-2918', request: 'Production access exception', team: 'Security', owner: 'Maya Chen', risk: 'High', status: 'In review', updated: '8 min ago' },
  { id: 'REQ-2917', request: 'Vendor renewal assessment', team: 'Finance', owner: 'Jon Bell', risk: 'Medium', status: 'Open', updated: '21 min ago' },
  { id: 'REQ-2916', request: 'Customer data export', team: 'Privacy', owner: 'Priya Shah', risk: 'High', status: 'Policy check', updated: '34 min ago' },
  { id: 'REQ-2915', request: 'Workspace role change', team: 'Platform', owner: 'Liam Garcia', risk: 'Low', status: 'Approved', updated: '1 hr ago' },
  { id: 'REQ-2914', request: 'Retention policy exception', team: 'Legal', owner: 'Asha Mehta', risk: 'Medium', status: 'Open', updated: '2 hrs ago' },
  { id: 'REQ-2913', request: 'Service account creation', team: 'Security', owner: 'Noah Williams', risk: 'Low', status: 'Approved', updated: '3 hrs ago' },
  { id: 'REQ-2912', request: 'Billing data correction', team: 'Finance', owner: 'Maya Chen', risk: 'Medium', status: 'In review', updated: 'Yesterday' },
  { id: 'REQ-2911', request: 'External collaborator access', team: 'Platform', owner: 'Jon Bell', risk: 'High', status: 'Open', updated: 'Yesterday' },
  { id: 'REQ-2910', request: 'Regional audit evidence', team: 'Legal', owner: 'Priya Shah', risk: 'Low', status: 'Policy check', updated: '2 days ago' },
  { id: 'REQ-2909', request: 'Payment approval threshold', team: 'Finance', owner: 'Asha Mehta', risk: 'High', status: 'Approved', updated: '2 days ago' },
] as const

type ReportRow = (typeof REPORT_ROWS)[number]
type Density = 'compact' | 'comfortable'

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'In review', label: 'In review' },
  { value: 'Policy check', label: 'Policy check' },
  { value: 'Approved', label: 'Approved' },
]

const RISK_OPTIONS = [
  { value: '', label: 'All risk levels' },
  { value: 'High', label: 'High risk' },
  { value: 'Medium', label: 'Medium risk' },
  { value: 'Low', label: 'Low risk' },
]

const MANAGED_COLUMNS = [
  { id: 'request', label: 'Request', description: 'Request name and immutable identifier', required: true },
  { id: 'team', label: 'Team', description: 'Owning operational team' },
  { id: 'owner', label: 'Owner', description: 'Current accountable person' },
  { id: 'risk', label: 'Risk', description: 'Resolved policy risk' },
  { id: 'status', label: 'Status', description: 'Current workflow state', required: true },
  { id: 'updated', label: 'Updated', description: 'Relative source recency' },
]

const PAGE_SIZE = 5

function statusColor(status: ReportRow['status']) {
  if (status === 'Approved') return 'success'
  if (status === 'Policy check') return 'warning'
  if (status === 'In review') return 'info'
  return 'default'
}

function riskColor(risk: ReportRow['risk']) {
  if (risk === 'High') return 'error'
  if (risk === 'Medium') return 'warning'
  return 'success'
}

export function ListReportFloorplanPreview() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [risk, setRisk] = useState('')
  const [density, setDensity] = useState<Density>('compact')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<readonly Key[]>([])
  const [visibleColumns, setVisibleColumns] = useState<readonly string[]>(MANAGED_COLUMNS.map((column) => column.id))
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [message, setMessage] = useState('Report generated 2 minutes ago · source snapshot verified')

  const filteredRows = useMemo(() => REPORT_ROWS.filter((row) => {
    const text = `${row.id} ${row.request} ${row.team} ${row.owner}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (!status || row.status === status) && (!risk || row.risk === risk)
  }), [query, risk, status])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const columns = useMemo<DataTableColumn<ReportRow>[]>(() => {
    const allColumns: DataTableColumn<ReportRow>[] = [
      {
        id: 'request',
        header: 'Request',
        accessor: 'request',
        sortable: true,
        cell: (row) => <span className="enterprise-list-report-record"><strong>{row.request}</strong><small>{row.id}</small></span>,
      },
      { id: 'team', header: 'Team', accessor: 'team', sortable: true },
      { id: 'owner', header: 'Owner', accessor: 'owner', sortable: true },
      { id: 'risk', header: 'Risk', accessor: 'risk', sortable: true, cell: (row) => <Badge variant="tonal" color={riskColor(row.risk)} size="sm">{row.risk}</Badge> },
      { id: 'status', header: 'Status', accessor: 'status', sortable: true, cell: (row) => <Badge variant="tonal" color={statusColor(row.status)} size="sm">{row.status}</Badge> },
      { id: 'updated', header: 'Updated', accessor: 'updated' },
    ]

    return allColumns.filter((column) => visibleColumns.includes(column.id))
  }, [visibleColumns])

  const filters: FilterBarFilter[] = useMemo(() => [
    {
      id: 'status',
      label: 'Status',
      activeLabel: status || undefined,
      onClear: status ? () => { setStatus(''); setPage(1) } : undefined,
      control: <Select aria-label="Report status" value={status} options={STATUS_OPTIONS} onChange={(value) => { setStatus(value); setPage(1) }} />,
    },
    {
      id: 'risk',
      label: 'Risk',
      activeLabel: risk || undefined,
      onClear: risk ? () => { setRisk(''); setPage(1) } : undefined,
      control: <Select aria-label="Report risk" value={risk} options={RISK_OPTIONS} onChange={(value) => { setRisk(value); setPage(1) }} />,
    },
  ], [risk, status])

  function resetFilters() {
    setQuery('')
    setStatus('')
    setRisk('')
    setPage(1)
  }

  function completeExport() {
    const scope = selectedIds.length ? `${selectedIds.length} selected records` : `${filteredRows.length} filtered records`
    setMessage(`Export prepared for ${scope} · sensitive identity fields masked · audit ID EXP-8842`)
    setExportOpen(false)
  }

  function completeBulkAction(action: string) {
    setMessage(`${action} queued for ${selectedIds.length} selected ${selectedIds.length === 1 ? 'record' : 'records'}`)
    setSelectedIds([])
  }

  return (
    <section className="enterprise-list-report-preview" aria-label="Interactive access request list report">
      <header className="enterprise-list-report-header">
        <div><span>GOVERNANCE REPORT</span><h3>Access requests</h3><p>Review policy-sensitive requests across every operational team.</p></div>
        <Badge variant="tonal" color="info" size="sm">Live snapshot</Badge>
      </header>

      <div className="enterprise-list-report-filters">
        <FilterBar
          variant="plain"
          size="sm"
          searchValue={query}
          onSearchChange={(value) => { setQuery(value); setPage(1) }}
          searchLabel="Search access request report"
          searchPlaceholder="Request, ID, team, or owner"
          filters={filters}
          resultCount={filteredRows.length}
          formatResultCount={(count) => `${count} ${count === 1 ? 'record' : 'records'}`}
          onReset={resetFilters}
          resetLabel="Clear report filters"
          collapsible={false}
        />
      </div>

      <div className="enterprise-list-report-toolbar" aria-label="Report controls">
        <div>
          <SegmentedControl
            aria-label="Report row density"
            items={[{ value: 'compact', label: 'Compact' }, { value: 'comfortable', label: 'Comfortable' }]}
            value={density}
            onValueChange={(value) => setDensity(value as Density)}
            size="sm"
          />
        </div>
        <div>
          <Button variant="outlined" size="sm" aria-expanded={columnsOpen} onClick={() => setColumnsOpen((open) => !open)}>
            <i className="ti ti-columns-3" aria-hidden="true" /> Columns
          </Button>
          <Button variant="filled" size="sm" aria-expanded={exportOpen} onClick={() => setExportOpen(true)}>
            <i className="ti ti-download" aria-hidden="true" /> Export
          </Button>
        </div>
      </div>

      {columnsOpen && (
        <div className="enterprise-list-report-columns">
          <ColumnManager
            title="Visible report columns"
            columns={MANAGED_COLUMNS}
            value={visibleColumns}
            onValueChange={setVisibleColumns}
            onReset={() => setVisibleColumns(MANAGED_COLUMNS.map((column) => column.id))}
            searchable={false}
            size="sm"
            variant="outlined"
          />
        </div>
      )}

      {exportOpen && (
        <section className="enterprise-list-report-export" aria-labelledby="list-report-export-heading">
          <i className="ti ti-file-export" aria-hidden="true" />
          <div>
            <h4 id="list-report-export-heading">Prepare governed export</h4>
            <p>{selectedIds.length ? `${selectedIds.length} selected records` : `${filteredRows.length} filtered records`} · CSV · identity fields masked</p>
          </div>
          <div><Button variant="text" size="sm" onClick={() => setExportOpen(false)}>Cancel</Button><Button size="sm" onClick={completeExport}>Prepare export</Button></div>
        </section>
      )}

      <div className="enterprise-list-report-table-wrap">
        <DataTable
          columns={columns}
          data={pageRows}
          getRowId={(row) => row.id}
          caption="Access request governance report"
          selectable
          selectedRowIds={selectedIds}
          onSelectionChange={setSelectedIds}
          defaultSort={{ columnId: 'request', direction: 'asc' }}
          variant="plain"
          size={density === 'compact' ? 'sm' : 'md'}
          stickyHeader
          emptyState={<div className="enterprise-list-report-empty"><i className="ti ti-filter-off" aria-hidden="true" /><strong>No requests match</strong><Button variant="outlined" size="sm" onClick={resetFilters}>Clear filters</Button></div>}
        />
      </div>

      <div className="enterprise-list-report-bulk">
        <BulkActionBar
          selectedCount={selectedIds.length}
          totalCount={filteredRows.length}
          description="Report selection"
          onClearSelection={() => setSelectedIds([])}
          actions={<><Button variant="outlined" size="sm" onClick={() => completeBulkAction('Reviewer assignment')}>Assign reviewer</Button><Button size="sm" onClick={() => setExportOpen(true)}>Export selected</Button></>}
        />
      </div>

      <footer className="enterprise-list-report-footer">
        <div><strong>Showing {filteredRows.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(safePage * PAGE_SIZE, filteredRows.length)} of {filteredRows.length}</strong><span role="status" aria-live="polite">{message}</span></div>
        <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} variant="simple" size="sm" showPrevNext />
      </footer>
    </section>
  )
}
