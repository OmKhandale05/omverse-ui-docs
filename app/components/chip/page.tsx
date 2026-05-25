'use client';

import { Chip, ChipGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const CHIP_PROPS = [
  {
    name: 'variant',
    type: "'outlined' | 'filled' | 'tonal' | 'elevated'",
    default: "'outlined'",
    description: 'Visual style of the chip',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
    default: "'default'",
    description: 'Color applied when the chip is selected',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Chip size',
  },
  {
    name: 'selected',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled selected state — omit for uncontrolled',
  },
  {
    name: 'onSelectedChange',
    type: '(selected: boolean) => void',
    default: 'undefined',
    description: 'Callback fired when selected state changes',
  },
  {
    name: 'leadingIcon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon displayed before the label',
  },
  {
    name: 'showCheckOnSelect',
    type: 'boolean',
    default: 'true',
    description: 'Shows a checkmark when selected instead of leadingIcon',
  },
  {
    name: 'colorDot',
    type: 'string',
    default: 'undefined',
    description: 'Shows a colored dot before the label — useful for status chips',
  },
  {
    name: 'badgeCount',
    type: 'number',
    default: 'undefined',
    description: 'Badge count shown after the label',
  },
  {
    name: 'removable',
    type: 'boolean',
    default: 'false',
    description: 'Shows a remove (×) button after the label',
  },
  {
    name: 'onRemove',
    type: '() => void',
    default: 'undefined',
    description: 'Callback fired when the remove button is clicked',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a loading spinner — disables interaction',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the chip',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Chip } from 'omverse-ui'

<Chip variant="outlined">Outlined</Chip>
<Chip variant="filled">Filled</Chip>
<Chip variant="tonal">Tonal</Chip>
<Chip variant="elevated">Elevated</Chip>`;

const COLORS_CODE = `<Chip color="default"   selected>Default</Chip>
<Chip color="secondary" selected>Secondary</Chip>
<Chip color="success"   selected>Success</Chip>
<Chip color="warning"   selected>Warning</Chip>
<Chip color="error"     selected>Error</Chip>
<Chip color="info"      selected>Info</Chip>`;

const SIZES_CODE = `<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`;

const ICON_CODE = `<Chip leadingIcon="star">Starred</Chip>
<Chip leadingIcon="heart">Liked</Chip>
<Chip leadingIcon="share">Shared</Chip>
<Chip leadingIcon="bookmark">Saved</Chip>`;

const BADGE_CODE = `<Chip badgeCount={12} leadingIcon="star">Starred</Chip>
<Chip badgeCount={4}>Unread</Chip>
<Chip badgeCount={99}>Notifications</Chip>`;

const REMOVABLE_CODE = `<Chip removable>Design</Chip>
<Chip removable>Development</Chip>
<Chip removable>Marketing</Chip>`;

const SINGLE_CODE = `import { Chip, ChipGroup } from 'omverse-ui'

<ChipGroup mode="single">
  <Chip value="all">All</Chip>
  <Chip value="design">Design</Chip>
  <Chip value="development">Development</Chip>
  <Chip value="marketing">Marketing</Chip>
</ChipGroup>`;

const MULTI_CODE = `<ChipGroup mode="multi">
  <Chip value="react">React</Chip>
  <Chip value="typescript">TypeScript</Chip>
  <Chip value="tailwind">Tailwind</Chip>
  <Chip value="nextjs">Next.js</Chip>
  <Chip value="prisma">Prisma</Chip>
</ChipGroup>`;

/* ─── Page ─── */

export default function ChipPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Chip']}
        title="Chip"
        description="Compact interactive elements for filters, tags and selections. 4 variants, 6 colors, single and multi-select group modes."
        tags={['4 variants', '6 colors', 'Removable', 'Badge count', 'Single & multi select']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="outlined (default), filled, tonal and elevated"
        >
          <Chip variant="outlined">Outlined</Chip>
          <Chip variant="filled">Filled</Chip>
          <Chip variant="tonal">Tonal</Chip>
          <Chip variant="elevated">Elevated</Chip>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 colors applied to the selected state"
        >
          <Chip color="default"   selected>Default</Chip>
          <Chip color="secondary" selected>Secondary</Chip>
          <Chip color="success"   selected>Success</Chip>
          <Chip color="warning"   selected>Warning</Chip>
          <Chip color="error"     selected>Error</Chip>
          <Chip color="info"      selected>Info</Chip>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg"
        >
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: With leading icon ── */}
        <ComponentPreview
          title="With leading icon"
          description="leadingIcon shows an icon before the label — replaced by a checkmark when selected"
        >
          <Chip leadingIcon="star">Starred</Chip>
          <Chip leadingIcon="heart">Liked</Chip>
          <Chip leadingIcon="share">Shared</Chip>
          <Chip leadingIcon="bookmark">Saved</Chip>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICON_CODE} />

        {/* ── Section 5: Badge count ── */}
        <ComponentPreview
          title="Badge count"
          description="badgeCount shows a numeric badge after the label — useful for unread counts and grouped filters"
        >
          <Chip badgeCount={12} leadingIcon="star">Starred</Chip>
          <Chip badgeCount={4}>Unread</Chip>
          <Chip badgeCount={99}>Notifications</Chip>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BADGE_CODE} />

        {/* ── Section 6: Removable ── */}
        <ComponentPreview
          title="Removable"
          description="Shows a × button after the label — fires onRemove when clicked"
        >
          <Chip removable>Design</Chip>
          <Chip removable>Development</Chip>
          <Chip removable>Marketing</Chip>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={REMOVABLE_CODE} />

        {/* ── Section 7: Single select group ── */}
        <ComponentPreview
          title="Single select group"
          description="ChipGroup with mode='single' — only one chip selected at a time, like a radio group"
        >
          <ChipGroup mode="single">
            <Chip value="all">All</Chip>
            <Chip value="design">Design</Chip>
            <Chip value="development">Development</Chip>
            <Chip value="marketing">Marketing</Chip>
          </ChipGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SINGLE_CODE} />

        {/* ── Section 8: Multi select group ── */}
        <ComponentPreview
          title="Multi select group"
          description="ChipGroup with mode='multi' — multiple chips can be selected simultaneously"
        >
          <ChipGroup mode="multi">
            <Chip value="react">React</Chip>
            <Chip value="typescript">TypeScript</Chip>
            <Chip value="tailwind">Tailwind</Chip>
            <Chip value="nextjs">Next.js</Chip>
            <Chip value="prisma">Prisma</Chip>
          </ChipGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={CHIP_PROPS} />

      </div>
    </div>
  );
}
