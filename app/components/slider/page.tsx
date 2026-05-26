'use client';

import { useState } from 'react';
import { Slider, RangeSlider } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const SLIDER_PROPS = [
  { name: 'value',         type: 'number',                                                              default: '—',       description: 'Controlled value' },
  { name: 'defaultValue',  type: 'number',                                                              default: '0',       description: 'Uncontrolled initial value' },
  { name: 'min',           type: 'number',                                                              default: '0',       description: 'Minimum value' },
  { name: 'max',           type: 'number',                                                              default: '100',     description: 'Maximum value' },
  { name: 'step',          type: 'number',                                                              default: '1',       description: 'Step between values' },
  { name: 'onChange',      type: '(value: number) => void',                                             default: '—',       description: 'Callback fired on value change' },
  { name: 'color',         type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Track and thumb color' },
  { name: 'size',          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",                                  default: "'md'",    description: 'Height of the track' },
  { name: 'thumbStyle',    type: "'default' | 'pill' | 'square' | 'bubble'",                           default: "'default'", description: 'Shape of the thumb' },
  { name: 'trackStyle',    type: "'default' | 'glow' | 'gradient' | 'spectrum'",                       default: "'default'", description: 'Visual style of the filled track' },
  { name: 'orientation',   type: "'horizontal' | 'vertical'",                                           default: "'horizontal'", description: 'Direction of the slider' },
  { name: 'showLabels',    type: 'boolean',                                                             default: 'false',   description: 'Shows min and max labels' },
  { name: 'showTooltip',   type: 'boolean',                                                             default: 'false',   description: 'Shows a tooltip above the thumb' },
  { name: 'showMarks',     type: 'boolean',                                                             default: 'false',   description: 'Shows tick marks along the track' },
  { name: 'marks',         type: '{ value: number; label?: string }[]',                                default: '—',       description: 'Custom mark positions and labels' },
  { name: 'showInput',     type: 'boolean',                                                             default: 'false',   description: 'Shows a number input alongside the slider' },
  { name: 'formatValue',   type: '(value: number) => string',                                          default: '—',       description: 'Formats the tooltip / label value' },
  { name: 'disabled',      type: 'boolean',                                                             default: 'false',   description: 'Disables the slider' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const RANGE_PROPS = [
  { name: 'value',        type: '[number, number]',                                                     default: '—',       description: 'Controlled range value' },
  { name: 'defaultValue', type: '[number, number]',                                                     default: '[0, 100]', description: 'Uncontrolled initial range' },
  { name: 'min',          type: 'number',                                                               default: '0',       description: 'Minimum value' },
  { name: 'max',          type: 'number',                                                               default: '100',     description: 'Maximum value' },
  { name: 'step',         type: 'number',                                                               default: '1',       description: 'Step between values' },
  { name: 'onChange',     type: '(value: [number, number]) => void',                                   default: '—',       description: 'Callback fired on range change' },
  { name: 'color',        type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Track and thumb color' },
  { name: 'size',         type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",                                   default: "'md'",    description: 'Height of the track' },
  { name: 'showLabels',   type: 'boolean',                                                              default: 'false',   description: 'Shows min and max labels' },
  { name: 'showTooltip',  type: 'boolean',                                                              default: 'false',   description: 'Shows tooltips above both thumbs' },
  { name: 'formatValue',  type: '(value: number) => string',                                           default: '—',       description: 'Formats the tooltip / label values' },
  { name: 'disabled',     type: 'boolean',                                                              default: 'false',   description: 'Disables the range slider' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const BASIC_CODE = `const [volume, setVolume] = useState(72)

<Slider value={volume} onChange={setVolume} showLabels showTooltip />
<Slider value={volume} onChange={setVolume} showLabels showTooltip disabled />`;

const COLORS_CODE = `<Slider defaultValue={60} color="default"   showTooltip />
<Slider defaultValue={60} color="secondary" showTooltip />
<Slider defaultValue={60} color="success"   showTooltip />
<Slider defaultValue={60} color="warning"   showTooltip />
<Slider defaultValue={60} color="error"     showTooltip />
<Slider defaultValue={60} color="info"      showTooltip />`;

const THUMB_CODE = `<Slider defaultValue={50} thumbStyle="default" showTooltip />
<Slider defaultValue={50} thumbStyle="pill"    showTooltip />
<Slider defaultValue={50} thumbStyle="square"  showTooltip />
<Slider defaultValue={50} thumbStyle="bubble"  showTooltip />`;

const TRACK_CODE = `<Slider defaultValue={65} trackStyle="default"  showTooltip formatValue={v => \`\${v}%\`} />
<Slider defaultValue={65} trackStyle="glow"     showTooltip formatValue={v => \`\${v}%\`} />
<Slider defaultValue={65} trackStyle="gradient" showTooltip formatValue={v => \`\${v}%\`} />
<Slider defaultValue={65} trackStyle="spectrum" showTooltip formatValue={v => \`\${v}%\`} />`;

const SIZES_CODE = `<Slider defaultValue={50} size="xs" showTooltip />
<Slider defaultValue={50} size="sm" showTooltip />
<Slider defaultValue={50} size="md" showTooltip />
<Slider defaultValue={50} size="lg" showTooltip />
<Slider defaultValue={50} size="xl" showTooltip />`;

const MARKS_CODE = `const temperatureMarks = [
  { value: 0,   label: '0°' },
  { value: 20,  label: '20°' },
  { value: 40,  label: '40°' },
  { value: 60,  label: '60°' },
  { value: 80,  label: '80°' },
  { value: 100, label: '100°' },
]

{/* Auto marks every 20% */}
<Slider value={temp} onChange={setTemp} step={20} showMarks showTooltip showLabels />

{/* Custom marks with labels */}
<Slider value={temp} onChange={setTemp} marks={temperatureMarks} showTooltip showLabels />`;

const INPUT_CODE = `<Slider value={brightness} onChange={setBrightness} showInput showTooltip />`;

const RANGE_CODE = `const [price, setPrice] = useState<[number, number]>([250, 750])

<RangeSlider
  value={price}
  onChange={setPrice}
  min={0}
  max={1000}
  showTooltip
  showLabels
  formatValue={v => \`$\${v}\`}
/>`;

const VERTICAL_CODE = `<Slider
  value={opacity}
  onChange={setOpacity}
  orientation="vertical"
  showTooltip
  showLabels
  formatValue={v => \`\${v}%\`}
/>`;

const VOLUME_CODE = `<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <i className="ti ti-volume" style={{ fontSize: 16, color: 'var(--color-text-secondary)', flexShrink: 0 }} aria-hidden="true" />
  <Slider
    value={volume}
    onChange={setVolume}
    size="xs"
    thumbStyle="default"
    color="default"
    style={{ flex: 1 }}
  />
  <i className="ti ti-volume-2" style={{ fontSize: 20, color: 'var(--color-text-primary)', flexShrink: 0 }} aria-hidden="true" />
  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', minWidth: 28, textAlign: 'right' }}>{volume}</span>
</div>`;

/* ─── Page ─── */

export default function SliderPage() {
  const [volume,     setVolume]     = useState(72);
  const [brightness, setBrightness] = useState(85);
  const [opacity,    setOpacity]    = useState(50);
  const [price,      setPrice]      = useState<[number, number]>([250, 750]);
  const [temp,       setTemp]       = useState(35);
  const [markValue,  setMarkValue]  = useState(60);

  const temperatureMarks = [
    { value: 0,   label: '0°' },
    { value: 20,  label: '20°' },
    { value: 40,  label: '40°' },
    { value: 60,  label: '60°' },
    { value: 80,  label: '80°' },
    { value: 100, label: '100°' },
  ];

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Slider']}
        title="Slider"
        description="6 colors · 5 sizes · thumb styles · track styles · marks · range · vertical"
        tags={['Basic', 'Colors', 'Thumb styles', 'Track styles', 'Sizes', 'Marks', 'With input', 'Range', 'Vertical']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="showLabels shows min/max, showTooltip shows the current value above the thumb"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 480 }}>
            <Slider value={volume} onChange={setVolume} showLabels showTooltip />
            <Slider value={volume} onChange={setVolume} showLabels showTooltip disabled />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="Six color variants for the track and thumb"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 480 }}>
            <Slider defaultValue={60} color="default"   showTooltip />
            <Slider defaultValue={60} color="secondary" showTooltip />
            <Slider defaultValue={60} color="success"   showTooltip />
            <Slider defaultValue={60} color="warning"   showTooltip />
            <Slider defaultValue={60} color="error"     showTooltip />
            <Slider defaultValue={60} color="info"      showTooltip />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Thumb styles ── */}
        <ComponentPreview
          title="Thumb styles"
          description="default, pill, square, and bubble thumb shapes"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 480 }}>
            <Slider defaultValue={50} thumbStyle="default" showTooltip />
            <Slider defaultValue={50} thumbStyle="pill"    showTooltip />
            <Slider defaultValue={50} thumbStyle="square"  showTooltip />
            <Slider defaultValue={50} thumbStyle="bubble"  showTooltip />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={THUMB_CODE} />

        {/* ── Section 4: Track styles ── */}
        <ComponentPreview
          title="Track styles"
          description="default, glow, gradient, and spectrum filled track styles"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 480 }}>
            <Slider defaultValue={65} trackStyle="default"  showTooltip formatValue={v => `${v}%`} />
            <Slider defaultValue={65} trackStyle="glow"     showTooltip formatValue={v => `${v}%`} />
            <Slider defaultValue={65} trackStyle="gradient" showTooltip formatValue={v => `${v}%`} />
            <Slider defaultValue={65} trackStyle="spectrum" showTooltip formatValue={v => `${v}%`} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TRACK_CODE} />

        {/* ── Section 5: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="Five track heights: xs, sm, md (default), lg, xl"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 480 }}>
            <Slider defaultValue={50} size="xs" showTooltip />
            <Slider defaultValue={50} size="sm" showTooltip />
            <Slider defaultValue={50} size="md" showTooltip />
            <Slider defaultValue={50} size="lg" showTooltip />
            <Slider defaultValue={50} size="xl" showTooltip />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 6: With marks ── */}
        <ComponentPreview
          title="With marks"
          description="Auto tick marks every step, or custom marks with labels"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, width: '100%', maxWidth: 480 }}>
            <Slider value={temp} onChange={setTemp} step={20} showMarks showTooltip showLabels />
            <Slider value={markValue} onChange={setMarkValue} marks={temperatureMarks} showTooltip showLabels />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MARKS_CODE} />

        {/* ── Section 7: With input ── */}
        <ComponentPreview
          title="With input"
          description="showInput adds a number input field that stays in sync with the slider"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Slider value={brightness} onChange={setBrightness} showInput showTooltip />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={INPUT_CODE} />

        {/* ── Section 8: Range slider ── */}
        <ComponentPreview
          title="Range slider"
          description="RangeSlider lets the user select a min/max range with two thumbs"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <RangeSlider
              value={price}
              onChange={setPrice}
              min={0}
              max={1000}
              showTooltip
              showLabels
              formatValue={v => `$${v}`}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={RANGE_CODE} />

        {/* ── Section 9: Vertical ── */}
        <ComponentPreview
          title="Vertical"
          description="Set orientation=vertical for column-direction sliders"
        >
          <div style={{ height: 200 }}>
            <Slider
              value={opacity}
              onChange={setOpacity}
              orientation="vertical"
              showTooltip
              showLabels
              formatValue={v => `${v}%`}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Section 10: Volume control ── */}
        <ComponentPreview
          title="Volume control"
          description="Pair an Icon with a Slider for a compact media control"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 360 }}>
            <i className="ti ti-volume" style={{ fontSize: 16, color: 'var(--color-text-secondary)', flexShrink: 0 }} aria-hidden="true" />
            <Slider
              value={volume}
              onChange={setVolume}
              size="xs"
              thumbStyle="default"
              color="default"
              style={{ flex: 1 }}
            />
            <i className="ti ti-volume-2" style={{ fontSize: 20, color: 'var(--color-text-primary)', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', minWidth: 28, textAlign: 'right' }}>{volume}</span>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VOLUME_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Slider props
        </p>
        <PropsTable props={SLIDER_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          RangeSlider props
        </p>
        <PropsTable props={RANGE_PROPS} />

      </div>
    </div>
  );
}
