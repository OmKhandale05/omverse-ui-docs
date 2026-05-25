'use client';

import { Skeleton, Spinner } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const SPINNER_PROPS = [
  {
    name: 'variant',
    type: "'circular' | 'ring' | 'dots' | 'bars' | 'dual' | 'pulse' | 'ripple' | 'gradient' | 'skeleton'",
    default: "'circular'",
    description: 'Spinner animation style',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: "'md'",
    description: 'Spinner size',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'white'",
    default: "'default'",
    description: 'Spinner color',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown relative to the spinner',
  },
  {
    name: 'labelPosition',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: 'Position of the label relative to the spinner',
  },
  {
    name: 'overlay',
    type: 'boolean',
    default: 'false',
    description: 'Covers a parent (position: relative) with a semi-transparent overlay',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Spinner } from 'omverse-ui'

<Spinner variant="circular" />
<Spinner variant="ring" />
<Spinner variant="dots" />
<Spinner variant="bars" />
<Spinner variant="dual" />
<Spinner variant="pulse" />
<Spinner variant="ripple" />
<Spinner variant="gradient" />`;

const SIZES_CODE = `<Spinner variant="circular" size="xs" />
<Spinner variant="circular" size="sm" />
<Spinner variant="circular" size="md" />
<Spinner variant="circular" size="lg" />
<Spinner variant="circular" size="xl" />
<Spinner variant="circular" size="2xl" />`;

const COLORS_CODE = `<Spinner variant="circular" color="default"   />
<Spinner variant="circular" color="secondary" />
<Spinner variant="circular" color="success"   />
<Spinner variant="circular" color="warning"   />
<Spinner variant="circular" color="error"     />
<Spinner variant="circular" color="white"     />`;

const LABEL_CODE = `<Spinner variant="circular" label="Loading..."          />
<Spinner variant="dots"     label="Please wait"         />
<Spinner variant="ring"     label="Fetching data..."    labelPosition="right" />`;

const SKELETON_CODE = `import { Skeleton } from 'omverse-ui'

<Skeleton style={{ width: '100%', height: 20 }} />
<Skeleton style={{ width: '80%',  height: 20 }} />
<Skeleton style={{ width: '60%',  height: 20 }} />
<Skeleton style={{ width: 300,    height: 120, borderRadius: 8 }} />`;

/* ─── Page ─── */

export default function SpinnerPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Spinner']}
        title="Spinner"
        description="Loading indicators in 9 variants with size and color control. Includes Skeleton for shimmer placeholders."
        tags={['9 variants', '6 sizes', '6 colors', 'Skeleton', 'Overlay']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="circular (default), ring, dots, bars, dual, pulse, ripple and gradient"
        >
          <Spinner variant="circular" />
          <Spinner variant="ring" />
          <Spinner variant="dots" />
          <Spinner variant="bars" />
          <Spinner variant="dual" />
          <Spinner variant="pulse" />
          <Spinner variant="ripple" />
          <Spinner variant="gradient" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="xs, sm, md (default), lg, xl and 2xl"
        >
          <Spinner variant="circular" size="xs" />
          <Spinner variant="circular" size="sm" />
          <Spinner variant="circular" size="md" />
          <Spinner variant="circular" size="lg" />
          <Spinner variant="circular" size="xl" />
          <Spinner variant="circular" size="2xl" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 3: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="default, secondary, success, warning, error and white"
        >
          <Spinner variant="circular" color="default"   />
          <Spinner variant="circular" color="secondary" />
          <Spinner variant="circular" color="success"   />
          <Spinner variant="circular" color="warning"   />
          <Spinner variant="circular" color="error"     />
          <Spinner variant="circular" color="white"     />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 4: With label ── */}
        <ComponentPreview
          title="With label"
          description="label adds text — labelPosition controls placement: top, bottom (default), left or right"
        >
          <Spinner variant="circular" label="Loading..."       />
          <Spinner variant="dots"     label="Please wait"      />
          <Spinner variant="ring"     label="Fetching data..." labelPosition="right" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LABEL_CODE} />

        {/* ── Section 5: Skeleton ── */}
        <ComponentPreview
          title="Skeleton"
          description="Shimmer placeholders shown while content loads — size via style or className"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
            <Skeleton style={{ width: '100%', height: 20 }} />
            <Skeleton style={{ width: '80%',  height: 20 }} />
            <Skeleton style={{ width: '60%',  height: 20 }} />
            <Skeleton style={{ width: 300, height: 120, borderRadius: 8 }} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SKELETON_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={SPINNER_PROPS} />

      </div>
    </div>
  );
}
