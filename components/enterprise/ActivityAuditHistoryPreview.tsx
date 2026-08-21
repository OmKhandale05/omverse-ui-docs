'use client'

import { useMemo, useState } from 'react'
import { AuditLog, Button, SearchField, type AuditLogEntry } from 'omverse-ui'

type AuditCategory = 'all' | 'identity' | 'policy'

type EnterpriseAuditEntry = AuditLogEntry & {
  category: Exclude<AuditCategory, 'all'>
}

const BASE_EVENTS: readonly EnterpriseAuditEntry[] = [
  {
    id: 'evt_4098', actor: 'Maya Chen', action: 'approved', target: 'Production access APR-2048',
    timestamp: '2026-08-21T09:42:00+05:30', tone: 'success',
    description: 'Two-reviewer policy completed. Access expires in 8 hours.', category: 'identity',
  },
  {
    id: 'evt_4097', actor: 'Policy service', action: 'blocked an export from', target: 'Customer accounts',
    timestamp: '2026-08-21T09:18:00+05:30', tone: 'warning',
    metadata: 'Restricted fields: customer_email, tax_id', category: 'policy',
  },
  {
    id: 'evt_4096', actor: 'Jon Bell', action: 'changed the role for', target: 'Priya Shah',
    timestamp: '2026-08-21T08:56:00+05:30', tone: 'info',
    metadata: 'Viewer → Operations Manager', category: 'identity',
  },
]

const LIVE_EVENT: EnterpriseAuditEntry = {
  id: 'evt_4099', actor: 'Security monitor', action: 'verified policy integrity for', target: 'Production workspace',
  timestamp: '2026-08-21T10:03:00+05:30', tone: 'success',
  description: 'No unauthorized policy changes detected.', category: 'policy',
}

const FILTERS: Array<{ id: AuditCategory; label: string }> = [
  { id: 'all', label: 'All events' },
  { id: 'identity', label: 'Identity' },
  { id: 'policy', label: 'Policy' },
]

export function ActivityAuditHistoryPreview() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<AuditCategory>('all')
  const [isLive, setIsLive] = useState(true)
  const [events, setEvents] = useState<readonly EnterpriseAuditEntry[]>(BASE_EVENTS)
  const [status, setStatus] = useState('Live stream connected')

  const visibleEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return events.filter((event) => {
      const matchesCategory = category === 'all' || event.category === category
      const searchable = `${event.actor} ${event.action} ${event.target} ${event.description ?? ''} ${event.metadata ?? ''}`.toLowerCase()
      return matchesCategory && (!normalized || searchable.includes(normalized))
    })
  }, [category, events, query])

  function addLiveEvent() {
    if (!isLive) {
      setStatus('Resume the stream before receiving new events.')
      return
    }
    if (events.some((event) => event.id === LIVE_EVENT.id)) {
      setStatus('Stream is current. No newer events are available.')
      return
    }
    setEvents((current) => [LIVE_EVENT, ...current])
    setStatus('1 new verified event received')
  }

  function toggleLive() {
    setIsLive((current) => !current)
    setStatus(isLive ? 'Live updates paused' : 'Live stream connected')
  }

  return (
    <div className="enterprise-audit-preview">
      <header className="enterprise-audit-preview-heading">
        <div><span>SECURITY OPERATIONS</span><h3>Activity and audit history</h3></div>
        <div className="enterprise-audit-live" data-paused={!isLive || undefined}><i aria-hidden="true" />{isLive ? 'Live' : 'Paused'}</div>
      </header>

      <div className="enterprise-audit-controls">
        <SearchField value={query} onValueChange={setQuery} placeholder="Search actor, object, or evidence" aria-label="Search audit history" />
        <div role="group" aria-label="Audit category">
          {FILTERS.map((filter) => (
            <Button key={filter.id} variant={category === filter.id ? 'filled' : 'text'} aria-pressed={category === filter.id} onClick={() => setCategory(filter.id)}>{filter.label}</Button>
          ))}
        </div>
        <Button variant="outlined" onClick={toggleLive}>{isLive ? 'Pause' : 'Resume'}</Button>
      </div>

      <div className="enterprise-audit-summary">
        <span><strong>{visibleEvents.length}</strong> matching events</span>
        <small>Retention: 365 days · Times shown in IST</small>
        <Button variant="text" onClick={() => setStatus(`Export prepared for ${visibleEvents.length} matching events`)}><i className="ti ti-download" aria-hidden="true" />Export evidence</Button>
      </div>

      <div className="enterprise-audit-log-region">
        <AuditLog
          entries={visibleEvents}
          groupByDate
          variant="bordered"
          size="sm"
          emptyState="No events match this investigation. Clear the search or choose another event type."
          onEntrySelect={(entry) => setStatus(`${entry.id} selected for evidence review`)}
        />
      </div>

      <footer className="enterprise-audit-preview-footer">
        <p role="status"><i className="ti ti-shield-check" aria-hidden="true" />{status}</p>
        <Button onClick={addLiveEvent}>Simulate verified event</Button>
      </footer>
    </div>
  )
}
