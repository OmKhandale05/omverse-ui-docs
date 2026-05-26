'use client';

import { useState, useEffect } from 'react';
import { Progress, CircularProgress, SegmentedProgress, MultiProgress } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const PROGRESS_PROPS = [
  { name: 'value',        type: 'number',                                                              default: '0',         description: 'Current progress value (0–max)' },
  { name: 'max',          type: 'number',                                                              default: '100',       description: 'Maximum value' },
  { name: 'color',        type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient'", default: "'default'", description: 'Fill color' },
  { name: 'size',         type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",                                  default: "'md'",      description: 'Track height' },
  { name: 'variant',      type: "'default' | 'gradient' | 'glow' | 'striped' | 'indeterminate' | 'bubble' | 'thin'", default: "'default'", description: 'Visual style' },
  { name: 'label',        type: 'string',                                                              default: '—',         description: 'Label shown above or beside the bar' },
  { name: 'helperText',   type: 'string',                                                              default: '—',         description: 'Helper text shown below the bar' },
  { name: 'showValue',    type: 'boolean',                                                             default: 'false',     description: 'Shows the percentage value' },
  { name: 'animated',     type: 'boolean',                                                             default: 'false',     description: 'Animates stripes (striped variant)' },
  { name: 'formatValue',  type: '(value: number) => string',                                          default: '—',         description: 'Custom value formatter' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const SEGMENTED_PROPS = [
  { name: 'value',          type: 'number',    default: '—',     description: 'Number of filled segments' },
  { name: 'total',          type: 'number',    default: '10',    description: 'Total number of segments' },
  { name: 'color',          type: 'string',    default: '—',     description: 'Color of the filled segments' },
  { name: 'segmentColors',  type: 'string[]',  default: '—',     description: 'Per-segment color array' },
  { name: 'size',           type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Segment height' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const CIRCULAR_PROPS = [
  { name: 'value',       type: 'number',    default: '0',     description: 'Current progress value (0–max)' },
  { name: 'max',         type: 'number',    default: '100',   description: 'Maximum value' },
  { name: 'size',        type: 'number',    default: '80',    description: 'Diameter of the circle in px' },
  { name: 'strokeWidth', type: 'number',    default: '8',     description: 'Width of the arc stroke' },
  { name: 'color',       type: 'string',    default: '—',     description: 'Color of the progress arc' },
  { name: 'gradient',    type: 'boolean',   default: 'false', description: 'Applies a gradient to the arc' },
  { name: 'showValue',   type: 'boolean',   default: 'false', description: 'Shows the percentage in the center' },
  { name: 'label',       type: 'string',    default: '—',     description: 'Label shown below the circle' },
  { name: 'formatValue', type: '(value: number) => string', default: '—', description: 'Custom center value formatter' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const MULTI_PROPS = [
  { name: 'segments',    type: '{ value: number; color?: string; label?: string }[]', default: '—', description: 'Array of stacked segments' },
  { name: 'max',         type: 'number',   default: '100',  description: 'Maximum total value' },
  { name: 'size',        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Track height' },
  { name: 'showLegend',  type: 'boolean',  default: 'false', description: 'Shows a legend below the bar' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const SIZES_CODE = `<Progress value={70} size="xs" />
<Progress value={70} size="sm" />
<Progress value={70} size="md" />
<Progress value={70} size="lg" />
<Progress value={70} size="xl" />`;

const COLORS_CODE = `<Progress value={65} color="default"   />
<Progress value={65} color="secondary" />
<Progress value={65} color="success"   />
<Progress value={65} color="warning"   />
<Progress value={65} color="error"     />
<Progress value={65} color="gradient"  />`;

const VARIANTS_CODE = `<Progress value={65} variant="default"       />
<Progress value={65} variant="gradient"      />
<Progress value={65} variant="glow"          />
<Progress value={65} variant="striped"       animated />
<Progress variant="indeterminate"            />
<Progress value={65} variant="bubble"        showValue />
<Progress value={65} variant="thin"          />`;

const LABEL_CODE = `{/* With label and showValue */}
<Progress
  value={78}
  variant="glow"
  color="default"
  label="Storage used"
  showValue
  helperText="78 GB of 100 GB used"
/>

{/* Gradient with label */}
<Progress
  value={55}
  variant="gradient"
  label="Project completion"
  showValue
/>

{/* Error state */}
<Progress
  value={92}
  variant="glow"
  color="error"
  label="Memory usage"
  showValue
  helperText="Critical — consider upgrading"
/>`;

const SEGMENTED_CODE = `{/* Default color */}
<SegmentedProgress value={6} total={10} />

{/* Success color */}
<SegmentedProgress value={8} total={10} color="success" />

{/* Per-segment colors */}
<SegmentedProgress
  value={7}
  total={10}
  segmentColors={['#10B981','#10B981','#10B981','#F59E0B','#F59E0B','#EF4444','#EF4444']}
/>`;

const CIRCULAR_CODE = `{/* Basic */}
<CircularProgress value={72} showValue />

{/* Colors */}
<CircularProgress value={85} color="success"   showValue />
<CircularProgress value={45} color="warning"   showValue />
<CircularProgress value={20} color="error"     showValue />

{/* Gradient */}
<CircularProgress value={68} gradient showValue />

{/* With label */}
<CircularProgress value={92} showValue label="CPU" />`;

const MULTI_CODE = `{/* Storage breakdown */}
<MultiProgress
  segments={[
    { value: 40, color: 'var(--color-primary)', label: 'Photos' },
    { value: 25, color: '#10B981',              label: 'Videos' },
    { value: 15, color: '#F59E0B',              label: 'Documents' },
    { value: 10, color: '#EF4444',              label: 'Other' },
  ]}
  showLegend
/>`;

const UPLOAD_CODE = `const [uploading, setUploading] = useState(false)
const [uploadPct, setUploadPct] = useState(0)

function simulate() {
  setUploading(true)
  setUploadPct(0)
  const iv = setInterval(() => {
    setUploadPct(prev => {
      if (prev >= 100) { clearInterval(iv); setUploading(false); return 100 }
      return prev + Math.floor(Math.random() * 8) + 2
    })
  }, 150)
}

<div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 12, padding: 20 }}>
  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>File upload</p>
  <Progress
    value={uploadPct}
    variant="gradient"
    label={uploading ? \`Uploading… \${uploadPct}%\` : uploadPct === 100 ? 'Upload complete!' : 'Ready to upload'}
    showValue
    color={uploadPct === 100 ? 'success' : 'default'}
  />
  <button onClick={simulate} disabled={uploading} style={{ marginTop: 12, fontSize: 13 }}>
    {uploading ? 'Uploading...' : 'Simulate upload'}
  </button>
</div>`;

/* ─── Page ─── */

export default function ProgressPage() {
  const [animated,   setAnimated]   = useState(0);
  const [uploading,  setUploading]  = useState(false);
  const [uploadPct,  setUploadPct]  = useState(0);

  useEffect(() => {
    setAnimated(75);
  }, []);

  function simulateUpload() {
    setUploading(true);
    setUploadPct(0);
    const iv = setInterval(() => {
      setUploadPct(prev => {
        const next = prev + Math.floor(Math.random() * 8) + 2;
        if (next >= 100) {
          clearInterval(iv);
          setUploading(false);
          return 100;
        }
        return next;
      });
    }, 150);
  }

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Feedback', 'Progress']}
        title="Progress"
        description="5 sizes · 6 colors · 7 variants · segmented · circular · multi-color stacked"
        tags={['Sizes', 'Colors', 'Variants', 'With label', 'Segmented', 'Circular', 'Multi-color', 'File upload']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="Five track heights: xs, sm, md (default), lg, xl"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
            <Progress value={70} size="xs" />
            <Progress value={70} size="sm" />
            <Progress value={70} size="md" />
            <Progress value={70} size="lg" />
            <Progress value={70} size="xl" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="Six color variants — default, secondary, success, warning, error, and gradient"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
            <Progress value={65} color="default"   />
            <Progress value={65} color="secondary" />
            <Progress value={65} color="success"   />
            <Progress value={65} color="warning"   />
            <Progress value={65} color="error"     />
            <Progress value={65} color="gradient"  />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="default, gradient, glow, striped (animated), indeterminate, bubble, thin"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 480 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>default</p>
              <Progress value={65} variant="default" />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>gradient</p>
              <Progress value={65} variant="gradient" />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>glow</p>
              <Progress value={65} variant="glow" />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>striped + animated</p>
              <Progress value={65} variant="striped" animated />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>indeterminate</p>
              <Progress variant="indeterminate" />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>bubble</p>
              <Progress value={65} variant="bubble" showValue />
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 6 }}>thin</p>
              <Progress value={65} variant="thin" />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 4: With label + helper ── */}
        <ComponentPreview
          title="With label + helper"
          description="label and helperText display context; showValue renders the percentage"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 480 }}>
            <Progress
              value={78}
              variant="glow"
              color="default"
              label="Storage used"
              showValue
              helperText="78 GB of 100 GB used"
            />
            <Progress
              value={55}
              variant="gradient"
              label="Project completion"
              showValue
            />
            <Progress
              value={92}
              variant="glow"
              color="error"
              label="Memory usage"
              showValue
              helperText="Critical — consider upgrading"
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LABEL_CODE} />

        {/* ── Section 5: Segmented ── */}
        <ComponentPreview
          title="Segmented"
          description="SegmentedProgress divides the bar into discrete blocks"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
            <SegmentedProgress value={6} total={10} />
            <SegmentedProgress value={8} total={10} color="success" />
            <SegmentedProgress
              value={7}
              total={10}
              segmentColors={['#10B981','#10B981','#10B981','#F59E0B','#F59E0B','#EF4444','#EF4444']}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEGMENTED_CODE} />

        {/* ── Section 6: Circular ── */}
        <ComponentPreview
          title="Circular"
          description="CircularProgress renders an SVG arc with optional center value and label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
            <CircularProgress value={72}  showValue />
            <CircularProgress value={85}  color="success"  showValue />
            <CircularProgress value={45}  color="warning"  showValue />
            <CircularProgress value={20}  color="error"    showValue />
            <CircularProgress value={68}  gradient showValue />
            <CircularProgress value={92}  showValue label="CPU" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CIRCULAR_CODE} />

        {/* ── Section 7: Multi-color stacked ── */}
        <ComponentPreview
          title="Multi-color stacked"
          description="MultiProgress stacks segments end-to-end — showLegend adds a color key"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 480 }}>
            <MultiProgress
              segments={[
                { value: 40, color: 'var(--color-primary)', label: 'Photos' },
                { value: 25, color: '#10B981',              label: 'Videos' },
                { value: 15, color: '#F59E0B',              label: 'Documents' },
                { value: 10, color: '#EF4444',              label: 'Other' },
              ]}
              showLegend
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Section 8: File upload simulation ── */}
        <ComponentPreview
          title="File upload simulation"
          description="A simulated upload with animated progress and status label"
        >
          <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 12, padding: 20, width: '100%', maxWidth: 480 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 12 }}>
              File upload
            </p>
            <Progress
              value={uploadPct}
              variant="gradient"
              label={uploading ? `Uploading… ${uploadPct}%` : uploadPct === 100 ? 'Upload complete!' : 'Ready to upload'}
              showValue
              color={uploadPct === 100 ? 'success' : 'default'}
            />
            <button
              onClick={simulateUpload}
              disabled={uploading}
              style={{
                marginTop: 12,
                fontSize: 13,
                padding: '6px 14px',
                borderRadius: 6,
                border: '1px solid var(--color-border-secondary)',
                background: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.6 : 1,
              }}
            >
              {uploading ? 'Uploading...' : 'Simulate upload'}
            </button>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={UPLOAD_CODE} />

        {/* ── Section 9: Skill bars ── */}
        <ComponentPreview
          title="Skill bars"
          description="Combine label and showValue for a skills or usage breakdown"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 480 }}>
            {[
              { label: 'React',      value: animated,     color: 'default'   },
              { label: 'TypeScript', value: Math.min(animated + 5, 100), color: 'info'  },
              { label: 'Node.js',    value: Math.max(animated - 15, 0), color: 'success' },
              { label: 'GraphQL',    value: Math.max(animated - 30, 0), color: 'warning' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', minWidth: 88 }}>{label}</span>
                <div style={{ flex: 1 }}>
                  <Progress value={value} color={color as 'default' | 'info' | 'success' | 'warning'} size="sm" showValue />
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Progress props
        </p>
        <PropsTable props={PROGRESS_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          SegmentedProgress props
        </p>
        <PropsTable props={SEGMENTED_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          CircularProgress props
        </p>
        <PropsTable props={CIRCULAR_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          MultiProgress props
        </p>
        <PropsTable props={MULTI_PROPS} />

      </div>
    </div>
  );
}
