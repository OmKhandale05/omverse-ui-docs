'use client';

import { useState } from 'react';
import { Calendar, DatePicker, DateRangePicker } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const DATEPICKER_PROPS = [
  {
    name: 'value',
    type: 'Date | null',
    default: 'undefined',
    description: 'Currently selected date (controlled)',
  },
  {
    name: 'onChange',
    type: '(date: Date | null) => void',
    default: 'undefined',
    description: 'Callback fired when the date changes',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    description: 'Placeholder text shown when no date is selected',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown above the input',
  },
  {
    name: 'variant',
    type: "'default' | 'dark' | 'gradient' | 'minimal'",
    default: "'default'",
    description: 'Calendar popup visual style',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Input field size',
  },
  {
    name: 'showTime',
    type: 'boolean',
    default: 'false',
    description: 'Show time picker (AM/PM) inside the calendar',
  },
  {
    name: 'presets',
    type: 'boolean',
    default: 'false',
    description: 'Show quick-select preset buttons (Today, Tomorrow, Next week…)',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Show a clear button to reset the selected date',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the picker',
  },
  {
    name: 'error',
    type: 'boolean',
    default: 'false',
    description: 'Error state — applies error styling to the input',
  },
  {
    name: 'errorText',
    type: 'string',
    default: 'undefined',
    description: 'Error message shown below the input',
  },
  {
    name: 'helperText',
    type: 'string',
    default: 'undefined',
    description: 'Helper text shown below the input',
  },
  {
    name: 'minDate',
    type: 'Date',
    default: 'undefined',
    description: 'Minimum selectable date',
  },
  {
    name: 'maxDate',
    type: 'Date',
    default: 'undefined',
    description: 'Maximum selectable date',
  },
  {
    name: 'disableWeekends',
    type: 'boolean',
    default: 'false',
    description: 'Prevents selecting Saturday / Sunday',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const CALENDAR_CODE = `import { Calendar } from 'omverse-ui'

const [date, setDate] = useState<Date | null>(null);

// Calendar.onChange passes Date (never null) — use an adapter
<Calendar value={date}     onChange={(d) => setDate(d)} variant="default" />
<Calendar value={date}     onChange={(d) => setDate(d)} variant="dark" />
<Calendar value={date}     onChange={(d) => setDate(d)} variant="gradient" />
<Calendar value={date}     onChange={(d) => setDate(d)} variant="minimal" />`;

const DATEPICKER_CODE = `import { DatePicker } from 'omverse-ui'

<DatePicker
  label="Select date"
  placeholder="Pick a date..."
  value={date}
  onChange={setDate}
/>

// Error state
<DatePicker
  label="With error"
  placeholder="Pick a date..."
  value={null}
  onChange={setDate}
  error
  errorText="Date is required"
/>

// Disabled
<DatePicker label="Disabled" placeholder="Cannot select" disabled />`;

const SIZES_CODE = `<DatePicker size="sm" placeholder="Small"  value={date} onChange={setDate} />
<DatePicker size="md" placeholder="Medium" value={date} onChange={setDate} />
<DatePicker size="lg" placeholder="Large"  value={date} onChange={setDate} />`;

const PRESETS_CODE = `// presets adds quick-select buttons inside the calendar popup
<DatePicker
  label="Due date"
  placeholder="Select date..."
  value={date}
  onChange={setDate}
  presets
/>`;

const TIME_CODE = `// showTime adds an AM/PM time picker inside the calendar
<DatePicker
  label="Meeting time"
  placeholder="Select date and time..."
  value={date}
  onChange={setDate}
  showTime
/>`;

const RANGE_CODE = `import { DateRangePicker } from 'omverse-ui'

const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

<DateRangePicker
  label="Project timeline"
  value={range}
  onChange={setRange}
/>`;

const DUAL_CODE = `// dualMonth shows two calendar months side by side
<DateRangePicker
  label="Date range"
  value={range}
  onChange={setRange}
  dualMonth
/>`;

/* ─── Calendar card helper ─── */

const calCard: React.CSSProperties = {
  border: '0.5px solid var(--color-border-tertiary)',
  borderRadius: 8,
  padding: 16,
  display: 'inline-flex',
};

/* ─── Page ─── */

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'DatePicker']}
        title="DatePicker"
        description="Date selection with calendar popup. 4 calendar variants, date range picker, dual month and time picker."
        tags={['4 variants', 'Date range', 'Dual month', 'Time picker', 'Presets', 'Disabled dates']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Calendar variants ── */}
        <ComponentPreview
          title="Calendar variants"
          description="4 inline calendar styles — default, dark, gradient, minimal"
          align="start"
        >
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                default
              </p>
              <div style={calCard}>
                <Calendar value={date} onChange={(d) => setDate(d)} variant="default" />
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                dark
              </p>
              <Calendar value={date} onChange={(d) => setDate(d)} variant="dark" />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                gradient
              </p>
              <Calendar value={date} onChange={(d) => setDate(d)} variant="gradient" />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                minimal
              </p>
              <div style={calCard}>
                <Calendar value={date} onChange={(d) => setDate(d)} variant="minimal" />
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CALENDAR_CODE} />

        {/* ── Section 2: DatePicker input ── */}
        <ComponentPreview
          title="DatePicker input"
          description="Trigger-based picker — click the input to open a calendar popup"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 320 }}>
            <DatePicker
              label="Select date"
              placeholder="Pick a date..."
              value={date}
              onChange={setDate}
            />
            <DatePicker
              label="With error"
              placeholder="Pick a date..."
              value={null}
              onChange={setDate}
              error
              errorText="Date is required"
            />
            <DatePicker
              label="Disabled"
              placeholder="Cannot select"
              disabled
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DATEPICKER_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm · md (default) · lg — controls input height and font size"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
            <DatePicker size="sm" placeholder="Small"  value={date} onChange={setDate} />
            <DatePicker size="md" placeholder="Medium" value={date} onChange={setDate} />
            <DatePicker size="lg" placeholder="Large"  value={date} onChange={setDate} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: With presets ── */}
        <ComponentPreview
          title="With presets"
          description="presets adds quick-select buttons (Today, Tomorrow, Next week…) inside the popup"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 320 }}>
            <DatePicker
              label="Due date"
              placeholder="Select date..."
              value={date}
              onChange={setDate}
              presets
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PRESETS_CODE} />

        {/* ── Section 5: Date and time ── */}
        <ComponentPreview
          title="Date and time"
          description="showTime adds an AM/PM time picker row below the calendar grid"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 320 }}>
            <DatePicker
              label="Meeting time"
              placeholder="Select date and time..."
              value={date}
              onChange={setDate}
              showTime
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TIME_CODE} />

        {/* ── Section 6: Date range picker ── */}
        <ComponentPreview
          title="Date range picker"
          description="DateRangePicker lets users select a start and end date from the same popup"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 420 }}>
            <DateRangePicker
              label="Project timeline"
              value={range}
              onChange={setRange}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={RANGE_CODE} />

        {/* ── Section 7: Dual month ── */}
        <ComponentPreview
          title="Dual month range picker"
          description="dualMonth shows two calendar months side by side — great for booking flows"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <DateRangePicker
              label="Date range"
              value={range}
              onChange={setRange}
              dualMonth
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DUAL_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={DATEPICKER_PROPS} />

      </div>
    </div>
  );
}
