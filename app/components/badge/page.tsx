'use client';

import { Badge } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const BADGE_PROPS = [
  {
    name: 'variant',
    type: "'filled' | 'outlined' | 'tonal' | 'ghost'",
    default: "'filled'",
    description: 'Visual style',
  },
  {
    name: 'color',
    type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'",
    default: "'default'",
    description: 'Color scheme',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'false',
    description: 'Shows a dot instead of text',
  },
  {
    name: 'pulse',
    type: 'boolean',
    default: 'false',
    description: 'Adds a pulse animation',
  },
  {
    name: 'count',
    type: 'number',
    default: 'undefined',
    description: 'Shows a number count',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Badge } from 'omverse-ui'

<Badge variant="filled" color="primary">Filled</Badge>
<Badge variant="outlined" color="primary">Outlined</Badge>
<Badge variant="tonal" color="primary">Tonal</Badge>
<Badge variant="ghost" color="primary">Ghost</Badge>`;

const COLORS_CODE = `<Badge color="default">Default</Badge>
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>`;

const DOT_CODE = `<Badge dot color="success">Online</Badge>
<Badge dot color="error">Offline</Badge>
<Badge dot color="warning">Away</Badge>`;

// pulse requires dot=true — the pulse ring animates around the dot
const PULSE_CODE = `<Badge dot pulse color="success">Live</Badge>
<Badge dot pulse color="error">Alert</Badge>`;

/* ─── Page ─── */

export default function BadgePage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Badge']}
        title="Badge"
        description="Small status indicators and labels. 4 variants, 6 colors, dot mode, count mode and pulse animation."
        tags={['4 variants', '6 colors', 'Dot mode', 'Count mode', 'Pulse']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="4 variants for different levels of visual emphasis"
        >
          <Badge variant="filled" color="primary">Filled</Badge>
          <Badge variant="outlined" color="primary">Outlined</Badge>
          <Badge variant="tonal" color="primary">Tonal</Badge>
          <Badge variant="ghost" color="primary">Ghost</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 semantic colors mapped to your design system tokens"
        >
          <Badge color="default">Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Dot mode ── */}
        <ComponentPreview
          title="Dot mode"
          description="Minimal dot indicator — children are replaced by a small circle"
        >
          <Badge dot color="success">Online</Badge>
          <Badge dot color="error">Offline</Badge>
          <Badge dot color="warning">Away</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DOT_CODE} />

        {/* ── Section 4: Pulse animation ── */}
        <ComponentPreview
          title="Pulse animation"
          description="Animated pulse ring around the dot — requires dot=true"
        >
          <Badge dot pulse color="success">Live</Badge>
          <Badge dot pulse color="error">Alert</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PULSE_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={BADGE_PROPS} />

      </div>
    </div>
  );
}
