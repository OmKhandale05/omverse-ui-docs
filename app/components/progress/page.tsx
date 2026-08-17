'use client';

import { useState, useEffect } from 'react';
import { Progress, CircularProgress, SegmentedProgress, MultiProgress } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props tables ─── */

const PROGRESS_PROPS = [
  { name: 'value',       type: 'number',                                                                          default: '—',         description: 'Progress value 0–max' },
  { name: 'max',         type: 'number',                                                                          default: '100',       description: 'Maximum value' },
  { name: 'color',       type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",            default: "'default'", description: 'Fill color' },
  { name: 'size',        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",                                              default: "'md'",      description: 'Track height' },
  { name: 'variant',     type: "'default' | 'gradient' | 'glow' | 'striped' | 'indeterminate' | 'bubble' | 'thin'", default: "'default'", description: 'Visual style' },
  { name: 'label',       type: 'string',                                                                          default: '—',         description: 'Label shown above the bar' },
  { name: 'helperText',  type: 'string',                                                                          default: '—',         description: 'Helper text shown below the bar' },
  { name: 'showValue',   type: "'percent' | 'fraction' | 'none'",                                                default: "'none'",    description: 'Format for the value shown above the bar' },
  { name: 'valueLabel',  type: 'string',                                                                          default: '—',         description: 'Custom value label — overrides the auto-generated value text' },
  { name: 'formatValue', type: '(value: number) => string',                                                       default: '—',         description: 'Custom value formatter function' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const SEGMENTED_PROPS = [
  { name: 'value',         type: 'number',                               default: '—',      description: 'Number of filled segments' },
  { name: 'total',         type: 'number',                               default: '10',     description: 'Total number of segments' },
  { name: 'color',         type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Color of filled segments' },
  { name: 'segmentColors', type: 'Partial<Record<number, ProgressColor>>', default: '—',    description: 'Per-segment color by index' },
  { name: 'size',          type: "'sm' | 'md' | 'lg'",                   default: "'md'",   description: 'Segment height' },
  { name: 'label',         type: 'string',                               default: '—',      description: 'Label shown above with count' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const CIRCULAR_PROPS = [
  { name: 'value',       type: 'number',   default: '0',     description: 'Progress value 0–100' },
  { name: 'size',        type: 'number',   default: '80',    description: 'Diameter in px' },
  { name: 'strokeWidth', type: 'number',   default: '8',     description: 'Width of the arc stroke' },
  { name: 'color',       type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Color of the progress arc' },
  { name: 'gradient',    type: 'boolean',  default: 'false', description: 'Applies a primary→secondary gradient to the arc' },
  { name: 'showValue',   type: 'boolean',  default: 'true',  description: 'Shows the percentage in the center' },
  { name: 'centerLabel', type: 'string',   default: '—',     description: 'Custom text label in the center (replaces percentage)' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const MULTI_PROPS = [
  { name: 'segments',   type: '{ value: number; color: ProgressColor; label?: string }[]', default: '—', description: 'Array of stacked segments' },
  { name: 'max',        type: 'number',   default: '100',   description: 'Maximum total value' },
  { name: 'size',       type: "'sm' | 'md' | 'lg'",  default: "'md'",  description: 'Track height' },
  { name: 'label',      type: 'string',   default: '—',     description: 'Label shown above the bar' },
  { name: 'showLegend', type: 'boolean',  default: 'false', description: 'Shows a color-coded legend below the bar' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const API_PROPS = [
  ...PROGRESS_PROPS,
  ...SEGMENTED_PROPS,
  ...CIRCULAR_PROPS,
  ...MULTI_PROPS,
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const SIZES_CODE = `<Progress value={65} size="xs" />
<Progress value={65} size="sm" />
<Progress value={65} size="md" />
<Progress value={65} size="lg" />
<Progress value={65} size="xl" />`;

const COLORS_CODE = `<Progress value={70} color="default"   />
<Progress value={55} color="secondary" />
<Progress value={85} color="success"   />
<Progress value={45} color="warning"   />
<Progress value={30} color="error"     />
<Progress value={75} variant="gradient" />`;

const VARIANTS_CODE = `<Progress value={65} label="Default"       showValue="percent" size="md" />
<Progress value={75} variant="gradient"    label="Gradient"    showValue="percent" size="md" />
<Progress value={80} variant="glow"        label="Glow"        showValue="percent" size="md" color="success" />
<Progress value={60} variant="striped"     label="Striped"     showValue="percent" size="md" />
<Progress              variant="indeterminate" label="Indeterminate" size="md" />

{/* Bubble needs an overflow-visible wrapper for the floating tooltip */}
<div style={{ paddingTop: 32, overflow: 'visible' }}>
  <Progress value={65} variant="bubble"   label="Bubble tooltip" size="md" />
</div>

<Progress value={65} variant="thin"       label="Ultra thin"  size="xs" />`;

const LABEL_CODE = `<Progress
  value={65}
  variant="glow"
  label="Storage used"
  showValue="percent"
  helperText="6.5 GB of 10 GB used"
  size="md"
/>

{/* valueLabel overrides the auto percentage with custom text */}
<Progress
  value={80}
  variant="gradient"
  label="Profile completion"
  valueLabel="8/10 tasks"
  showValue="percent"
  helperText="Add your bio and profile photo to complete"
  size="md"
  color="success"
/>

{/* Animated entry — value starts at 0, animates to 75 */}
<Progress
  value={animated}
  variant="glow"
  color="error"
  label="CPU Usage"
  showValue="percent"
  helperText="High usage detected"
  size="lg"
/>`;

const SEGMENTED_CODE = `{/* Step indicator */}
<SegmentedProgress total={5} value={3} label="Step 3 of 5" />

{/* Weekly goal — success color, larger size */}
<SegmentedProgress total={7} value={5} color="success" label="Weekly goal" size="lg" />

{/* Per-segment colors */}
<SegmentedProgress
  total={4}
  value={3}
  segmentColors={{ 0: 'success', 1: 'success', 2: 'warning', 3: 'error' }}
  label="Multi-color segments"
/>`;

const CIRCULAR_CODE = `{/* Default */}
<CircularProgress value={65} size={80} />

{/* Colors */}
<CircularProgress value={85} size={80} color="success" />
<CircularProgress value={30} size={80} color="error"   />

{/* Gradient — larger */}
<CircularProgress value={75} size={100} gradient showValue />

{/* Warning */}
<CircularProgress value={50} size={70}  color="warning" />

{/* Complete */}
<CircularProgress value={100} size={80} color="success" />`;

const MULTI_CODE = `{/* Project allocation */}
<MultiProgress
  label="Project allocation"
  segments={[
    { value: 45, color: 'default',   label: 'Design' },
    { value: 30, color: 'secondary', label: 'Dev' },
    { value: 15, color: 'success',   label: 'QA' },
  ]}
  showLegend
  size="lg"
/>

{/* Budget breakdown */}
<MultiProgress
  label="Budget breakdown"
  segments={[
    { value: 40, color: 'default', label: 'Salaries' },
    { value: 25, color: 'warning', label: 'Marketing' },
    { value: 20, color: 'success', label: 'Infrastructure' },
    { value: 10, color: 'error',   label: 'Other' },
  ]}
  showLegend
  size="md"
/>`;

const UPLOAD_CODE = `const [uploading, setUploading] = useState(false)
const [uploadPct, setUploadPct] = useState(0)

function simulateUpload() {
  setUploading(true)
  setUploadPct(0)
  const interval = setInterval(() => {
    setUploadPct(p => {
      if (p >= 100) { clearInterval(interval); setUploading(false); return 100 }
      return p + Math.random() * 12
    })
  }, 300)
}

<div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 20 }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
    <div>
      <p style={{ fontSize: 14, fontWeight: 600 }}>design-system-v2.zip</p>
      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>48 MB</p>
    </div>
    <span style={{
      fontSize: 14, fontWeight: 700,
      color: uploadPct >= 100 ? 'var(--color-success)' : 'var(--color-primary)',
    }}>
      {uploadPct >= 100 ? '✓ Done' : \`\${Math.round(uploadPct)}%\`}
    </span>
  </div>
  <Progress
    value={Math.min(uploadPct, 100)}
    variant={uploading ? 'striped' : uploadPct >= 100 ? 'glow' : 'default'}
    color={uploadPct >= 100 ? 'success' : 'default'}
    size="md"
  />
  <button
    onClick={simulateUpload}
    disabled={uploading}
    style={{ marginTop: 16, padding: '8px 16px', borderRadius: 8 }}
  >
    {uploading ? 'Uploading...' : uploadPct >= 100 ? 'Upload again' : 'Simulate upload'}
  </button>
</div>`;

const SKILL_CODE = `const skills = [
  { skill: 'React',      value: 95, color: 'default'   },
  { skill: 'TypeScript', value: 88, color: 'secondary' },
  { skill: 'Design',     value: 72, color: 'success'   },
  { skill: 'Node.js',    value: 65, color: 'warning'   },
  { skill: 'DevOps',     value: 48, color: 'error'     },
]

{skills.map(({ skill, value, color }) => (
  <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{ width: 88, flexShrink: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
      {skill}
    </span>
    <Progress value={value} color={color} size="md" style={{ flex: 1 }} />
    <span style={{ width: 32, textAlign: 'right', fontSize: 12, color: 'var(--color-text-secondary)' }}>
      {value}%
    </span>
  </div>
))}`;

/* ─── Page ─── */

export default function ProgressPage() {
  const [animated,  setAnimated]  = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(75), 300);
    return () => clearTimeout(timer);
  }, []);

  function simulateUpload() {
    setUploading(true);
    setUploadPct(0);
    const interval = setInterval(() => {
      setUploadPct(p => {
        if (p >= 100) { clearInterval(interval); setUploading(false); return 100; }
        return p + Math.random() * 12;
      });
    }, 300);
  }

return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Feedback', 'Progress']}        title="Progress"        description="Linear · circular · segmented · multi · battery · glow · bubble"        tags={['Sizes', 'Colors', 'Variants', 'With label', 'Segmented', 'Circular', 'Multi-color', 'File upload', 'Skill bars']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Linear · circular · segmented · multi · battery · glow · bubble">
          <div className="component-doc-prose">
            <p>Use Progress to present and interact with structured information in a predictable, accessible way.</p>
            <p>The component examples below demonstrate practical variations you can adapt to your own interface.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Root container and spacing boundary.</li>
            <li>Primary content and optional secondary metadata.</li>
            <li>State indicators and utility affordances (icons, badges, controls).</li>
            <li>Optional helper text, grouping, and behavioral wrappers.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Choose Progress when a repeated, structured interaction is required.</li>
            <li>Use it for clear, consistent operations across similar surfaces.</li>
            <li>Use in forms, lists, and action workflows where clarity matters.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use only for decorative layout without interaction meaning.</li>
            <li>Avoid duplicating the same behavior without distinct user context.</li>
            <li>Prefer simpler HTML or textual content for static, non-interactive labels.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Component variants should be documented by API props and examples below.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-stack">
            <p>Common states include idle, active, disabled, focused, and loading/pending states where applicable.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-stack">
            <p>Behavior should remain deterministic and keyboard-friendly, with clear visual feedback for every state transition.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Use semantic structure and visible labels whenever possible.</li>
            <li>Preserve keyboard navigation and focus visibility.</li>
            <li>Announce status and changes when context requires it.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Prefer short, clear labels.</li>
            <li>Keep content actions scannable and outcome-oriented.</li>
            <li>Use consistent wording across similar components.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
          {/* ── Content ── */}
          <div style={{ padding: '28px 40px' }}>
          
            {/* ── Section 1: Sizes ── */}
            <ComponentPreview
              title="Sizes"
              description="Five track heights: xs, sm, md (default), lg, xl"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
                <Progress value={65} size="xs" />
                <Progress value={65} size="sm" />
                <Progress value={65} size="md" />
                <Progress value={65} size="lg" />
                <Progress value={65} size="xl" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIZES_CODE} />
          
            {/* ── Section 2: Colors ── */}
            <ComponentPreview
              title="Colors"
              description="Six color variants — default, secondary, success, warning, error, and gradient"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
                <Progress value={70} color="default"   />
                <Progress value={55} color="secondary" />
                <Progress value={85} color="success"   />
                <Progress value={45} color="warning"   />
                <Progress value={30} color="error"     />
                <Progress value={75} variant="gradient" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={COLORS_CODE} />
          
            {/* ── Section 3: Variants ── */}
            <ComponentPreview
              title="Variants"
              description="default · gradient · glow · striped · indeterminate · bubble · thin"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 480 }}>
                <Progress value={65} label="Default"       showValue="percent" size="md" />
                <Progress value={75} variant="gradient"    label="Gradient"    showValue="percent" size="md" />
                <Progress value={80} variant="glow"  color="success" label="Glow"  showValue="percent" size="md" />
                <Progress value={60} variant="striped"     label="Striped"     showValue="percent" size="md" />
                <Progress              variant="indeterminate" label="Indeterminate" size="md" />
                {/* Bubble needs extra top space for the floating tooltip */}
                <div style={{ paddingTop: 32, overflow: 'visible' }}>
                  <Progress value={65} variant="bubble"   label="Bubble tooltip" size="md" />
                </div>
                <Progress value={65} variant="thin"       label="Ultra thin"  size="xs" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />
          
            {/* ── Section 4: With label + helper ── */}
            <ComponentPreview
              title="With label + helper text"
              description="label and helperText add context; valueLabel overrides the auto percentage"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 480 }}>
                <Progress
                  value={65}
                  variant="glow"
                  label="Storage used"
                  showValue="percent"
                  helperText="6.5 GB of 10 GB used"
                  size="md"
                />
                <Progress
                  value={80}
                  variant="gradient"
                  label="Profile completion"
                  valueLabel="8/10 tasks"
                  showValue="percent"
                  helperText="Add your bio and profile photo to complete"
                  size="md"
                  color="success"
                />
                <Progress
                  value={animated}
                  variant="glow"
                  color="error"
                  label="CPU Usage"
                  showValue="percent"
                  helperText="High usage detected"
                  size="lg"
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={LABEL_CODE} />
          
            {/* ── Section 5: Segmented ── */}
            <ComponentPreview
              title="Segmented"
              description="SegmentedProgress divides the bar into discrete blocks — supports per-segment colors"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 480 }}>
                <SegmentedProgress total={5} value={3} label="Step 3 of 5" />
                <SegmentedProgress total={7} value={5} color="success" label="Weekly goal" size="lg" />
                <SegmentedProgress
                  total={4}
                  value={3}
                  segmentColors={{ 0: 'success', 1: 'success', 2: 'warning', 3: 'error' }}
                  label="Multi-color segments"
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SEGMENTED_CODE} />
          
            {/* ── Section 6: Circular ── */}
            <ComponentPreview
              title="Circular"
              description="CircularProgress renders an SVG arc — showValue is true by default"
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
                <CircularProgress value={65}  size={80} />
                <CircularProgress value={85}  size={80}  color="success" />
                <CircularProgress value={30}  size={80}  color="error" />
                <CircularProgress value={75}  size={100} gradient showValue />
                <CircularProgress value={50}  size={70}  color="warning" />
                <CircularProgress value={100} size={80}  color="success" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={CIRCULAR_CODE} />
          
            {/* ── Section 7: Multi-color stacked ── */}
            <ComponentPreview
              title="Multi-color stacked"
              description="MultiProgress stacks segments end-to-end — showLegend adds a color key"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 480 }}>
                <MultiProgress
                  label="Project allocation"
                  segments={[
                    { value: 45, color: 'default',   label: 'Design' },
                    { value: 30, color: 'secondary', label: 'Dev' },
                    { value: 15, color: 'success',   label: 'QA' },
                  ]}
                  showLegend
                  size="lg"
                />
                <MultiProgress
                  label="Budget breakdown"
                  segments={[
                    { value: 40, color: 'default', label: 'Salaries' },
                    { value: 25, color: 'warning', label: 'Marketing' },
                    { value: 20, color: 'success', label: 'Infrastructure' },
                    { value: 10, color: 'error',   label: 'Other' },
                  ]}
                  showLegend
                  size="md"
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={MULTI_CODE} />
          
            {/* ── Section 8: File upload simulation ── */}
            <ComponentPreview
              title="File upload simulation"
              description="Progress variant switches from default → striped (uploading) → glow (complete)"
            >
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 12, padding: 20,
                width: '100%', maxWidth: 480,
              }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                      design-system-v2.zip
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>48 MB</p>
                  </div>
                  <span style={{
                    fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
                    color: uploadPct >= 100 ? 'var(--color-success, #10b981)' : 'var(--color-primary, #6366f1)',
                  }}>
                    {uploadPct >= 100 ? '✓ Done' : `${Math.round(uploadPct)}%`}
                  </span>
                </div>
          
                {/* Progress bar */}
                <Progress
                  value={Math.min(uploadPct, 100)}
                  variant={uploading ? 'striped' : uploadPct >= 100 ? 'glow' : 'default'}
                  color={uploadPct >= 100 ? 'success' : 'default'}
                  size="md"
                />
          
                {/* Button */}
                <button
                  type="button"
                  onClick={simulateUpload}
                  disabled={uploading}
                  style={{
                    marginTop: 16,
                    padding: '8px 18px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    border: 'none',
                    background: 'var(--color-primary, #6366f1)',
                    color: '#fff',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    opacity: uploading ? 0.5 : 1,
                    transition: 'opacity 0.15s',
                  }}
                >
                  {uploading ? 'Uploading...' : uploadPct >= 100 ? 'Upload again' : 'Simulate upload'}
                </button>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={UPLOAD_CODE} />
          
            {/* ── Section 9: Skill bars ── */}
            <ComponentPreview
              title="Skill bars"
              description="Combine color and label for a skills or proficiency breakdown"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
                {(
                  [
                    { skill: 'React',      value: 95, color: 'default'   },
                    { skill: 'TypeScript', value: 88, color: 'secondary' },
                    { skill: 'Design',     value: 72, color: 'success'   },
                    { skill: 'Node.js',    value: 65, color: 'warning'   },
                    { skill: 'DevOps',     value: 48, color: 'error'     },
                  ] as { skill: string; value: number; color: 'default' | 'secondary' | 'success' | 'warning' | 'error' }[]
                ).map(({ skill, value, color }) => (
                  <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ width: 88, flexShrink: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      {skill}
                    </span>
                    <div style={{ flex: 1 }}>
                      <Progress value={value} color={color} size="md" />
                    </div>
                    <span style={{
                      width: 32, textAlign: 'right',
                      fontSize: 12, color: 'var(--color-text-secondary)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {value}%
                    </span>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SKILL_CODE} />
          
            {/* ── Props tables ── */}
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
              Progress props
            </p>
          
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              SegmentedProgress props
            </p>
          
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              CircularProgress props
            </p>
          
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              MultiProgress props
            </p>
          
          </div>
          </div>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API">
          <div className="component-doc-stack">
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>Api Props</p>
            <PropsTable props={API_PROPS} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components">
          <div className="component-doc-prose">
          <ul className="component-doc-prose">
            <li>Use Progress alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep progress behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
