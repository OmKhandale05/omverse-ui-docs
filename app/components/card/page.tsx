'use client';

import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  Icon,
} from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const CARD_PROPS = [
  {
    name: 'variant',
    type: "'elevated' | 'filled' | 'outlined' | 'ghost' | 'gradient' | 'glass'",
    default: "'elevated'",
    description: 'Visual style of the card',
  },
  {
    name: 'interactive',
    type: 'boolean',
    default: 'false',
    description: 'Adds hover / focus / active states',
  },
  {
    name: 'selected',
    type: 'boolean',
    default: 'false',
    description: 'Shows a selected ring or border',
  },
  {
    name: 'asButton',
    type: 'boolean',
    default: 'false',
    description: 'Renders as a <button> for fully-clickable cards',
  },
  {
    name: 'radius',
    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
    default: "'md'",
    description: 'Border radius',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Card, CardBody } from 'omverse-ui'

<Card variant="elevated" style={{ width: 176 }}>
  <CardBody>
    <p>Elevated</p>
    <p style={{ opacity: 0.6, marginTop: 4 }}>Shadow + hover lift</p>
  </CardBody>
</Card>

<Card variant="filled" style={{ width: 176 }}>
  <CardBody>
    <p>Filled</p>
    <p style={{ opacity: 0.6, marginTop: 4 }}>Tonal background</p>
  </CardBody>
</Card>

<Card variant="outlined" style={{ width: 176 }}>
  <CardBody>
    <p>Outlined</p>
    <p style={{ opacity: 0.6, marginTop: 4 }}>Border highlight</p>
  </CardBody>
</Card>

<Card variant="ghost" style={{ width: 176 }}>
  <CardBody>
    <p>Ghost</p>
    <p style={{ opacity: 0.6, marginTop: 4 }}>Dashed border</p>
  </CardBody>
</Card>

<Card variant="gradient" style={{ width: 176 }}>
  <CardBody>
    <p>Gradient</p>
    <p style={{ opacity: 0.8, marginTop: 4 }}>Brand colors</p>
  </CardBody>
</Card>`;

const GLASS_CODE = `import { Card, CardBody } from 'omverse-ui'

{/* Glass needs a colored backdrop to show the frosted effect */}
<div style={{
  background: 'linear-gradient(135deg, #6366F1, #A855F7)',
  padding: 32,
  borderRadius: 16,
  display: 'flex',
  gap: 16,
}}>
  <Card variant="glass" style={{ width: 208 }}>
    <CardBody>
      <p>Glass card</p>
      <p style={{ opacity: 0.8, marginTop: 4 }}>Frosted glass effect</p>
    </CardBody>
  </Card>

  <Card variant="glass" style={{ width: 208 }}>
    <CardBody>
      <p>Another glass</p>
      <p style={{ opacity: 0.8, marginTop: 4 }}>Works on any background</p>
    </CardBody>
  </Card>
</div>`;

const MEDIA_CODE = `import { Avatar, Badge, Button, Card, CardBody, CardFooter, CardHeader, CardMedia } from 'omverse-ui'

{/* Card with image overlay content */}
<Card variant="elevated" style={{ width: 208 }} interactive>
  <CardMedia
    src="https://picsum.photos/seed/mountain/400/200"
    alt="Mountain Trek"
    height={160}
    overlay
    overlayContent={
      <>
        <p style={{ fontWeight: 600 }}>Mountain Trek</p>
        <p style={{ opacity: 0.8, fontSize: 12 }}>Himalayas · 5 days</p>
      </>
    }
  />
  <CardBody>
    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
      A 5-day guided trek through the Himalayas with expert guides.
    </p>
  </CardBody>
  <CardFooter divider style={{ justifyContent: 'space-between' }}>
    <Badge color="success" variant="tonal">Available</Badge>
    <Button size="sm" variant="filled">Book now</Button>
  </CardFooter>
</Card>

{/* Card with header action */}
<Card variant="elevated" style={{ width: 256 }} interactive>
  <CardMedia
    src="https://picsum.photos/seed/launch/400/140"
    alt="Campaign"
    height={140}
  />
  <CardHeader
    title="Launch campaign"
    subtitle="Marketing · 3 days left"
    action={<Badge color="success" variant="tonal">Active</Badge>}
  />
  <CardBody>
    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
      Drive awareness for the new product launch across all channels.
    </p>
  </CardBody>
  <CardFooter divider style={{ justifyContent: 'space-between' }}>
    <div style={{ display: 'flex' }}>
      <Avatar name="John Doe" size="xs" style={{ boxShadow: '0 0 0 2px var(--color-background)' }} />
      <Avatar name="Alice Wang" size="xs" color="secondary" style={{ boxShadow: '0 0 0 2px var(--color-background)', marginLeft: -8 }} />
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" variant="text">View</Button>
      <Button size="sm" variant="filled">Edit</Button>
    </div>
  </CardFooter>
</Card>`;

const HORIZONTAL_CODE = `import { Button, Card, CardBody, CardHeader, CardMedia } from 'omverse-ui'

<Card variant="elevated" style={{ width: 320, display: 'flex', flexDirection: 'row', overflow: 'hidden' }} interactive>
  <CardMedia
    src="https://picsum.photos/seed/music/200/200"
    alt="Midnight Rain"
    style={{ width: 96, flexShrink: 0, borderRadius: '12px 0 0 12px', height: 'auto', alignSelf: 'stretch' }}
  />
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <CardHeader title="Midnight Rain" subtitle="Taylor Swift · 3:54" />
    <CardBody>
      <Button size="sm" variant="filled" leadingIcon="play">Play</Button>
    </CardBody>
  </div>
</Card>`;

const ACTION_CODE = `import { useState } from 'react'
import { Badge, Card, CardBody, Icon } from 'omverse-ui'

const [selected, setSelected] = useState('template')

// icon-map is 'file-text' | 'bookmark' | 'upload' — all in omverse-ui's iconMap
const ICONS = { scratch: 'file-text', template: 'bookmark', import: 'upload' } as const

const options = [
  { id: 'scratch',  label: 'From scratch', desc: 'Start fresh' },
  { id: 'template', label: 'Template',     desc: 'Use a preset' },
  { id: 'import',   label: 'Import',       desc: 'Upload file' },
]

<div style={{ display: 'flex', gap: 16 }}>
  {options.map(opt => (
    <Card
      key={opt.id}
      variant="outlined"
      interactive
      selected={selected === opt.id}
      onClick={() => setSelected(opt.id)}
      asButton
      style={{ width: 176, textAlign: 'center' }}
    >
      <CardBody style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Icon name={ICONS[opt.id]} size="lg" />
        <p style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>{opt.label}</p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>{opt.desc}</p>
        {selected === opt.id && (
          <Badge color="default" variant="tonal" style={{ marginTop: 8 }}>Selected</Badge>
        )}
      </CardBody>
    </Card>
  ))}
</div>`;

const STAT_CODE = `import { Card } from 'omverse-ui'

<div style={{ display: 'flex', gap: 16 }}>
  <Card variant="outlined" style={{ width: 176, padding: 16 }}>
    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Total revenue</p>
    <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 4 }}>$48.2k</p>
    <p style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: '#10B981' }}>+12.5%</p>
  </Card>

  <Card variant="outlined" style={{ width: 176, padding: 16 }}>
    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Active users</p>
    <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 4 }}>2,841</p>
    <p style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: '#10B981' }}>+8.2%</p>
  </Card>

  <Card variant="outlined" style={{ width: 176, padding: 16 }}>
    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Bounce rate</p>
    <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 4 }}>24.1%</p>
    <p style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: '#EF4444' }}>-3.1%</p>
  </Card>
</div>`;

const PROFILE_CODE = `import { Avatar, Card, CardBody, CardFooter, CardMedia } from 'omverse-ui'

<Card variant="outlined" style={{ width: 208, overflow: 'hidden' }}>
  <CardMedia src="https://picsum.photos/seed/profile/400/120" alt="Cover" height={120} />
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: -28 }}>
    <Avatar name="John Doe" size="lg" style={{ boxShadow: '0 0 0 4px var(--color-background)' }} />
  </div>
  <CardBody style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 0 }}>
    <p style={{ fontSize: 14, fontWeight: 600 }}>John Doe</p>
    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Product Designer</p>
  </CardBody>
  <CardFooter divider style={{ justifyContent: 'space-around', padding: 0, marginTop: 12 }}>
    {[['128', 'Projects'], ['4.2k', 'Followers'], ['98%', 'Rating']].map(([val, lbl]) => (
      <div key={lbl} style={{ flex: 1, textAlign: 'center', padding: '12px 0' }}>
        <p style={{ fontSize: 13, fontWeight: 600 }}>{val}</p>
        <p style={{ fontSize: 12, color: 'var(--color-text-disabled)' }}>{lbl}</p>
      </div>
    ))}
  </CardFooter>
</Card>`;

/* ─── Page ─── */

export default function CardPage() {
  const [selected, setSelected] = useState('template');

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Card']}
        title="Card"
        description="A surface for grouping related content. 6 variants with support for media, interactive states, selected state, and composable header/body/footer."
        tags={['6 variants', 'Interactive', 'Media', 'Selected state', 'Overlay']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="elevated (default), filled, outlined, ghost, gradient — all support hover states"
          layout="start"
        >
          <Card variant="elevated" style={{ width: 176 }}>
            <CardBody>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>Elevated</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>Shadow + hover lift</p>
            </CardBody>
          </Card>

          <Card variant="filled" style={{ width: 176 }}>
            <CardBody>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>Filled</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>Tonal background</p>
            </CardBody>
          </Card>

          <Card variant="outlined" style={{ width: 176 }}>
            <CardBody>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>Outlined</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>Border highlight</p>
            </CardBody>
          </Card>

          <Card variant="ghost" style={{ width: 176 }}>
            <CardBody>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>Ghost</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>Dashed border</p>
            </CardBody>
          </Card>

          <Card variant="gradient" style={{ width: 176 }}>
            <CardBody>
              <p style={{ fontSize: 14, fontWeight: 500 }}>Gradient</p>
              <p style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>Brand colors</p>
            </CardBody>
          </Card>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Glass variant ── */}
        <ComponentPreview
          title="Glass variant"
          description="Use on colored backgrounds to reveal the frosted-glass blur"
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #6366F1, #A855F7)',
              padding: 32,
              borderRadius: 16,
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <Card variant="glass" style={{ width: 208 }}>
              <CardBody>
                <p style={{ fontSize: 14, fontWeight: 500 }}>Glass card</p>
                <p style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>Frosted glass effect</p>
              </CardBody>
            </Card>

            <Card variant="glass" style={{ width: 208 }}>
              <CardBody>
                <p style={{ fontSize: 14, fontWeight: 500 }}>Another glass</p>
                <p style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>Works on any background</p>
              </CardBody>
            </Card>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GLASS_CODE} />

        {/* ── Section 3: With media + header + footer ── */}
        <ComponentPreview
          title="With media + header + footer"
          description="CardMedia, CardHeader (with action), CardBody and CardFooter compose the full card"
          layout="start"
        >
          {/* Image overlay card */}
          <Card variant="elevated" style={{ width: 208 }} interactive>
            <CardMedia
              src="https://picsum.photos/seed/mountain/400/200"
              alt="Mountain Trek"
              height={160}
              overlay
              overlayContent={
                <>
                  <p style={{ fontWeight: 600, fontSize: 13 }}>Mountain Trek</p>
                  <p style={{ fontSize: 12, opacity: 0.8 }}>Himalayas · 5 days</p>
                </>
              }
            />
            <CardBody>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                A 5-day guided trek through the Himalayas with expert guides.
              </p>
            </CardBody>
            <CardFooter divider style={{ justifyContent: 'space-between' }}>
              <Badge color="success" variant="tonal">Available</Badge>
              <Button size="sm" variant="filled">Book now</Button>
            </CardFooter>
          </Card>

          {/* Header with action card */}
          <Card variant="elevated" style={{ width: 256 }} interactive>
            <CardMedia
              src="https://picsum.photos/seed/launch/400/140"
              alt="Campaign"
              height={140}
            />
            <CardHeader
              title="Launch campaign"
              subtitle="Marketing · 3 days left"
              action={<Badge color="success" variant="tonal">Active</Badge>}
            />
            <CardBody>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Drive awareness for the new product launch across all channels.
              </p>
            </CardBody>
            <CardFooter divider style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar name="John Doe" size="xs" style={{ boxShadow: '0 0 0 2px var(--color-background)' }} />
                <Avatar name="Alice Wang" size="xs" color="secondary" style={{ boxShadow: '0 0 0 2px var(--color-background)', marginLeft: -8 }} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" variant="text">View</Button>
                <Button size="sm" variant="filled">Edit</Button>
              </div>
            </CardFooter>
          </Card>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MEDIA_CODE} />

        {/* ── Section 4: Horizontal layout ── */}
        <ComponentPreview
          title="Horizontal layout"
          description="Set the card to flex-row and give CardMedia a fixed width for side-by-side layouts"
        >
          <Card
            variant="elevated"
            interactive
            style={{ width: 320, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}
          >
            <CardMedia
              src="https://picsum.photos/seed/music/200/200"
              alt="Midnight Rain"
              style={{
                width: 96,
                flexShrink: 0,
                borderRadius: '12px 0 0 12px',
                height: 'auto',
                alignSelf: 'stretch',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardHeader title="Midnight Rain" subtitle="Taylor Swift · 3:54" />
              <CardBody>
                <Button size="sm" variant="filled" leadingIcon="play">Play</Button>
              </CardBody>
            </div>
          </Card>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={HORIZONTAL_CODE} />

        {/* ── Section 5: Selected state — action cards ── */}
        <ComponentPreview
          title="Selected state — action cards"
          description="Combine interactive + selected + asButton to create fully-clickable selectable cards"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {(['scratch', 'template', 'import'] as const).map(opt => (
              <Card
                key={opt}
                variant="outlined"
                interactive
                selected={selected === opt}
                onClick={() => setSelected(opt)}
                asButton
                style={{ width: 176, textAlign: 'center' }}
              >
                <CardBody style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: 8,
                  padding: 16,
                }}>
                  <Icon
                    name={opt === 'scratch' ? 'file-text' : opt === 'template' ? 'bookmark' : 'upload'}
                    size="lg"
                  />
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {opt === 'scratch' ? 'From scratch' : opt === 'template' ? 'Template' : 'Import'}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    {opt === 'scratch' ? 'Start fresh' : opt === 'template' ? 'Use a preset' : 'Upload file'}
                  </p>
                  {selected === opt && (
                    <Badge color="default" variant="tonal">Selected</Badge>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ACTION_CODE} />

        {/* ── Section 6: Stat cards ── */}
        <ComponentPreview
          title="Stat cards"
          description="Cards as data containers — no CardBody needed when using padding directly on Card"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Card variant="outlined" style={{ width: 176, padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Total revenue</p>
              <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 4 }}>$48.2k</p>
              <p style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: '#10B981' }}>+12.5%</p>
            </Card>

            <Card variant="outlined" style={{ width: 176, padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Active users</p>
              <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 4 }}>2,841</p>
              <p style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: '#10B981' }}>+8.2%</p>
            </Card>

            <Card variant="outlined" style={{ width: 176, padding: 16 }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Bounce rate</p>
              <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 4 }}>24.1%</p>
              <p style={{ fontSize: 12, fontWeight: 500, marginTop: 8, color: '#EF4444' }}>-3.1%</p>
            </Card>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STAT_CODE} />

        {/* ── Section 7: Profile card ── */}
        <ComponentPreview
          title="Profile card"
          description="CardMedia + Avatar with negative margin creates a cover-photo-to-avatar overlap"
        >
          <Card variant="outlined" style={{ width: 208, overflow: 'hidden' }}>
            <CardMedia
              src="https://picsum.photos/seed/profile/400/120"
              alt="Cover"
              height={120}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -28 }}>
              <Avatar
                name="John Doe"
                size="lg"
                style={{ boxShadow: '0 0 0 4px var(--color-background)' }}
              />
            </div>
            <CardBody style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>John Doe</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Product Designer</p>
            </CardBody>
            <CardFooter
              divider
              style={{ justifyContent: 'space-around', padding: 0, marginTop: 12 }}
            >
              {([['128', 'Projects'], ['4.2k', 'Followers'], ['98%', 'Rating']] as const).map(([val, lbl]) => (
                <div key={lbl} style={{ flex: 1, textAlign: 'center', padding: '12px 0' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{val}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-text-disabled)' }}>{lbl}</p>
                </div>
              ))}
            </CardFooter>
          </Card>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PROFILE_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={CARD_PROPS} />

      </div>
    </div>
  );
}
