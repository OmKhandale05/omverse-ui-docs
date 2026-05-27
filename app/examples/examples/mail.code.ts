/**
 * Source code for the Mail example — exported as a string
 * so it can be displayed in the Code panel of the Examples page.
 */
export const mailCode = `'use client'

import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Input,
} from 'omverse-ui'

/* ─── Data ──────────────────────────────────────────────────────────────── */

const FOLDERS = [
  { label: 'Inbox',   icon: 'ti-inbox',          count: 12 },
  { label: 'Sent',    icon: 'ti-send'                      },
  { label: 'Drafts',  icon: 'ti-file-text',       count: 3  },
  { label: 'Starred', icon: 'ti-star'                      },
  { label: 'Spam',    icon: 'ti-alert-triangle',  count: 2  },
  { label: 'Archive', icon: 'ti-archive'                   },
]

const EMAILS = [
  { id: 1, from: 'Ali R.',   subject: 'Re: Project Update',           preview: 'Hey! Just wanted to follow up on the timeline we discussed...',     time: '2h ago',    read: false, label: 'work'    },
  { id: 2, from: 'Mira S.',  subject: 'Design review ready',          preview: "I've finished the mockups for the new dashboard. Take a look...",   time: 'Yesterday', read: false, label: 'design'  },
  { id: 3, from: 'Jay P.',   subject: 'PR merged to main',            preview: 'The feature/auth branch has been merged. Closing this PR...',        time: 'Yesterday', read: true,  label: 'dev'     },
  { id: 4, from: 'Dev T.',   subject: 'Production deploy successful',  preview: 'v1.2.3 is now live on production. All checks passed...',            time: 'Mon',       read: true,  label: 'ops'     },
  { id: 5, from: 'Om K.',    subject: 'Weekly standup notes',         preview: "Here are the key takeaways from this week's standup meetings...",   time: 'Mon',       read: true,  label: 'meeting' },
  { id: 6, from: 'Sarah L.', subject: 'Invoice #4421 attached',       preview: "Please find the invoice for last month's services attached...",     time: 'Sun',       read: true,  label: 'finance' },
]

const LABEL_COLOR: Record<string, string> = {
  work: 'primary', design: 'info', dev: 'secondary', ops: 'success', meeting: 'warning', finance: 'error',
}

const EMAIL_BODIES: Record<number, string> = {
  1: \`Hey! Just wanted to follow up on the timeline we discussed in our last meeting.

I've been going through the project requirements and I think we're on track for the Q2 deadline. The backend team has finished the API endpoints, and the frontend integration is about 70% complete.

Could you review the latest PR when you get a chance? I've left some comments that need your input before we can merge.

Best regards,
Ali R.\`,
  2: \`Hi,

I've finished the mockups for the new dashboard. Take a look when you have a moment and let me know your thoughts.

The designs are in Figma — I've shared the link with the team. There are two variants: one with a sidebar and one without.

Let me know which direction you prefer!

— Mira\`,
  3: \`The feature/auth branch has been merged into main. Closing this PR.

All CI checks passed. Deployment to staging is in progress.

— GitHub\`,
  4: \`v1.2.3 is now live on production. All checks passed.

Release notes have been updated. Monitoring dashboards look stable.

— Deploy Bot\`,
  5: \`Here are the key takeaways from this week's standup meetings:

1. Auth feature is landing next sprint
2. Design tokens v2 review on Thursday
3. On-call rotation updated — check the schedule

See you all next week!
Om\`,
  6: \`Please find the invoice for last month's services attached.

Invoice #4421 — Due: 30 days from receipt.
Amount: $2,400.00

Let me know if you have any questions.

— Sarah L.\`,
}

/* ─── Mail ───────────────────────────────────────────────────────────────── */

export function Mail() {
  const [activeFolder, setActiveFolder] = useState('Inbox')
  const [activeEmail, setActiveEmail]   = useState(1)
  const [search, setSearch]             = useState('')

  const email = EMAILS.find((e) => e.id === activeEmail)!

  return (
    <div
      style={{
        height: 600,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--color-outline-variant)',
        display: 'flex',
        fontFamily: 'inherit',
        background: 'var(--color-background)',
      }}
    >
      <style>{\`
        .mail-sidebar { width: 200px; flex-shrink: 0; }
        .mail-list    { width: 280px; flex-shrink: 0; }
        .mail-detail  { flex: 1; min-width: 0; }
        @media (max-width: 767px) {
          .mail-sidebar { display: none; }
          .mail-detail  { display: none; }
          .mail-list    { width: 100%; }
        }
      \`}</style>

      {/* ── Left Sidebar ───────────────────────────────────────────────── */}
      <div
        className="mail-sidebar"
        style={{
          borderRight: '1px solid var(--color-outline-variant)',
          background: 'var(--color-surface)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 12px',
          gap: 4,
          overflowY: 'auto',
        }}
      >
        <Button variant="filled" size="sm" shape="pill" style={{ width: '100%', marginBottom: 8 }}>
          <i className="ti ti-pencil-plus" style={{ marginRight: 6 }} />
          Compose
        </Button>

        <Divider />

        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FOLDERS.map((folder) => {
            const isActive = folder.label === activeFolder
            return (
              <button
                key={folder.label}
                onClick={() => setActiveFolder(folder.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: isActive ? 'var(--color-primary-container)' : 'transparent',
                  color: isActive ? 'var(--color-on-primary-container)' : 'var(--color-text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 13,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
              >
                <i
                  className={\`ti \${folder.icon}\`}
                  style={{ fontSize: 16, flexShrink: 0 }}
                />
                <span style={{ flex: 1 }}>{folder.label}</span>
                {folder.count != null && (
                  <Badge color="primary" variant="tonal" size="sm">
                    {folder.count}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Email List ──────────────────────────────────────────────────── */}
      <div
        className="mail-list"
        style={{
          borderRight: '1px solid var(--color-outline-variant)',
          background: 'var(--color-surface-variant)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '12px 12px 8px' }}>
          <Input
            placeholder="Search mail..."
            size="sm"
            variant="outlined"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ flex: 1 }}>
          {EMAILS.map((em, i) => {
            const isActive = em.id === activeEmail
            return (
              <div key={em.id}>
                <button
                  onClick={() => setActiveEmail(em.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                    background: isActive ? 'var(--color-surface)' : 'transparent',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: em.read ? 'transparent' : 'var(--color-primary)',
                        flexShrink: 0,
                      }}
                    />
                    <Avatar name={em.from} size="xs" />
                    <span
                      style={{
                        flex: 1,
                        fontSize: 13,
                        fontWeight: em.read ? 400 : 600,
                        color: 'var(--color-text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {em.from}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--color-text-disabled)',
                        flexShrink: 0,
                      }}
                    >
                      {em.time}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: em.read ? 400 : 600,
                      color: 'var(--color-text-primary)',
                      margin: '0 0 3px 15px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {em.subject}
                  </p>

                  <p
                    style={{
                      fontSize: 12,
                      color: 'var(--color-text-secondary)',
                      margin: '0 0 6px 15px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {em.preview}
                  </p>

                  <div style={{ marginLeft: 15 }}>
                    <Badge
                      color={LABEL_COLOR[em.label] as 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default'}
                      variant="tonal"
                      size="sm"
                    >
                      {em.label}
                    </Badge>
                  </div>
                </button>
                {i < EMAILS.length - 1 && <Divider />}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Detail Pane ─────────────────────────────────────────────────── */}
      <div
        className="mail-detail"
        style={{
          background: 'var(--color-background)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px 12px',
            borderBottom: '1px solid var(--color-outline-variant)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 10,
            }}
          >
            <h2
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {email.subject}
            </h2>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              <Button variant="ghost" size="xs">
                <i className="ti ti-arrow-back-up" />
              </Button>
              <Button variant="ghost" size="xs">
                <i className="ti ti-arrow-forward-up" />
              </Button>
              <Button variant="ghost" size="xs">
                <i className="ti ti-trash" />
              </Button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <Avatar name={email.from} size="md" />
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {email.from}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}
              >
                to me · {email.time}
              </p>
            </div>
          </div>

          <Divider />

          <div style={{ marginTop: 16 }}>
            {EMAIL_BODIES[email.id].split('\\n').map((line, i) => (
              <p
                key={i}
                style={{
                  fontSize: 14,
                  color: line === '' ? undefined : 'var(--color-text-primary)',
                  lineHeight: 1.65,
                  margin: line === '' ? '8px 0' : '0',
                  minHeight: line === '' ? 8 : undefined,
                }}
              >
                {line || ' '}
              </p>
            ))}
          </div>
        </div>

        {/* Reply/Forward actions */}
        <div
          style={{
            padding: '12px 20px 16px',
            borderTop: '1px solid var(--color-outline-variant)',
            display: 'flex',
            gap: 8,
          }}
        >
          <Button variant="filled" size="sm">
            <i className="ti ti-arrow-back-up" style={{ marginRight: 6 }} />
            Reply
          </Button>
          <Button variant="outlined" size="sm">
            <i className="ti ti-arrow-forward-up" style={{ marginRight: 6 }} />
            Forward
          </Button>
        </div>
      </div>
    </div>
  )
}
`
