'use client';

import { Select } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Shared option lists ─── */

const FRUIT_OPTIONS = [
  { value: 'apple',  label: 'Apple'  },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'mango',  label: 'Mango'  },
];

const FRAMEWORK_OPTIONS = [
  { value: 'react',   label: 'React'   },
  { value: 'vue',     label: 'Vue'     },
  { value: 'svelte',  label: 'Svelte'  },
  { value: 'angular', label: 'Angular' },
];

const TAG_OPTIONS = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react',      label: 'React'      },
  { value: 'tailwind',   label: 'Tailwind'   },
  { value: 'nextjs',     label: 'Next.js'    },
];

const SIMPLE_OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

/* ─── Props table data ─── */

const SELECT_PROPS = [
  {
    name: 'options',
    type: 'SelectOption[]',
    default: '—',
    description: 'Flat list of options',
  },
  {
    name: 'optionGroups',
    type: 'SelectOptionGroup[]',
    default: 'undefined',
    description: 'Grouped options — takes priority over options',
  },
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    description: 'Controlled value (single select)',
  },
  {
    name: 'values',
    type: 'string[]',
    default: 'undefined',
    description: 'Controlled values (multi select)',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    description: 'Placeholder text',
  },
  {
    name: 'multi',
    type: 'boolean',
    default: 'false',
    description: 'Enables multi-select',
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'false',
    description: 'Adds search input inside the dropdown',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Shows a clear button when a value is selected',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the select',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Select trigger size',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Select } from 'omverse-ui'

<Select
  placeholder="Select a fruit..."
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'mango', label: 'Mango' },
  ]}
  style={{ width: 240 }}
/>`;

const SEARCHABLE_CODE = `<Select
  placeholder="Search frameworks..."
  searchable
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'angular', label: 'Angular' },
  ]}
  style={{ width: 240 }}
/>`;

const MULTI_CODE = `<Select
  placeholder="Select tags..."
  multi
  options={[
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'nextjs', label: 'Next.js' },
  ]}
  style={{ width: 280 }}
/>`;

const SIZES_CODE = `<Select size="sm" placeholder="Small" options={options} style={{ width: 200 }} />
<Select size="md" placeholder="Medium" options={options} style={{ width: 200 }} />
<Select size="lg" placeholder="Large" options={options} style={{ width: 200 }} />`;

const CLEARABLE_CODE = `<Select
  clearable
  placeholder="Select and clear..."
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
  style={{ width: 240 }}
/>`;

const DISABLED_CODE = `<Select
  disabled
  placeholder="Disabled select"
  options={[{ value: 'a', label: 'Option A' }]}
  style={{ width: 240 }}
/>`;

// optionGroups uses { label, options } — NOT { group, options }
const GROUPS_CODE = `<Select
  placeholder="Select framework..."
  optionGroups={[
    {
      label: 'Frontend',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
      ],
    },
    {
      label: 'Backend',
      options: [
        { value: 'node', label: 'Node.js' },
        { value: 'django', label: 'Django' },
      ],
    },
  ]}
  style={{ width: 240 }}
/>`;

/* ─── Page ─── */

export default function SelectPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Select']}
        title="Select"
        description="Dropdown selection with single and multi-select, search, option groups and avatar options."
        tags={['Single select', 'Multi select', 'Searchable', 'Option groups', '3 sizes']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic select"
          description="Single selection with a flat list of options"
        >
          <Select
            placeholder="Select a fruit..."
            options={FRUIT_OPTIONS}
            style={{ width: 240 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Searchable ── */}
        <ComponentPreview
          title="Searchable"
          description="Filters options as the user types — useful for long lists"
        >
          <Select
            placeholder="Search frameworks..."
            searchable
            options={FRAMEWORK_OPTIONS}
            style={{ width: 240 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEARCHABLE_CODE} />

        {/* ── Section 3: Multi select ── */}
        <ComponentPreview
          title="Multi select"
          description="Allows selecting multiple options displayed as chips"
        >
          <Select
            placeholder="Select tags..."
            multi
            options={TAG_OPTIONS}
            style={{ width: 280 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Section 4: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg trigger heights"
        >
          <Select size="sm" placeholder="Small select" options={SIMPLE_OPTIONS} style={{ width: 200 }} />
          <Select size="md" placeholder="Medium select" options={SIMPLE_OPTIONS} style={{ width: 200 }} />
          <Select size="lg" placeholder="Large select" options={SIMPLE_OPTIONS} style={{ width: 200 }} />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 5: Clearable ── */}
        <ComponentPreview
          title="Clearable"
          description="Shows a clear ✕ button when a value is selected"
        >
          <Select
            clearable
            placeholder="Select and clear..."
            options={FRAMEWORK_OPTIONS}
            style={{ width: 240 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CLEARABLE_CODE} />

        {/* ── Section 6: Disabled ── */}
        <ComponentPreview
          title="Disabled"
          description="Prevents interaction — use when the field is conditionally unavailable"
        >
          <Select
            disabled
            placeholder="Disabled select"
            options={SIMPLE_OPTIONS}
            style={{ width: 240 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DISABLED_CODE} />

        {/* ── Section 7: Option groups ── */}
        <ComponentPreview
          title="Option groups"
          description="Groups options under labeled sections using the optionGroups prop"
        >
          <Select
            placeholder="Select framework..."
            optionGroups={[
              {
                label: 'Frontend',
                options: [
                  { value: 'react',  label: 'React'  },
                  { value: 'vue',    label: 'Vue'    },
                  { value: 'svelte', label: 'Svelte' },
                ],
              },
              {
                label: 'Backend',
                options: [
                  { value: 'node',   label: 'Node.js' },
                  { value: 'django', label: 'Django'  },
                ],
              },
            ]}
            style={{ width: 240 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GROUPS_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={SELECT_PROPS} />

      </div>
    </div>
  );
}
