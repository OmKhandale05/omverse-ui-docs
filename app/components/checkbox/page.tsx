'use client';

import { Checkbox } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const CHECKBOX_PROPS = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label text',
  },
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'Controlled checked state',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: 'Initial checked state (uncontrolled)',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Indeterminate state — shows dash instead of checkmark',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the checkbox',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
    default: "'default'",
    description: 'Color scheme when checked',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Checkbox size',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Checkbox } from 'omverse-ui'

<Checkbox label="Accept terms and conditions" />
<Checkbox label="Subscribe to newsletter" defaultChecked />
<Checkbox label="Disabled" disabled />`;

// Checkbox color values: default | secondary | success | warning | error | info
// 'primary' is not a valid color — use 'info' for the sixth slot
const COLORS_CODE = `<Checkbox label="Default" color="default" defaultChecked />
<Checkbox label="Secondary" color="secondary" defaultChecked />
<Checkbox label="Success" color="success" defaultChecked />
<Checkbox label="Warning" color="warning" defaultChecked />
<Checkbox label="Error" color="error" defaultChecked />
<Checkbox label="Info" color="info" defaultChecked />`;

const INDETERMINATE_CODE = `<Checkbox label="Select all" indeterminate />`;

/* ─── Page ─── */

export default function CheckboxPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Checkbox']}
        title="Checkbox"
        description="A control for selecting one or multiple options. Supports colors, sizes, indeterminate state and card style."
        tags={['6 colors', '3 sizes', 'Indeterminate', 'Card style', 'Group']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="Default, pre-checked and disabled states"
        >
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
          <Checkbox label="Disabled" disabled />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 colors applied to the checked state"
        >
          <Checkbox label="Default" color="default" defaultChecked />
          <Checkbox label="Secondary" color="secondary" defaultChecked />
          <Checkbox label="Success" color="success" defaultChecked />
          <Checkbox label="Warning" color="warning" defaultChecked />
          <Checkbox label="Error" color="error" defaultChecked />
          <Checkbox label="Info" color="info" defaultChecked />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Indeterminate ── */}
        <ComponentPreview
          title="Indeterminate state"
          description="Shows a dash — used for select-all parent checkboxes"
        >
          <Checkbox label="Select all" indeterminate />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={INDETERMINATE_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={CHECKBOX_PROPS} />

      </div>
    </div>
  );
}
