'use client'

import { useMemo, useState } from 'react'
import { Badge, Button, SearchField, SegmentedControl, Select } from 'omverse-ui'

const DIRECTORY = [
  { id: 'USR-1042', name: 'Maya Chen', email: 'maya@omverse.dev', role: 'Administrator', team: 'Platform', state: 'Active', mfa: 'Verified', sessions: 3, initials: 'MC' },
  { id: 'USR-1038', name: 'Jon Bell', email: 'jon@omverse.dev', role: 'Approver', team: 'Finance', state: 'Active', mfa: 'Verified', sessions: 1, initials: 'JB' },
  { id: 'USR-1031', name: 'Priya Shah', email: 'priya@omverse.dev', role: 'Analyst', team: 'Security', state: 'Suspended', mfa: 'Verified', sessions: 0, initials: 'PS' },
  { id: 'USR-1026', name: 'Liam Garcia', email: 'liam@omverse.dev', role: 'Viewer', team: 'Legal', state: 'Invited', mfa: 'Pending', sessions: 0, initials: 'LG' },
] as const

type ProfileSection = 'profile' | 'access' | 'support'

export function UsersTemplatePreview() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('USR-1042')
  const [section, setSection] = useState<ProfileSection>('profile')
  const [roles, setRoles] = useState<Record<string, string>>({})
  const [suspended, setSuspended] = useState<string[]>(['USR-1031'])
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [message, setMessage] = useState('Directory synchronized · identity source healthy')
  const users = useMemo(() => DIRECTORY.filter((user) => `${user.name} ${user.email} ${user.team} ${user.role}`.toLowerCase().includes(query.toLowerCase())), [query])
  const selected = DIRECTORY.find((user) => user.id === selectedId) || DIRECTORY[0]
  const isSuspended = suspended.includes(selected.id)
  const role = roles[selected.id] || selected.role

  function invite() {
    if (!inviteEmail.includes('@')) { setMessage('Enter a valid work email before sending the invitation'); return }
    setMessage(`Invite sent to ${inviteEmail} · Viewer role · expires in 7 days`); setInviteEmail(''); setInviteOpen(false)
  }

  return <section className="enterprise-template-shell enterprise-users-template" aria-label="Interactive users template">
    <header className="enterprise-template-header"><div><span>ORGANIZATION DIRECTORY</span><h3>Users</h3><p>Move from directory discovery to profile, access, and support outcomes safely.</p></div><Button size="sm" onClick={() => setInviteOpen((open) => !open)}><i className="ti ti-user-plus" aria-hidden="true" />Invite user</Button></header>
    <div className="enterprise-template-status"><span><i aria-hidden="true" />SSO and directory connected</span><span role="status" aria-live="polite">{message}</span></div>
    {inviteOpen && <section className="enterprise-template-create" aria-labelledby="users-invite-heading"><div><span>INVITE USER</span><h4 id="users-invite-heading">Start a recoverable invitation</h4></div><label>Work email<input type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="name@company.com" /></label><div><Button variant="text" size="sm" onClick={() => setInviteOpen(false)}>Cancel</Button><Button size="sm" onClick={invite}>Send invite</Button></div></section>}
    <div className="enterprise-users-template-toolbar"><SearchField aria-label="Search users template directory" placeholder="Search name, email, team, or role" value={query} onValueChange={setQuery} /><span>{users.length} directory records</span></div>
    <div className="enterprise-users-template-layout">
      <div className="enterprise-users-directory" role="list" aria-label="User directory records">{users.map((user) => { const userSuspended = suspended.includes(user.id); return <button type="button" role="listitem" key={user.id} data-selected={selected.id === user.id || undefined} onClick={() => { setSelectedId(user.id); setSection('profile') }}><i>{user.initials}</i><span><strong>{user.name}</strong><small>{user.email}</small></span><span><Badge variant="tonal" color={userSuspended ? 'error' : user.state === 'Invited' ? 'warning' : 'success'} size="sm">{userSuspended ? 'Suspended' : user.state}</Badge><small>{roles[user.id] || user.role} · {user.team}</small></span></button> })}{!users.length && <div className="enterprise-template-empty"><strong>No users match</strong><Button variant="text" size="sm" onClick={() => setQuery('')}>Clear search</Button></div>}</div>
      <main className="enterprise-users-profile"><header><i>{selected.initials}</i><div><span>USER PROFILE · {selected.id}</span><h4>{selected.name}</h4><p>{selected.email} · {selected.team}</p></div><Badge variant="tonal" color={isSuspended ? 'error' : 'success'} size="sm">{isSuspended ? 'Suspended' : selected.state}</Badge></header><SegmentedControl aria-label="User template profile section" items={[{ value: 'profile', label: 'Profile' }, { value: 'access', label: 'Access' }, { value: 'support', label: 'Support' }]} value={section} onValueChange={(value) => setSection(value as ProfileSection)} size="sm" />
        {section === 'profile' && <section className="enterprise-users-profile-content"><dl><div><dt>Team</dt><dd>{selected.team}</dd></div><div><dt>Authentication</dt><dd>SSO · MFA {selected.mfa}</dd></div><div><dt>Active sessions</dt><dd>{selected.sessions}</dd></div><div><dt>Last activity</dt><dd>18 minutes ago</dd></div></dl><label>Workspace role<Select aria-label={`Template role for ${selected.name}`} value={role} onChange={(next) => { setRoles((current) => ({ ...current, [selected.id]: next })); setMessage(`${selected.name} changed to ${next} · audit event IAM-9921`) }} options={[{ value: 'Administrator', label: 'Administrator' }, { value: 'Approver', label: 'Approver' }, { value: 'Analyst', label: 'Analyst' }, { value: 'Viewer', label: 'Viewer' }]} /></label></section>}
        {section === 'access' && <section className="enterprise-users-access"><article><i className="ti ti-shield-check" aria-hidden="true" /><span><strong>Authentication compliant</strong><small>SSO enforced · MFA verified · managed device</small></span></article><article><i className="ti ti-key" aria-hidden="true" /><span><strong>{role} capabilities</strong><small>Inherited from the workspace role policy</small></span><Button variant="text" size="sm">View matrix</Button></article><article><i className="ti ti-devices" aria-hidden="true" /><span><strong>{selected.sessions} active sessions</strong><small>Last verified 18 minutes ago</small></span><Button variant="text" size="sm">Review</Button></article></section>}
        {section === 'support' && <section className="enterprise-users-support"><article><span>RECENT SUPPORT CONTEXT</span><h5>Passwordless sign-in assistance</h5><p>Resolved after the managed-device certificate was refreshed.</p><small>SUP-4821 · yesterday · handled by Noah Williams</small></article><Button variant="outlined" size="sm" onClick={() => setMessage(`Support case prepared with ${selected.name}'s identity context`)}>Start support case</Button></section>}
        <footer><span>Critical identity actions require an audit reason.</span><Button variant="outlined" size="sm" onClick={() => { setSuspended((current) => isSuspended ? current.filter((id) => id !== selected.id) : [...current, selected.id]); setMessage(`${selected.name} ${isSuspended ? 'restored' : 'suspended'} · sessions and policy reviewed`) }}>{isSuspended ? 'Restore access' : 'Suspend access'}</Button></footer>
      </main>
    </div>
  </section>
}
