'use client';

import { Input } from 'omverse-ui';
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
    description: 'Error state — red border and error icon',
  },
  {
    name: 'errorText',
    type: 'string',
    default: 'undefined',
    description: 'Error message shown below',
  },
  {
    name: 'success',
    type: 'boolean',
    default: 'false',
    description: 'Success state — green border and success icon',
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
    name: 'passwordToggle',
    type: 'boolean',
    default: 'false',
    description: 'Adds password visibility toggle — use with type="password"',
  },
  {
    name: 'maxLength',
    type: 'number',
    default: 'undefined',
    description: 'Maximum character count',
  },
  {
    name: 'showCount',
    type: 'boolean',
    default: 'false',
    description: 'Shows character counter — requires maxLength',
  },
  {
    name: 'copyable',
    type: 'boolean',
    default: 'false',
    description: 'Shows a copy button in the trailing slot',
  },
  {
    name: 'textarea',
    type: 'boolean',
    default: 'false',
    description: 'Renders as textarea',
  },
  {
    name: 'rows',
    type: 'number',
    default: '3',
    description: 'Number of visible rows for textarea',
  },
  {
    name: 'prefix',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content shown before the input',
  },
  {
    name: 'suffix',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content shown after the input',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Input } from 'omverse-ui'

<Input variant="outlined" label="Outlined" placeholder="Type something..." />
<Input variant="filled" label="Filled" placeholder="Type something..." />
<Input variant="floating" label="Floating" placeholder="Type something..." />`;

const SIZES_CODE = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

const ALL_STATES_CODE = `<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Error" error errorText="Required field" />
<Input placeholder="Success" success />
<Input placeholder="With helper" helperText="Helper text here" />`;

const PREFIX_SUFFIX_CODE = `import { Input } from 'omverse-ui'

<Input prefix="$" placeholder="Amount" />
<Input suffix=".com" placeholder="domain" />
<Input prefix={<i className="ti ti-search" style={{ fontSize: 16 }} aria-hidden="true" />} placeholder="Search..." />`;

const PASSWORD_CODE = `<Input
  type="password"
  label="Password"
  placeholder="Enter password..."
  passwordToggle
/>`;

const MAX_LENGTH_CODE = `<Input
  label="Bio"
  placeholder="Write something..."
  maxLength={100}
  showCount
/>`;

const COPYABLE_CODE = `<Input
  label="API Key"
  value="sk-1234567890abcdef"
  copyable
  readOnly
/>`;

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

        {/* ── Section 3: All states ── */}
        <ComponentPreview
          title="All states"
          description="Default, disabled, error, success and helper text states"
        >
          <Input placeholder="Default" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Error" error errorText="Required field" />
          <Input placeholder="Success" success />
          <Input placeholder="With helper" helperText="Helper text here" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ALL_STATES_CODE} />

        {/* ── Section 4: Prefix and suffix ── */}
        <ComponentPreview
          title="Prefix and suffix"
          description="Accepts a string or any ReactNode in the prefix and suffix slots"
        >
          <Input prefix="$" placeholder="Amount" />
          <Input suffix=".com" placeholder="domain" />
          <Input prefix={<i className="ti ti-search" style={{ fontSize: 16 }} aria-hidden="true" />} placeholder="Search..." />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PREFIX_SUFFIX_CODE} />

        {/* ── Section 5: Password toggle ── */}
        <ComponentPreview
          title="Password toggle"
          description="Adds a show/hide button to reveal the password — use with type=password"
        >
          <Input
            type="password"
            label="Password"
            placeholder="Enter password..."
            passwordToggle
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PASSWORD_CODE} />

        {/* ── Section 6: Max length counter ── */}
        <ComponentPreview
          title="Max length counter"
          description="Shows a character counter below the input — requires maxLength"
        >
          <Input
            label="Bio"
            placeholder="Write something..."
            maxLength={100}
            showCount
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MAX_LENGTH_CODE} />

        {/* ── Section 7: Copyable ── */}
        <ComponentPreview
          title="Copyable"
          description="Copy button in the trailing slot — best combined with readOnly"
        >
          <Input
            label="API Key"
            value="sk-1234567890abcdef"
            copyable
            readOnly
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COPYABLE_CODE} />

        {/* ── Section 8: Textarea ── */}
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
