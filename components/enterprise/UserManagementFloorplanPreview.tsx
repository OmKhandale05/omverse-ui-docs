'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, SearchField, Select } from 'omverse-ui'

const PEOPLE = [
  { id: 'USR-1042', name: 'Maya Chen', email: 'maya@omverse.dev', role: 'Administrator', team: 'Platform', status: 'Active', initials: 'MC' },
  { id: 'USR-1038', name: 'Jon Bell', email: 'jon@omverse.dev', role: 'Approver', team: 'Finance', status: 'Active', initials: 'JB' },
  { id: 'USR-1031', name: 'Priya Shah', email: 'priya@omverse.dev', role: 'Analyst', team: 'Security', status: 'Locked', initials: 'PS' },
  { id: 'USR-1026', name: 'Liam Garcia', email: 'liam@omverse.dev', role: 'Viewer', team: 'Legal', status: 'Invited', initials: 'LG' },
] as const

export function UserManagementFloorplanPreview() {
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [selectedId, setSelectedId] = useState<string>('USR-1042')
  const [roles, setRoles] = useState<Record<string, string>>({})
  const [locked, setLocked] = useState<string[]>(['USR-1031'])
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [message, setMessage] = useState('Directory synchronized · 4 minutes ago')

  const people = useMemo(() => PEOPLE.filter((person) => {
    const text = `${person.name} ${person.email} ${person.team}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (!roleFilter || (roles[person.id] || person.role) === roleFilter)
  }), [query, roleFilter, roles])
  const selected = PEOPLE.find((person) => person.id === selectedId) || PEOPLE[0]
  const isLocked = locked.includes(selected.id)
  const role = roles[selected.id] || selected.role

  function changeRole(nextRole: string) {
    setRoles((current) => ({ ...current, [selected.id]: nextRole }))
    setMessage(`${selected.name} changed to ${nextRole} · audit event IAM-8842 created`)
  }

  function sendInvite() {
    if (!inviteEmail.includes('@')) { setMessage('Enter a valid work email before sending the invitation'); return }
    setMessage(`Invitation sent to ${inviteEmail} · expires in 7 days`)
    setInviteEmail('')
    setInviteOpen(false)
  }

  return (
    <section className="enterprise-user-management-preview" aria-label="Interactive user management floorplan">
      <header className="enterprise-admin-header">
        <div><span>IDENTITY ADMINISTRATION</span><h3>People and access</h3><p>Manage membership, roles, and access lifecycle with an immutable audit trail.</p></div>
        <Button size="sm" onClick={() => setInviteOpen((open) => !open)}><i className="ti ti-user-plus" aria-hidden="true" />Invite user</Button>
      </header>
      <div className="enterprise-admin-status"><span><i aria-hidden="true" />Identity provider connected</span><span role="status" aria-live="polite">{message}</span></div>

      {inviteOpen && <section className="enterprise-user-invite" aria-labelledby="invite-user-heading"><div><span>NEW MEMBER</span><h4 id="invite-user-heading">Invite to the workspace</h4></div><label>Work email<input type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="name@company.com" /></label><div><Button variant="text" size="sm" onClick={() => setInviteOpen(false)}>Cancel</Button><Button size="sm" onClick={sendInvite}>Send invite</Button></div></section>}

      <div className="enterprise-user-toolbar">
        <SearchField aria-label="Search workspace users" placeholder="Search name, email, or team" value={query} onValueChange={setQuery} />
        <Select aria-label="Filter users by role" value={roleFilter} onChange={setRoleFilter} options={[{ value: '', label: 'All roles' }, { value: 'Administrator', label: 'Administrator' }, { value: 'Approver', label: 'Approver' }, { value: 'Analyst', label: 'Analyst' }, { value: 'Viewer', label: 'Viewer' }]} />
        <span>{people.length} people</span>
      </div>

      <div className="enterprise-user-layout">
        <div className="enterprise-user-roster" role="list" aria-label="Workspace users">
          {people.map((person) => {
            const personLocked = locked.includes(person.id)
            return <button type="button" role="listitem" key={person.id} data-selected={person.id === selected.id || undefined} onClick={() => setSelectedId(person.id)}><i>{person.initials}</i><span><strong>{person.name}</strong><small>{person.email}</small></span><span><Badge variant="tonal" color={personLocked ? 'error' : person.status === 'Invited' ? 'warning' : 'success'} size="sm">{personLocked ? 'Locked' : person.status}</Badge><small>{roles[person.id] || person.role}</small></span></button>
          })}
          {!people.length && <div className="enterprise-user-empty"><strong>No people match</strong><Button variant="text" size="sm" onClick={() => { setQuery(''); setRoleFilter('') }}>Clear filters</Button></div>}
        </div>

        <aside className="enterprise-user-detail" aria-labelledby="selected-user-heading">
          <header><i>{selected.initials}</i><div><h4 id="selected-user-heading">{selected.name}</h4><p>{selected.email}</p></div><Badge variant="tonal" color={isLocked ? 'error' : 'success'} size="sm">{isLocked ? 'Locked' : 'Active'}</Badge></header>
          <dl><div><dt>Team</dt><dd>{selected.team}</dd></div><div><dt>Last active</dt><dd>18 minutes ago</dd></div><div><dt>Authentication</dt><dd>SSO + MFA</dd></div></dl>
          <label>Workspace role<Select aria-label={`Role for ${selected.name}`} value={role} onChange={changeRole} options={[{ value: 'Administrator', label: 'Administrator' }, { value: 'Approver', label: 'Approver' }, { value: 'Analyst', label: 'Analyst' }, { value: 'Viewer', label: 'Viewer' }]} /></label>
          <div className="enterprise-user-actions"><Button variant="outlined" size="sm" onClick={() => { setLocked((current) => isLocked ? current.filter((id) => id !== selected.id) : [...current, selected.id]); setMessage(`${selected.name} ${isLocked ? 'unlocked' : 'locked'} · active sessions reviewed`) }}>{isLocked ? 'Unlock account' : 'Lock account'}</Button><Button variant="text" size="sm">View permissions</Button></div>
          <section><span>RECENT ACCESS ACTIVITY</span><p><strong>Role reviewed</strong><small>Quarterly certification · yesterday</small></p><p><strong>SSO sign-in</strong><small>Managed device · 18 minutes ago</small></p></section>
        </aside>
      </div>
    </section>
  )
}
