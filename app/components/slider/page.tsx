'use client';

import { useState } from 'react';
import { Slider, RangeSlider } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const SLIDER_PROPS = [
  {
    name: 'value',
    type: 'number',
    default: 'undefined',
    description: 'Current value (controlled)',
  },
  {
    name: 'onChange',
    type: '(value: number) => void',
    default: 'undefined',
    description: 'Callback when value changes',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'Minimum value',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'Step increment',
  },
  {
    name: 'thumbStyle',
    type: "'default' | 'pill' | 'square' | 'bubble'",
    default: "'default'",
    description: 'Thumb visual style',
  },
  {
    name: 'trackStyle',
    type: "'default' | 'glow' | 'gradient' | 'spectrum'",
    default: "'default'",
    description: 'Track visual style',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error'",
    default: "'default'",
    description: 'Color scheme applied to fill and thumb',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Track height and thumb size',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Slider orientation',
  },
  {
    name: 'showTooltip',
    type: 'boolean',
    default: 'false',
    description: 'Show value tooltip on hover / drag',
  },
  {
    name: 'showMarks',
    type: 'boolean',
    default: 'false',
    description: 'Show step marks on the track',
  },
  {
    name: 'marks',
    type: 'Array<{ value: number; label?: string }>',
    default: 'undefined',
    description: 'Custom mark positions with optional labels',
  },
  {
    name: 'showLabels',
    type: 'boolean',
    default: 'false',
    description: 'Show min / max labels at track ends',
  },
  {
    name: 'showInput',
    type: 'boolean',
    default: 'false',
    description: 'Show a synced number input beside the slider',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown above the slider',
  },
  {
    name: 'formatValue',
    type: '(value: number) => string',
    default: 'undefined',
    description: 'Custom formatter for tooltip and input display',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the slider',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Slider } from 'omverse-ui'

const [value, setValue] = useState(50);

<Slider value={value} onChange={setValue} label="Volume" showLabels />`;

const THUMB_CODE = `// 4 thumb styles
<Slider value={65} thumbStyle="default" label="Default" showTooltip />
<Slider value={65} thumbStyle="pill"    label="Pill" />
<Slider value={65} thumbStyle="square"  label="Square" showTooltip />
<Slider value={65} thumbStyle="bubble"  label="Bubble" />`;

const TRACK_CODE = `// 4 track styles
<Slider value={70} trackStyle="default"  label="Default" />
<Slider value={70} trackStyle="glow"     label="Glow" />
<Slider value={70} trackStyle="gradient" label="Gradient" />
<Slider value={70} trackStyle="spectrum" label="Spectrum" />`;

const COLORS_CODE = `<Slider value={60} color="default"   label="Default" />
<Slider value={60} color="secondary" label="Secondary" />
<Slider value={60} color="success"   label="Success" />
<Slider value={60} color="warning"   label="Warning" />
<Slider value={60} color="error"     label="Error" />`;

const MARKS_CODE = `<Slider
  value={value}
  onChange={setValue}
  step={20}
  showMarks
  marks={[
    { value: 0,   label: '0'   },
    { value: 20,  label: '20'  },
    { value: 40,  label: '40'  },
    { value: 60,  label: '60'  },
    { value: 80,  label: '80'  },
    { value: 100, label: '100' },
  ]}
/>`;

const INPUT_CODE = `// showInput syncs a number input beside the slider
<Slider value={value} onChange={setValue} label="Volume" showInput showTooltip />`;

const RANGE_CODE = `import { RangeSlider } from 'omverse-ui'

const [range, setRange] = useState<[number, number]>([25, 75]);

<RangeSlider
  value={range}
  onChange={setRange}
  label="Price range"
  showLabels
  showTooltip
  formatValue={(v) => '$' + v}
/>`;

const VERTICAL_CODE = `// orientation="vertical" — give the container a fixed height
<div style={{ display: 'flex', gap: 32, height: 160, alignItems: 'flex-end' }}>
  <Slider value={70} orientation="vertical" color="default"  showTooltip />
  <Slider value={45} orientation="vertical" color="success"  showTooltip />
  <Slider value={85} orientation="vertical" color="warning"  showTooltip />
</div>`;

/* ─── Shared layout helpers ─── */

const col: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
  width: '100%',
  maxWidth: 480,
};

/* ─── Page ─── */

export default function SliderPage() {
  const [value, setValue] = useState(50);
  const [range, setRange] = useState<[number, number]>([25, 75]);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Slider']}
        title="Slider"
        description="Draggable range input. 4 thumb styles, 4 track styles, range slider, vertical orientation and step marks."
        tags={['4 thumb styles', '4 track styles', 'Range slider', 'Vertical', 'Step marks', '6 colors']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="Controlled slider with a label and min/max labels at track ends"
          align="start"
        >
          <div style={col}>
            <Slider value={value} onChange={setValue} label="Volume" showLabels />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Thumb styles ── */}
        <ComponentPreview
          title="Thumb styles"
          description="4 thumb shapes — default circle, pill, square, bubble (value floats above)"
          align="start"
        >
          <div style={col}>
            <Slider value={65} thumbStyle="default" label="Default" showTooltip />
            <Slider value={65} thumbStyle="pill"    label="Pill" />
            <Slider value={65} thumbStyle="square"  label="Square" showTooltip />
            <Slider value={65} thumbStyle="bubble"  label="Bubble" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={THUMB_CODE} />

        {/* ── Section 3: Track styles ── */}
        <ComponentPreview
          title="Track styles"
          description="4 track fills — default solid, glow neon, gradient brand, spectrum rainbow"
          align="start"
        >
          <div style={col}>
            <Slider value={70} trackStyle="default"  label="Default" />
            <Slider value={70} trackStyle="glow"     label="Glow" />
            <Slider value={70} trackStyle="gradient" label="Gradient" />
            <Slider value={70} trackStyle="spectrum" label="Spectrum" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TRACK_CODE} />

        {/* ── Section 4: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="5 semantic colors applied to both fill and thumb"
          align="start"
        >
          <div style={col}>
            <Slider value={60} color="default"   label="Default" />
            <Slider value={60} color="secondary" label="Secondary" />
            <Slider value={60} color="success"   label="Success" />
            <Slider value={60} color="warning"   label="Warning" />
            <Slider value={60} color="error"     label="Error" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 5: Step marks ── */}
        <ComponentPreview
          title="Step marks"
          description="showMarks renders a tick at each step; marks array adds custom labels below"
          align="start"
        >
          <div style={{ ...col, maxWidth: 520, paddingBottom: 8 }}>
            <Slider
              value={value}
              onChange={setValue}
              step={20}
              showMarks
              marks={[
                { value: 0,   label: '0'   },
                { value: 20,  label: '20'  },
                { value: 40,  label: '40'  },
                { value: 60,  label: '60'  },
                { value: 80,  label: '80'  },
                { value: 100, label: '100' },
              ]}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MARKS_CODE} />

        {/* ── Section 6: With number input ── */}
        <ComponentPreview
          title="With number input"
          description="showInput adds a synced numeric field — type or drag to update the same value"
          align="start"
        >
          <div style={col}>
            <Slider value={value} onChange={setValue} label="Volume" showInput showTooltip />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={INPUT_CODE} />

        {/* ── Section 7: Range slider ── */}
        <ComponentPreview
          title="Range slider"
          description="RangeSlider provides two thumbs for selecting a min / max range"
          align="start"
        >
          <div style={col}>
            <RangeSlider
              value={range}
              onChange={setRange}
              label="Price range"
              showLabels
              showTooltip
              formatValue={(v) => '$' + v}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={RANGE_CODE} />

        {/* ── Section 8: Vertical ── */}
        <ComponentPreview
          title="Vertical"
          description="orientation='vertical' — wrap in a fixed-height container for proper sizing"
        >
          <div style={{ display: 'flex', gap: 32, height: 160, alignItems: 'flex-end' }}>
            <Slider value={70} orientation="vertical" color="default" showTooltip />
            <Slider value={45} orientation="vertical" color="success" showTooltip />
            <Slider value={85} orientation="vertical" color="warning" showTooltip />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={SLIDER_PROPS} />

      </div>
    </div>
  );
}
