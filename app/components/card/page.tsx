'use client';

import { Button, Card, CardBody, CardFooter, CardHeader } from 'omverse-ui';
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
    description: 'Visual style',
  },
  {
    name: 'interactive',
    type: 'boolean',
    default: 'false',
    description: 'Adds hover and press states',
  },
  {
    name: 'selected',
    type: 'boolean',
    default: 'false',
    description: 'Selected/active state',
  },
  {
    name: 'asButton',
    type: 'boolean',
    default: 'false',
    description: 'Renders as a button element',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Card, CardBody, CardHeader } from 'omverse-ui'

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
  <Card variant="elevated">
    <CardHeader title="Elevated" subtitle="Shadow + hover lift" />
    <CardBody>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        The default card variant with subtle shadow elevation.
      </p>
    </CardBody>
  </Card>

  <Card variant="filled">
    <CardHeader title="Filled" subtitle="Tonal background" />
    <CardBody>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        Uses a tonal surface background color.
      </p>
    </CardBody>
  </Card>

  <Card variant="outlined">
    <CardHeader title="Outlined" subtitle="Border highlight" />
    <CardBody>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        Clean border that highlights on hover.
      </p>
    </CardBody>
  </Card>

  <Card variant="ghost">
    <CardHeader title="Ghost" subtitle="Dashed border" />
    <CardBody>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        Most minimal variant with dashed border.
      </p>
    </CardBody>
  </Card>

  <Card variant="gradient">
    <CardBody>
      <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>Gradient</p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Brand colors</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
        Brand gradient background.
      </p>
    </CardBody>
  </Card>

  {/* Strong colored backdrop makes the frosted-glass blur clearly visible */}
  <div style={{ background: 'linear-gradient(135deg, #6366F1, #A855F7)', borderRadius: 12, padding: 16 }}>
    <Card variant="glass">
      <CardBody>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>Glass</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Frosted effect</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
          Frosted glass — best on colored backgrounds.
        </p>
      </CardBody>
    </Card>
  </div>
</div>`;

const HEADER_FOOTER_CODE = `import { Button, Card, CardBody, CardFooter, CardHeader } from 'omverse-ui'

<Card variant="outlined" style={{ width: 240 }}>
  <CardHeader title="Card title" subtitle="Card subtitle" />
  <CardBody>
    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
      Card content goes here.
    </p>
  </CardBody>
  <CardFooter>
    <Button size="sm" variant="outlined">Cancel</Button>
    <Button size="sm" variant="filled">Save</Button>
  </CardFooter>
</Card>`;

/* ─── Page ─── */

export default function CardPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Card']}
        title="Card"
        description="A surface for grouping related content. 6 variants with support for media, interactive states and flip animation."
        tags={['6 variants', 'Interactive', 'Flip card', 'Media', 'Selected state']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="elevated (default), filled, outlined, ghost, gradient and glass"
          layout="grid"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              width: '100%',
            }}
          >
            <Card variant="elevated">
              <CardHeader title="Elevated" subtitle="Shadow + hover lift" />
              <CardBody>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  The default card variant with subtle shadow elevation.
                </p>
              </CardBody>
            </Card>

            <Card variant="filled">
              <CardHeader title="Filled" subtitle="Tonal background" />
              <CardBody>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  Uses a tonal surface background color.
                </p>
              </CardBody>
            </Card>

            <Card variant="outlined">
              <CardHeader title="Outlined" subtitle="Border highlight" />
              <CardBody>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  Clean border that highlights on hover.
                </p>
              </CardBody>
            </Card>

            <Card variant="ghost">
              <CardHeader title="Ghost" subtitle="Dashed border" />
              <CardBody>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  Most minimal variant with dashed border.
                </p>
              </CardBody>
            </Card>

            <Card variant="gradient">
              <CardBody>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>Gradient</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Brand colors</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                  Brand gradient background.
                </p>
              </CardBody>
            </Card>

            {/* Strong colored backdrop makes the frosted-glass blur clearly visible */}
            <div
              style={{
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Card variant="glass">
                <CardBody>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>Glass</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Frosted effect</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                    Frosted glass — best on colored backgrounds.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: With header and footer ── */}
        <ComponentPreview
          title="With header and footer"
          description="Compose CardHeader, CardBody and CardFooter for structured layouts"
        >
          <Card variant="outlined" style={{ width: 240 }}>
            <CardHeader title="Card title" subtitle="Card subtitle" />
            <CardBody>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Card content goes here.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outlined">Cancel</Button>
              <Button size="sm" variant="filled">Save</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={HEADER_FOOTER_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={CARD_PROPS} />

      </div>
    </div>
  );
}
