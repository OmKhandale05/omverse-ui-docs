'use client'

import { useMemo, useState } from 'react'

const RECORDS = [
  { id: 'WK-1048', name: 'Quarterly access review', team: 'Security', status: 'Open', updated: '8 min ago' },
  { id: 'WK-1047', name: 'Vendor risk assessment', team: 'Finance', status: 'In review', updated: '24 min ago' },
  { id: 'WK-1046', name: 'Platform migration checklist', team: 'Platform', status: 'Open', updated: '1 hr ago' },
  { id: 'WK-1045', name: 'Renewal approval', team: 'Finance', status: 'Closed', updated: '2 hrs ago' },
  { id: 'WK-1044', name: 'Incident follow-up', team: 'Security', status: 'In review', updated: 'Yesterday' },
  { id: 'WK-1043', name: 'Workspace provisioning', team: 'Platform', status: 'Closed', updated: 'Yesterday' },
] as const

export function FilteringRecordsPreview() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [team, setTeam] = useState('All teams')
  const [saved, setSaved] = useState(false)

  const results = useMemo(() => RECORDS.filter((record) => {
    const matchesQuery = `${record.id} ${record.name}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'All statuses' || record.status === status
    const matchesTeam = team === 'All teams' || record.team === team
    return matchesQuery && matchesStatus && matchesTeam
  }), [query, status, team])

  const activeFilters = [
    status !== 'All statuses' ? { label: `Status: ${status}`, clear: () => setStatus('All statuses') } : null,
    team !== 'All teams' ? { label: `Team: ${team}`, clear: () => setTeam('All teams') } : null,
  ].filter((filter): filter is { label: string; clear: () => void } => filter !== null)

  function clearAll() {
    setQuery('')
    setStatus('All statuses')
    setTeam('All teams')
  }

  return (
    <div className="enterprise-filter-preview">
      <div className="enterprise-filter-preview-topbar">
        <div><span>OPERATIONS</span><h3>Work items</h3></div>
        <button type="button" onClick={() => setSaved((value) => !value)} aria-pressed={saved}>
          <i className={`ti ${saved ? 'ti-bookmark-filled' : 'ti-bookmark'}`} aria-hidden="true" />
          {saved ? 'View saved' : 'Save view'}
        </button>
      </div>

      <div className="enterprise-filter-preview-controls">
        <label className="enterprise-filter-search">
          <span>Search records</span>
          <div><i className="ti ti-search" aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ID or work item" /></div>
        </label>
        <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Open</option><option>In review</option><option>Closed</option></select></label>
        <label><span>Team</span><select value={team} onChange={(event) => setTeam(event.target.value)}><option>All teams</option><option>Security</option><option>Finance</option><option>Platform</option></select></label>
      </div>

      <div className="enterprise-filter-preview-summary">
        <div className="enterprise-filter-preview-chips">
          {activeFilters.map((filter) => <button type="button" key={filter.label} onClick={filter.clear}>{filter.label}<i className="ti ti-x" aria-hidden="true" /></button>)}
          {(query || activeFilters.length > 0) && <button type="button" className="enterprise-filter-clear" onClick={clearAll}>Clear all</button>}
          {!query && activeFilters.length === 0 && <span>No filters applied</span>}
        </div>
        <strong aria-live="polite">{results.length} {results.length === 1 ? 'record' : 'records'}</strong>
      </div>

      <div className="enterprise-filter-preview-table-wrap" tabIndex={0} role="region" aria-label="Filtered work items">
        <table>
          <thead><tr><th scope="col">Work item</th><th scope="col">Team</th><th scope="col">Status</th><th scope="col">Updated</th></tr></thead>
          <tbody>
            {results.map((record) => (
              <tr key={record.id}>
                <th scope="row"><span>{record.name}</span><small>{record.id}</small></th>
                <td>{record.team}</td>
                <td><span className="enterprise-filter-status" data-status={record.status.toLowerCase().replace(' ', '-')}>{record.status}</span></td>
                <td>{record.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {results.length === 0 && <div className="enterprise-filter-empty"><i className="ti ti-filter-off" aria-hidden="true" /><strong>No matching work items</strong><span>Adjust or clear the filters to broaden your results.</span><button type="button" onClick={clearAll}>Clear all filters</button></div>}
      </div>
      <p className="enterprise-filter-preview-note"><i className="ti ti-info-circle" aria-hidden="true" />Try changing status and team filters. Every criterion stays visible and reversible.</p>
    </div>
  )
}
