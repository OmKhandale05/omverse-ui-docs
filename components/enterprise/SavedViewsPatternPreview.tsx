'use client'

import { useMemo, useState } from 'react'
import { Button, SavedViews, type SavedView } from 'omverse-ui'

type ViewConfiguration = {
  filters: readonly string[]
  sort: string
  columns: readonly string[]
  scope: 'Personal' | 'Shared' | 'Locked'
}

const INITIAL_VIEWS: readonly SavedView[] = [
  { id: 'renewals', name: 'Renewals this month', description: 'Stage is renewal · Close date this month', owner: 'You', updatedAt: 'Updated 12m ago', isDefault: true },
  { id: 'risk', name: 'Escalated accounts', description: 'Priority is urgent · Health is at risk', owner: 'Revenue operations', updatedAt: 'Updated yesterday', shared: true },
  { id: 'governed', name: 'Executive forecast', description: 'Quarter is current · Value above $100k', owner: 'Finance systems', updatedAt: 'Updated Aug 19', shared: true },
]

const CONFIGURATIONS: Record<string, ViewConfiguration> = {
  renewals: { filters: ['Stage: Renewal', 'Close date: This month'], sort: 'Renewal value ↓', columns: ['Account', 'Owner', 'Value', 'Close date'], scope: 'Personal' },
  risk: { filters: ['Priority: Urgent', 'Health: At risk'], sort: 'Risk score ↓', columns: ['Account', 'Risk', 'Owner', 'Next step'], scope: 'Shared' },
  governed: { filters: ['Quarter: Current', 'Value: > $100k'], sort: 'Forecast value ↓', columns: ['Account', 'Forecast', 'Confidence'], scope: 'Locked' },
}

export function SavedViewsPatternPreview() {
  const [views, setViews] = useState<readonly SavedView[]>(INITIAL_VIEWS)
  const [activeId, setActiveId] = useState('renewals')
  const [stale, setStale] = useState(false)
  const [status, setStatus] = useState('Renewals this month applied')

  const activeView = views.find((view) => view.id === activeId) ?? views[0]
  const configuration = useMemo<ViewConfiguration>(() => CONFIGURATIONS[activeId] ?? {
    filters: ['Owner: Me', 'Status: Open'],
    sort: 'Updated ↓',
    columns: ['Account', 'Status', 'Owner'],
    scope: 'Personal',
  }, [activeId])

  function applyView(id: string) {
    setActiveId(id)
    setStale(false)
    const view = views.find((item) => item.id === id)
    setStatus(`${String(view?.name ?? 'Saved view')} applied`)
  }

  function createView() {
    const id = `custom-${views.length + 1}`
    const next: SavedView = { id, name: `My workspace ${views.length + 1}`, description: 'Owner is me · Status is open', owner: 'You', updatedAt: 'Just now' }
    setViews((current) => [...current, next])
    setActiveId(id)
    setStale(false)
    setStatus(`${String(next.name)} created from the current workspace`)
  }

  return (
    <div className="enterprise-saved-preview">
      <header className="enterprise-saved-preview-heading">
        <div><span>REVENUE OPERATIONS</span><h3>Account workspace</h3></div>
        <small>Filters, sorting, and columns stay synchronized</small>
      </header>

      <div className="enterprise-saved-workspace">
        <SavedViews
          views={views}
          value={activeId}
          onValueChange={applyView}
          onCreate={createView}
          onRename={(view) => { setViews((current) => current.map((item) => item.id === view.id ? { ...item, name: `${String(item.name)} updated` } : item)); setStatus(`${String(view.name)} renamed`) }}
          onDuplicate={(view) => { const id = `${view.id}-copy`; setViews((current) => [...current, { ...view, id, name: `${String(view.name)} copy`, isDefault: false }]); setStatus(`${String(view.name)} duplicated`) }}
          onSetDefault={(view) => { setViews((current) => current.map((item) => ({ ...item, isDefault: item.id === view.id }))); setStatus(`${String(view.name)} is now the default`) }}
          searchable
          variant="filled"
          size="sm"
        />

        <section className="enterprise-saved-config" aria-label="Applied view configuration" aria-live="polite">
          <div className="enterprise-saved-config-heading">
            <span><small>ACTIVE VIEW</small><h4>{activeView?.name}</h4></span>
            <b data-scope={configuration.scope.toLowerCase()}><i className={`ti ${configuration.scope === 'Personal' ? 'ti-user' : configuration.scope === 'Shared' ? 'ti-users' : 'ti-lock'}`} aria-hidden="true" />{configuration.scope}</b>
          </div>

          {stale && (
            <div className="enterprise-saved-stale" role="alert"><i className="ti ti-alert-triangle" aria-hidden="true" /><span><strong>View needs attention</strong><small>The “Forecast confidence” column was renamed after this view was saved.</small></span><Button variant="outlined" onClick={() => { setStale(false); setStatus('View remapped to the current schema') }}>Repair view</Button></div>
          )}

          <dl className="enterprise-saved-config-grid">
            <div><dt>Filters</dt><dd>{configuration.filters.map((filter) => <span key={filter}>{filter}</span>)}</dd></div>
            <div><dt>Sort</dt><dd>{configuration.sort}</dd></div>
            <div><dt>Columns</dt><dd>{configuration.columns.join(' · ')}</dd></div>
          </dl>

          <div className="enterprise-saved-results">
            <div><span><strong>Northstar Labs</strong><small>Maya Chen · Renewal</small></span><b>$128,400</b></div>
            <div><span><strong>Kinetic Health</strong><small>Jon Bell · Renewal</small></span><b>$76,900</b></div>
          </div>

          <div className="enterprise-saved-actions">
            <Button variant="text" onClick={() => { setStale(true); setStatus('Saved view is stale after a schema change') }}>Simulate schema change</Button>
            <Button onClick={() => setStatus('Current workspace changes saved')}>Save changes</Button>
          </div>
        </section>
      </div>

      <p className="enterprise-saved-status" role="status"><i className="ti ti-bookmark" aria-hidden="true" />{status}</p>
    </div>
  )
}
