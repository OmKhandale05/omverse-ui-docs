'use client';

import { useState } from 'react';
import { Chip, ChipGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const CHIP_PROPS = [
  { name: 'label',        type: 'string',                                                                     default: '—',         description: 'Text content of the chip' },
  { name: 'variant',      type: "'outlined' | 'filled' | 'tonal' | 'elevated'",                              default: "'outlined'", description: 'Visual style of the chip' },
  { name: 'color',        type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",       default: "'default'", description: 'Color of the chip' },
  { name: 'size',         type: "'sm' | 'md' | 'lg'",                                                        default: "'md'",      description: 'Size of the chip' },
  { name: 'selected',     type: 'boolean',                                                                    default: 'false',     description: 'Selected / active state' },
  { name: 'removable',    type: 'boolean',                                                                    default: 'false',     description: 'Shows a remove (×) button' },
  { name: 'onRemove',     type: '() => void',                                                                 default: '—',         description: 'Callback when the remove button is clicked' },
  { name: 'leadingIcon',  type: 'string',                                                                     default: '—',         description: 'Icon name shown before the label' },
  { name: 'avatarSrc',    type: 'string',                                                                     default: '—',         description: 'Avatar image URL shown before the label' },
  { name: 'avatarAlt',    type: 'string',                                                                     default: '—',         description: 'Alt text for the avatar image' },
  { name: 'colorDot',     type: 'string',                                                                     default: '—',         description: 'CSS color for a colored dot before the label' },
  { name: 'badgeCount',   type: 'number',                                                                     default: '—',         description: 'Badge count shown after the label' },
  { name: 'loading',      type: 'boolean',                                                                    default: 'false',     description: 'Replaces content with a spinner' },
  { name: 'disabled',     type: 'boolean',                                                                    default: 'false',     description: 'Disables the chip' },
  { name: 'onClick',      type: '() => void',                                                                 default: '—',         description: 'Click handler' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const GROUP_PROPS = [
  { name: 'value',       type: 'string | string[]',                                                           default: '—',          description: 'Controlled selected value(s)' },
  { name: 'onChange',    type: '(value: string | string[]) => void',                                          default: '—',          description: 'Callback when selection changes' },
  { name: 'mode',        type: "'single' | 'multi'",                                                          default: "'single'",   description: 'Single or multi-select mode' },
  { name: 'max',         type: 'number',                                                                      default: '—',          description: 'Max chips shown before +N overflow' },
  { name: 'color',       type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",        default: '—',          description: 'Color applied to all chips' },
  { name: 'size',        type: "'sm' | 'md' | 'lg'",                                                         default: '—',          description: 'Size applied to all chips' },
  { name: 'children',   type: 'ReactNode',                                                                    default: '—',          description: 'Chip components with a value prop' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `<Chip label="Outlined (default)" variant="outlined" />
<Chip label="Filled"           variant="filled"   />
<Chip label="Tonal"            variant="tonal"    />
<Chip label="Elevated"         variant="elevated" />`;

const COLORS_CODE = `{/* Outlined row */}
<Chip label="Default"   color="default"   variant="outlined" selected />
<Chip label="Secondary" color="secondary" variant="outlined" selected />
<Chip label="Success"   color="success"   variant="outlined" selected />
<Chip label="Warning"   color="warning"   variant="outlined" selected />
<Chip label="Error"     color="error"     variant="outlined" selected />
<Chip label="Info"      color="info"      variant="outlined" selected />

{/* Filled row */}
<Chip label="Default"   color="default"   variant="filled" selected />
<Chip label="Secondary" color="secondary" variant="filled" selected />
<Chip label="Success"   color="success"   variant="filled" selected />
<Chip label="Warning"   color="warning"   variant="filled" selected />
<Chip label="Error"     color="error"     variant="filled" selected />
<Chip label="Info"      color="info"      variant="filled" selected />`;

const SINGLE_CODE = `const [filter, setFilter] = useState(['all'])

<ChipGroup mode="single" value={filter} onChange={val => setFilter([val as string])} variant="filled">
  <Chip value="all"      label="All"      />
  <Chip value="active"   label="Active"   />
  <Chip value="pending"  label="Pending"  />
  <Chip value="archived" label="Archived" />
</ChipGroup>`;

const MULTI_CODE = `const [tags, setTags] = useState(['react', 'ts'])

<ChipGroup mode="multi" value={tags} onChange={val => setTags(val as string[])}>
  <Chip value="react"    label="React"      />
  <Chip value="ts"       label="TypeScript" />
  <Chip value="tailwind" label="Tailwind"   />
  <Chip value="vue"      label="Vue"        />
  <Chip value="angular"  label="Angular"    />
  <Chip value="svelte"   label="Svelte"     />
</ChipGroup>`;

const OVERFLOW_CODE = `<ChipGroup mode="multi" value={tags} onChange={val => setTags(val as string[])} max={3}>
  <Chip value="react"    label="React"      />
  <Chip value="ts"       label="TypeScript" />
  <Chip value="tailwind" label="Tailwind"   />
  <Chip value="vue"      label="Vue"        />
  <Chip value="angular"  label="Angular"    />
</ChipGroup>`;

const ICONS_CODE = `<Chip label="Dashboard" leadingIcon="layout-dashboard" />
<Chip label="Settings"  leadingIcon="settings" />
<Chip label="Alerts"    leadingIcon="bell" color="warning" variant="tonal" />
<Chip label="Success"   leadingIcon="check" color="success" variant="tonal" />`;

const BADGE_CODE = `<Chip label="Inbox"       badgeCount={4}  />
<Chip label="Unread"      badgeCount={12} color="error"   variant="tonal" />
<Chip label="Mentions"    badgeCount={3}  color="info"    variant="filled" />`;

const LOADING_CODE = `<Chip label="Processing..." loading />
<Chip label="Uploading..."  loading color="secondary" variant="tonal" />`;

const REMOVABLE_CODE = `const [emails, setEmails] = useState(['john@example.com', 'alice@example.com', 'bob@example.com'])

{emails.map(email => (
  <Chip
    key={email}
    label={email}
    removable
    onRemove={() => setEmails(prev => prev.filter(e => e !== email))}
    variant="tonal"
  />
))}`;

const AVATAR_CODE = `<Chip label="John Doe"   avatarSrc="https://i.pravatar.cc/150?img=1" avatarAlt="John" />
<Chip label="Jane Smith" avatarSrc="https://i.pravatar.cc/150?img=5" avatarAlt="Jane" />
<Chip label="Bob Lee"    avatarSrc="https://i.pravatar.cc/150?img=3" avatarAlt="Bob"  />`;

const COLOR_DOT_CODE = `<Chip label="Design"     colorDot="#10B981" />
<Chip label="Engineering" colorDot="#3B82F6" />
<Chip label="Marketing"   colorDot="#F59E0B" />
<Chip label="On hold"     colorDot="#EF4444" />`;

const SIZES_CODE = `<Chip label="Small"  size="sm" variant="filled" />
<Chip label="Medium" size="md" variant="filled" />
<Chip label="Large"  size="lg" variant="filled" />`;

/* ─── Page ─── */

export default function ChipPage() {
  const [tags,    setTags]    = useState<string[]>(['react', 'ts']);
  const [filter,  setFilter]  = useState<string[]>(['all']);
  const [emails,  setEmails]  = useState(['john@example.com', 'alice@example.com', 'bob@example.com']);

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
            <Chip label="Outlined (default)" variant="outlined" />
            <Chip label="Filled"             variant="filled"   />
            <Chip label="Tonal"              variant="tonal"    />
            <Chip label="Elevated"           variant="elevated" />
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
              <Chip label="Default"   color="default"   variant="outlined" selected />
              <Chip label="Secondary" color="secondary" variant="outlined" selected />
              <Chip label="Success"   color="success"   variant="outlined" selected />
              <Chip label="Warning"   color="warning"   variant="outlined" selected />
              <Chip label="Error"     color="error"     variant="outlined" selected />
              <Chip label="Info"      color="info"      variant="outlined" selected />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Chip label="Default"   color="default"   variant="filled" selected />
              <Chip label="Secondary" color="secondary" variant="filled" selected />
              <Chip label="Success"   color="success"   variant="filled" selected />
              <Chip label="Warning"   color="warning"   variant="filled" selected />
              <Chip label="Error"     color="error"     variant="filled" selected />
              <Chip label="Info"      color="info"      variant="filled" selected />
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
            value={filter[0]}
            onChange={val => setFilter([val as string])}
            variant="filled"
          >
            <Chip value="all"      label="All"      />
            <Chip value="active"   label="Active"   />
            <Chip value="pending"  label="Pending"  />
            <Chip value="archived" label="Archived" />
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
            onChange={val => setTags(val as string[])}
          >
            <Chip value="react"    label="React"      />
            <Chip value="ts"       label="TypeScript" />
            <Chip value="tailwind" label="Tailwind"   />
            <Chip value="vue"      label="Vue"        />
            <Chip value="angular"  label="Angular"    />
            <Chip value="svelte"   label="Svelte"     />
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
            onChange={val => setTags(val as string[])}
            max={3}
          >
            <Chip value="react"    label="React"      />
            <Chip value="ts"       label="TypeScript" />
            <Chip value="tailwind" label="Tailwind"   />
            <Chip value="vue"      label="Vue"        />
            <Chip value="angular"  label="Angular"    />
          </ChipGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={OVERFLOW_CODE} />

        {/* ── Section 6: With icons ── */}
        <ComponentPreview
          title="With icons"
          description="leadingIcon renders an icon before the label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip label="Dashboard" leadingIcon="layout-dashboard" />
            <Chip label="Settings"  leadingIcon="settings" />
            <Chip label="Alerts"    leadingIcon="bell"  color="warning" variant="tonal" />
            <Chip label="Success"   leadingIcon="check" color="success" variant="tonal" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICONS_CODE} />

        {/* ── Section 7: With badge ── */}
        <ComponentPreview
          title="With badge"
          description="badgeCount shows a numeric badge after the label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip label="Inbox"    badgeCount={4}  />
            <Chip label="Unread"   badgeCount={12} color="error" variant="tonal" />
            <Chip label="Mentions" badgeCount={3}  color="info"  variant="filled" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BADGE_CODE} />

        {/* ── Section 8: Loading ── */}
        <ComponentPreview
          title="Loading"
          description="loading prop replaces the chip content with a spinner"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip label="Processing..." loading />
            <Chip label="Uploading..."  loading color="secondary" variant="tonal" />
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
                label={email}
                removable
                onRemove={() => setEmails(prev => prev.filter(e => e !== email))}
                variant="tonal"
              />
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
            <Chip label="John Doe"   avatarSrc="https://i.pravatar.cc/150?img=1" avatarAlt="John" />
            <Chip label="Jane Smith" avatarSrc="https://i.pravatar.cc/150?img=5" avatarAlt="Jane" />
            <Chip label="Bob Lee"    avatarSrc="https://i.pravatar.cc/150?img=3" avatarAlt="Bob"  />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={AVATAR_CODE} />

        {/* ── Section 11: Color dot ── */}
        <ComponentPreview
          title="Color dot"
          description="colorDot renders a small colored circle before the label"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip label="Design"      colorDot="#10B981" />
            <Chip label="Engineering" colorDot="#3B82F6" />
            <Chip label="Marketing"   colorDot="#F59E0B" />
            <Chip label="On hold"     colorDot="#EF4444" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLOR_DOT_CODE} />

        {/* ── Section 12: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default), and lg chip sizes"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <Chip label="Small"  size="sm" variant="filled" />
            <Chip label="Medium" size="md" variant="filled" />
            <Chip label="Large"  size="lg" variant="filled" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 13: Disabled ── */}
        <ComponentPreview
          title="Disabled"
          description="disabled prevents all interaction"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip label="Outlined" disabled />
            <Chip label="Filled"   disabled variant="filled" />
            <Chip label="Tonal"    disabled variant="tonal" />
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
