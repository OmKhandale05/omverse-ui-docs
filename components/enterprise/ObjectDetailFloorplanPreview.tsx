'use client'

import { useState } from 'react'
import { Badge, Button, SegmentedControl, Select } from 'omverse-ui'

type DetailSection = 'overview' | 'activity' | 'relationships'

const EVENTS = [
  { time: '09:42', title: 'Incident moved to investigating', detail: 'Maya Chen · status policy applied' },
  { time: '09:18', title: 'Reconciliation lag exceeded threshold', detail: 'Monitoring service · 24 minute delay' },
  { time: '08:56', title: 'Runbook attached', detail: 'Jon Bell · Payments recovery v4' },
]

export function ObjectDetailFloorplanPreview() {
  const [section, setSection] = useState<DetailSection>('overview')
  const [editable, setEditable] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [priority, setPriority] = useState('High')
  const [owner, setOwner] = useState('Maya Chen')
  const [message, setMessage] = useState('Record verified · updated 8 minutes ago')

  function save() {
    setEditable(false)
    setMessage(`Changes saved · ${priority} priority · owned by ${owner}`)
  }

  return (
    <section className="enterprise-object-detail-preview" aria-label="Interactive incident object detail floorplan">
      <header className="enterprise-object-detail-header">
        <div>
          <span>INCIDENT · INC-4832</span>
          <h3>Payment reconciliation delay</h3>
          <p>Production · Payments platform</p>
        </div>
        <div className="enterprise-object-detail-header-actions">
          <Badge variant="tonal" color="warning" size="sm">Investigating</Badge>
          <Button variant="outlined" size="sm" onClick={() => { setReadOnly((value) => !value); setEditable(false) }}>
            <i className={`ti ${readOnly ? 'ti-lock-open' : 'ti-lock'}`} aria-hidden="true" />
            {readOnly ? 'Exit read-only' : 'Preview read-only'}
          </Button>
        </div>
      </header>

      <div className="enterprise-object-detail-status" role="status" aria-live="polite">
        <span><i aria-hidden="true" />Service impact contained</span><span>{message}</span>
      </div>

      <SegmentedControl
        aria-label="Object detail section"
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'activity', label: 'Activity' },
          { value: 'relationships', label: 'Relationships' },
        ]}
        value={section}
        onValueChange={(value) => setSection(value as DetailSection)}
        size="sm"
      />

      <div className="enterprise-object-detail-layout">
        <main className="enterprise-object-detail-main">
          {section === 'overview' && (
            <>
              <div className="enterprise-object-detail-metrics">
                <article><span>Customer impact</span><strong>Limited</strong><small>3 enterprise accounts</small></article>
                <article><span>Elapsed time</span><strong>46 min</strong><small>Target recovery &lt; 2h</small></article>
                <article><span>Reconciliation lag</span><strong>24 min</strong><small>Down from 31 min</small></article>
              </div>
              <article className="enterprise-object-detail-card">
                <header><div><span>OVERVIEW</span><h4>Incident attributes</h4></div><Badge variant="tonal" color="info" size="sm">Policy tracked</Badge></header>
                <dl>
                  <div><dt>Owner</dt><dd>{editable ? <Select aria-label="Incident owner" value={owner} onChange={setOwner} options={[{ value: 'Maya Chen', label: 'Maya Chen' }, { value: 'Jon Bell', label: 'Jon Bell' }, { value: 'Priya Shah', label: 'Priya Shah' }]} /> : owner}</dd></div>
                  <div><dt>Priority</dt><dd>{editable ? <Select aria-label="Incident priority" value={priority} onChange={setPriority} options={[{ value: 'Critical', label: 'Critical' }, { value: 'High', label: 'High' }, { value: 'Medium', label: 'Medium' }]} /> : priority}</dd></div>
                  <div><dt>Detected by</dt><dd>Reconciliation monitor</dd></div>
                  <div><dt>Next checkpoint</dt><dd>10:15 IST</dd></div>
                </dl>
              </article>
            </>
          )}

          {section === 'activity' && (
            <article className="enterprise-object-detail-card">
              <header><div><span>IMMUTABLE HISTORY</span><h4>Recent activity</h4></div><Button variant="text" size="sm">View complete audit</Button></header>
              <ol className="enterprise-object-detail-timeline">
                {EVENTS.map((event) => <li key={event.time}><time>{event.time}</time><i aria-hidden="true" /><span><strong>{event.title}</strong><small>{event.detail}</small></span></li>)}
              </ol>
            </article>
          )}

          {section === 'relationships' && (
            <article className="enterprise-object-detail-card">
              <header><div><span>RELATIONSHIPS</span><h4>Connected operational context</h4></div></header>
              <div className="enterprise-object-detail-relations">
                <button type="button"><i className="ti ti-server" aria-hidden="true" /><span><strong>Payments API</strong><small>Service · healthy</small></span><i className="ti ti-chevron-right" aria-hidden="true" /></button>
                <button type="button"><i className="ti ti-building" aria-hidden="true" /><span><strong>3 affected accounts</strong><small>Customer impact</small></span><i className="ti ti-chevron-right" aria-hidden="true" /></button>
                <button type="button"><i className="ti ti-book" aria-hidden="true" /><span><strong>Recovery runbook v4</strong><small>Verified 12 days ago</small></span><i className="ti ti-chevron-right" aria-hidden="true" /></button>
              </div>
            </article>
          )}
        </main>

        <aside className="enterprise-object-detail-rail" aria-labelledby="object-actions-heading">
          <span>ACTIONS</span><h4 id="object-actions-heading">Move the incident</h4>
          {readOnly ? (
            <div className="enterprise-object-detail-readonly"><i className="ti ti-lock" aria-hidden="true" /><strong>Read-only access</strong><p>Editing requires Incident Manager access.</p><Button variant="outlined" size="sm" onClick={() => setMessage('Access request sent to the incident owner')}>Request access</Button></div>
          ) : editable ? (
            <div className="enterprise-object-detail-edit-actions"><p>Review changed attributes before saving.</p><Button size="sm" onClick={save}>Save changes</Button><Button variant="text" size="sm" onClick={() => setEditable(false)}>Cancel</Button></div>
          ) : (
            <div className="enterprise-object-detail-actions"><Button size="sm" onClick={() => setEditable(true)}><i className="ti ti-edit" aria-hidden="true" />Edit incident</Button><Button variant="outlined" size="sm" onClick={() => setMessage('Incident escalated to the payments incident commander')}>Escalate</Button><Button variant="text" size="sm" onClick={() => setMessage('Update shared with 14 incident followers')}>Share update</Button></div>
          )}
          <hr />
          <dl><div><dt>Commander</dt><dd>Maya Chen</dd></div><div><dt>Followers</dt><dd>14 people</dd></div><div><dt>Policy</dt><dd>SEV-2 response</dd></div></dl>
        </aside>
      </div>
    </section>
  )
}
