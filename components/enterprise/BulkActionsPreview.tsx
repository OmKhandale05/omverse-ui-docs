'use client'

import { useMemo, useState, type Key } from 'react'
import { Badge, BulkActionBar, Button, DataTable, type DataTableColumn } from 'omverse-ui'

const WORK_ITEMS = [
  { id: 'WK-2051', name: 'Vendor access review', owner: 'Asha Mehta', status: 'Ready', locked: false },
  { id: 'WK-2050', name: 'Quarterly policy update', owner: 'Noah Williams', status: 'Ready', locked: false },
  { id: 'WK-2049', name: 'Invoice exception', owner: 'Maya Chen', status: 'Blocked', locked: true },
  { id: 'WK-2048', name: 'Workspace migration', owner: 'Liam Garcia', status: 'Ready', locked: false },
  { id: 'WK-2047', name: 'Retention request', owner: 'Aarav Shah', status: 'In review', locked: false },
] as const

type WorkItem = (typeof WORK_ITEMS)[number]

export function BulkActionsPreview() {
  const [selectedIds, setSelectedIds] = useState<readonly Key[]>([])
  const [result, setResult] = useState('')

  const columns: DataTableColumn<WorkItem>[] = useMemo(() => [
    { id: 'name', header: 'Work item', accessor: 'name', cell: (row) => <span className="enterprise-bulk-record"><strong>{row.name}</strong><small>{row.id}</small></span> },
    { id: 'owner', header: 'Owner', accessor: 'owner' },
    { id: 'status', header: 'Status', accessor: 'status', cell: (row) => <Badge variant="tonal" color={row.status === 'Blocked' ? 'warning' : row.status === 'Ready' ? 'success' : 'default'}>{row.status}</Badge> },
  ], [])

  function complete(action: string) {
    setResult(`${action} completed for ${selectedIds.length} ${selectedIds.length === 1 ? 'record' : 'records'}.`)
    setSelectedIds([])
  }

  return (
    <div className="enterprise-bulk-preview">
      <div className="enterprise-bulk-preview-heading"><div><span>OPERATIONS QUEUE</span><h3>Access requests</h3></div><small>One locked record cannot be selected</small></div>
      {result && <div className="enterprise-bulk-result" role="status"><i className="ti ti-circle-check" aria-hidden="true" />{result}<button type="button" onClick={() => setResult('')}>Dismiss</button></div>}
      <DataTable
        columns={columns}
        data={WORK_ITEMS}
        getRowId={(row) => row.id}
        caption="Access requests available for bulk actions"
        selectable
        selectedRowIds={selectedIds}
        onSelectionChange={(ids) => { setSelectedIds(ids); setResult('') }}
        isRowDisabled={(row) => row.locked}
        variant="plain"
        size="sm"
      />
      <div className="enterprise-bulk-preview-bar">
        <BulkActionBar
          selectedCount={selectedIds.length}
          totalCount={WORK_ITEMS.filter((item) => !item.locked).length}
          description="Eligible access requests"
          onClearSelection={() => setSelectedIds([])}
          actions={<><Button variant="outlined" onClick={() => complete('Export')}>Export</Button><Button onClick={() => complete('Assignment')}>Assign reviewer</Button></>}
          overflowActions={<><Button variant="text" className="w-full justify-start" onClick={() => complete('Queue move')}>Move to queue</Button><Button variant="destructive" className="w-full justify-start" onClick={() => complete('Archive')}>Archive</Button></>}
        />
      </div>
      {selectedIds.length === 0 && !result && <p className="enterprise-bulk-hint"><i className="ti ti-checkbox" aria-hidden="true" />Select one or more eligible rows to reveal bulk actions.</p>}
    </div>
  )
}
