'use client'

import { useState } from 'react'
import { Badge, Button, Select, Switch } from 'omverse-ui'

const CATEGORIES = ['General', 'Security', 'Notifications', 'Data retention'] as const

export function SettingsFloorplanPreview() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('General')
  const [workspaceName, setWorkspaceName] = useState('Omverse Operations')
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [mfa, setMfa] = useState(true)
  const [retention, setRetention] = useState('365')
  const [saved, setSaved] = useState({ workspaceName, timezone, weeklyDigest, mfa, retention })
  const [confirmRisk, setConfirmRisk] = useState(false)
  const [message, setMessage] = useState('All settings saved · policy evaluated 3 minutes ago')
  const dirty = JSON.stringify(saved) !== JSON.stringify({ workspaceName, timezone, weeklyDigest, mfa, retention })

  function navigate(next: (typeof CATEGORIES)[number]) {
    if (dirty) { setMessage('Save or reset pending changes before changing category'); return }
    setCategory(next)
  }
  function save() {
    setSaved({ workspaceName, timezone, weeklyDigest, mfa, retention })
    setMessage(`${category} settings saved · audit event SET-2918 created`)
    setConfirmRisk(false)
  }
  function reset() {
    setWorkspaceName(saved.workspaceName); setTimezone(saved.timezone); setWeeklyDigest(saved.weeklyDigest); setMfa(saved.mfa); setRetention(saved.retention); setConfirmRisk(false); setMessage('Pending changes discarded')
  }

  return <section className="enterprise-settings-preview" aria-label="Interactive enterprise settings floorplan">
    <header className="enterprise-admin-header"><div><span>WORKSPACE ADMINISTRATION</span><h3>Settings</h3><p>Configure workspace behavior with clear ownership, inheritance, and safe save boundaries.</p></div>{dirty && <Badge variant="tonal" color="warning" size="sm">Unsaved changes</Badge>}</header>
    <div className="enterprise-admin-status"><span><i aria-hidden="true" />Policy service available</span><span role="status" aria-live="polite">{message}</span></div>
    <div className="enterprise-settings-layout">
      <nav aria-label="Settings categories">{CATEGORIES.map((item) => <button type="button" key={item} aria-current={category === item ? 'page' : undefined} onClick={() => navigate(item)}><i className={`ti ${item === 'General' ? 'ti-adjustments' : item === 'Security' ? 'ti-shield-lock' : item === 'Notifications' ? 'ti-bell' : 'ti-database'}`} aria-hidden="true" />{item}{item === 'Security' && <small>Managed</small>}</button>)}</nav>
      <main className="enterprise-settings-main">
        <header><div><span>{category.toUpperCase()}</span><h4>{category} settings</h4><p>Changes apply to every member unless a policy owner manages the value.</p></div><Badge variant="outlined" color="default" size="sm">Workspace scope</Badge></header>

        {category === 'General' && <div className="enterprise-settings-groups"><section><header><h5>Workspace identity</h5><p>Visible name and regional defaults.</p></header><label>Workspace name<input value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} /></label><label>Timezone<Select aria-label="Workspace timezone" value={timezone} onChange={setTimezone} options={[{ value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' }, { value: 'America/New_York', label: 'America/New York (ET)' }, { value: 'Europe/London', label: 'Europe/London (GMT)' }]} /></label></section></div>}
        {category === 'Security' && <div className="enterprise-settings-groups"><section><header><div><h5>Authentication policy</h5><Badge variant="tonal" color="info" size="sm">Policy managed</Badge></div><p>Protect access to organization data.</p></header><div className="enterprise-setting-row"><span><strong>Require multi-factor authentication</strong><small>Required at the next sign-in for every member.</small></span><Switch aria-label="Require multi-factor authentication" checked={mfa} onChange={(event) => { if (!event.target.checked) setConfirmRisk(true); else setMfa(true) }} /></div>{confirmRisk && <div className="enterprise-settings-risk"><i className="ti ti-alert-triangle" aria-hidden="true" /><span><strong>Reduce authentication protection?</strong><small>This affects every active member and will be audited.</small></span><Button variant="outlined" size="sm" onClick={() => { setMfa(false); setConfirmRisk(false) }}>Confirm change</Button></div>}</section></div>}
        {category === 'Notifications' && <div className="enterprise-settings-groups"><section><header><h5>Operational summaries</h5><p>Control organization-wide notification defaults.</p></header><div className="enterprise-setting-row"><span><strong>Weekly governance digest</strong><small>Send owners a summary every Monday.</small></span><Switch aria-label="Weekly governance digest" checked={weeklyDigest} onChange={(event) => setWeeklyDigest(event.target.checked)} /></div></section></div>}
        {category === 'Data retention' && <div className="enterprise-settings-groups"><section><header><div><h5>Audit retention</h5><Badge variant="tonal" color="info" size="sm">Compliance minimum: 180 days</Badge></div><p>Define how long immutable workspace events remain available.</p></header><label>Retention period<Select aria-label="Audit retention period" value={retention} onChange={setRetention} options={[{ value: '180', label: '180 days' }, { value: '365', label: '365 days' }, { value: '730', label: '2 years' }]} /></label></section></div>}
        <footer><span>{dirty ? 'Review pending changes before saving.' : 'No pending changes.'}</span><Button variant="text" size="sm" disabled={!dirty} onClick={reset}>Reset</Button><Button size="sm" disabled={!dirty} onClick={save}>Save changes</Button></footer>
      </main>
    </div>
  </section>
}
