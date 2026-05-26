'use client';

import { useState } from 'react';
import { Calendar, DatePicker, DateRangePicker } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const CALENDAR_PROPS = [
  { name: 'value',              type: 'Date | null',                                    default: '—',       description: 'Controlled selected date' },
  { name: 'defaultValue',       type: 'Date | null',                                    default: 'null',    description: 'Uncontrolled initial date' },
  { name: 'onChange',           type: '(date: Date | null) => void',                    default: '—',       description: 'Callback fired when a date is selected' },
  { name: 'variant',            type: "'default' | 'dark' | 'gradient' | 'minimal'",   default: "'default'", description: 'Visual style of the calendar' },
  { name: 'showWeekNumbers',    type: 'boolean',                                        default: 'false',   description: 'Shows ISO week numbers in the leftmost column' },
  { name: 'disableWeekends',    type: 'boolean',                                        default: 'false',   description: 'Makes Saturday and Sunday unselectable' },
  { name: 'minDate',            type: 'Date',                                           default: '—',       description: 'Earliest selectable date' },
  { name: 'maxDate',            type: 'Date',                                           default: '—',       description: 'Latest selectable date' },
  { name: 'quickPresets',       type: '{ label: string; getValue: () => Date }[]',      default: '—',       description: 'Array of preset shortcuts shown beside the calendar' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const DATEPICKER_PROPS = [
  { name: 'value',              type: 'Date | null',                                    default: '—',       description: 'Controlled selected date' },
  { name: 'onChange',           type: '(date: Date | null) => void',                    default: '—',       description: 'Callback fired when a date is selected' },
  { name: 'label',              type: 'string',                                         default: '—',       description: 'Label shown above the input' },
  { name: 'placeholder',        type: 'string',                                         default: "'Pick a date'", description: 'Placeholder text' },
  { name: 'helperText',         type: 'string',                                         default: '—',       description: 'Helper text shown below the input' },
  { name: 'error',              type: 'boolean',                                        default: 'false',   description: 'Error state' },
  { name: 'errorText',          type: 'string',                                         default: '—',       description: 'Error message' },
  { name: 'size',               type: "'sm' | 'md' | 'lg'",                            default: "'md'",    description: 'Trigger input height' },
  { name: 'disabled',           type: 'boolean',                                        default: 'false',   description: 'Disables the picker' },
  { name: 'disableWeekends',    type: 'boolean',                                        default: 'false',   description: 'Makes Saturday and Sunday unselectable' },
  { name: 'minDate',            type: 'Date',                                           default: '—',       description: 'Earliest selectable date' },
  { name: 'maxDate',            type: 'Date',                                           default: '—',       description: 'Latest selectable date' },
  { name: 'showTime',           type: 'boolean',                                        default: 'false',   description: 'Adds a time picker below the calendar' },
  { name: 'quickPresets',       type: '{ label: string; getValue: () => Date }[]',      default: '—',       description: 'Preset shortcuts in the dropdown' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const DATERANGE_PROPS = [
  { name: 'value',              type: '[Date | null, Date | null]',                     default: '—',       description: 'Controlled date range' },
  { name: 'onChange',           type: '(range: [Date | null, Date | null]) => void',    default: '—',       description: 'Callback fired when the range changes' },
  { name: 'label',              type: 'string',                                         default: '—',       description: 'Label shown above the input' },
  { name: 'placeholder',        type: 'string',                                         default: '—',       description: 'Placeholder text' },
  { name: 'size',               type: "'sm' | 'md' | 'lg'",                            default: "'md'",    description: 'Trigger input height' },
  { name: 'disabled',           type: 'boolean',                                        default: 'false',   description: 'Disables the range picker' },
  { name: 'dualMonth',          type: 'boolean',                                        default: 'false',   description: 'Shows two months side by side' },
  { name: 'quickPresets',       type: '{ label: string; getValue: () => [Date, Date] }[]', default: '—',    description: 'Preset date range shortcuts' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Quick preset helpers ─── */

const calendarPresets = [
  { label: 'Today',      getValue: () => new Date() },
  { label: 'Tomorrow',   getValue: () => { const d = new Date(); d.setDate(d.getDate() + 1); return d; } },
  { label: 'Next week',  getValue: () => { const d = new Date(); d.setDate(d.getDate() + 7); return d; } },
  { label: 'Next month', getValue: () => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d; } },
];

/* ─── Code snippets ─── */

const CALENDAR_VARIANTS_CODE = `import { Calendar } from 'omverse-ui'

<Calendar variant="default"   value={date} onChange={setDate} />
<Calendar variant="dark"      value={date} onChange={setDate} />
<Calendar variant="gradient"  value={date} onChange={setDate} />
<Calendar variant="minimal"   value={date} onChange={setDate} />`;

const PRESETS_CODE = `const presets = [
  { label: 'Today',      getValue: () => new Date() },
  { label: 'Tomorrow',   getValue: () => { const d = new Date(); d.setDate(d.getDate() + 1); return d } },
  { label: 'Next week',  getValue: () => { const d = new Date(); d.setDate(d.getDate() + 7); return d } },
  { label: 'Next month', getValue: () => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d } },
]

<Calendar value={date} onChange={setDate} quickPresets={presets} />`;

const DATEPICKER_BASIC_CODE = `import { DatePicker } from 'omverse-ui'

const [date, setDate] = useState<Date | null>(null)

{/* Default */}
<DatePicker label="Date" value={date} onChange={setDate} />

{/* With helper text */}
<DatePicker label="Start date" helperText="Select the project start date" value={date} onChange={setDate} />

{/* Required with error */}
<DatePicker
  label="Due date"
  required
  error={!date}
  errorText="Please select a due date"
  value={date}
  onChange={setDate}
/>

{/* Disabled */}
<DatePicker label="Locked date" disabled value={date} onChange={setDate} />`;

const DATEPICKER_PRESETS_CODE = `const presets = [
  { label: 'Today',      getValue: () => new Date() },
  { label: 'Tomorrow',   getValue: () => { const d = new Date(); d.setDate(d.getDate() + 1); return d } },
  { label: 'Next week',  getValue: () => { const d = new Date(); d.setDate(d.getDate() + 7); return d } },
  { label: 'Next month', getValue: () => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d } },
]

<DatePicker label="Date" value={date} onChange={setDate} quickPresets={presets} />`;

const SIZES_CODE = `<DatePicker label="Small"          size="sm" value={date} onChange={setDate} />
<DatePicker label="Medium (default)" size="md" value={date} onChange={setDate} />
<DatePicker label="Large"          size="lg" value={date} onChange={setDate} />`;

const STATES_CODE = `{/* Default */}
<DatePicker label="Date" value={date} onChange={setDate} />

{/* Error */}
<DatePicker label="Date" error errorText="Invalid date" value={date} onChange={setDate} />

{/* Disabled */}
<DatePicker label="Date" disabled value={date} onChange={setDate} />

{/* Disable weekends */}
<DatePicker label="Weekdays only" disableWeekends value={date} onChange={setDate} />

{/* Min date */}
<DatePicker label="From today" minDate={new Date()} value={date} onChange={setDate} />`;

const DATETIME_CODE = `<DatePicker label="Date & time" showTime value={date} onChange={setDate} />`;

const RANGE_CODE = `import { DateRangePicker } from 'omverse-ui'

const [range, setRange] = useState<[Date | null, Date | null]>([null, null])

<DateRangePicker label="Date range"       value={range} onChange={setRange} />
<DateRangePicker label="Dual month view"  value={range} onChange={setRange} dualMonth />`;

/* ─── Page ─── */

export default function DatePickerPage() {
  const [date,         setDate]         = useState<Date | null>(null);
  const [darkDate,     setDarkDate]     = useState<Date | null>(null);
  const [gradientDate, setGradientDate] = useState<Date | null>(null);
  const [minimalDate,  setMinimalDate]  = useState<Date | null>(null);
  const [range,        setRange]        = useState<[Date | null, Date | null]>([null, null]);
  const [dualRange,    setDualRange]    = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'DatePicker']}
        title="DatePicker"
        description="Calendar · DatePicker input · DateRangePicker · 4 variants · presets · time picker"
        tags={['Calendar variants', 'Presets', 'DatePicker', 'Sizes', 'States', 'Date+time', 'DateRangePicker', 'Dual month']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Calendar variants ── */}
        <ComponentPreview
          title="Calendar variants"
          description="Four visual styles: default, dark, gradient, and minimal"
          layout="grid"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>default</p>
              <Calendar variant="default"  value={date}         onChange={setDate} />
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>dark</p>
              <Calendar variant="dark"     value={darkDate}     onChange={setDarkDate} />
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>gradient</p>
              <Calendar variant="gradient" value={gradientDate} onChange={setGradientDate} />
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>minimal</p>
              <Calendar variant="minimal"  value={minimalDate}  onChange={setMinimalDate} />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CALENDAR_VARIANTS_CODE} />

        {/* ── Section 2: With quick presets ── */}
        <ComponentPreview
          title="With quick presets"
          description="quickPresets adds shortcut buttons beside the calendar"
        >
          <Calendar value={date} onChange={setDate} quickPresets={calendarPresets} />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PRESETS_CODE} />

        {/* ── Section 3: DatePicker input ── */}
        <ComponentPreview
          title="DatePicker input"
          description="Dropdown-based date picker — with helper text, error, required, and disabled states"
          layout="grid"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <DatePicker
              label="Date"
              value={date}
              onChange={setDate}
            />
            <DatePicker
              label="Start date"
              helperText="Select the project start date"
              value={date}
              onChange={setDate}
            />
            <DatePicker
              label="Due date"
              required
              error={!date}
              errorText="Please select a due date"
              value={date}
              onChange={setDate}
            />
            <DatePicker
              label="Locked date"
              disabled
              value={date}
              onChange={setDate}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DATEPICKER_BASIC_CODE} />

        {/* ── Section 4: DatePicker with presets ── */}
        <ComponentPreview
          title="DatePicker with presets"
          description="quickPresets prop adds shortcut buttons inside the dropdown"
        >
          <div style={{ width: 280 }}>
            <DatePicker
              label="Date"
              value={date}
              onChange={setDate}
              quickPresets={calendarPresets}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DATEPICKER_PRESETS_CODE} />

        {/* ── Section 5: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default), and lg trigger heights"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
            <DatePicker label="Small"            size="sm" value={date} onChange={setDate} />
            <DatePicker label="Medium (default)" size="md" value={date} onChange={setDate} />
            <DatePicker label="Large"            size="lg" value={date} onChange={setDate} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 6: States ── */}
        <ComponentPreview
          title="States"
          description="Default, error, disabled, disable weekends, and min date"
          layout="grid"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <DatePicker label="Date"          value={date} onChange={setDate} />
            <DatePicker label="Date" error errorText="Invalid date" value={date} onChange={setDate} />
            <DatePicker label="Date" disabled  value={date} onChange={setDate} />
            <DatePicker label="Weekdays only"  disableWeekends value={date} onChange={setDate} />
            <DatePicker label="From today"     minDate={new Date()} value={date} onChange={setDate} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STATES_CODE} />

        {/* ── Section 7: Date + time ── */}
        <ComponentPreview
          title="Date + time"
          description="showTime adds a time picker below the calendar grid"
        >
          <div style={{ width: 280 }}>
            <DatePicker label="Date & time" showTime value={date} onChange={setDate} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DATETIME_CODE} />

        {/* ── Section 8: Date range picker ── */}
        <ComponentPreview
          title="Date range picker"
          description="DateRangePicker for selecting a start and end date — dualMonth shows two months"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 520 }}>
            <DateRangePicker label="Date range"      value={range}     onChange={setRange} />
            <DateRangePicker label="Dual month view" value={dualRange} onChange={setDualRange} dualMonth />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={RANGE_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Calendar props
        </p>
        <PropsTable props={CALENDAR_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          DatePicker props
        </p>
        <PropsTable props={DATEPICKER_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          DateRangePicker props
        </p>
        <PropsTable props={DATERANGE_PROPS} />

      </div>
    </div>
  );
}
