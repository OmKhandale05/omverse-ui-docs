'use client';

import { useState } from 'react';
import { Select } from 'omverse-ui';

/* ─── Local type definitions (not exported from omverse-ui) ─── */
interface SelectOption {
  value: string;
  label: string;
  description?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  icon?: string;
  disabled?: boolean;
}
interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Option data (copied exactly from stories) ─── */

const departmentOptions: SelectOption[] = [
  { value: 'design',      label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing',   label: 'Marketing' },
  { value: 'product',     label: 'Product' },
  { value: 'sales',       label: 'Sales' },
  { value: 'archived',    label: 'Archived', disabled: true },
];

const countryGroups: SelectOptionGroup[] = [
  {
    label: 'Asia',
    options: [
      { value: 'in', label: '🇮🇳 India' },
      { value: 'jp', label: '🇯🇵 Japan' },
      { value: 'sg', label: '🇸🇬 Singapore' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'gb', label: '🇬🇧 United Kingdom' },
      { value: 'de', label: '🇩🇪 Germany' },
      { value: 'fr', label: '🇫🇷 France' },
    ],
  },
  {
    label: 'Americas',
    options: [
      { value: 'us', label: '🇺🇸 United States' },
      { value: 'ca', label: '🇨🇦 Canada' },
      { value: 'br', label: '🇧🇷 Brazil' },
    ],
  },
];

const teamOptions: SelectOption[] = [
  { value: 'john',  label: 'John Doe',   description: 'Designer',   avatarSrc: 'https://i.pravatar.cc/150?img=1', avatarAlt: 'John'  },
  { value: 'jane',  label: 'Jane Smith', description: 'Engineer',   avatarSrc: 'https://i.pravatar.cc/150?img=5', avatarAlt: 'Jane'  },
  { value: 'bob',   label: 'Bob Lee',    description: 'Product',    avatarSrc: 'https://i.pravatar.cc/150?img=3', avatarAlt: 'Bob'   },
  { value: 'alice', label: 'Alice Wang', description: 'Marketing',  avatarSrc: 'https://i.pravatar.cc/150?img=9', avatarAlt: 'Alice' },
];

const tagOptions: SelectOption[] = [
  { value: 'react',    label: 'React'      },
  { value: 'ts',       label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind'   },
  { value: 'vue',      label: 'Vue'        },
  { value: 'angular',  label: 'Angular'    },
  { value: 'svelte',   label: 'Svelte'     },
];

/* ─── Props table ─── */

const SELECT_PROPS = [
  { name: 'label',          type: 'string',                 default: '—',       description: 'Label shown above the select' },
  { name: 'placeholder',    type: 'string',                 default: "'Select...'", description: 'Placeholder when no value selected' },
  { name: 'helperText',     type: 'string',                 default: '—',       description: 'Helper text shown below' },
  { name: 'options',        type: 'SelectOption[]',         default: '[]',      description: 'Flat list of options' },
  { name: 'optionGroups',   type: 'SelectOptionGroup[]',    default: '—',       description: 'Grouped options — takes priority over options' },
  { name: 'value',          type: 'string',                 default: '—',       description: 'Controlled value (single select)' },
  { name: 'values',         type: 'string[]',               default: '[]',      description: 'Controlled values (multi select)' },
  { name: 'onChange',       type: '(value: string) => void',        default: '—', description: 'Callback for single select' },
  { name: 'onChangeMulti',  type: '(values: string[]) => void',     default: '—', description: 'Callback for multi select' },
  { name: 'multi',          type: 'boolean',                default: 'false',   description: 'Enables multi-select mode' },
  { name: 'searchable',     type: 'boolean',                default: 'false',   description: 'Shows a search input inside the dropdown' },
  { name: 'clearable',      type: 'boolean',                default: 'false',   description: 'Shows a clear button when a value is selected' },
  { name: 'required',       type: 'boolean',                default: 'false',   description: 'Marks the field as required' },
  { name: 'error',          type: 'boolean',                default: 'false',   description: 'Error state' },
  { name: 'errorText',      type: 'string',                 default: '—',       description: 'Error message shown below' },
  { name: 'disabled',       type: 'boolean',                default: 'false',   description: 'Disables the select' },
  { name: 'size',           type: "'sm' | 'md' | 'lg'",     default: "'md'",    description: 'Trigger height' },
  { name: 'maxDisplay',     type: 'number',                 default: '3',       description: 'Max chips shown in multi mode before +N more' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { useState } from 'react'
import { Select, type SelectOption } from 'omverse-ui'

const departmentOptions: SelectOption[] = [
  { value: 'design',      label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing',   label: 'Marketing' },
  { value: 'product',     label: 'Product' },
  { value: 'sales',       label: 'Sales' },
  { value: 'archived',    label: 'Archived', disabled: true },
]

const [dept, setDept] = useState('')

{/* Clearable with helper text */}
<Select
  label="Department"
  placeholder="Select department..."
  options={departmentOptions}
  value={dept}
  onChange={setDept}
  clearable
  helperText="Choose your department"
/>

{/* Required with error state */}
<Select
  label="Required field"
  placeholder="Select department..."
  options={departmentOptions}
  value={dept}
  onChange={setDept}
  required
  error={!dept}
  errorText="Please select a department"
/>

{/* Disabled */}
<Select
  label="Disabled"
  placeholder="Cannot select..."
  options={departmentOptions}
  disabled
/>`;

const SEARCHABLE_CODE = `<Select
  label="Department"
  placeholder="Search departments..."
  options={departmentOptions}
  value={dept}
  onChange={setDept}
  searchable
  clearable
/>`;

const GROUPS_CODE = `import { type SelectOptionGroup } from 'omverse-ui'

const countryGroups: SelectOptionGroup[] = [
  {
    label: 'Asia',
    options: [
      { value: 'in', label: '🇮🇳 India' },
      { value: 'jp', label: '🇯🇵 Japan' },
      { value: 'sg', label: '🇸🇬 Singapore' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'gb', label: '🇬🇧 United Kingdom' },
      { value: 'de', label: '🇩🇪 Germany' },
      { value: 'fr', label: '🇫🇷 France' },
    ],
  },
  {
    label: 'Americas',
    options: [
      { value: 'us', label: '🇺🇸 United States' },
      { value: 'ca', label: '🇨🇦 Canada' },
      { value: 'br', label: '🇧🇷 Brazil' },
    ],
  },
]

<Select
  label="Country"
  placeholder="Select country..."
  optionGroups={countryGroups}
  value={country}
  onChange={setCountry}
  searchable
  clearable
/>`;

const AVATAR_CODE = `const teamOptions: SelectOption[] = [
  { value: 'john',  label: 'John Doe',   description: 'Designer',  avatarSrc: 'https://i.pravatar.cc/150?img=1' },
  { value: 'jane',  label: 'Jane Smith', description: 'Engineer',  avatarSrc: 'https://i.pravatar.cc/150?img=5' },
  { value: 'bob',   label: 'Bob Lee',    description: 'Product',   avatarSrc: 'https://i.pravatar.cc/150?img=3' },
  { value: 'alice', label: 'Alice Wang', description: 'Marketing', avatarSrc: 'https://i.pravatar.cc/150?img=9' },
]

<Select
  label="Assign to"
  placeholder="Select team member..."
  options={teamOptions}
  value={assignee}
  onChange={setAssignee}
  searchable
  clearable
/>`;

const MULTI_CODE = `const [tags, setTags] = useState(['react', 'ts'])

<Select
  label="Technologies"
  placeholder="Select technologies..."
  options={tagOptions}
  multi
  values={tags}
  onChangeMulti={setTags}
  clearable
  helperText={\`\${tags.length} selected\`}
/>`;

const SIZES_CODE = `<Select label="Small"          size="sm" placeholder="Select..." options={options} value={size} onChange={setSize} />
<Select label="Medium (default)" size="md" placeholder="Select..." options={options} value={size} onChange={setSize} />
<Select label="Large"          size="lg" placeholder="Select..." options={options} value={size} onChange={setSize} />`;

/* ─── Page ─── */

export default function SelectPage() {
  const [dept,     setDept]     = useState('');
  const [country,  setCountry]  = useState('');
  const [assignee, setAssignee] = useState('');
  const [tags,     setTags]     = useState<string[]>(['react', 'ts']);
  const [size,     setSize]     = useState('');

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Select']}
        title="Select"
        description="Single · multi · searchable · grouped · avatar options · 3 sizes"
        tags={['Single select', 'Multi select', 'Searchable', 'Option groups', 'Avatar options', '3 sizes']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="Single selection — clearable, required with error state, and disabled"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
            <Select
              label="Department"
              placeholder="Select department..."
              options={departmentOptions}
              value={dept}
              onChange={setDept}
              clearable
              helperText="Choose your department"
            />
            <Select
              label="Required field"
              placeholder="Select department..."
              options={departmentOptions}
              value={dept}
              onChange={setDept}
              required
              error={!dept}
              errorText="Please select a department"
            />
            <Select
              label="Disabled"
              placeholder="Cannot select..."
              options={departmentOptions}
              disabled
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Searchable ── */}
        <ComponentPreview
          title="Searchable"
          description="Filters options as the user types — useful for long lists"
        >
          <div style={{ width: 320 }}>
            <Select
              label="Department"
              placeholder="Search departments..."
              options={departmentOptions}
              value={dept}
              onChange={setDept}
              searchable
              clearable
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEARCHABLE_CODE} />

        {/* ── Section 3: Option groups ── */}
        <ComponentPreview
          title="Option groups"
          description="Groups options under labeled sections — pass optionGroups instead of options"
        >
          <div style={{ width: 320 }}>
            <Select
              label="Country"
              placeholder="Select country..."
              optionGroups={countryGroups}
              value={country}
              onChange={setCountry}
              searchable
              clearable
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GROUPS_CODE} />

        {/* ── Section 4: Avatar options ── */}
        <ComponentPreview
          title="Avatar options"
          description="Options with avatarSrc and description render a profile image and subtitle"
        >
          <div style={{ width: 320 }}>
            <Select
              label="Assign to"
              placeholder="Select team member..."
              options={teamOptions}
              value={assignee}
              onChange={setAssignee}
              searchable
              clearable
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={AVATAR_CODE} />

        {/* ── Section 5: Multi select ── */}
        <ComponentPreview
          title="Multi select"
          description="Allows selecting multiple options — selected items are shown as removable chips"
        >
          <div style={{ width: 320 }}>
            <Select
              label="Technologies"
              placeholder="Select technologies..."
              options={tagOptions}
              multi
              values={tags}
              onChangeMulti={setTags}
              clearable
              helperText={`${tags.length} selected`}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Section 6: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg trigger heights"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
            <Select
              label="Small"
              placeholder="Select..."
              options={departmentOptions}
              value={size}
              onChange={setSize}
              size="sm"
            />
            <Select
              label="Medium (default)"
              placeholder="Select..."
              options={departmentOptions}
              value={size}
              onChange={setSize}
              size="md"
            />
            <Select
              label="Large"
              placeholder="Select..."
              options={departmentOptions}
              value={size}
              onChange={setSize}
              size="lg"
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={SELECT_PROPS} />

      </div>
    </div>
  );
}
