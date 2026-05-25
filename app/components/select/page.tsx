'use client';

import { Select } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const SELECT_PROPS = [
  {
    name: 'options',
    type: 'SelectOption[]',
    default: '—',
    description: 'Array of options to display',
  },
  {
    name: 'value',
    type: 'string | string[]',
    default: 'undefined',
    description: 'Selected value(s)',
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
    description: 'Adds search input',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Shows clear button',
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
    description: 'Select size',
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

// Note: the multi-select prop is 'multi', not 'multiple'
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
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
              { value: 'mango', label: 'Mango' },
            ]}
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
            options={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'angular', label: 'Angular' },
            ]}
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
            options={[
              { value: 'typescript', label: 'TypeScript' },
              { value: 'react', label: 'React' },
              { value: 'tailwind', label: 'Tailwind' },
              { value: 'nextjs', label: 'Next.js' },
            ]}
            style={{ width: 280 }}
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={SELECT_PROPS} />

      </div>
    </div>
  );
}
