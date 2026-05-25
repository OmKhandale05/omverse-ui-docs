'use client';

import { Badge } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Constants ─── */

const VARIANTS = ['filled', 'outlined', 'tonal', 'ghost'] as const;
const COLORS   = ['default', 'primary', 'secondary', 'success', 'warning', 'error'] as const;

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
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Badge size',
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
    description: 'Adds a pulse animation (requires dot=true)',
  },
  {
    name: 'count',
    type: 'number',
    default: 'undefined',
    description: 'Shows a number — automatically capped at 99+',
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

const ALL_GRID_CODE = `{/* 4 variants × 6 colors */}
${VARIANTS.map(v =>
  COLORS.map(c => `<Badge variant="${v}" color="${c}">${c}</Badge>`).join('\n')
).join('\n')}`;

const SIZES_CODE = `<Badge size="sm" color="primary">Small</Badge>
<Badge size="md" color="primary">Medium</Badge>
<Badge size="lg" color="primary">Large</Badge>`;

const COUNT_CODE = `<Badge count={1} color="error" />
<Badge count={5} color="primary" />
<Badge count={12} color="secondary" />
<Badge count={99} color="warning" />
<Badge count={100} color="error" />`;

const DOT_CODE = `<Badge dot color="success">Online</Badge>
<Badge dot color="error">Offline</Badge>
<Badge dot color="warning">Away</Badge>`;

const PULSE_CODE = `{/* pulse requires dot=true */}
<Badge dot pulse color="success">Live</Badge>
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
          description="6 semantic colors mapped to design system tokens"
        >
          <Badge color="default">Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: All variants and colors ── */}
        <ComponentPreview
          title="All variants and colors"
          description="4 variants × 6 colors — 24 combinations"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VARIANTS.map(variant =>
              COLORS.map(color => (
                <Badge key={`${variant}-${color}`} variant={variant} color={color}>
                  {color}
                </Badge>
              ))
            )}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ALL_GRID_CODE} />

        {/* ── Section 4: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg"
        >
          <Badge size="sm" color="primary">Small</Badge>
          <Badge size="md" color="primary">Medium</Badge>
          <Badge size="lg" color="primary">Large</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 5: Count mode ── */}
        <ComponentPreview
          title="Count"
          description="Displays a number — automatically caps at 99+"
        >
          <Badge count={1} color="error" />
          <Badge count={5} color="primary" />
          <Badge count={12} color="secondary" />
          <Badge count={99} color="warning" />
          <Badge count={100} color="error" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COUNT_CODE} />

        {/* ── Section 6: Dot mode ── */}
        <ComponentPreview
          title="Dot mode"
          description="Minimal dot indicator — children are replaced by a small circle"
        >
          <Badge dot color="success">Online</Badge>
          <Badge dot color="error">Offline</Badge>
          <Badge dot color="warning">Away</Badge>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DOT_CODE} />

        {/* ── Section 7: Pulse animation ── */}
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
