'use client';

import { Icon, Input } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const INPUT_PROPS = [
  {
    name: 'variant',
    type: "'outlined' | 'filled' | 'floating'",
    default: "'outlined'",
    description: 'Visual style',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Input size',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown above input',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    description: 'Placeholder text',
  },
  {
    name: 'error',
    type: 'boolean',
    default: 'false',
    description: 'Error state',
  },
  {
    name: 'errorText',
    type: 'string',
    default: 'undefined',
    description: 'Error message shown below',
  },
  {
    name: 'helperText',
    type: 'string',
    default: 'undefined',
    description: 'Helper text shown below',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the input',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Shows clear button when value exists',
  },
  {
    name: 'textarea',
    type: 'boolean',
    default: 'false',
    description: 'Renders as textarea',
  },
  {
    name: 'prefix',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content shown before input',
  },
  {
    name: 'suffix',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content shown after input',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

// 'underline' is not a real variant — the third variant is 'floating' (animating label)
const VARIANTS_CODE = `import { Input } from 'omverse-ui'

<Input variant="outlined" label="Outlined" placeholder="Type something..." />
<Input variant="filled" label="Filled" placeholder="Type something..." />
<Input variant="floating" label="Floating" placeholder="Type something..." />`;

const SIZES_CODE = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

const STATES_CODE = `<Input label="Default" placeholder="Default state" />
<Input label="Error" placeholder="Error state" error errorText="This field is required" />
<Input label="Disabled" placeholder="Disabled" disabled />
<Input label="Clearable" placeholder="Type to clear..." clearable defaultValue="Clear me" />`;

const PREFIX_SUFFIX_CODE = `import { Icon, Input } from 'omverse-ui'

<Input prefix="$" placeholder="Amount" />
<Input suffix=".com" placeholder="domain" />
<Input prefix={<Icon name="search" size="sm" />} placeholder="Search..." />`;

const TEXTAREA_CODE = `<Input textarea rows={3} label="Message" placeholder="Write your message..." />`;

/* ─── Page ─── */

export default function InputPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Input']}
        title="Input"
        description="Text input field with support for labels, helper text, error states, clearable, password toggle, prefix and suffix."
        tags={['3 variants', '3 sizes', 'Clearable', 'Password toggle', 'Textarea', 'Error state']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="outlined (default), filled with tonal background, floating with animated label"
        >
          <Input variant="outlined" label="Outlined" placeholder="Type something..." />
          <Input variant="filled" label="Filled" placeholder="Type something..." />
          <Input variant="floating" label="Floating" placeholder="Type something..." />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm (36px), md (44px, default), lg (52px)"
        >
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 3: States ── */}
        <ComponentPreview
          title="States"
          description="Default, error, disabled, and clearable states"
        >
          <Input label="Default" placeholder="Default state" />
          <Input label="Error" placeholder="Error state" error errorText="This field is required" />
          <Input label="Disabled" placeholder="Disabled" disabled />
          {/* defaultValue keeps the input uncontrolled — clear button still works */}
          <Input label="Clearable" placeholder="Type to clear..." clearable defaultValue="Clear me" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STATES_CODE} />

        {/* ── Section 4: Prefix and suffix ── */}
        <ComponentPreview
          title="Prefix and suffix"
          description="Accepts a string or any ReactNode in the prefix and suffix slots"
        >
          <Input prefix="$" placeholder="Amount" />
          <Input suffix=".com" placeholder="domain" />
          <Input prefix={<Icon name="search" size="sm" />} placeholder="Search..." />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PREFIX_SUFFIX_CODE} />

        {/* ── Section 5: Textarea ── */}
        <ComponentPreview
          title="Textarea"
          description="Renders a resizable multiline textarea with the same styling API"
        >
          <Input textarea rows={3} label="Message" placeholder="Write your message..." />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TEXTAREA_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={INPUT_PROPS} />

      </div>
    </div>
  );
}
