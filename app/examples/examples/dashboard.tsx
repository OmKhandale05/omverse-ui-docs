'use client'

import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  ChipGroup,
  Divider,
} from 'omverse-ui'

/* ─── Data ──────────────────────────────────────────────────────────────── */

const STATS = [
  { label: 'Total Revenue', value: '$42,580', delta: '+12.5%', up: true  },
  { label: 'Active Users',  value: '3,241',   delta: '+8.1%',  up: true  },
  { label: 'Conversion',    value: '12.6%',   delta: '−2.3%',  up: false },
  { label: 'Avg. Session',  value: '4m 12s',  delta: '+5.7%',  up: true  },
]

type Period = '7D' | '30D' | '90D'

const CHART: Record<Period, { data: number[] }> = {
  '7D':  { data: [42, 58, 51, 67, 73, 68, 85] },
  '30D': {
    data: [
      38, 45, 42, 60, 55, 70, 65, 80, 75, 90,
      85, 78, 92, 88, 95, 82, 88, 76, 84, 91,
      78, 86, 93, 80, 88, 95, 90, 85, 98, 92,
    ],
  },
  '90D': {
    data: [
      40, 45, 42, 55, 52, 60, 58, 65, 62, 70, 68, 75, 72, 80, 78, 85, 82, 88,
      84, 90, 88, 92, 90, 95, 93, 97, 95, 98, 96, 100, 95, 92, 88, 85, 82, 78,
      75, 72, 68, 65, 62, 60, 58, 55, 52, 50, 55, 58, 62, 65, 68, 72, 75, 78,
      82, 85, 88, 90, 92, 95, 92, 88, 85, 82, 78, 75, 72, 68, 65, 62, 60, 58,
      55, 52, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 98, 100, 97, 95, 92, 90,
    ],
  },
}

const ACTIVITY = [
  { name: 'Om K.',    action: 'Pushed a new release',        time: '2m ago'  },
  { name: 'Ali R.',   action: 'Opened pull request #142',    time: '18m ago' },
  { name: 'Jay P.',   action: 'Merged branch feature/auth',  time: '1h ago'  },
  { name: 'Mira S.',  action: 'Closed issue #87',            time: '3h ago'  },
  { name: 'Dev T.',   action: 'Deployed to production',      time: '5h ago'  },
]

const TRANSACTIONS = [
  { id: '#TXN-8821', customer: 'Acme Corp',    amount: '$1,200.00', status: 'success' as const },
  { id: '#TXN-8820', customer: 'Globex Inc',   amount: '$340.50',   status: 'warning' as const },
  { id: '#TXN-8819', customer: 'Initech LLC',  amount: '$899.00',   status: 'success' as const },
  { id: '#TXN-8818', customer: 'Hooli Ltd',    amount: '$2,500.00', status: 'error'   as const },
  { id: '#TXN-8817', customer: 'Umbrella Co',  amount: '$175.00',   status: 'success' as const },
  { id: '#TXN-8816', customer: 'Wayne Ent.',   amount: '$6,400.00', status: 'warning' as const },
]

/* ─── SVG Chart (no chart lib — pure SVG) ───────────────────────────────── */

function SmoothChart({ data }: { data: number[] }) {
  const W = 560
  const H = 120
  const PAD = 4
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: H - ((v - min) / range) * (H - 16) - 8,
  }))

  let linePath = 'M ' + pts[0].x + ' ' + pts[0].y
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const dx = (curr.x - prev.x) / 3
    linePath +=
      ' C ' + (prev.x + dx) + ' ' + prev.y +
      ', ' + (curr.x - dx) + ' ' + curr.y +
      ', ' + curr.x + ' ' + curr.y
  }

  const areaPath =
    linePath +
    ' L ' + pts[pts.length - 1].x + ' ' + (H + 4) +
    ' L ' + pts[0].x + ' ' + (H + 4) + ' Z'

  return (
    <svg
      viewBox={'0 0 ' + W + ' ' + (H + 4)}
      width="100%"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="dbGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.1, 0.4, 0.7, 1.0].map((t, idx) => (
        <line
          key={idx}
          x1={0} y1={t * H} x2={W} y2={t * H}
          stroke="var(--color-outline-variant)"
          strokeWidth={0.5}
        />
      ))}
      <path d={areaPath} fill="url(#dbGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r={3}
        fill="var(--color-primary)"
      />
    </svg>
  )
}

/* ─── Dashboard ─────────────────────────────────────────────────────────── */

export function Dashboard() {
  const [period, setPeriod] = useState<Period>('30D')

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{`
        .db-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
        .db-mid   { display: grid; grid-template-columns: 3fr 2fr;        gap: 12px; margin-bottom: 16px; }
        @media (max-width: 767px) {
          .db-stats { grid-template-columns: repeat(2, 1fr); }
          .db-mid   { grid-template-columns: 1fr; }
        }
        @media (max-width: 420px) {
          .db-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Stat cards ─────────────────────────────────────────────────── */}
      <div className="db-stats">
        {STATS.map((s) => (
          <Card key={s.label} variant="outlined">
            <CardBody>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  marginBottom: 6,
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: 4,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: s.up ? 'var(--color-success)' : 'var(--color-error)',
                }}
              >
                {s.delta} vs last period
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* ── Revenue chart + Activity feed ──────────────────────────────── */}
      <div className="db-mid">

        {/* Revenue chart */}
        <Card variant="outlined">
          <CardHeader
            title="Revenue"
            action={
              <ChipGroup
                mode="single"
                value={[period]}
                onChange={(vals) => {
                  if (vals[0]) setPeriod(vals[0] as Period)
                }}
                size="sm"
                variant="tonal"
              >
                <Chip value="7D">7D</Chip>
                <Chip value="30D">30D</Chip>
                <Chip value="90D">90D</Chip>
              </ChipGroup>
            }
          />
          <CardBody noPadding>
            <div style={{ padding: '4px 20px 16px' }}>
              <SmoothChart data={CHART[period].data} />
            </div>
          </CardBody>
        </Card>

        {/* Activity feed */}
        <Card variant="outlined">
          <CardHeader title="Activity" />
          <CardBody noPadding>
            <div style={{ padding: '0 20px' }}>
              {ACTIVITY.map((item, i) => (
                <div key={item.name}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '12px 0',
                    }}
                  >
                    <Avatar name={item.name} size="sm" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: 'var(--color-text-secondary)',
                          marginTop: 1,
                        }}
                      >
                        {item.action}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: 'var(--color-text-disabled)',
                        flexShrink: 0,
                      }}
                    >
                      {item.time}
                    </span>
                  </div>
                  {i < ACTIVITY.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ── Recent Transactions ─────────────────────────────────────────── */}
      <Card variant="outlined">
        <CardHeader
          title="Recent Transactions"
          action={
            <Button variant="ghost" size="sm">
              View all
            </Button>
          }
        />
        <CardBody noPadding>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 13,
              }}
            >
              <thead>
                <tr>
                  {['Transaction', 'Customer', 'Amount', 'Status'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '8px 24px',
                        textAlign: 'left',
                        fontSize: 11,
                        fontWeight: 500,
                        color: 'var(--color-text-secondary)',
                        background: 'var(--color-surface-variant)',
                        borderTop: '0.5px solid var(--color-outline-variant)',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr
                    key={tx.id}
                    style={{
                      borderTop: '0.5px solid var(--color-outline-variant)',
                      background:
                        i % 2 === 1
                          ? 'var(--color-surface-variant)'
                          : 'transparent',
                    }}
                  >
                    <td
                      style={{
                        padding: '12px 24px',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 12,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {tx.id}
                    </td>
                    <td
                      style={{
                        padding: '12px 24px',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {tx.customer}
                    </td>
                    <td
                      style={{
                        padding: '12px 24px',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {tx.amount}
                    </td>
                    <td style={{ padding: '12px 24px' }}>
                      <Badge color={tx.status} variant="tonal" size="sm">
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
