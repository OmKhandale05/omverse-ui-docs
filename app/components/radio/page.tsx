'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const RADIO_PROPS = [
  { name: 'label',          type: 'ReactNode',                                                                  default: '—',         description: 'Label text shown next to the radio' },
  { name: 'helperText',     type: 'string',                                                                     default: '—',         description: 'Helper text shown below the label' },
  { name: 'required',       type: 'boolean',                                                                    default: 'false',     description: 'Marks as required — adds * to label' },
  { name: 'error',          type: 'boolean',                                                                    default: 'false',     description: 'Error state — red border' },
  { name: 'errorText',      type: 'string',                                                                     default: '—',         description: 'Error message shown when error=true' },
  { name: 'card',           type: 'boolean',                                                                    default: 'false',     description: 'Wraps the radio in a bordered card' },
  { name: 'description',    type: 'string',                                                                     default: '—',         description: 'Description inside the card (card=true only)' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",                                                        default: "'md'",      description: 'Size of the radio button' },
  { name: 'color',          type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",       default: "'default'", description: 'Color when selected' },
  { name: 'disabled',       type: 'boolean',                                                                    default: 'false',     description: 'Disables the radio button' },
  { name: 'value',          type: 'string',                                                                     default: '—',         description: 'Value used inside RadioGroup' },
  { name: 'checked',        type: 'boolean',                                                                    default: '—',         description: 'Controlled checked state' },
  { name: 'defaultChecked', type: 'boolean',                                                                    default: 'false',     description: 'Uncontrolled initial checked state' },
  { name: 'onChange',       type: 'React.ChangeEventHandler<HTMLInputElement>',                                 default: '—',         description: 'Change event callback' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const GROUP_PROPS = [
  { name: 'legend',       type: 'string',                                                                       default: '—',           description: 'Group label shown above the radios' },
  { name: 'value',        type: 'string',                                                                       default: '—',           description: 'Controlled selected value' },
  { name: 'onChange',     type: '(value: string) => void',                                                      default: '—',           description: 'Callback fired when selection changes' },
  { name: 'display',      type: "'default' | 'card' | 'button' | 'segmented'",                                 default: "'default'",   description: 'Layout style for the group' },
  { name: 'color',        type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",         default: '—',           description: 'Color applied to all child radios' },
  { name: 'size',         type: "'sm' | 'md' | 'lg'",                                                          default: '—',           description: 'Size applied to all child radios' },
  { name: 'orientation',  type: "'horizontal' | 'vertical'",                                                    default: "'vertical'",  description: 'Stacking direction of the radios' },
  { name: 'error',        type: 'boolean',                                                                      default: 'false',       description: 'Error state for the group' },
  { name: 'errorText',    type: 'string',                                                                       default: '—',           description: 'Error message shown below the group' },
  { name: 'children',     type: 'ReactNode',                                                                    default: '—',           description: 'Radio components with a value prop' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `const [notify, setNotify] = useState('email')

<RadioGroup legend="Notification preference" value={notify} onChange={setNotify}>
  <Radio value="email" label="Email"  helperText="Receive updates via email" />
  <Radio value="sms"   label="SMS"    helperText="Receive updates via text message" />
  <Radio value="push"  label="Push"   helperText="Receive push notifications" />
  <Radio value="none"  label="None"   helperText="Do not receive notifications" disabled />
</RadioGroup>`;

const COLORS_CODE = `const [color, setColor] = useState('default')

<RadioGroup legend="Select color" value={color} onChange={setColor} direction="horizontal">
  <Radio value="default"   label="Default"   color="default"   />
  <Radio value="secondary" label="Secondary" color="secondary" />
  <Radio value="success"   label="Success"   color="success"   />
  <Radio value="warning"   label="Warning"   color="warning"   />
  <Radio value="error"     label="Error"     color="error"     />
  <Radio value="info"      label="Info"      color="info"      />
</RadioGroup>`;

const SIZES_CODE = `const [size, setSize] = useState('md')

<RadioGroup legend="Size" value={size} onChange={setSize}>
  <Radio value="sm" label="Small"            size="sm" />
  <Radio value="md" label="Medium (default)" size="md" />
  <Radio value="lg" label="Large"            size="lg" />
</RadioGroup>`;

const HORIZONTAL_CODE = `const [view, setView] = useState('week')

<RadioGroup legend="Calendar view" value={view} onChange={setView} direction="horizontal">
  <Radio value="day"   label="Day"   />
  <Radio value="week"  label="Week"  />
  <Radio value="month" label="Month" />
  <Radio value="year"  label="Year"  />
</RadioGroup>`;

const ERROR_CODE = `const [gender, setGender] = useState('')

<RadioGroup
  legend="Gender"
  value={gender}
  onChange={setGender}
  error={!gender}
  errorText="Please select a gender"
>
  <Radio value="male"   label="Male"   required />
  <Radio value="female" label="Female" />
  <Radio value="other"  label="Other"  />
</RadioGroup>`;

const CARD_CODE = `const [plan, setPlan] = useState('pro')

<RadioGroup legend="Choose a plan" value={plan} onChange={setPlan} display="card">
  <Radio
    value="starter"
    label="Starter"
    description="$0/month · 3 projects · Community support"
  />
  <Radio
    value="pro"
    label="Pro"
    description="$12/month · Unlimited projects · Priority support"
  />
  <Radio
    value="team"
    label="Team"
    description="$49/month · Up to 10 members · Admin controls"
  />
  <Radio
    value="enterprise"
    label="Enterprise"
    description="Custom pricing · Unlimited members · SLA"
    disabled
  />
</RadioGroup>`;

const BUTTON_CODE = `const [billing, setBilling] = useState('yearly')

<RadioGroup legend="Billing cycle" value={billing} onChange={setBilling} display="button">
  <Radio value="monthly"   label="Monthly"   />
  <Radio value="quarterly" label="Quarterly" />
  <Radio value="yearly"    label="Yearly"    />
</RadioGroup>`;

const SEGMENTED_CODE = `const [view, setView] = useState('week')

<RadioGroup legend="Calendar view" value={view} onChange={setView} display="segmented">
  <Radio value="day"   label="Day"   />
  <Radio value="week"  label="Week"  />
  <Radio value="month" label="Month" />
  <Radio value="year"  label="Year"  />
</RadioGroup>`;

/* ─── Page ─── */

export default function RadioPage() {
  const [gender,   setGender]   = useState('');
  const [plan,     setPlan]     = useState('pro');
  const [billing,  setBilling]  = useState('yearly');
  const [view,     setView]     = useState('week');
  const [color,    setColor]    = useState('default');
  const [notify,   setNotify]   = useState('email');
  const [sizeDemo, setSizeDemo] = useState('md');

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Radio']}
        title="Radio"
        description="6 colors · 3 sizes · card · button · segmented display modes"
        tags={['States', 'Colors', 'Sizes', 'Horizontal', 'Error state', 'Card', 'Button', 'Segmented']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Vertical list with helper text and a disabled option"
        >
          <RadioGroup legend="Notification preference" value={notify} onChange={setNotify}>
            <Radio value="email" label="Email"  helperText="Receive updates via email" />
            <Radio value="sms"   label="SMS"    helperText="Receive updates via text message" />
            <Radio value="push"  label="Push"   helperText="Receive push notifications" />
            <Radio value="none"  label="None"   helperText="Do not receive notifications" disabled />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="Six color variants — default, secondary, success, warning, error, and info"
        >
          <RadioGroup legend="Select color" value={color} onChange={setColor} direction="horizontal">
            <Radio value="default"   label="Default"   color="default"   />
            <Radio value="secondary" label="Secondary" color="secondary" />
            <Radio value="success"   label="Success"   color="success"   />
            <Radio value="warning"   label="Warning"   color="warning"   />
            <Radio value="error"     label="Error"     color="error"     />
            <Radio value="info"      label="Info"      color="info"      />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default), and lg radio sizes"
        >
          <RadioGroup legend="Size" value={sizeDemo} onChange={setSizeDemo}>
            <Radio value="sm" label="Small"            size="sm" />
            <Radio value="md" label="Medium (default)" size="md" />
            <Radio value="lg" label="Large"            size="lg" />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: Horizontal layout ── */}
        <ComponentPreview
          title="Horizontal layout"
          description="Use orientation=horizontal for inline radio groups"
        >
          <RadioGroup legend="Calendar view" value={view} onChange={setView} direction="horizontal">
            <Radio value="day"   label="Day"   />
            <Radio value="week"  label="Week"  />
            <Radio value="month" label="Month" />
            <Radio value="year"  label="Year"  />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={HORIZONTAL_CODE} />

        {/* ── Section 5: Error state ── */}
        <ComponentPreview
          title="Error state"
          description="Group-level error with message — requires a selection"
        >
          <RadioGroup
            legend="Gender"
            value={gender}
            onChange={setGender}
            error={!gender}
            errorText="Please select a gender"
          >
            <Radio value="male"   label="Male"   required />
            <Radio value="female" label="Female" />
            <Radio value="other"  label="Other"  />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ERROR_CODE} />

        {/* ── Section 6: Card style ── */}
        <ComponentPreview
          title="Card style"
          description="Bordered card layout — ideal for plan or tier selection"
        >
          <div style={{ width: 360 }}>
            <RadioGroup legend="Choose a plan" value={plan} onChange={setPlan} display="card">
              <Radio
                value="starter"
                label="Starter"
                description="$0/month · 3 projects · Community support"
              />
              <Radio
                value="pro"
                label="Pro"
                description="$12/month · Unlimited projects · Priority support"
              />
              <Radio
                value="team"
                label="Team"
                description="$49/month · Up to 10 members · Admin controls"
              />
              <Radio
                value="enterprise"
                label="Enterprise"
                description="Custom pricing · Unlimited members · SLA"
                disabled
              />
            </RadioGroup>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 7: Button style ── */}
        <ComponentPreview
          title="Button style"
          description="Pill-button style group — great for toggles and billing cycles"
        >
          <RadioGroup legend="Billing cycle" value={billing} onChange={setBilling} display="button">
            <Radio value="monthly"   label="Monthly"   />
            <Radio value="quarterly" label="Quarterly" />
            <Radio value="yearly"    label="Yearly"    />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BUTTON_CODE} />

        {/* ── Section 8: Segmented control ── */}
        <ComponentPreview
          title="Segmented control"
          description="Compact connected button group — ideal for view switchers"
        >
          <RadioGroup legend="Calendar view" value={view} onChange={setView} display="segmented">
            <Radio value="day"   label="Day"   />
            <Radio value="week"  label="Week"  />
            <Radio value="month" label="Month" />
            <Radio value="year"  label="Year"  />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEGMENTED_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Radio props
        </p>
        <PropsTable props={RADIO_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          RadioGroup props
        </p>
        <PropsTable props={GROUP_PROPS} />

      </div>
    </div>
  );
}
