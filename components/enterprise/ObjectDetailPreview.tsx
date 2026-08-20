'use client'

import { useState } from 'react'
import { Button } from 'omverse-ui'

type PreviewRecord = {
  id: string
  title: string
  account: string
  owner: string
  status: string
  priority: 'Critical' | 'High' | 'Medium'
  updated: string
  value: string
  nextStep: string
  restricted?: boolean
}

const RECORDS: readonly PreviewRecord[] = [
  {
    id: 'WRK-1842',
    title: 'Renewal risk review',
    account: 'Northstar Labs',
    owner: 'Maya Chen',
    status: 'In review',
    priority: 'Critical',
    updated: '12 minutes ago',
    value: '$128,400',
    nextStep: 'Confirm executive sponsor before Friday.',
  },
  {
    id: 'WRK-1838',
    title: 'Security evidence request',
    account: 'Kinetic Health',
    owner: 'Jon Bell',
    status: 'Waiting',
    priority: 'High',
    updated: '48 minutes ago',
    value: '$76,900',
    nextStep: 'Attach the updated data-retention policy.',
  },
  {
    id: 'WRK-1821',
    title: 'Restricted acquisition review',
    account: 'Confidential account',
    owner: 'Legal operations',
    status: 'Restricted',
    priority: 'Medium',
    updated: 'Yesterday',
    value: 'Restricted',
    nextStep: 'Legal Reviewer access is required.',
    restricted: true,
  },
]

export function ObjectDetailPreview() {
  const [selectedId, setSelectedId] = useState(RECORDS[0].id)
  const [expanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState('')
  const selected = RECORDS.find((record) => record.id === selectedId) ?? RECORDS[0]

  function selectRecord(id: string) {
    setSelectedId(id)
    setExpanded(false)
    setFeedback('')
  }

  return (
    <div className="enterprise-object-preview">
      <header className="enterprise-object-preview-heading">
        <div><span>RENEWAL OPERATIONS</span><h3>Priority work</h3></div>
        <small>3 records · Updated just now</small>
      </header>

      <div className="enterprise-object-preview-workspace">
        <section className="enterprise-object-preview-list" aria-label="Work records">
          <div className="enterprise-object-preview-list-heading"><strong>Work items</strong><span>Sort: Priority</span></div>
          {RECORDS.map((record) => (
            <button
              key={record.id}
              type="button"
              className="enterprise-object-preview-row"
              data-selected={record.id === selected.id ? '' : undefined}
              aria-pressed={record.id === selected.id}
              onClick={() => selectRecord(record.id)}
            >
              <span><small>{record.id}</small><strong>{record.title}</strong><em>{record.account}</em></span>
              <b data-priority={record.priority.toLowerCase()}>{record.priority}</b>
            </button>
          ))}
        </section>

        <aside className="enterprise-object-preview-detail" aria-label={`${selected.id} preview`} aria-live="polite">
          {selected.restricted ? (
            <div className="enterprise-object-preview-restricted">
              <i className="ti ti-shield-lock" aria-hidden="true" />
              <span><small>{selected.id}</small><h4>Preview restricted</h4><p>This work item contains acquisition data available only to Legal Reviewers.</p></span>
              <Button variant="outlined" onClick={() => setFeedback('Legal Reviewer access requested.')}>Request access</Button>
            </div>
          ) : (
            <>
              <div className="enterprise-object-preview-detail-heading">
                <div><small>{selected.id}</small><h4>{selected.title}</h4><p>{selected.account}</p></div>
                <span data-status={selected.status.toLowerCase().replace(' ', '-')}>{selected.status}</span>
              </div>

              <dl className="enterprise-object-preview-fields">
                <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
                <div><dt>Renewal value</dt><dd>{selected.value}</dd></div>
                <div><dt>Updated</dt><dd>{selected.updated}</dd></div>
              </dl>

              {expanded && (
                <div className="enterprise-object-preview-expanded">
                  <span>NEXT RECOMMENDED STEP</span>
                  <p>{selected.nextStep}</p>
                  <small>Opening this context does not change the selected list row.</small>
                </div>
              )}

              <div className="enterprise-object-preview-actions">
                <Button variant="text" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded}>
                  {expanded ? 'Show less' : 'Quick preview'}
                </Button>
                <Button onClick={() => setFeedback(`${selected.id} full detail route opened.`)}>Open full details</Button>
              </div>
            </>
          )}
          {feedback && <p className="enterprise-object-preview-feedback" role="status">{feedback}</p>}
        </aside>
      </div>

      <p className="enterprise-object-preview-note"><i className="ti ti-layout-sidebar-right" aria-hidden="true" />Selection remains visible while the preview reveals only decision-critical context.</p>
    </div>
  )
}
