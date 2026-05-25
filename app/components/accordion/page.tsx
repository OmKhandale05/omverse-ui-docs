'use client';

import { Accordion } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const ACCORDION_PROPS = [
  {
    name: 'variant',
    type: "'default' | 'bordered' | 'filled' | 'card' | 'flush' | 'separated' | 'gradient' | 'plus' | 'numbered' | 'image'",
    default: "'default'",
    description: 'Visual style of the accordion',
  },
  {
    name: 'mode',
    type: "'single' | 'multiple'",
    default: "'single'",
    description: 'single — only one item open at a time; multiple — many items can be open',
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    default: 'undefined',
    description: 'Default open item value(s) — uncontrolled',
  },
  {
    name: 'value',
    type: 'string | string[]',
    default: 'undefined',
    description: 'Controlled open item value(s)',
  },
  {
    name: 'onValueChange',
    type: '(value: string | string[]) => void',
    default: 'undefined',
    description: 'Callback fired when open items change',
  },
  {
    name: 'iconStyle',
    type: "'chevron' | 'plus' | 'arrow' | 'none'",
    default: "'chevron'",
    description: 'Expand indicator icon style',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

// NOTE: AccordionItem exists in the bundle but is not currently exported from omverse-ui.
// The code snippets below show the correct intended usage.

const DEFAULT_CODE = `import { Accordion } from 'omverse-ui'
// AccordionItem is the required child — coming in a future export
import { AccordionItem } from 'omverse-ui'

<Accordion defaultValue="q1">
  <AccordionItem value="q1" title="What is omverse-ui?">
    omverse-ui is a modern React component library with Material Design 3 foundation,
    built with Tailwind v4 and TypeScript.
  </AccordionItem>
  <AccordionItem value="q2" title="How do I install it?">
    Run npm install omverse-ui, then import the styles and configure Tailwind v4.
  </AccordionItem>
  <AccordionItem value="q3" title="Is it free to use?">
    Yes — omverse-ui is open source under the MIT licence.
  </AccordionItem>
</Accordion>`;

const MULTIPLE_CODE = `// mode="multiple" allows several items open simultaneously
<Accordion mode="multiple" defaultValue={['q1', 'q3']}>
  <AccordionItem value="q1" title="What is omverse-ui?">...</AccordionItem>
  <AccordionItem value="q2" title="How do I install it?">...</AccordionItem>
  <AccordionItem value="q3" title="Is it free to use?">...</AccordionItem>
</Accordion>`;

const VARIANTS_CODE = `<Accordion variant="default">   ...</Accordion>
<Accordion variant="bordered">  ...</Accordion>
<Accordion variant="filled">    ...</Accordion>
<Accordion variant="card">      ...</Accordion>
<Accordion variant="flush">     ...</Accordion>
<Accordion variant="separated"> ...</Accordion>
<Accordion variant="gradient">  ...</Accordion>
<Accordion variant="plus">      ...</Accordion>
<Accordion variant="numbered">  ...</Accordion>
<Accordion variant="image">     ...</Accordion>`;

const ICON_STYLE_CODE = `<Accordion iconStyle="chevron">...</Accordion>
<Accordion iconStyle="plus">...</Accordion>
<Accordion iconStyle="arrow">...</Accordion>
<Accordion iconStyle="none">...</Accordion>`;

/* ─── Shared demo item styles ─── */

const itemStyle: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 14,
  width: '100%',
  cursor: 'pointer',
  listStyle: 'none',
  padding: 0,
  margin: 0,
};
const summaryStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontWeight: 500,
  cursor: 'pointer',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};
const bodyStyle: React.CSSProperties = {
  padding: '4px 16px 14px',
  fontSize: 13,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.6,
};

function DemoItem({ title, body }: { title: string; body: string }) {
  return (
    <details style={itemStyle}>
      <summary style={summaryStyle}>{title}</summary>
      <div style={bodyStyle}>{body}</div>
    </details>
  );
}

const Q1 = 'omverse-ui is a modern React component library with Material Design 3 foundation.';
const Q2 = 'Run npm install omverse-ui, then import the styles and configure Tailwind v4.';
const Q3 = 'Yes — omverse-ui is open source under the MIT licence.';

/* ─── Page ─── */

export default function AccordionPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Other', 'Accordion']}
        title="Accordion"
        description="Expandable content sections with smooth animations. 10 variants, single and multiple open modes, 4 icon styles."
        tags={['10 variants', 'Single mode', 'Multiple mode', 'Animated', '4 icon styles']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Single-open mode — only one item expanded at a time"
          align="start"
        >
          <div style={{ width: 420 }}>
            <Accordion variant="default">
              <DemoItem title="What is omverse-ui?" body={Q1} />
              <DemoItem title="How do I install it?" body={Q2} />
              <DemoItem title="Is it free to use?" body={Q3} />
            </Accordion>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: Multiple open ── */}
        <ComponentPreview
          title="Multiple open"
          description="mode='multiple' — several items can be expanded simultaneously"
          align="start"
        >
          <div style={{ width: 420 }}>
            <Accordion variant="default" mode="multiple">
              <DemoItem title="What is omverse-ui?" body={Q1} />
              <DemoItem title="How do I install it?" body={Q2} />
              <DemoItem title="Is it free to use?" body={Q3} />
            </Accordion>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTIPLE_CODE} />

        {/* ── Section 3: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="10 visual styles — default, bordered, filled, card, flush, separated, gradient, plus, numbered, image"
          align="start"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 720 }}>
            {(['default', 'bordered', 'filled', 'card', 'flush', 'separated'] as const).map(v => (
              <div key={v}>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {v}
                </p>
                <Accordion variant={v}>
                  <DemoItem title="Question one" body={Q1} />
                  <DemoItem title="Question two" body={Q2} />
                </Accordion>
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 4: Icon styles ── */}
        <ComponentPreview
          title="Icon styles"
          description="chevron (default), plus, arrow or none — controls the expand indicator"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 420 }}>
            {(['chevron', 'plus', 'arrow', 'none'] as const).map(style => (
              <div key={style}>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {style}
                </p>
                <Accordion variant="bordered" iconStyle={style}>
                  <DemoItem title="Sample question" body={Q1} />
                </Accordion>
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICON_STYLE_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={ACCORDION_PROPS} />

      </div>
    </div>
  );
}
