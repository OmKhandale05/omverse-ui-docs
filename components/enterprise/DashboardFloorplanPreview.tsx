'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, SegmentedControl } from 'omverse-ui'

type Range = '7d' | '30d' | '90d'

const RANGE_OPTIONS = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
]

const RANGE_DATA: Record<Range, {
  metrics: Array<{ label: string; value: string; trend: string; tone: 'success' | 'warning' | 'info' }>
  throughput: number[]
}> = {
  '7d': {
    metrics: [
      { label: 'Requests processed', value: '1,248', trend: '12.4% above last week', tone: 'success' },
      { label: 'SLA attainment', value: '98.6%', trend: '0.8 points higher', tone: 'success' },
      { label: 'Open exceptions', value: '7', trend: '2 need attention', tone: 'warning' },
      { label: 'Median approval', value: '2.4h', trend: '18 minutes faster', tone: 'info' },
    ],
    throughput: [44, 58, 51, 72, 66, 84, 77],
  },
  '30d': {
    metrics: [
      { label: 'Requests processed', value: '5,432', trend: '8.1% above prior period', tone: 'success' },
      { label: 'SLA attainment', value: '97.9%', trend: '0.2 points lower', tone: 'warning' },
      { label: 'Open exceptions', value: '12', trend: '4 need attention', tone: 'warning' },
      { label: 'Median approval', value: '2.7h', trend: '6 minutes faster', tone: 'info' },
    ],
    throughput: [38, 48, 45, 62, 58, 73, 69, 82, 76, 88],
  },
  '90d': {
    metrics: [
      { label: 'Requests processed', value: '15,806', trend: '16.3% above prior quarter', tone: 'success' },
      { label: 'SLA attainment', value: '98.2%', trend: '1.1 points higher', tone: 'success' },
      { label: 'Open exceptions', value: '18', trend: '5 need attention', tone: 'warning' },
      { label: 'Median approval', value: '2.9h', trend: '24 minutes faster', tone: 'info' },
    ],
    throughput: [31, 40, 46, 52, 49, 63, 68, 72, 78, 86, 82, 91],
  },
}

const QUEUE = [
  { id: 'APR-2048', title: 'Production access exception', owner: 'Maya Chen', due: '18 min', status: 'Escalated' },
  { id: 'APR-2044', title: 'Vendor renewal approval', owner: 'Jon Bell', due: '1 hr', status: 'In review' },
  { id: 'APR-2039', title: 'Data export request', owner: 'Priya Shah', due: '3 hrs', status: 'Policy check' },
]

export function DashboardFloorplanPreview() {
  const [range, setRange] = useState<Range>('7d')
  const [handledItems, setHandledItems] = useState<string[]>([])
  const [updateMessage, setUpdateMessage] = useState('Live data · updated 2 minutes ago')
  const data = RANGE_DATA[range]

  const queue = useMemo(
    () => QUEUE.filter((item) => !handledItems.includes(item.id)),
    [handledItems],
  )

  function refresh() {
    setUpdateMessage('Dashboard refreshed · all sources current')
  }

  function markHandled(id: string) {
    setHandledItems((items) => [...items, id])
    setUpdateMessage(`${id} moved to the active review queue`)
  }

  return (
    <section className="enterprise-dashboard-preview" aria-label="Interactive operations dashboard floorplan">
      <header className="enterprise-dashboard-header">
        <div>
          <span className="enterprise-dashboard-kicker">OPERATIONS CONTROL</span>
          <h3>Good morning, Maya</h3>
          <p>Review service health and act on the work that could miss policy.</p>
        </div>
        <div className="enterprise-dashboard-controls">
          <SegmentedControl
            aria-label="Dashboard reporting range"
            items={RANGE_OPTIONS}
            value={range}
            onValueChange={(value) => setRange(value as Range)}
            size="sm"
          />
          <Button variant="outlined" size="sm" onClick={refresh}>
            <i className="ti ti-refresh" aria-hidden="true" /> Refresh
          </Button>
        </div>
      </header>

      <div className="enterprise-dashboard-status">
        <span><i aria-hidden="true" />Systems operational</span>
        <span role="status" aria-live="polite">{updateMessage}</span>
      </div>

      <div className="enterprise-dashboard-metrics" aria-label="Key performance indicators">
        {data.metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small data-tone={metric.tone}>
              <i className={`ti ${metric.tone === 'warning' ? 'ti-alert-triangle' : 'ti-trending-up'}`} aria-hidden="true" />
              {metric.trend}
            </small>
          </article>
        ))}
      </div>

      <div className="enterprise-dashboard-primary-grid">
        <article className="enterprise-dashboard-panel enterprise-dashboard-throughput">
          <header>
            <div><span>THROUGHPUT</span><h4>Completed requests</h4></div>
            <Badge variant="tonal" color="success" size="sm">On target</Badge>
          </header>
          <div
            className="enterprise-dashboard-chart"
            role="img"
            aria-label={`Completed request volume for the last ${range === '7d' ? '7 days' : range === '30d' ? '30 days' : '90 days'}, trending upward`}
          >
            {data.throughput.map((height, index) => (
              <span key={`${range}-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <footer><span>Prior period</span><strong>Current period</strong><span>Target 1,100</span></footer>
        </article>

        <aside className="enterprise-dashboard-panel enterprise-dashboard-action-rail" aria-labelledby="dashboard-action-heading">
          <header>
            <div><span>ACTION REQUIRED</span><h4 id="dashboard-action-heading">Priority queue</h4></div>
            <Badge variant="tonal" color={queue.length ? 'warning' : 'success'} size="sm">{queue.length}</Badge>
          </header>
          {queue.length ? (
            <div className="enterprise-dashboard-action-list">
              {queue.slice(0, 2).map((item) => (
                <button type="button" key={item.id} onClick={() => markHandled(item.id)}>
                  <i className="ti ti-alert-circle" aria-hidden="true" />
                  <span><strong>{item.title}</strong><small>{item.id} · due in {item.due}</small></span>
                  <i className="ti ti-arrow-up-right" aria-hidden="true" />
                </button>
              ))}
            </div>
          ) : (
            <p className="enterprise-dashboard-clear-state"><i className="ti ti-circle-check" aria-hidden="true" />Priority queue is clear.</p>
          )}
          <Button variant="text" size="sm">Open approval queue</Button>
        </aside>
      </div>

      <div className="enterprise-dashboard-secondary-grid">
        <article className="enterprise-dashboard-panel enterprise-dashboard-work-queue">
          <header><div><span>WORK QUEUE</span><h4>Approvals approaching SLA</h4></div><Button variant="text" size="sm">View all</Button></header>
          <div className="enterprise-dashboard-table" role="table" aria-label="Approvals approaching service-level agreement" tabIndex={0}>
            <div role="row" className="enterprise-dashboard-table-head"><span role="columnheader">Request</span><span role="columnheader">Owner</span><span role="columnheader">Due</span><span role="columnheader">Status</span></div>
            {QUEUE.map((item) => (
              <div role="row" key={item.id}><span role="cell"><strong>{item.title}</strong><small>{item.id}</small></span><span role="cell">{item.owner}</span><span role="cell">{item.due}</span><span role="cell"><Badge variant="tonal" color={item.status === 'Escalated' ? 'warning' : 'info'} size="sm">{item.status}</Badge></span></div>
            ))}
          </div>
        </article>

        <article className="enterprise-dashboard-panel enterprise-dashboard-insight">
          <header><div><span>INSIGHT</span><h4>Approval time improved</h4></div><i className="ti ti-bulb" aria-hidden="true" /></header>
          <strong>18 min</strong>
          <p>faster after routing finance requests directly to the policy owner.</p>
          <Button variant="text" size="sm">Inspect trend</Button>
        </article>
      </div>
    </section>
  )
}
