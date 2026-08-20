'use client'

import { useMemo, useState } from 'react'
import { AccessGate, Alert, Button, PermissionMatrix } from 'omverse-ui'

type DemoRole = 'Viewer' | 'Operations Manager' | 'Finance Admin'

const ROLE_GRANTS: Record<DemoRole, Record<string, readonly string[]>> = {
  Viewer: { analytics: ['view'], billing: [], workspace: [] },
  'Operations Manager': { analytics: ['view', 'export'], billing: ['view'], workspace: ['manage'] },
  'Finance Admin': { analytics: ['view', 'export'], billing: ['view', 'export'], workspace: ['manage'] },
}

export function RoleBasedAccessPreview() {
  const [role, setRole] = useState<DemoRole>('Viewer')
  const [message, setMessage] = useState('')
  const grants = ROLE_GRANTS[role]
  const canExportBilling = grants.billing.includes('export')
  const canManageWorkspace = grants.workspace.includes('manage')

  const value = useMemo(() => ({
    analytics: grants.analytics,
    billing: grants.billing,
    workspace: grants.workspace,
  }), [grants])

  function requestAccess(capability: string) {
    setMessage(`${capability} access requested from the Workspace Admin.`)
  }

  return (
    <div className="enterprise-access-preview">
      <div className="enterprise-access-preview-heading"><div><span>POLICY SANDBOX</span><h3>Workspace capabilities</h3></div><small>UI checks mirror API policy decisions</small></div>
      <div className="enterprise-access-role-switch" role="group" aria-label="Preview role">
        {(Object.keys(ROLE_GRANTS) as DemoRole[]).map((item) => <Button key={item} variant={role === item ? 'filled' : 'text'} onClick={() => { setRole(item); setMessage('') }}>{item}</Button>)}
      </div>
      {message && <Alert tone="info" title="Access request created" dismissible onDismiss={() => setMessage('')}>{message}</Alert>}
      <div className="enterprise-access-capabilities">
        <AccessGate allowed={canExportBilling} deniedMode="disable" title="Finance Admin access required" reason="Billing exports contain sensitive invoice and tax data." action={<Button variant="outlined" onClick={() => requestAccess('Billing export')}>Request access</Button>}>
          <article><span><i className="ti ti-file-export" aria-hidden="true" /><strong>Export billing report</strong><small>Invoices, tax identifiers, and payment status</small></span><Button>Export report</Button></article>
        </AccessGate>
        <AccessGate allowed={canManageWorkspace} deniedMode="replace" variant="panel" title="Workspace management restricted" reason="Operations Managers and Finance Admins can manage workspace members." action={<Button variant="outlined" onClick={() => requestAccess('Workspace management')}>Contact an admin</Button>}>
          <article><span><i className="ti ti-users" aria-hidden="true" /><strong>Manage workspace members</strong><small>Invite, suspend, and update team roles</small></span><Button>Manage members</Button></article>
        </AccessGate>
      </div>
      <PermissionMatrix
        caption={`${role} capability matrix`}
        permissions={[{ id: 'view', label: 'View' }, { id: 'export', label: 'Export' }, { id: 'manage', label: 'Manage' }]}
        resources={[
          { id: 'analytics', label: 'Analytics', unavailable: ['manage'] },
          { id: 'billing', label: 'Billing', unavailable: ['manage'] },
          { id: 'workspace', label: 'Workspace', unavailable: ['view', 'export'] },
        ]}
        value={value}
        readOnly
        size="sm"
      />
      <p className="enterprise-access-footnote"><i className="ti ti-shield-lock" aria-hidden="true" />This preview changes presentation only. The API must authorize every data read and action again.</p>
    </div>
  )
}
