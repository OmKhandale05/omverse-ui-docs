'use client'

import { useState } from 'react'
import { Button, EmptyState } from 'omverse-ui'

type EmptyScenario = 'fresh' | 'filtered' | 'restricted'

const SCENARIOS: Array<{ id: EmptyScenario; label: string }> = [
  { id: 'fresh', label: 'No data yet' },
  { id: 'filtered', label: 'No match' },
  { id: 'restricted', label: 'No access' },
]

const COPY = {
  fresh: {
    eyebrow: 'FIRST USE',
    title: 'No policy exceptions yet',
    description: 'Create an exception when a team needs temporary access outside the standard workspace policy.',
  },
  filtered: {
    eyebrow: 'FILTERED RESULT',
    title: 'No exceptions match these filters',
    description: 'Nothing matches “Production” with status “Expired”. Clear the filters or broaden the environment.',
  },
  restricted: {
    eyebrow: 'PERMISSION LIMITED',
    title: 'Exception details are restricted',
    description: 'Security Admin access is required to view policy exceptions and their audit evidence.',
  },
} as const

export function EmptyNoResultsPreview() {
  const [scenario, setScenario] = useState<EmptyScenario>('filtered')
  const [resolved, setResolved] = useState(false)
  const current = COPY[scenario]

  function selectScenario(next: EmptyScenario) {
    setScenario(next)
    setResolved(false)
  }

  return (
    <div className="enterprise-empty-preview">
      <div className="enterprise-empty-preview-heading">
        <div><span>GOVERNANCE</span><h3>Policy exceptions</h3></div>
        <small>Workspace / Production</small>
      </div>

      <div className="enterprise-empty-scenario-switch" role="group" aria-label="Empty-state scenario">
        {SCENARIOS.map((item) => (
          <Button
            key={item.id}
            variant={scenario === item.id ? 'filled' : 'text'}
            aria-pressed={scenario === item.id}
            onClick={() => selectScenario(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="enterprise-empty-context">
        <span><i className="ti ti-filter" aria-hidden="true" />Environment: Production</span>
        {scenario === 'filtered' && <span><i className="ti ti-circle" aria-hidden="true" />Status: Expired</span>}
        <strong>{resolved && scenario === 'filtered' ? '3 results' : '0 results'}</strong>
      </div>

      <div className="enterprise-empty-outcome" aria-live="polite">
        {resolved && scenario === 'filtered' ? (
          <div className="enterprise-empty-results">
            <div><span><strong>Break-glass database access</strong><small>Production · Active</small></span><b>2h remaining</b></div>
            <div><span><strong>Vendor support session</strong><small>Production · Pending</small></span><b>Awaiting review</b></div>
            <div><span><strong>Incident response elevation</strong><small>Production · Active</small></span><b>6h remaining</b></div>
            <Button variant="text" onClick={() => setResolved(false)}>Restore filtered example</Button>
          </div>
        ) : resolved ? (
          <EmptyState
            status="success"
            size="sm"
            title={scenario === 'fresh' ? 'Exception draft created' : 'Access request sent'}
            description={scenario === 'fresh' ? 'The draft is ready for scope, duration, and reviewer details.' : 'A Security Admin will review your request and notify you of the decision.'}
            primaryAction={<Button variant="outlined" onClick={() => setResolved(false)}>Reset example</Button>}
          />
        ) : (
          <EmptyState
            status={scenario === 'filtered' ? 'search' : scenario === 'restricted' ? 'permission' : 'empty'}
            size="sm"
            title={current.title}
            description={current.description}
            primaryAction={
              <Button onClick={() => setResolved(true)}>
                {scenario === 'fresh' ? 'Create exception' : scenario === 'filtered' ? 'Clear filters' : 'Request access'}
              </Button>
            }
            secondaryAction={scenario === 'filtered' ? <Button variant="outlined" onClick={() => selectScenario('fresh')}>View all exceptions</Button> : undefined}
          >
            <p className="enterprise-empty-help"><span>{current.eyebrow}</span>{scenario === 'fresh' ? 'Exceptions are time-bound and always require an approver.' : scenario === 'filtered' ? 'Your search and scope stay available so you can revise them.' : 'Your current Viewer role still permits aggregate reporting.'}</p>
          </EmptyState>
        )}
      </div>

      <p className="enterprise-empty-preview-note"><i className="ti ti-info-circle" aria-hidden="true" />Keep the surrounding page context stable; replace only the results region with the empty-state guidance.</p>
    </div>
  )
}
