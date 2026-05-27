/**
 * Source code for the Pricing example — exported as a string
 * so it can be displayed in the Code panel of the Examples page.
 */
export const pricingCode = `'use client'

import { useState } from 'react'
import { Badge, Button, Card, CardBody, CardHeader, Divider, Switch } from 'omverse-ui'

const FREE_FEATURES = ['Up to 3 projects', '5 components', 'Community support', 'Basic analytics']
const PRO_FEATURES  = ['Everything in Free', 'Unlimited projects', 'All 50+ components', 'Priority support', 'Advanced analytics', 'Custom themes', 'Team collaboration (5 seats)']
const ENT_FEATURES  = ['Everything in Pro', 'Unlimited seats', 'SSO / SAML', 'SLA guarantee', 'Dedicated support', 'Custom contracts', 'On-premise option']

const FAQS = [
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes — change plans at any time. Upgrades are immediate; downgrades kick in at end of billing cycle.' },
  { q: 'Is there a free trial?', a: 'Pro comes with a 14-day free trial, no credit card required.' },
  { q: 'Do you offer refunds?', a: '30-day money-back guarantee on annual plans. Contact support for a full refund.' },
]

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {features.map((f) => (
        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <i className="ti ti-check" style={{ fontSize: 16, color: 'var(--color-success)', flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{f}</span>
        </li>
      ))}
    </ul>
  )
}

export function Pricing() {
  const [annual, setAnnual]   = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{\`
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr; } }
      \`}</style>

      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 10 }}>
          Simple, transparent pricing
        </p>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', maxWidth: 460, margin: '0 auto 22px' }}>
          Choose the plan that fits your workflow. Upgrade or cancel anytime.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <Switch label="Annual billing" labelPosition="right" checked={annual}
            onChange={(e) => setAnnual((e.target as HTMLInputElement).checked)} />
          {annual && <Badge color="success" variant="tonal" size="sm">Save 20%</Badge>}
        </div>
      </div>

      <div className="pricing-grid">
        <Card variant="outlined">
          <CardHeader title="Free" subtitle="For individuals & side projects" />
          <CardBody>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)' }}>$0</span>
              <span style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginLeft: 4 }}>/month</span>
            </div>
            <Button variant="outlined" size="md" style={{ width: '100%', marginBottom: 20 }}>Get started</Button>
            <Divider />
            <div style={{ marginTop: 20 }}><FeatureList features={FREE_FEATURES} /></div>
          </CardBody>
        </Card>

        <Card variant="elevated" style={{ borderTop: '2.5px solid var(--color-primary)' }}>
          <CardHeader title="Pro" subtitle="For professionals & small teams"
            action={<Badge color="primary" variant="tonal">Popular</Badge>} />
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)' }}>{annual ? '$10' : '$12'}</span>
              <span style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginLeft: 4 }}>/month</span>
              {annual && <Badge color="success" variant="tonal" size="sm">Save 20%</Badge>}
            </div>
            <Button variant="filled" size="md" style={{ width: '100%', marginBottom: 20 }}>Start free trial</Button>
            <Divider />
            <div style={{ marginTop: 20 }}><FeatureList features={PRO_FEATURES} /></div>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardHeader title="Enterprise" subtitle="For large teams & organizations" />
          <CardBody>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)' }}>Custom</span>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>Contact for pricing</p>
            </div>
            <Button variant="tonal" size="md" style={{ width: '100%', marginBottom: 20 }}>Contact sales</Button>
            <Divider />
            <div style={{ marginTop: 20 }}><FeatureList features={ENT_FEATURES} /></div>
          </CardBody>
        </Card>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16, textAlign: 'center' }}>
          Frequently asked questions
        </p>
        {FAQS.map((faq, i) => (
          <div key={i}>
            <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 4px', cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)', flex: 1, paddingRight: 16 }}>{faq.q}</span>
              <i className={openFaq === i ? 'ti ti-chevron-up' : 'ti ti-chevron-down'}
                style={{ fontSize: 18, color: 'var(--color-text-secondary)', flexShrink: 0 }} />
            </div>
            {openFaq === i && (
              <div style={{ padding: '0 4px 16px', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{faq.a}</div>
            )}
            {i < FAQS.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  )
}
`
