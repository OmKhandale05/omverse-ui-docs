/**
 * Source code for the Forms example — exported as a string
 * so it can be displayed in the Code panel of the Examples page.
 */
export const formsCode = `'use client'

import { useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
} from 'omverse-ui'

export function Forms() {
  const [name, setName]     = useState('Om Khandale')
  const [email, setEmail]   = useState('om@omverse.dev')
  const [bio, setBio]       = useState('')
  const [role, setRole]     = useState('Developer')
  const [country, setCountry] = useState('India')
  const [notifications, setNotifications] = useState({
    email:     true,
    push:      false,
    digest:    true,
    marketing: false,
  })
  const [theme, setTheme]       = useState('System')
  const [fontSize, setFontSize] = useState(14)
  const [interests, setInterests] = useState(['Frontend', 'Design'])

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: 'inherit' }}>
      <style>{\`
        .frm-section { margin-bottom: 16px; }
        .frm-row     { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .frm-switch-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          width: 100%;
        }
        @media (max-width: 540px) {
          .frm-row { grid-template-columns: 1fr; }
        }
      \`}</style>

      {/* ── Section 1: Profile ── */}
      <div className="frm-section">
        <Card variant="outlined">
          <CardHeader title="Profile" />
          <CardBody>
            <div
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          16,
                marginBottom: 20,
              }}
            >
              <Avatar name={name || 'User'} size="lg" />
              <Button variant="ghost" size="sm">
                Upload photo
              </Button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Input
                label="Full name"
                variant="floating"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Input
                label="Email"
                type="email"
                variant="floating"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div>
              <label
                style={{
                  display:      'block',
                  fontSize:     13,
                  fontWeight:   500,
                  color:        'var(--color-text-secondary)',
                  marginBottom: 6,
                }}
              >
                Bio
              </label>
              <textarea
                rows={3}
                placeholder="Tell us a little about yourself…"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width:        '100%',
                  boxSizing:    'border-box',
                  padding:      '10px 12px',
                  fontSize:     14,
                  lineHeight:   1.5,
                  color:        'var(--color-text-primary)',
                  background:   'transparent',
                  border:       '1px solid var(--color-outline-variant)',
                  borderRadius: 8,
                  resize:       'vertical',
                  outline:      'none',
                  fontFamily:   'inherit',
                  transition:   'border-color 150ms ease',
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = 'var(--color-primary)')
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = 'var(--color-outline-variant)')
                }
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ── Section 2: Role & Location ── */}
      <div className="frm-section">
        <Card variant="outlined">
          <CardHeader title="Preferences" />
          <CardBody>
            <div className="frm-row">
              <Select
                label="Role"
                value={role}
                onChange={setRole}
                options={[
                  { value: 'Developer',        label: 'Developer' },
                  { value: 'Designer',          label: 'Designer' },
                  { value: 'Product Manager',   label: 'Product Manager' },
                  { value: 'Marketing',         label: 'Marketing' },
                  { value: 'Other',             label: 'Other' },
                ]}
              />
              <Select
                label="Country"
                value={country}
                onChange={setCountry}
                options={[
                  { value: 'United States',   label: 'United States' },
                  { value: 'United Kingdom',  label: 'United Kingdom' },
                  { value: 'India',           label: 'India' },
                  { value: 'Canada',          label: 'Canada' },
                  { value: 'Germany',         label: 'Germany' },
                  { value: 'Australia',       label: 'Australia' },
                  { value: 'Other',           label: 'Other' },
                ]}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ── Section 3: Notifications ── */}
      <div className="frm-section">
        <Card variant="outlined">
          <CardHeader title="Notifications" />
          <CardBody>
            <div className="frm-switch-row">
              <Switch
                label="Email notifications"
                helperText="Receive emails for updates"
                labelPosition="left"
                checked={notifications.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNotifications((p) => ({ ...p, email: e.target.checked }))
                }
              />
            </div>
            <Divider />
            <div className="frm-switch-row">
              <Switch
                label="Push notifications"
                helperText="Browser push alerts"
                labelPosition="left"
                checked={notifications.push}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNotifications((p) => ({ ...p, push: e.target.checked }))
                }
              />
            </div>
            <Divider />
            <div className="frm-switch-row">
              <Switch
                label="Weekly digest"
                helperText="Summary every Monday"
                labelPosition="left"
                checked={notifications.digest}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNotifications((p) => ({ ...p, digest: e.target.checked }))
                }
              />
            </div>
            <Divider />
            <div className="frm-switch-row">
              <Switch
                label="Marketing emails"
                helperText="Product updates & offers"
                labelPosition="left"
                checked={notifications.marketing}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNotifications((p) => ({
                    ...p,
                    marketing: e.target.checked,
                  }))
                }
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ── Section 4: Appearance ── */}
      <div className="frm-section">
        <Card variant="outlined">
          <CardHeader title="Appearance" />
          <CardBody>
            <RadioGroup
              legend="Color theme"
              display="segmented"
              value={theme}
              onChange={setTheme}
            >
              <Radio value="System" label="System" />
              <Radio value="Light"  label="Light"  />
              <Radio value="Dark"   label="Dark"   />
            </RadioGroup>

            <div style={{ marginTop: 24 }}>
              <p
                style={{
                  fontSize:     13,
                  fontWeight:   500,
                  color:        'var(--color-text-secondary)',
                  marginBottom: 10,
                }}
              >
                Font size —{' '}
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  {fontSize}px
                </span>
              </p>
              <Slider
                min={12}
                max={20}
                step={1}
                value={fontSize}
                onChange={setFontSize}
                size="md"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ── Section 5: Interests ── */}
      <div className="frm-section">
        <Card variant="outlined">
          <CardHeader title="Interests" />
          <CardBody>
            <CheckboxGroup
              legend="Topics you care about"
              value={interests}
              onChange={setInterests}
            >
              <Checkbox value="Frontend"  label="Frontend"  />
              <Checkbox value="Backend"   label="Backend"   />
              <Checkbox value="Design"    label="Design"    />
              <Checkbox value="DevOps"    label="DevOps"    />
              <Checkbox value="Mobile"    label="Mobile"    />
              <Checkbox value="AI/ML"     label="AI / ML"   />
            </CheckboxGroup>
          </CardBody>
          <CardFooter divider>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="filled" size="md">
                Save changes
              </Button>
              <Button variant="ghost" size="md">
                Reset
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
`
