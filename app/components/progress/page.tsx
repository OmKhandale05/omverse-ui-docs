'use client';

import { Progress, CircularProgress, SegmentedProgress, MultiProgress } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const PROGRESS_PROPS = [
  {
    name: 'value',
    type: 'number',
    default: 'undefined',
    description: 'Progress value 0–100. Omit for indeterminate progress.',
  },
  {
    name: 'variant',
    type: "'default' | 'gradient' | 'glow' | 'striped' | 'thin' | 'indeterminate' | 'bubble'",
    default: "'default'",
    description: 'Visual style of the progress bar',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
    default: "'default'",
    description: 'Color scheme applied to the fill',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Track height',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown above the progress bar',
  },
  {
    name: 'showValue',
    type: "'percent' | 'fraction' | 'none'",
    default: 'undefined',
    description: "Value display format — 'percent' shows '65%', 'fraction' shows '6.5/10'",
  },
  {
    name: 'helperText',
    type: 'string',
    default: 'undefined',
    description: 'Helper text shown below the bar',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const LINEAR_CODE = `import { Progress } from 'omverse-ui'

<Progress value={70} variant="default" />
<Progress value={70} variant="striped" />
<Progress value={70} variant="gradient" />
<Progress value={70} variant="glow" />
<Progress value={70} variant="indeterminate" />
<Progress value={70} variant="bubble" />`;

const COLORS_CODE = `<Progress value={60} color="default" />
<Progress value={60} color="secondary" />
<Progress value={60} color="success" />
<Progress value={60} color="warning" />
<Progress value={60} color="error" />
<Progress value={60} color="info" />`;

const SIZES_CODE = `<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />
<Progress value={60} size="xl" />`;

const LABEL_CODE = `<Progress value={75} label="Uploading..." showValue="percent" />
<Progress value={45} label="Processing" showValue="percent" color="secondary" />`;

const CIRCULAR_CODE = `import { CircularProgress } from 'omverse-ui'

<CircularProgress value={75} showValue />
<CircularProgress value={45} color="secondary" showValue />
<CircularProgress value={90} color="success" showValue />
<CircularProgress value={30} color="error" showValue />`;

const SEGMENTED_CODE = `import { SegmentedProgress } from 'omverse-ui'

<SegmentedProgress value={3} total={5} />
<SegmentedProgress value={7} total={10} color="success" />`;

const MULTI_CODE = `import { MultiProgress } from 'omverse-ui'

<MultiProgress
  segments={[
    { value: 45, color: 'default', label: 'Design' },
    { value: 30, color: 'secondary', label: 'Development' },
    { value: 25, color: 'success', label: 'QA' },
  ]}
  showLegend
/>`;

/* ─── Shared layout helpers ─── */

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  maxWidth: 480,
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 4,
};

/* ─── Page ─── */

export default function ProgressPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Progress']}
        title="Progress"
        description="Linear and circular progress indicators. Segmented and multi-progress variants for dashboards."
        tags={['Linear', 'Circular', 'Segmented', 'Multi', '7 variants', '6 colors']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Linear variants ── */}
        <ComponentPreview
          title="Linear variants"
          description="7 styles — default solid fill, striped, gradient, glow, thin, indeterminate (unknown duration), bubble (tooltip on fill)"
          align="start"
        >
          <div style={stack}>
            {(
              [
                { variant: 'default' as const, desc: 'default' },
                { variant: 'striped' as const, desc: 'striped' },
                { variant: 'gradient' as const, desc: 'gradient' },
                { variant: 'glow' as const, desc: 'glow' },
                { variant: 'indeterminate' as const, desc: 'indeterminate' },
                { variant: 'bubble' as const, desc: 'bubble' },
              ]
            ).map(({ variant, desc }) => (
              <div key={variant}>
                <p style={label}>{desc}</p>
                <Progress value={70} variant={variant} />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LINEAR_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 semantic colors — default, secondary, success, warning, error, info"
          align="start"
        >
          <div style={stack}>
            {(
              ['default', 'secondary', 'success', 'warning', 'error', 'info'] as const
            ).map((color) => (
              <div key={color}>
                <p style={label}>{color}</p>
                <Progress value={60} color={color} />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="5 track heights — xs (2 px) to xl (20 px)"
          align="start"
        >
          <div style={stack}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size}>
                <p style={label}>{size}</p>
                <Progress value={60} size={size} />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: With label ── */}
        <ComponentPreview
          title="With label"
          description="label prop adds text above; showValue='percent' appends the percentage"
          align="start"
        >
          <div style={stack}>
            <Progress value={75} label="Uploading..." showValue="percent" />
            <Progress value={45} label="Processing" showValue="percent" color="secondary" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LABEL_CODE} />

        {/* ── Section 5: Circular ── */}
        <ComponentPreview
          title="Circular"
          description="SVG arc indicator — supports all 6 colors, custom size and stroke width"
        >
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <CircularProgress value={75} showValue />
            <CircularProgress value={45} color="secondary" showValue />
            <CircularProgress value={90} color="success" showValue />
            <CircularProgress value={30} color="error" showValue />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CIRCULAR_CODE} />

        {/* ── Section 6: Segmented ── */}
        <ComponentPreview
          title="Segmented"
          description="Discrete step pills — ideal for onboarding flows and step indicators"
          align="start"
        >
          <div style={stack}>
            <div>
              <p style={label}>3 of 5 (default)</p>
              <SegmentedProgress value={3} total={5} />
            </div>
            <div>
              <p style={label}>7 of 10 (success)</p>
              <SegmentedProgress value={7} total={10} color="success" />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEGMENTED_CODE} />

        {/* ── Section 7: Multi-progress ── */}
        <ComponentPreview
          title="Multi-progress"
          description="Stacked bar with per-segment colors and optional legend — ideal for breakdowns"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <MultiProgress
              segments={[
                { value: 45, color: 'default', label: 'Design' },
                { value: 30, color: 'secondary', label: 'Development' },
                { value: 25, color: 'success', label: 'QA' },
              ]}
              showLegend
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={PROGRESS_PROPS} />

      </div>
    </div>
  );
}
