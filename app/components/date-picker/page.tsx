'use client';

import { useState } from 'react';
import { Calendar, DatePicker, DateRangePicker } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props tables ─── */

const CALENDAR_PROPS = [
  { name: 'value',           type: 'Date | null',                                  default: '—',         description: 'Controlled selected date' },
  { name: 'onChange',        type: '(date: Date) => void',                         default: '—',         description: 'Callback fired when a date is selected' },
  { name: 'variant',         type: "'default' | 'dark' | 'gradient' | 'minimal'", default: "'default'", description: 'Visual style of the calendar' },
  { name: 'presets',         type: 'boolean',                                      default: 'false',     description: 'Shows preset shortcut buttons beside the calendar' },
  { name: 'disableWeekends', type: 'boolean',                                      default: 'false',     description: 'Makes Saturday and Sunday unselectable' },
  { name: 'minDate',         type: 'Date',                                         default: '—',         description: 'Earliest selectable date' },
  { name: 'maxDate',         type: 'Date',                                         default: '—',         description: 'Latest selectable date' },
  { name: 'showTime',        type: 'boolean',                                      default: 'false',     description: 'Adds a time picker below the calendar grid' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const DATEPICKER_PROPS = [
  { name: 'value',          type: 'Date | null',           default: '—',     description: 'Controlled selected date' },
  { name: 'onChange',       type: '(date: Date | null) => void', default: '—', description: 'Callback fired when a date is selected' },
  { name: 'label',          type: 'string',                default: '—',     description: 'Label shown above the input' },
  { name: 'placeholder',    type: 'string',                default: '—',     description: 'Placeholder text' },
  { name: 'helperText',     type: 'string',                default: '—',     description: 'Helper text shown below the input' },
  { name: 'error',          type: 'boolean',               default: 'false', description: 'Error state' },
  { name: 'errorText',      type: 'string',                default: '—',     description: 'Error message' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",   default: "'md'",  description: 'Trigger input height' },
  { name: 'disabled',       type: 'boolean',               default: 'false', description: 'Disables the picker' },
  { name: 'presets',        type: 'boolean',               default: 'false', description: 'Shows preset shortcut buttons in the dropdown' },
  { name: 'disableWeekends', type: 'boolean',              default: 'false', description: 'Makes Saturday and Sunday unselectable' },
  { name: 'minDate',        type: 'Date',                  default: '—',     description: 'Earliest selectable date' },
  { name: 'maxDate',        type: 'Date',                  default: '—',     description: 'Latest selectable date' },
  { name: 'showTime',       type: 'boolean',               default: 'false', description: 'Adds a time picker below the calendar' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const DATERANGE_PROPS = [
  { name: 'value',          type: '[Date | null, Date | null]',                  default: '—',     description: 'Controlled date range' },
  { name: 'onChange',       type: '(range: [Date | null, Date | null]) => void', default: '—',     description: 'Callback fired when the range changes' },
  { name: 'label',          type: 'string',                                      default: '—',     description: 'Label shown above the input' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",                         default: "'md'",  description: 'Trigger input height' },
  { name: 'disabled',       type: 'boolean',                                     default: 'false', description: 'Disables the range picker' },
  { name: 'presets',        type: 'boolean',                                     default: 'false', description: 'Shows preset shortcut buttons in the dropdown' },
  { name: 'dualMonth',      type: 'boolean',                                     default: 'false', description: 'Shows two months side by side' },
  { name: 'disableWeekends', type: 'boolean',                                    default: 'false', description: 'Makes Saturday and Sunday unselectable' },
  { name: 'minDate',        type: 'Date',                                        default: '—',     description: 'Earliest selectable date' },
  { name: 'maxDate',        type: 'Date',                                        default: '—',     description: 'Latest selectable date' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const API_PROPS = [
  ...CALENDAR_PROPS,
  ...DATEPICKER_PROPS,
  ...DATERANGE_PROPS,
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const OVERVIEW_CODE = `import { DatePicker } from 'omverse-ui'

const [dueDate, setDueDate] = useState<Date | null>(null)

<DatePicker
  label="Project due date"
  helperText="Choose the date when work must be complete"
  value={dueDate}
  onChange={setDueDate}
/>`;

const CALENDAR_VARIANTS_CODE = `import { Calendar } from 'omverse-ui'

<Calendar variant="default"   value={date} onChange={setDate} />
<Calendar variant="dark"      value={date} onChange={setDate} />
<Calendar variant="gradient"  value={date} onChange={setDate} />
<Calendar variant="minimal"   value={date} onChange={setDate} />`;

const PRESETS_CODE = `<Calendar value={date} onChange={setDate} presets />`;

const DATEPICKER_BASIC_CODE = `import { DatePicker } from 'omverse-ui'

const [date, setDate] = useState<Date | null>(null)

{/* Default */}
<DatePicker label="Date" value={date} onChange={setDate} />

{/* With helper text */}
<DatePicker label="Start date" helperText="Select the project start date" value={date} onChange={setDate} />

{/* With error */}
<DatePicker
  label="Due date"
  error={!date}
  errorText="Please select a due date"
  value={date}
  onChange={setDate}
/>

{/* Disabled */}
<DatePicker label="Locked date" disabled value={date} onChange={setDate} />`;

const DATEPICKER_PRESETS_CODE = `<DatePicker label="Date" value={date} onChange={setDate} presets />`;

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
            <PageHeader        breadcrumb={['Components', 'Form', 'DatePicker']}        title="DatePicker"        description="Calendar · DatePicker input · DateRangePicker · 4 variants · presets · time picker"        tags={['Calendar variants', 'Presets', 'DatePicker', 'Sizes', 'States', 'Date+time', 'DateRangePicker', 'Dual month']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Calendar · DatePicker input · DateRangePicker · 4 variants · presets · time picker">
          <div className="component-doc-stack">
            <ComponentPreview title="Default date picker" description="Use a date picker when people benefit from choosing a date from calendar context.">
              <div style={{ width: 'min(100%, 360px)' }}><DatePicker label="Project due date" helperText="Choose the date when work must be complete" value={date} onChange={setDate} /></div>
            </ComponentPreview>
            <CodeBlock filename="App.tsx" code={OVERVIEW_CODE} />
            <div className="component-doc-prose">
              <p>Use explicit labels and preserve the selected date in a locale-appropriate format. Use DateRangePicker when the task requires both a start and end date.</p>
              <div className="component-doc-callout"><i className="ti ti-bulb" aria-hidden="true" /><span>Constrain unavailable dates in the calendar and explain the constraint instead of allowing an invalid selection.</span></div>
            </div>
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
            <li>Choose DatePicker when a repeated, structured interaction is required.</li>
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
              <Calendar value={date} onChange={setDate} presets />
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
                  presets
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
          
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              DatePicker props
            </p>
          
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              DateRangePicker props
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
            <li>Use DatePicker alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep datepicker behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
