'use client'

import { useMemo, useState } from 'react'
import { ActivityFeed, Alert, ApprovalCard, Button, Textarea, type ApprovalStatus } from 'omverse-ui'

const BASE_STAGES = [
  { id: 'request', label: 'Request', status: 'complete' as const, detail: 'Submitted by Asha' },
  { id: 'manager', label: 'Manager', status: 'complete' as const, detail: 'Approved by Noah' },
  { id: 'finance', label: 'Finance', status: 'current' as const, detail: 'Priya Shah' },
  { id: 'security', label: 'Security', status: 'upcoming' as const, detail: 'Next reviewer' },
]

export function ApprovalFlowPreview() {
  const [status, setStatus] = useState<ApprovalStatus>('in-review')
  const [rationale, setRationale] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const finalized = ['approved', 'rejected', 'returned'].includes(status)
  const stages = useMemo(() => BASE_STAGES.map((stage) => {
    if (status === 'approved') return { ...stage, status: 'complete' as const, detail: stage.id === 'security' ? 'Approved by Security' : stage.detail }
    if (status === 'rejected' && stage.id === 'finance') return { ...stage, status: 'blocked' as const, detail: 'Rejected by Priya' }
    if (status === 'returned' && stage.id === 'finance') return { ...stage, status: 'blocked' as const, detail: 'Returned for changes' }
    return stage
  }), [status])

  function decide(next: ApprovalStatus) {
    if ((next === 'rejected' || next === 'returned') && rationale.trim().length < 8) {
      setMessage('Add a clear rationale of at least 8 characters before returning or rejecting.')
      return
    }
    setLoading(true)
    setMessage('')
    window.setTimeout(() => {
      setStatus(next)
      setLoading(false)
      setMessage(next === 'approved' ? 'Approval recorded and routed to Security.' : next === 'returned' ? 'Request returned to Asha with your rationale.' : 'Request rejected and the requester was notified.')
    }, 650)
  }

  function reset() {
    setStatus('in-review')
    setRationale('')
    setMessage('')
  }

  return (
    <div className="enterprise-approval-preview">
      <div className="enterprise-approval-preview-heading"><div><span>GOVERNANCE QUEUE</span><h3>Access approval</h3></div><small>SLA: 3h 18m remaining</small></div>
      {message && <Alert tone={status === 'rejected' ? 'error' : status === 'returned' || status === 'in-review' ? 'warning' : 'success'} title={finalized ? 'Decision recorded' : 'Rationale required'}>{message}</Alert>}
      <ApprovalCard
        requestId="APR-2048"
        title="Production access exception"
        description="Temporary production access for the incident response window."
        status={status}
        requester="Asha Mehta · Platform operations"
        currentApprover="Priya Shah · Finance Lead"
        dueDate="Today, 5:00 PM"
        dueDateTime="2026-08-20T17:00:00+05:30"
        metadata="High risk · 8 hours"
        stages={stages}
        checks={[
          { id: 'manager', label: 'Manager approval', status: 'passed' },
          { id: 'expiry', label: 'Automatic expiry', status: 'passed', description: 'Access ends after 8 hours' },
          { id: 'evidence', label: 'Incident evidence', status: 'warning', description: 'Review attachment INC-492' },
          { id: 'security', label: 'Security review', status: status === 'approved' ? 'passed' : 'pending' },
        ]}
        loading={loading}
        loadingLabel="Recording decision and audit entry"
        readOnly={finalized}
        actions={<><Button variant="outlined" onClick={() => decide('returned')}>Return for changes</Button><Button variant="destructive" onClick={() => decide('rejected')}>Reject</Button><Button onClick={() => decide('approved')}>Approve and route</Button></>}
      />
      <div className="enterprise-approval-support">
        <section className="enterprise-approval-rationale" aria-labelledby="approval-rationale-heading">
          <div><span>DECISION INPUT</span><h4 id="approval-rationale-heading">Rationale</h4></div>
          <Textarea label="Reviewer rationale" value={rationale} onChange={(event) => { setRationale(event.target.value); setMessage('') }} placeholder="Explain exceptions, concerns, or return instructions" helperText="Required for reject and return decisions." disabled={finalized || loading} rows={4} />
          {finalized && <Button variant="text" onClick={reset}>Review another outcome</Button>}
        </section>
        <ActivityFeed title="Decision timeline" items={[
          { id: '1', actor: 'Asha Mehta', action: 'submitted', subject: 'APR-2048', timestamp: 'Today, 9:12 AM', description: 'Requested 8 hours of temporary access.', icon: 'file-text' },
          { id: '2', actor: 'Noah Williams', action: 'approved manager review', timestamp: 'Today, 10:04 AM', description: 'Incident response coverage confirmed.', icon: 'check-circle' },
          { id: '3', actor: finalized ? 'Priya Shah' : 'Workflow', action: finalized ? `recorded ${status}` : 'assigned Finance review', timestamp: finalized ? 'Just now' : 'Today, 10:05 AM', description: finalized && rationale ? rationale : 'SLA due today at 5:00 PM.', icon: finalized ? 'check-circle' : 'refresh', unread: !finalized },
        ]} size="sm" />
      </div>
    </div>
  )
}
