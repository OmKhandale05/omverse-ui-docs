'use client';

import { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const CHECKBOX_PROPS = [
  { name: 'label',          type: 'ReactNode',                                                                    default: '—',           description: 'Label text shown next to the checkbox' },
  { name: 'helperText',     type: 'string',                                                                       default: '—',           description: 'Helper text shown below the label' },
  { name: 'required',       type: 'boolean',                                                                      default: 'false',       description: 'Marks as required — adds * to label' },
  { name: 'error',          type: 'boolean',                                                                      default: 'false',       description: 'Error state — red border' },
  { name: 'errorText',      type: 'string',                                                                       default: '—',           description: 'Error message shown when error=true' },
  { name: 'indeterminate',  type: 'boolean',                                                                      default: 'false',       description: 'Shows a dash instead of checkmark' },
  { name: 'card',           type: 'boolean',                                                                      default: 'false',       description: 'Wraps the checkbox in a bordered card' },
  { name: 'description',    type: 'string',                                                                       default: '—',           description: 'Description inside the card (card=true only)' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",                                                          default: "'md'",        description: 'Size of the checkbox' },
  { name: 'shape',          type: "'square' | 'circle'",                                                         default: "'square'",    description: 'Shape of the checkbox' },
  { name: 'color',          type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",         default: "'default'",   description: 'Color when checked' },
  { name: 'disabled',       type: 'boolean',                                                                      default: 'false',       description: 'Disables the checkbox' },
  { name: 'checked',        type: 'boolean',                                                                      default: '—',           description: 'Controlled checked state' },
  { name: 'defaultChecked', type: 'boolean',                                                                      default: 'false',       description: 'Uncontrolled initial checked state' },
  { name: 'onChange',       type: 'React.ChangeEventHandler<HTMLInputElement>',                                   default: '—',           description: 'Change event callback' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const GROUP_PROPS = [
  { name: 'legend',         type: 'string',                                                                       default: '—',           description: 'Group label shown above the checkboxes' },
  { name: 'value',          type: 'string[]',                                                                     default: '—',           description: 'Controlled selected values' },
  { name: 'onChange',       type: '(value: string[]) => void',                                                    default: '—',           description: 'Callback fired when selection changes' },
  { name: 'selectAll',      type: 'boolean',                                                                      default: 'false',       description: 'Shows a select-all checkbox with auto indeterminate state' },
  { name: 'selectAllLabel', type: 'string',                                                                       default: "'Select all'", description: 'Label for the select all checkbox' },
  { name: 'color',          type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",         default: '—',           description: 'Color applied to all child checkboxes' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",                                                          default: '—',           description: 'Size applied to all child checkboxes' },
  { name: 'children',       type: 'ReactNode',                                                                    default: '—',           description: 'Checkbox components with a value prop' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const STATES_CODE = `<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`;

const COLORS_CODE = `<Checkbox label="Default (primary)" color="default"   defaultChecked />
<Checkbox label="Secondary"         color="secondary" defaultChecked />
<Checkbox label="Success"           color="success"   defaultChecked />
<Checkbox label="Warning"           color="warning"   defaultChecked />
<Checkbox label="Error"             color="error"     defaultChecked />
<Checkbox label="Info"              color="info"      defaultChecked />`;

const SIZES_CODE = `<Checkbox label="Small"            size="sm" defaultChecked />
<Checkbox label="Medium (default)" size="md" defaultChecked />
<Checkbox label="Large"            size="lg" defaultChecked />`;

const SHAPE_CODE = `<Checkbox label="Square (default)" shape="square" defaultChecked />
<Checkbox label="Circle"           shape="circle" defaultChecked />`;

const HELPER_CODE = `<Checkbox
  label="Email notifications"
  helperText="Receive product updates and announcements"
  defaultChecked
/>

{/* Controlled with error */}
const [terms, setTerms] = useState(false)

<Checkbox
  label="Accept terms and conditions"
  required
  error={!terms}
  errorText="You must accept the terms to continue"
  checked={terms}
  onChange={e => setTerms(e.target.checked)}
/>`;

const CARD_CODE = `const [plan, setPlan] = useState('pro')

<Checkbox
  card
  label="Pro plan"
  description="$12/month · Unlimited projects · Priority support"
  checked={plan === 'pro'}
  onChange={() => setPlan('pro')}
/>
<Checkbox
  card
  label="Team plan"
  description="$49/month · Up to 10 members · Admin controls"
  checked={plan === 'team'}
  onChange={() => setPlan('team')}
/>
<Checkbox
  card
  label="Enterprise"
  description="Custom pricing · Unlimited members · SLA"
  checked={plan === 'enterprise'}
  onChange={() => setPlan('enterprise')}
/>
<Checkbox
  card
  label="Unavailable plan"
  description="This option is currently disabled"
  disabled
/>`;

const GROUP_CODE = `const [permissions, setPermissions] = useState(['read', 'write'])

<CheckboxGroup
  legend="User permissions"
  selectAll
  selectAllLabel="All permissions"
  value={permissions}
  onChange={setPermissions}
>
  <Checkbox value="read"   label="Read"   helperText="View all content" />
  <Checkbox value="write"  label="Write"  helperText="Create and edit content" />
  <Checkbox value="delete" label="Delete" helperText="Remove content permanently" />
  <Checkbox value="admin"  label="Admin"  helperText="Full system access" />
</CheckboxGroup>

<p>Selected: {permissions.join(', ') || 'none'}</p>`;

/* ─── Page ─── */

export default function CheckboxPage() {
  const [permissions, setPermissions] = useState<string[]>(['read', 'write']);
  const [terms, setTerms] = useState(false);
  const [plan, setPlan] = useState('pro');

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Checkbox']}
        title="Checkbox"
        description="6 colors · 3 sizes · card style · CheckboxGroup with select all"
        tags={['States', 'Colors', 'Sizes', 'Card style', 'CheckboxGroup', 'Select all']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: States ── */}
        <ComponentPreview
          title="States"
          description="Unchecked, checked, indeterminate, disabled, and disabled checked"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STATES_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="Six color variants — default, secondary, success, warning, error, and info"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox label="Default (primary)" color="default"   defaultChecked />
            <Checkbox label="Secondary"         color="secondary" defaultChecked />
            <Checkbox label="Success"           color="success"   defaultChecked />
            <Checkbox label="Warning"           color="warning"   defaultChecked />
            <Checkbox label="Error"             color="error"     defaultChecked />
            <Checkbox label="Info"              color="info"      defaultChecked />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default), and lg checkbox sizes"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox label="Small"            size="sm" defaultChecked />
            <Checkbox label="Medium (default)" size="md" defaultChecked />
            <Checkbox label="Large"            size="lg" defaultChecked />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: Shape ── */}
        <ComponentPreview
          title="Shape"
          description="Square (rounded corners, default) or circle shape"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox label="Square (default)" shape="square" defaultChecked />
            <Checkbox label="Circle"           shape="circle" defaultChecked />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SHAPE_CODE} />

        {/* ── Section 5: With helper + error ── */}
        <ComponentPreview
          title="With helper + error"
          description="Helper text shown below the label; error state with message and required indicator"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Checkbox
              label="Email notifications"
              helperText="Receive product updates and announcements"
              defaultChecked
            />
            <Checkbox
              label="Accept terms and conditions"
              required
              error={!terms}
              errorText="You must accept the terms to continue"
              checked={terms}
              onChange={e => setTerms(e.target.checked)}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={HELPER_CODE} />

        {/* ── Section 6: Card style ── */}
        <ComponentPreview
          title="Card style"
          description="Bordered card layout — ideal for plan selection and feature toggles"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
            <Checkbox
              card
              label="Pro plan"
              description="$12/month · Unlimited projects · Priority support"
              checked={plan === 'pro'}
              onChange={() => setPlan('pro')}
            />
            <Checkbox
              card
              label="Team plan"
              description="$49/month · Up to 10 members · Admin controls"
              checked={plan === 'team'}
              onChange={() => setPlan('team')}
            />
            <Checkbox
              card
              label="Enterprise"
              description="Custom pricing · Unlimited members · SLA"
              checked={plan === 'enterprise'}
              onChange={() => setPlan('enterprise')}
            />
            <Checkbox
              card
              label="Unavailable plan"
              description="This option is currently disabled"
              disabled
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 7: CheckboxGroup with select all ── */}
        <ComponentPreview
          title="CheckboxGroup — select all"
          description="Managed group with auto indeterminate state on the select-all parent"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CheckboxGroup
              legend="User permissions"
              selectAll
              selectAllLabel="All permissions"
              value={permissions}
              onChange={setPermissions}
            >
              <Checkbox value="read"   label="Read"   helperText="View all content" />
              <Checkbox value="write"  label="Write"  helperText="Create and edit content" />
              <Checkbox value="delete" label="Delete" helperText="Remove content permanently" />
              <Checkbox value="admin"  label="Admin"  helperText="Full system access" />
            </CheckboxGroup>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Selected: {permissions.join(', ') || 'none'}
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GROUP_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Checkbox props
        </p>
        <PropsTable props={CHECKBOX_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          CheckboxGroup props
        </p>
        <PropsTable props={GROUP_PROPS} />

      </div>
    </div>
  );
}
