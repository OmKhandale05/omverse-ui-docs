'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, SearchField, SegmentedControl, Select } from 'omverse-ui'

type WorkStatus = 'Ready' | 'In progress' | 'Blocked' | 'Done'
type WorkLayout = 'list' | 'board'

const INITIAL_ITEMS = [
  { id: 'WRK-1842', title: 'Resolve billing reconciliation exception', team: 'Finance Ops', owner: 'Maya Chen', priority: 'High', status: 'In progress' as WorkStatus, due: 'Today · 16:00', detail: 'Validate the payment ledger, document the variance, and notify the account owner.' },
  { id: 'WRK-1838', title: 'Review production access evidence', team: 'Security', owner: 'Unassigned', priority: 'Critical', status: 'Ready' as WorkStatus, due: 'Today · 17:30', detail: 'Confirm manager sponsorship and current security training before assignment.' },
  { id: 'WRK-1831', title: 'Repair customer export policy mapping', team: 'Privacy', owner: 'Priya Shah', priority: 'Medium', status: 'Blocked' as WorkStatus, due: 'Tomorrow', detail: 'Waiting for the regional retention policy identifier from Legal.' },
  { id: 'WRK-1826', title: 'Publish renewal risk summary', team: 'Customer Ops', owner: 'Jon Bell', priority: 'Low', status: 'Done' as WorkStatus, due: 'Completed', detail: 'Weekly renewal risk summary published to the account leadership workspace.' },
]

function statusColor(status: WorkStatus) {
  if (status === 'Done') return 'success'
  if (status === 'Blocked') return 'error'
  if (status === 'In progress') return 'info'
  return 'default'
}

export function WorkItemsTemplatePreview() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [layout, setLayout] = useState<WorkLayout>('list')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [selectedId, setSelectedId] = useState(INITIAL_ITEMS[0].id)
  const [createOpen, setCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [message, setMessage] = useState('Queue synchronized · 12 active items across 4 teams')

  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesQuery = `${item.id} ${item.title} ${item.team} ${item.owner}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (!status || item.status === status)
  }), [items, query, status])
  const selected = items.find((item) => item.id === selectedId) || items[0]

  function updateSelected(patch: Partial<(typeof INITIAL_ITEMS)[number]>, announcement: string) {
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, ...patch } : item))
    setMessage(`${selected.id} ${announcement} · history event recorded`)
  }

  function createItem() {
    if (!newTitle.trim()) { setMessage('Add a clear, action-oriented title before creating the work item'); return }
    const next = { id: `WRK-${1850 + items.length}`, title: newTitle.trim(), team: 'Operations', owner: 'Unassigned', priority: 'Medium', status: 'Ready' as WorkStatus, due: 'Not scheduled', detail: 'New work item awaiting classification and ownership.' }
    setItems((current) => [next, ...current]); setSelectedId(next.id); setNewTitle(''); setCreateOpen(false); setMessage(`${next.id} created and ready for triage`)
  }

  return <section className="enterprise-template-shell enterprise-work-items-template" aria-label="Interactive work items template">
    <header className="enterprise-template-header"><div><span>OPERATIONS WORKSPACE</span><h3>Work items</h3><p>Classify, assign, and move cross-functional work from one durable queue.</p></div><Button size="sm" onClick={() => setCreateOpen((open) => !open)}><i className="ti ti-plus" aria-hidden="true" />New work item</Button></header>
    <div className="enterprise-template-status"><span><i aria-hidden="true" />Workflow service available</span><span role="status" aria-live="polite">{message}</span></div>
    {createOpen && <section className="enterprise-template-create" aria-labelledby="create-work-item-heading"><div><span>NEW WORK ITEM</span><h4 id="create-work-item-heading">Capture actionable work</h4></div><label>Title<input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Describe the outcome to complete" /></label><div><Button variant="text" size="sm" onClick={() => setCreateOpen(false)}>Cancel</Button><Button size="sm" onClick={createItem}>Create item</Button></div></section>}
    <div className="enterprise-work-items-toolbar"><SearchField aria-label="Search work items" placeholder="Search title, ID, team, or owner" value={query} onValueChange={setQuery} /><Select aria-label="Filter work items by status" value={status} onChange={setStatus} options={[{ value: '', label: 'All statuses' }, { value: 'Ready', label: 'Ready' }, { value: 'In progress', label: 'In progress' }, { value: 'Blocked', label: 'Blocked' }, { value: 'Done', label: 'Done' }]} /><SegmentedControl aria-label="Work item layout" items={[{ value: 'list', label: 'List' }, { value: 'board', label: 'Board' }]} value={layout} onValueChange={(value) => setLayout(value as WorkLayout)} size="sm" /></div>
    <div className="enterprise-work-items-layout">
      <main className="enterprise-work-items-workspace">
        <header><div><span>ACTIVE QUEUE</span><strong>{visibleItems.length} matching items</strong></div><Badge variant="tonal" color="warning" size="sm">{items.filter((item) => item.status === 'Blocked').length} blocked</Badge></header>
        <div className={layout === 'board' ? 'enterprise-work-items-board' : 'enterprise-work-items-list'} role="list" aria-label={`${layout} of work items`}>
          {visibleItems.map((item) => <button type="button" role="listitem" key={item.id} data-selected={item.id === selected.id || undefined} onClick={() => setSelectedId(item.id)}><header><small>{item.id} · {item.team}</small><Badge variant="tonal" color={statusColor(item.status)} size="sm">{item.status}</Badge></header><strong>{item.title}</strong><footer><span><i className="ti ti-user" aria-hidden="true" />{item.owner}</span><span><i className="ti ti-calendar" aria-hidden="true" />{item.due}</span><b>{item.priority}</b></footer></button>)}
          {!visibleItems.length && <div className="enterprise-template-empty"><i className="ti ti-filter-off" aria-hidden="true" /><strong>No work matches this view</strong><Button variant="text" size="sm" onClick={() => { setQuery(''); setStatus('') }}>Clear filters</Button></div>}
        </div>
      </main>
      <aside className="enterprise-work-item-detail" aria-labelledby="work-item-detail-heading"><header><span>SELECTED ITEM · {selected.id}</span><h4 id="work-item-detail-heading">{selected.title}</h4><p>{selected.detail}</p></header><dl><div><dt>Team</dt><dd>{selected.team}</dd></div><div><dt>Due</dt><dd>{selected.due}</dd></div><div><dt>Priority</dt><dd>{selected.priority}</dd></div></dl><label>Owner<Select aria-label={`Owner for ${selected.id}`} value={selected.owner} onChange={(owner) => updateSelected({ owner }, `assigned to ${owner}`)} options={[{ value: 'Unassigned', label: 'Unassigned' }, { value: 'Maya Chen', label: 'Maya Chen' }, { value: 'Jon Bell', label: 'Jon Bell' }, { value: 'Priya Shah', label: 'Priya Shah' }]} /></label><label>Status<Select aria-label={`Status for ${selected.id}`} value={selected.status} onChange={(next) => updateSelected({ status: next as WorkStatus }, `moved to ${next}`)} options={[{ value: 'Ready', label: 'Ready' }, { value: 'In progress', label: 'In progress' }, { value: 'Blocked', label: 'Blocked' }, { value: 'Done', label: 'Done' }]} /></label><section><span>RECENT HISTORY</span><p><i className="ti ti-history" aria-hidden="true" /><span><strong>Priority confirmed</strong><small>Policy service · 18 minutes ago</small></span></p><p><i className="ti ti-user-check" aria-hidden="true" /><span><strong>Ownership reviewed</strong><small>Operations lead · 42 minutes ago</small></span></p></section><Button variant="outlined" size="sm">Open complete work item</Button></aside>
    </div>
  </section>
}
