'use client';

import { Checkbox, CheckboxGroup } from 'omverse-ui';
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
  {
    name: 'shape',
    type: "'square' | 'circle'",
    default: "'square'",
    description: 'Checkbox shape',
  },
  {
    name: 'card',
    type: 'boolean',
    default: 'false',
    description: 'Wraps in a bordered card — use with description prop',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Description shown inside the card below the label',
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
// 'primary' is not a valid color — the sixth slot is 'info'
const COLORS_CODE = `<Checkbox label="Default" color="default" defaultChecked />
<Checkbox label="Secondary" color="secondary" defaultChecked />
<Checkbox label="Success" color="success" defaultChecked />
<Checkbox label="Warning" color="warning" defaultChecked />
<Checkbox label="Error" color="error" defaultChecked />
<Checkbox label="Info" color="info" defaultChecked />`;

const INDETERMINATE_CODE = `<Checkbox label="Select all" indeterminate />`;

const SIZES_CODE = `<Checkbox size="sm" label="Small checkbox" defaultChecked />
<Checkbox size="md" label="Medium checkbox" defaultChecked />
<Checkbox size="lg" label="Large checkbox" defaultChecked />`;

const SHAPE_CODE = `<Checkbox shape="square" label="Square checkbox" defaultChecked />
<Checkbox shape="circle" label="Circle checkbox" defaultChecked />`;

// Checkbox card style uses prop 'card', NOT 'cardStyle'
const CARD_CODE = `<Checkbox card label="Option A" description="This is option A" defaultChecked />
<Checkbox card label="Option B" description="This is option B" />
<Checkbox card label="Option C" description="This is option C" disabled />`;

// CheckboxGroup uses 'legend' prop for the group label, NOT 'label'
const GROUP_CODE = `import { Checkbox, CheckboxGroup } from 'omverse-ui'

<CheckboxGroup legend="Select your interests">
  <Checkbox value="design" label="Design" />
  <Checkbox value="development" label="Development" defaultChecked />
  <Checkbox value="marketing" label="Marketing" />
  <Checkbox value="product" label="Product" defaultChecked />
</CheckboxGroup>`;

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

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg"
        >
          <Checkbox size="sm" label="Small checkbox" defaultChecked />
          <Checkbox size="md" label="Medium checkbox" defaultChecked />
          <Checkbox size="lg" label="Large checkbox" defaultChecked />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: Shape ── */}
        <ComponentPreview
          title="Shape"
          description="Square (default, with rounded corners) or circle"
        >
          <Checkbox shape="square" label="Square checkbox" defaultChecked />
          <Checkbox shape="circle" label="Circle checkbox" defaultChecked />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SHAPE_CODE} />

        {/* ── Section 5: Indeterminate ── */}
        <ComponentPreview
          title="Indeterminate state"
          description="Shows a dash — used for select-all parent checkboxes"
        >
          <Checkbox label="Select all" indeterminate />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={INDETERMINATE_CODE} />

        {/* ── Section 6: Card style ── */}
        <ComponentPreview
          title="Card style"
          description="Wraps the checkbox in a bordered card — useful for plan selection and feature toggles"
        >
          <Checkbox card label="Option A" description="This is option A" defaultChecked />
          <Checkbox card label="Option B" description="This is option B" />
          <Checkbox card label="Option C" description="This is option C" disabled />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 7: CheckboxGroup ── */}
        {/* CheckboxGroup uses 'legend' for the group label, not 'label' */}
        <ComponentPreview
          title="CheckboxGroup"
          description="Managed group with accessible fieldset and legend"
        >
          <CheckboxGroup legend="Select your interests">
            <Checkbox value="design" label="Design" />
            <Checkbox value="development" label="Development" defaultChecked />
            <Checkbox value="marketing" label="Marketing" />
            <Checkbox value="product" label="Product" defaultChecked />
          </CheckboxGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GROUP_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={CHECKBOX_PROPS} />

      </div>
    </div>
  );
}
