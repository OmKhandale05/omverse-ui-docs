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

const VARIANTS_CODE = `import { Card, CardBody } from 'omverse-ui'

<Card variant="elevated" style={{ width: 180 }}>
  <CardBody><p style={{ fontSize: 13 }}>Elevated</p></CardBody>
</Card>
<Card variant="filled" style={{ width: 180 }}>
  <CardBody><p style={{ fontSize: 13 }}>Filled</p></CardBody>
</Card>
<Card variant="outlined" style={{ width: 180 }}>
  <CardBody><p style={{ fontSize: 13 }}>Outlined</p></CardBody>
</Card>
<Card variant="ghost" style={{ width: 180 }}>
  <CardBody><p style={{ fontSize: 13 }}>Ghost</p></CardBody>
</Card>`;

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
        >
          <Card variant="elevated" style={{ width: 180 }}>
            <CardBody><p style={{ fontSize: 13 }}>Elevated</p></CardBody>
          </Card>
          <Card variant="filled" style={{ width: 180 }}>
            <CardBody><p style={{ fontSize: 13 }}>Filled</p></CardBody>
          </Card>
          <Card variant="outlined" style={{ width: 180 }}>
            <CardBody><p style={{ fontSize: 13 }}>Outlined</p></CardBody>
          </Card>
          <Card variant="ghost" style={{ width: 180 }}>
            <CardBody><p style={{ fontSize: 13 }}>Ghost</p></CardBody>
          </Card>
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
