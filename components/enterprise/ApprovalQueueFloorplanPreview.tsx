'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, SearchField, SegmentedControl } from 'omverse-ui'

const REQUESTS = [
  { id: 'APR-2048', title: 'Production access exception', requester: 'Asha Mehta', risk: 'High', due: '18 min', status: 'Unassigned', amount: '90-day access' },
  { id: 'APR-2044', title: 'Vendor renewal approval', requester: 'Jon Bell', risk: 'Medium', due: '1 hr', status: 'Claimed', amount: '$128,400 renewal' },
  { id: 'APR-2039', title: 'Customer data export', requester: 'Priya Shah', risk: 'High', due: '3 hrs', status: 'Policy check', amount: '24,810 records' },
] as const

export function ApprovalQueueFloorplanPreview() {
  const [scope, setScope] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('APR-2048')
  const [resolved, setResolved] = useState<string[]>([])
  const [claimed, setClaimed] = useState<string[]>([])
  const [rationale, setRationale] = useState('')
  const [message, setMessage] = useState('Queue synchronized · SLA policy current')
  const requests = useMemo(() => REQUESTS.filter((item) => !resolved.includes(item.id) && `${item.id} ${item.title} ${item.requester}`.toLowerCase().includes(query.toLowerCase()) && (scope === 'all' || (scope === 'urgent' ? item.risk === 'High' : item.status === 'Unassigned'))), [query, resolved, scope])
  const selected = REQUESTS.find((item) => item.id === selectedId) || REQUESTS[0]
  const isClaimed = claimed.includes(selected.id) || selected.status === 'Claimed'

  function decide(action: 'approved' | 'returned') {
    if (!rationale.trim()) { setMessage(`Add reviewer rationale before ${action === 'approved' ? 'approving' : 'returning'} this request`); return }
    setResolved((current) => [...current, selected.id])
    setMessage(`${selected.id} ${action} · decision evidence captured`)
    setRationale('')
    const next = REQUESTS.find((item) => item.id !== selected.id && !resolved.includes(item.id))
    if (next) setSelectedId(next.id)
  }

  return <section className="enterprise-approval-queue-preview" aria-label="Interactive approval queue floorplan">
    <header className="enterprise-admin-header"><div><span>GOVERNED DECISIONS</span><h3>Approval queue</h3><p>Prioritize policy-sensitive work, inspect evidence, and record accountable decisions.</p></div><Badge variant="tonal" color="warning" size="sm">{requests.length} awaiting review</Badge></header>
    <div className="enterprise-admin-status"><span><i aria-hidden="true" />Within operating SLA</span><span role="status" aria-live="polite">{message}</span></div>
    <div className="enterprise-approval-queue-toolbar"><SegmentedControl aria-label="Approval queue scope" items={[{ value: 'all', label: 'All work' }, { value: 'urgent', label: 'Urgent' }, { value: 'unassigned', label: 'Unassigned' }]} value={scope} onValueChange={setScope} size="sm" /><SearchField aria-label="Search approval queue" placeholder="Request, ID, or person" value={query} onValueChange={setQuery} /></div>
    <div className="enterprise-approval-queue-layout">
      <div className="enterprise-approval-queue-list" role="list" aria-label="Approval requests">
        {requests.map((item) => <button type="button" role="listitem" key={item.id} data-selected={selected.id === item.id || undefined} onClick={() => setSelectedId(item.id)}><header><small>{item.id}</small><Badge variant="tonal" color={item.risk === 'High' ? 'error' : 'warning'} size="sm">{item.risk} risk</Badge></header><strong>{item.title}</strong><p>{item.requester} · {item.amount}</p><footer><span><i className="ti ti-clock" aria-hidden="true" />Due in {item.due}</span><b>{claimed.includes(item.id) ? 'Claimed by you' : item.status}</b></footer></button>)}
        {!requests.length && <div className="enterprise-user-empty"><i className="ti ti-circle-check" aria-hidden="true" /><strong>No requests in this queue</strong><Button variant="text" size="sm" onClick={() => { setScope('all'); setQuery('') }}>View all work</Button></div>}
      </div>
      <main className="enterprise-approval-review">
        <header><div><span>DECISION REVIEW · {selected.id}</span><h4>{selected.title}</h4><p>Requested by {selected.requester}</p></div><Badge variant="tonal" color="info" size="sm">{isClaimed ? 'Owned by you' : 'Needs owner'}</Badge></header>
        <div className="enterprise-approval-review-grid"><article><span>REQUEST SCOPE</span><strong>{selected.amount}</strong><p>Production workspace · expires automatically · manager sponsored</p></article><article><span>POLICY EVIDENCE</span><strong>2 of 2 checks passed</strong><p>MFA verified · training current · no conflicting role</p></article></div>
        <section className="enterprise-approval-review-history"><span>REVIEW TRAIL</span><p><i>AM</i><span><strong>Request submitted</strong><small>Asha Mehta · 42 minutes ago</small></span></p><p><i>PS</i><span><strong>Automated policy checks completed</strong><small>Policy service · 39 minutes ago</small></span></p></section>
        <label>Decision rationale<textarea value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder="Record the evidence supporting this decision" /></label>
        <footer>{!isClaimed && <Button variant="outlined" size="sm" onClick={() => { setClaimed((current) => [...current, selected.id]); setMessage(`${selected.id} claimed by you`) }}>Claim request</Button>}<span /><Button variant="outlined" size="sm" onClick={() => decide('returned')}>Return</Button><Button size="sm" onClick={() => decide('approved')}>Approve</Button></footer>
      </main>
    </div>
  </section>
}
