'use client';

import { Divider } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const DIVIDER_PROPS = [
  {
    name: 'lineStyle',
    type: "'solid' | 'dashed' | 'dotted' | 'thick' | 'gradient' | 'gradient-fade' | 'double'",
    default: "'solid'",
    description: 'Line style',
  },
  {
    name: 'color',
    type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'",
    default: "'default'",
    description: 'Line color',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Divider direction',
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Text or element shown in the center of the line',
  },
  {
    name: 'labelAlign',
    type: "'left' | 'center' | 'right'",
    default: "'center'",
    description: 'Horizontal alignment of the label',
  },
  {
    name: 'icon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon shown centered in the divider',
  },
  {
    name: 'inset',
    type: 'number',
    default: 'undefined',
    description: 'Left offset in px — for list separators that skip an avatar/icon',
  },
  {
    name: 'sectionTitle',
    type: 'boolean',
    default: 'false',
    description: 'Renders label above the line as a section heading',
  },
  {
    name: 'chatDate',
    type: 'boolean',
    default: 'false',
    description: 'Renders label in a centered pill badge — chat date separator style',
  },
  {
    name: 'boldBreak',
    type: 'boolean',
    default: 'false',
    description: 'Bold section-break style with heavier label text',
  },
  {
    name: 'spacingDots',
    type: 'boolean',
    default: 'false',
    description: 'Decorative vertical spacing dots instead of a line',
  },
  {
    name: 'dots',
    type: 'number',
    default: '1',
    description: 'Number of dots for spacingDots style',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const LINE_STYLES_CODE = `import { Divider } from 'omverse-ui'

<Divider lineStyle="solid" />
<Divider lineStyle="dashed" />
<Divider lineStyle="dotted" />
<Divider lineStyle="thick" />
<Divider lineStyle="gradient-fade" />
<Divider lineStyle="gradient" />
<Divider lineStyle="double" />`;

const COLORS_CODE = `<Divider lineStyle="thick" color="default" />
<Divider lineStyle="thick" color="primary" />
<Divider lineStyle="thick" color="secondary" />
<Divider lineStyle="thick" color="success" />
<Divider lineStyle="thick" color="warning" />
<Divider lineStyle="thick" color="error" />`;

const LABEL_CODE = `<Divider label="OR" />
<Divider label="Continue with" />
<Divider label="Left aligned"  labelAlign="left" />
<Divider label="Right aligned" labelAlign="right" />`;

const ICON_CODE = `<Divider icon="star" />
<Divider icon="plus" />
<Divider icon="settings" />`;

const SPECIAL_CODE = `// chatDate — centered pill badge (chat date separator)
<Divider label="Today" chatDate />

// boldBreak — bold chapter or section break
<Divider label="Chapter 1" boldBreak />

// sectionTitle — label sits above the line
<Divider label="Personal info" sectionTitle />

// spacingDots — decorative vertical dots (no line)
<Divider spacingDots dots={3} />`;

const INSET_CODE = `// inset={64} skips past a 36px avatar + 12px gap + 16px padding
<Divider inset={64} />`;

const VERTICAL_CODE = `<div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
  <span>Dashboard</span>
  <Divider orientation="vertical" />
  <span>Projects</span>
  <Divider orientation="vertical" lineStyle="dashed" />
  <span>Settings</span>
</div>`;

/* ─── Shared helpers ─── */

const metaLabel: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--color-text-tertiary)',
  marginTop: 6,
};

const colorLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 6,
};

/* ─── Page ─── */

export default function DividerPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Divider']}
        title="Divider"
        description="Line separator for content sections. 7 line styles, 6 colors, label, icon, inset and chat date variants."
        tags={['7 styles', '6 colors', 'Label', 'Icon', 'Inset', 'Chat date', 'Vertical']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Line styles ── */}
        <ComponentPreview
          title="Line styles"
          description="7 styles — solid, dashed, dotted, thick, gradient-fade, gradient, double"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <div>
              <Divider lineStyle="solid" />
              <p style={metaLabel}>Solid</p>
            </div>
            <div>
              <Divider lineStyle="dashed" />
              <p style={metaLabel}>Dashed</p>
            </div>
            <div>
              <Divider lineStyle="dotted" />
              <p style={metaLabel}>Dotted</p>
            </div>
            <div>
              <Divider lineStyle="thick" />
              <p style={metaLabel}>Thick</p>
            </div>
            <div>
              <Divider lineStyle="gradient-fade" />
              <p style={metaLabel}>Gradient fade</p>
            </div>
            <div>
              <Divider lineStyle="gradient" />
              <p style={metaLabel}>Gradient</p>
            </div>
            <div>
              <Divider lineStyle="double" />
              <p style={metaLabel}>Double</p>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LINE_STYLES_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 semantic colors — default, primary, secondary, success, warning, error"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            {(
              ['default', 'primary', 'secondary', 'success', 'warning', 'error'] as const
            ).map((color) => (
              <div key={color}>
                <p style={colorLabel}>{color}</p>
                <Divider lineStyle="thick" color={color} />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: With label ── */}
        <ComponentPreview
          title="With label"
          description="label prop places text inside the line — center (default), left or right aligned"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <Divider label="OR" />
            <Divider label="Continue with" />
            <Divider label="Left aligned"  labelAlign="left" />
            <Divider label="Right aligned" labelAlign="right" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LABEL_CODE} />

        {/* ── Section 4: With icon ── */}
        <ComponentPreview
          title="With icon"
          description="icon prop shows a centered icon in place of a text label"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <Divider icon="star" />
            <Divider icon="plus" />
            <Divider icon="settings" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICON_CODE} />

        {/* ── Section 5: Special variants ── */}
        <ComponentPreview
          title="Special variants"
          description="chatDate pill badge · boldBreak chapter heading · sectionTitle label above line · spacingDots decorative dots"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
            <div>
              <p style={colorLabel}>chatDate</p>
              <Divider label="Today" chatDate />
            </div>
            <div>
              <p style={colorLabel}>boldBreak</p>
              <Divider label="Chapter 1" boldBreak />
            </div>
            <div>
              <p style={colorLabel}>sectionTitle</p>
              <Divider label="Personal info" sectionTitle />
            </div>
            <div>
              <p style={colorLabel}>spacingDots</p>
              <Divider spacingDots dots={3} />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SPECIAL_CODE} />

        {/* ── Section 6: Inset ── */}
        <ComponentPreview
          title="Inset — list separator"
          description="inset offsets the line from the left — aligns with the content text in list items with leading avatars"
          align="start"
        >
          <div style={{
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 8,
            overflow: 'hidden',
            width: '100%',
            maxWidth: 400,
          }}>
            {['John Doe', 'Jane Smith', 'Bob Lee'].map((name, i) => (
              <div key={name}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--color-surface-secondary, #F1F5F9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0,
                    color: 'var(--color-text-secondary)',
                  }}>
                    {name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>{name}</span>
                </div>
                {i < 2 && <Divider inset={64} />}
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={INSET_CODE} />

        {/* ── Section 7: Vertical ── */}
        <ComponentPreview
          title="Vertical"
          description="orientation='vertical' renders an inline divider — give the parent a fixed height"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Dashboard</span>
            <Divider orientation="vertical" />
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Projects</span>
            <Divider orientation="vertical" lineStyle="dashed" />
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Settings</span>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={DIVIDER_PROPS} />

      </div>
    </div>
  );
}
