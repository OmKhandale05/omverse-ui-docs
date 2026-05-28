'use client'

import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  ChipGroup,
  Divider,
  Input,
  Switch,
} from 'omverse-ui'

const NAV_ITEMS = [
  'General',
  'Security',
  'Notifications',
  'Appearance',
  'Billing',
  'Team',
] as const

type NavItem = (typeof NAV_ITEMS)[number]

/* ─── Sub-sections ──────────────────────────────────────────────────────────── */

function GeneralSection() {
  return (
    <Card variant="outlined">
      <CardHeader
        title="General"
        subtitle="Update your account info"
      />
      <CardBody>
        {/* Avatar block */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'flex-start',
            gap:            8,
            marginBottom:   20,
          }}
        >
          <Avatar name="Om K." size="lg" />
          <div
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         8,
              marginTop:   4,
            }}
          >
            <span
              style={{
                fontSize:   15,
                fontWeight: 600,
                color:      'var(--color-text-primary)',
              }}
            >
              Om Khandale
            </span>
            <Badge color="primary" variant="tonal">Pro</Badge>
          </div>
          <Button variant="outlined" size="sm">Change avatar</Button>
        </div>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
          <Input
            label="Display name"
            variant="floating"
            defaultValue="Om Khandale"
          />
          <Input
            label="Username"
            variant="floating"
            defaultValue="@omverse"
            helperText="omverse.dev/@omverse"
          />
          <Input
            label="Email"
            type="email"
            variant="floating"
            defaultValue="om@omverse.dev"
          />
        </div>
      </CardBody>
      <CardFooter divider>
        <Button variant="filled" size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  )
}

function SecuritySection() {
  return (
    <Card variant="outlined">
      <CardHeader
        title="Security"
        subtitle="Manage passwords and 2FA"
      />
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Current password"
            type="password"
            variant="floating"
          />
          <Input
            label="New password"
            type="password"
            variant="floating"
          />
          <Input
            label="Confirm password"
            type="password"
            variant="floating"
            error={false}
          />
        </div>

        <Divider />

        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '16px 0 4px',
          }}
        >
          <Switch
            label="Two-factor authentication"
            helperText="Require TOTP on login"
            labelPosition="left"
            defaultChecked={false}
          />
        </div>
      </CardBody>
      <CardFooter divider>
        <Button variant="filled" size="sm">Update password</Button>
      </CardFooter>
    </Card>
  )
}

function NotificationsSection() {
  const NOTIF_ITEMS = [
    { key: 'email',   label: 'Email updates',       helper: 'Activity and mentions',           defaultOn: true  },
    { key: 'push',    label: 'Push notifications',   helper: 'Real-time alerts in browser',     defaultOn: false },
    { key: 'digest',  label: 'Weekly digest',        helper: 'Summary email every Monday',      defaultOn: true  },
    { key: 'release', label: 'Release notes',        helper: 'New features and updates',        defaultOn: true  },
    { key: 'mkt',     label: 'Marketing',            helper: 'Tips, tutorials, and offers',     defaultOn: false },
  ]

  const [values, setValues] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIF_ITEMS.map((n) => [n.key, n.defaultOn]))
  )

  return (
    <Card variant="outlined">
      <CardHeader title="Notifications" />
      <CardBody>
        {NOTIF_ITEMS.map((item, i) => (
          <div key={item.key}>
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '14px 0',
              }}
            >
              <Switch
                label={item.label}
                helperText={item.helper}
                labelPosition="left"
                checked={values[item.key]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValues((p) => ({ ...p, [item.key]: e.target.checked }))
                }
              />
            </div>
            {i < NOTIF_ITEMS.length - 1 && <Divider />}
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

function AppearanceSection() {
  const [colorTheme, setColorTheme] = useState(['system'])
  const [density, setDensity]       = useState(['default'])

  return (
    <Card variant="outlined">
      <CardHeader title="Appearance" />
      <CardBody>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
            Theme
          </p>
          <ChipGroup
            mode="single"
            value={colorTheme}
            onChange={setColorTheme}
            variant="tonal"
          >
            <Chip value="light">Light</Chip>
            <Chip value="dark">Dark</Chip>
            <Chip value="system">System</Chip>
          </ChipGroup>
        </div>

        <Divider />

        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
            Density
          </p>
          <ChipGroup
            mode="single"
            value={density}
            onChange={setDensity}
            variant="tonal"
          >
            <Chip value="compact">Compact</Chip>
            <Chip value="default">Default</Chip>
            <Chip value="comfortable">Comfortable</Chip>
          </ChipGroup>
        </div>
      </CardBody>
    </Card>
  )
}

const PLAN_FEATURES = [
  'Unlimited projects',
  'Custom domains',
  'Priority support',
  'Advanced analytics',
  'Team collaboration (up to 10)',
]

function BillingSection() {
  return (
    <Card variant="outlined">
      <CardHeader
        title="Billing"
        action={<Badge color="primary" variant="tonal">Pro Plan</Badge>}
      />
      <CardBody>
        {/* Plan details */}
        <div
          style={{
            padding:      16,
            borderRadius: 10,
            border:       '1px solid var(--color-outline-variant)',
            background:   'var(--color-surface-variant)',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize:   15,
                fontWeight: 600,
                color:      'var(--color-text-primary)',
              }}
            >
              Pro Plan
            </span>
            <Badge color="primary" variant="tonal">$12 / mo</Badge>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PLAN_FEATURES.map((f) => (
              <li
                key={f}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        8,
                  fontSize:   13,
                  color:      'var(--color-text-secondary)',
                }}
              >
                <i
                  className="ti ti-circle-check-filled"
                  style={{ color: 'var(--color-success)', fontSize: 15 }}
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>

          <p
            style={{
              fontSize:   12,
              color:      'var(--color-text-disabled)',
              marginTop:  12,
            }}
          >
            Renews on June 15, 2026
          </p>
        </div>

        <Button variant="outlined" size="sm">
          Manage subscription
        </Button>

        <Divider />

        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            gap:            10,
            marginTop:      16,
          }}
        >
          <div>
            <Button variant="outlined" size="sm">
              <i className="ti ti-file-invoice" aria-hidden="true" style={{ marginRight: 6 }} />
              Download invoices
            </Button>
          </div>
          <div>
            <Button variant="outlined" size="sm">
              <i
                className="ti ti-trash"
                aria-hidden="true"
                style={{ marginRight: 6, color: 'var(--color-error)' }}
              />
              <span style={{ color: 'var(--color-error)' }}>Cancel plan</span>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function TeamSection() {
  return (
    <Card variant="outlined">
      <CardHeader title="Team" subtitle="Manage members and invitations" />
      <CardBody>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
          Team management coming soon.
        </p>
      </CardBody>
    </Card>
  )
}

/* ─── Settings ──────────────────────────────────────────────────────────────── */

export function Settings() {
  const [activeNav, setActiveNav] = useState<NavItem>('General')

  function renderSection() {
    switch (activeNav) {
      case 'General':       return <GeneralSection />
      case 'Security':      return <SecuritySection />
      case 'Notifications': return <NotificationsSection />
      case 'Appearance':    return <AppearanceSection />
      case 'Billing':       return <BillingSection />
      case 'Team':          return <TeamSection />
    }
  }

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{`
        .st-layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 24px;
          align-items: flex-start;
        }
        .st-sidebar { display: flex; }
        .st-mobile-tabs { display: none; }

        @media (max-width: 767px) {
          .st-layout {
            grid-template-columns: 1fr;
          }
          .st-sidebar { display: none; }
          .st-mobile-tabs {
            display: flex;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: var(--color-outline-variant) transparent;
            gap: 4px;
            margin-bottom: 16px;
            padding-bottom: 4px;
          }
          .st-mobile-tabs::-webkit-scrollbar { height: 3px; }
          .st-mobile-tabs::-webkit-scrollbar-track { background: transparent; }
          .st-mobile-tabs::-webkit-scrollbar-thumb { background: var(--color-outline-variant); border-radius: 2px; }
        }
      `}</style>

      {/* Mobile tab bar */}
      <div className="st-mobile-tabs">
        {NAV_ITEMS.map((item) => {
          const isActive = item === activeNav
          return (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              style={{
                flexShrink:   0,
                padding:      '7px 14px',
                fontSize:     13,
                fontWeight:   isActive ? 500 : 400,
                borderRadius: 20,
                border:       'none',
                cursor:       'pointer',
                whiteSpace:   'nowrap',
                background:   isActive
                  ? 'var(--color-primary-container)'
                  : 'var(--color-surface-variant)',
                color:        isActive
                  ? 'var(--color-on-primary-container)'
                  : 'var(--color-text-secondary)',
                transition:   'all 150ms ease',
              }}
            >
              {item}
            </button>
          )
        })}
      </div>

      <div className="st-layout">
        {/* Desktop sidebar */}
        <nav className="st-sidebar">
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           2,
              width:         '100%',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item === activeNav
              return (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    padding:      '8px 12px',
                    fontSize:     13,
                    fontWeight:   isActive ? 500 : 400,
                    borderRadius: 7,
                    border:       'none',
                    cursor:       'pointer',
                    textAlign:    'left',
                    background:   isActive
                      ? 'var(--color-primary-container)'
                      : 'transparent',
                    color:        isActive
                      ? 'var(--color-on-primary-container)'
                      : 'var(--color-text-secondary)',
                    transition:   'all 150ms ease',
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Content panel */}
        <div>{renderSection()}</div>
      </div>
    </div>
  )
}
