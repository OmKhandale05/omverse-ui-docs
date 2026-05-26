'use client';

import { useState } from 'react';
import { Chip, ChipGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const CHIP_PROPS = [
  { name: 'children',      type: 'ReactNode',                                                                  default: '—',         description: 'Text content of the chip' },
  { name: 'variant',       type: "'outlined' | 'filled' | 'tonal' | 'elevated'",                              default: "'outlined'", description: 'Visual style of the chip' },
  { name: 'color',         type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",       default: "'default'", description: 'Color of the chip' },
  { name: 'size',          type: "'sm' | 'md' | 'lg'",                                                        default: "'md'",      description: 'Size of the chip' },
  { name: 'selected',      type: 'boolean',                                                                    default: 'false',     description: 'Selected / active state' },
  { name: 'leadingIcon',   type: 'IconName',                                                                   default: '—',         description: 'Icon name shown before the label (from omverse-ui iconMap)' },
  { name: 'removable',     type: 'boolean',                                                                    default: 'false',     description: 'Shows a remove (×) button' },
  { name: 'onRemove',      type: '() => void',                                                                 default: '—',         description: 'Callback when the remove button is clicked' },
  { name: 'avatarSrc',     type: 'string',                                                                     default: '—',         description: 'Avatar image URL shown before the label' },
  { name: 'avatarAlt',     type: 'string',                                                                     default: '—',         description: 'Alt text for the avatar image' },
  { name: 'colorDot',      type: 'string',                                                                     default: '—',         description: 'CSS color for a colored dot before the label' },
  { name: 'badgeCount',    type: 'number',                                                                     default: '—',         description: 'Badge count shown after the label' },
  { name: 'loading',       type: 'boolean',                                                                    default: 'false',     description: 'Replaces content with a spinner' },
  { name: 'disabled',      type: 'boolean',                                                                    default: 'false',     description: 'Disables the chip' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const GROUP_PROPS = [
  { name: 'value',      type: 'string[]',                                                                      default: '—',         description: 'Controlled selected value(s)' },
  { name: 'onChange',   type: '(value: string[]) => void',                                                     default: '—',         description: 'Callback when selection changes' },
  { name: 'mode',       type: "'single' | 'multi'",                                                            default: "'multi'",   description: 'Single or multi-select mode' },
  { name: 'max',        type: 'number',                                                                        default: '—',         description: 'Max chips shown before +N overflow' },
  { name: 'size',       type: "'sm' | 'md' | 'lg'",                                                           default: '—',         description: 'Size applied to all chips' },
  { name: 'variant',    type: "'outlined' | 'filled' | 'tonal' | 'elevated'",                                 default: '—',         description: 'Variant applied to all chips' },
  { name: 'children',  type: 'ReactNode',                                                                      default: '—',         description: 'Chip components with a value prop' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `<Chip variant="outlined">Outlined (default)</Chip>
<Chip variant="filled">Filled</Chip>
<Chip variant="tonal">Tonal</Chip>
<Chip variant="elevated">Elevated</Chip>`;

const COLORS_CODE = `{/* Outlined row */}
<Chip color="default"   variant="outlined" selected>Default</Chip>
<Chip color="secondary" variant="outlined" selected>Secondary</Chip>
<Chip color="success"   variant="outlined" selected>Success</Chip>
<Chip color="warning"   variant="outlined" selected>Warning</Chip>
<Chip color="error"     variant="outlined" selected>Error</Chip>
<Chip color="info"      variant="outlined" selected>Info</Chip>

{/* Filled row */}
<Chip color="default"   variant="filled" selected>Default</Chip>
<Chip color="secondary" variant="filled" selected>Secondary</Chip>
<Chip color="success"   variant="filled" selected>Success</Chip>
<Chip color="warning"   variant="filled" selected>Warning</Chip>
<Chip color="error"     variant="filled" selected>Error</Chip>
<Chip color="info"      variant="filled" selected>Info</Chip>`;

const SINGLE_CODE = `const [filter, setFilter] = useState<string[]>(['all'])

<ChipGroup mode="single" value={filter} onChange={setFilter} variant="filled">
  <Chip value="all">All</Chip>
  <Chip value="active">Active</Chip>
  <Chip value="pending">Pending</Chip>
  <Chip value="archived">Archived</Chip>
</ChipGroup>`;

const MULTI_CODE = `const [tags, setTags] = useState<string[]>(['react', 'ts'])

<ChipGroup mode="multi" value={tags} onChange={setTags}>
  <Chip value="react">React</Chip>
  <Chip value="ts">TypeScript</Chip>
  <Chip value="tailwind">Tailwind</Chip>
  <Chip value="vue">Vue</Chip>
  <Chip value="angular">Angular</Chip>
  <Chip value="svelte">Svelte</Chip>
</ChipGroup>`;

const OVERFLOW_CODE = `<ChipGroup mode="multi" value={tags} onChange={setTags} max={3}>
  <Chip value="react">React</Chip>
  <Chip value="ts">TypeScript</Chip>
  <Chip value="tailwind">Tailwind</Chip>
  <Chip value="vue">Vue</Chip>
  <Chip value="angular">Angular</Chip>
</ChipGroup>`;

const ICONS_CODE = `<Chip leadingIcon="star">Starred</Chip>
<Chip leadingIcon="settings">Settings</Chip>
<Chip leadingIcon="bell"  color="warning" variant="tonal">Alerts</Chip>
<Chip leadingIcon="check" color="success" variant="tonal">Done</Chip>`;

const BADGE_CODE = `<Chip badgeCount={4}>Inbox</Chip>
<Chip badgeCount={12} color="error"   variant="tonal">Unread</Chip>
<Chip badgeCount={3}  color="info"    variant="filled">Mentions</Chip>`;

const LOADING_CODE = `<Chip loading>Processing...</Chip>
<Chip loading color="secondary" variant="tonal">Uploading...</Chip>`;

const REMOVABLE_CODE = `const [emails, setEmails] = useState(['john@example.com', 'alice@example.com', 'bob@example.com'])

{emails.map(email => (
  <Chip
    key={email}
    removable
    onRemove={() => setEmails(prev => prev.filter(e => e !== email))}
    variant="tonal"
  >
    {email}
  </Chip>
))}`;

const AVATAR_CODE = `<Chip avatarSrc="https://i.pravatar.cc/150?img=1" avatarAlt="John">John Doe</Chip>
<Chip avatarSrc="https://i.pravatar.cc/150?img=5" avatarAlt="Jane">Jane Smith</Chip>
<Chip avatarSrc="https://i.pravatar.cc/150?img=3" avatarAlt="Bob">Bob Lee</Chip>`;

const COLOR_DOT_CODE = `<Chip colorDot="#10B981">Design</Chip>
<Chip colorDot="#3B82F6">Engineering</Chip>
<Chip colorDot="#F59E0B">Marketing</Chip>
<Chip colorDot="#EF4444">On hold</Chip>`;

const SIZES_CODE = `<Chip size="sm" variant="filled">Small</Chip>
<Chip size="md" variant="filled">Medium</Chip>
<Chip size="lg" variant="filled">Large</Chip>`;

/* ─── Page ─── */

export default function ChipPage() {
  const [tags,   setTags]   = useState<string[]>(['react', 'ts']);
  const [filter, setFilter] = useState<string[]>(['all']);
  const [emails, setEmails] = useState(['john@example.com', 'alice@example.com', 'bob@example.com']);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Data Display', 'Chip']}
        title="Chip"
        description="4 variants · 6 colors · 3 sizes · ChipGroup single/multi · icons · avatar · badge · removable"
        tags={['Variants', 'Colors', 'Single select', 'Multi select', 'Overflow', 'Icons', 'Badge', 'Loading', 'Removable', 'Avatar', 'Color dot', 'Sizes']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="outlined, filled, tonal, and elevated chip styles"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip variant="outlined">Outlined (default)</Chip>
            <Chip variant="filled">Filled</Chip>
            <Chip variant="tonal">Tonal</Chip>
            <Chip variant="elevated">Elevated</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Colors selected state ── */}
        <ComponentPreview
          title="Colors — selected state"
          description="All six color variants shown in outlined and filled styles"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Chip color="default"   variant="outlined" selected>Default</Chip>
              <Chip color="secondary" variant="outlined" selected>Secondary</Chip>
              <Chip color="success"   variant="outlined" selected>Success</Chip>
              <Chip color="warning"   variant="outlined" selected>Warning</Chip>
              <Chip color="error"     variant="outlined" selected>Error</Chip>
              <Chip color="info"      variant="outlined" selected>Info</Chip>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Chip color="default"   variant="filled" selected>Default</Chip>
              <Chip color="secondary" variant="filled" selected>Secondary</Chip>
              <Chip color="success"   variant="filled" selected>Success</Chip>
              <Chip color="warning"   variant="filled" selected>Warning</Chip>
              <Chip color="error"     variant="filled" selected>Error</Chip>
              <Chip color="info"      variant="filled" selected>Info</Chip>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: ChipGroup single select ── */}
        <ComponentPreview
          title="ChipGroup — single select"
          description="mode=single allows only one chip to be active at a time"
        >
          <ChipGroup
            mode="single"
            value={filter}
            onChange={setFilter}
            variant="filled"
          >
            <Chip value="all">All</Chip>
            <Chip value="active">Active</Chip>
            <Chip value="pending">Pending</Chip>
            <Chip value="archived">Archived</Chip>
          </ChipGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SINGLE_CODE} />

        {/* ── Section 4: ChipGroup multi select ── */}
        <ComponentPreview
          title="ChipGroup — multi select"
          description="mode=multi allows any number of chips to be selected simultaneously"
        >
          <ChipGroup
            mode="multi"
            value={tags}
            onChange={setTags}
          >
            <Chip value="react">React</Chip>
            <Chip value="ts">TypeScript</Chip>
            <Chip value="tailwind">Tailwind</Chip>
            <Chip value="vue">Vue</Chip>
            <Chip value="angular">Angular</Chip>
            <Chip value="svelte">Svelte</Chip>
          </ChipGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_CODE} />

        {/* ── Section 5: Overflow ── */}
        <ComponentPreview
          title="Overflow"
          description="max prop limits visible chips and adds a +N more indicator"
        >
          <ChipGroup
            mode="multi"
            value={tags}
            onChange={setTags}
            max={3}
          >
            <Chip value="react">React</Chip>
            <Chip value="ts">TypeScript</Chip>
            <Chip value="tailwind">Tailwind</Chip>
            <Chip value="vue">Vue</Chip>
            <Chip value="angular">Angular</Chip>
          </ChipGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={OVERFLOW_CODE} />

        {/* ── Section 6: With icons ── */}
        <ComponentPreview
          title="With icons"
          description="leadingIcon renders an icon before the label — must be a valid IconName from omverse-ui"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip leadingIcon="star">Starred</Chip>
            <Chip leadingIcon="settings">Settings</Chip>
            <Chip leadingIcon="bell"  color="warning" variant="tonal">Alerts</Chip>
            <Chip leadingIcon="check" color="success" variant="tonal">Done</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICONS_CODE} />

        {/* ── Section 7: With badge ── */}
        <ComponentPreview
          title="With badge"
          description="badgeCount shows a numeric badge after the label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip badgeCount={4}>Inbox</Chip>
            <Chip badgeCount={12} color="error"  variant="tonal">Unread</Chip>
            <Chip badgeCount={3}  color="info"   variant="filled">Mentions</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BADGE_CODE} />

        {/* ── Section 8: Loading ── */}
        <ComponentPreview
          title="Loading"
          description="loading prop replaces the chip content with a spinner"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip loading>Processing...</Chip>
            <Chip loading color="secondary" variant="tonal">Uploading...</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LOADING_CODE} />

        {/* ── Section 9: Input chips — removable ── */}
        <ComponentPreview
          title="Input chips — removable"
          description="removable adds a × button; onRemove fires when it's clicked"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {emails.map(email => (
              <Chip
                key={email}
                removable
                onRemove={() => setEmails(prev => prev.filter(e => e !== email))}
                variant="tonal"
              >
                {email}
              </Chip>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={REMOVABLE_CODE} />

        {/* ── Section 10: With avatar ── */}
        <ComponentPreview
          title="With avatar"
          description="avatarSrc renders a profile image before the label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip avatarSrc="https://i.pravatar.cc/150?img=1" avatarAlt="John">John Doe</Chip>
            <Chip avatarSrc="https://i.pravatar.cc/150?img=5" avatarAlt="Jane">Jane Smith</Chip>
            <Chip avatarSrc="https://i.pravatar.cc/150?img=3" avatarAlt="Bob">Bob Lee</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={AVATAR_CODE} />

        {/* ── Section 11: Color dot ── */}
        <ComponentPreview
          title="Color dot"
          description="colorDot renders a small colored circle before the label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip colorDot="#10B981">Design</Chip>
            <Chip colorDot="#3B82F6">Engineering</Chip>
            <Chip colorDot="#F59E0B">Marketing</Chip>
            <Chip colorDot="#EF4444">On hold</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLOR_DOT_CODE} />

        {/* ── Section 12: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default), and lg chip sizes"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <Chip size="sm" variant="filled">Small</Chip>
            <Chip size="md" variant="filled">Medium</Chip>
            <Chip size="lg" variant="filled">Large</Chip>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 13: Disabled ── */}
        <ComponentPreview
          title="Disabled"
          description="disabled prevents all interaction"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip disabled>Outlined</Chip>
            <Chip disabled variant="filled">Filled</Chip>
            <Chip disabled variant="tonal">Tonal</Chip>
          </div>
        </ComponentPreview>

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Chip props
        </p>
        <PropsTable props={CHIP_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          ChipGroup props
        </p>
        <PropsTable props={GROUP_PROPS} />

      </div>
    </div>
  );
}
