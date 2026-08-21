'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, SearchField, SegmentedControl } from 'omverse-ui'

const APPROVALS = [
  { id: 'APR-3048', title: 'Production access exception', requester: 'Asha Mehta', type: 'Access', priority: 'High', stage: 'Security review', due: '18 min', evidence: ['Manager sponsorship verified', 'Security training current', 'Access expires in 90 days'] },
  { id: 'APR-3044', title: 'Vendor renewal authorization', requester: 'Jon Bell', type: 'Spend', priority: 'Medium', stage: 'Finance review', due: '1 hr', evidence: ['Budget owner confirmed', 'Risk assessment attached', 'Renewal value: $128,400'] },
  { id: 'APR-3039', title: 'Customer data export', requester: 'Priya Shah', type: 'Privacy', priority: 'High', stage: 'Policy review', due: '3 hrs', evidence: ['Purpose limitation recorded', '24,810 records requested', 'Regional policy mapped'] },
] as const

type QueueScope = 'mine' | 'team' | 'urgent'

export function ApprovalsTemplatePreview() {
  const [scope, setScope] = useState<QueueScope>('mine')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('APR-3048')
  const [claimed, setClaimed] = useState<string[]>([])
  const [resolved, setResolved] = useState<string[]>([])
  const [rationale, setRationale] = useState('')
  const [message, setMessage] = useState('Decision policy current · reviewer availability verified')
  const queue = useMemo(() => APPROVALS.filter((item) => !resolved.includes(item.id) && `${item.id} ${item.title} ${item.requester} ${item.type}`.toLowerCase().includes(query.toLowerCase()) && (scope !== 'urgent' || item.priority === 'High')), [query, resolved, scope])
  const selected = APPROVALS.find((item) => item.id === selectedId) || APPROVALS[0]
  const owned = claimed.includes(selected.id)

  function decide(outcome: 'approved' | 'returned') {
    if (!owned) { setMessage(`Claim ${selected.id} before recording a decision`); return }
    if (!rationale.trim()) { setMessage(`Add rationale before this request can be ${outcome}`); return }
    setResolved((current) => [...current, selected.id]); setRationale(''); setMessage(`${selected.id} ${outcome} · immutable decision DEC-7742 recorded`)
    const next = APPROVALS.find((item) => item.id !== selected.id && !resolved.includes(item.id)); if (next) setSelectedId(next.id)
  }

  return <section className="enterprise-template-shell enterprise-approvals-template" aria-label="Interactive approvals template">
    <header className="enterprise-template-header"><div><span>DECISION WORKSPACE</span><h3>Approvals</h3><p>Review recurring requests with stable evidence, reviewer ownership, and decision integrity.</p></div><Badge variant="tonal" color="warning" size="sm">{queue.length} decisions pending</Badge></header>
    <div className="enterprise-template-status"><span><i aria-hidden="true" />Approval policy available</span><span role="status" aria-live="polite">{message}</span></div>
    <div className="enterprise-approvals-template-toolbar"><SegmentedControl aria-label="Approval template queue scope" items={[{ value: 'mine', label: 'My queue' }, { value: 'team', label: 'Team queue' }, { value: 'urgent', label: 'Urgent' }]} value={scope} onValueChange={(value) => setScope(value as QueueScope)} size="sm" /><SearchField aria-label="Search approval template queue" placeholder="Request, ID, person, or type" value={query} onValueChange={setQuery} /></div>
    <div className="enterprise-approvals-template-summary"><article><span>AWAITING</span><strong>{queue.length}</strong><small>Ready for review</small></article><article><span>NEAR SLA</span><strong>1</strong><small>Due within 30 min</small></article><article><span>COMPLETED TODAY</span><strong>{12 + resolved.length}</strong><small>100% rationale captured</small></article><aside><span>REVIEWER CHAIN</span><div><i>MC</i><b>→</b><i>PS</i><b>→</b><i>JB</i></div><small>Operations · Security · Finance</small></aside></div>
    <div className="enterprise-approvals-template-layout">
      <div className="enterprise-approvals-template-queue" role="list" aria-label="Reusable approval decision queue">{queue.map((item) => <button type="button" role="listitem" key={item.id} data-selected={selected.id === item.id || undefined} onClick={() => setSelectedId(item.id)}><header><small>{item.id} · {item.type}</small><Badge variant="tonal" color={item.priority === 'High' ? 'error' : 'warning'} size="sm">{item.priority}</Badge></header><strong>{item.title}</strong><p>{item.requester} · {item.stage}</p><footer><span><i className="ti ti-clock" aria-hidden="true" />Due in {item.due}</span><b>{claimed.includes(item.id) ? 'Owned by you' : 'Unclaimed'}</b></footer></button>)}{!queue.length && <div className="enterprise-template-empty"><i className="ti ti-circle-check" aria-hidden="true" /><strong>This decision queue is clear</strong><Button variant="text" size="sm" onClick={() => { setScope('team'); setQuery('') }}>View team queue</Button></div>}</div>
      <main className="enterprise-approvals-template-decision"><header><div><span>DECISION CARD · {selected.id}</span><h4>{selected.title}</h4><p>Requested by {selected.requester} · {selected.stage}</p></div><Badge variant="tonal" color={owned ? 'success' : 'default'} size="sm">{owned ? 'Owned by you' : 'Needs owner'}</Badge></header><section className="enterprise-approvals-evidence"><header><span>REQUIRED EVIDENCE</span><strong>{selected.evidence.length} checks available</strong></header>{selected.evidence.map((evidence) => <p key={evidence}><i className="ti ti-circle-check" aria-hidden="true" />{evidence}</p>)}</section><section className="enterprise-approvals-history"><span>IMMUTABLE HISTORY</span><p><i>AM</i><span><strong>Request submitted</strong><small>{selected.requester} · 42 minutes ago</small></span></p><p><i>PS</i><span><strong>Policy evidence verified</strong><small>Policy service · 39 minutes ago</small></span></p></section><label>Decision rationale <span aria-hidden="true">*</span><textarea required value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder="Explain which evidence supports the decision" /></label><footer>{!owned && <Button variant="outlined" size="sm" onClick={() => { setClaimed((current) => [...current, selected.id]); setMessage(`${selected.id} claimed · reviewer ownership recorded`) }}>Claim review</Button>}<span /><Button variant="outlined" size="sm" onClick={() => decide('returned')}>Return for revision</Button><Button size="sm" onClick={() => decide('approved')}>Approve request</Button></footer></main>
    </div>
  </section>
}
