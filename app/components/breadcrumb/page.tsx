'use client';

import { Breadcrumb, type BreadcrumbItem } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const BREADCRUMB_PROPS = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    default: '—',
    description: 'Array of breadcrumb items — label, href, icon, active, onClick',
  },
  {
    name: 'variant',
    type: "'default' | 'pill' | 'outlined' | 'dark' | 'floating' | 'gradient' | 'underline' | 'arrow' | 'glass' | 'highlight' | 'numbered'",
    default: "'default'",
    description: 'Visual style of the breadcrumb trail',
  },
  {
    name: 'separator',
    type: "'chevron' | 'slash' | 'dot' | 'arrow'",
    default: "'chevron'",
    description: 'Separator style between items',
  },
  {
    name: 'customSeparator',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Custom separator element (overrides separator prop)',
  },
  {
    name: 'maxItems',
    type: 'number',
    default: '0',
    description: 'Max items before collapsing middle items into ··· (0 = show all)',
  },
  {
    name: 'showHomeIcon',
    type: 'boolean',
    default: 'false',
    description: 'Shows a home icon on the first item',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Shared items ─── */

const ITEMS: BreadcrumbItem[] = [
  { label: 'Home',      onClick: () => {} },
  { label: 'Dashboard', onClick: () => {} },
  { label: 'Settings',  onClick: () => {} },
  { label: 'Profile',   active: true },
];

const LONG_ITEMS: BreadcrumbItem[] = [
  { label: 'Home',      onClick: () => {} },
  { label: 'Dashboard', onClick: () => {} },
  { label: 'Projects',  onClick: () => {} },
  { label: 'Frontend',  onClick: () => {} },
  { label: 'Settings',  active: true },
];

const ICON_ITEMS: BreadcrumbItem[] = [
  { label: 'Home',      icon: 'bookmark', onClick: () => {} },
  { label: 'Projects',  icon: 'file-text', onClick: () => {} },
  { label: 'Settings',  icon: 'settings',  onClick: () => {} },
  { label: 'Profile',   icon: 'users',     active: true },
];

const NUMBERED_ITEMS: BreadcrumbItem[] = [
  { label: 'Account',  step: 1, stepStatus: 'done' },
  { label: 'Profile',  step: 2, stepStatus: 'done' },
  { label: 'Settings', step: 3, stepStatus: 'current' },
  { label: 'Confirm',  step: 4, stepStatus: 'pending' },
];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Breadcrumb } from 'omverse-ui'

const items = [
  { label: 'Home',      onClick: () => {} },
  { label: 'Dashboard', onClick: () => {} },
  { label: 'Settings',  onClick: () => {} },
  { label: 'Profile',   active: true },
]

<Breadcrumb items={items} />`;

const VARIANTS_CODE = `// 11 visual variants
<Breadcrumb items={items} variant="default" />
<Breadcrumb items={items} variant="pill" />
<Breadcrumb items={items} variant="outlined" />
<Breadcrumb items={items} variant="dark" />
<Breadcrumb items={items} variant="floating" />
<Breadcrumb items={items} variant="gradient" />
<Breadcrumb items={items} variant="underline" />
<Breadcrumb items={items} variant="arrow" />
<Breadcrumb items={items} variant="highlight" />

// glass — use on a coloured background
<div style={{ background: 'linear-gradient(135deg,#1E3A8A,#4C1D95)', padding: '12px 16px', borderRadius: 8 }}>
  <Breadcrumb items={items} variant="glass" />
</div>`;

const SEPARATORS_CODE = `<Breadcrumb items={items} separator="chevron" />
<Breadcrumb items={items} separator="slash" />
<Breadcrumb items={items} separator="dot" />

// Custom separator
<Breadcrumb items={items} customSeparator={<span style={{ color: 'var(--color-primary)' }}>→</span>} />`;

const ICONS_CODE = `const items = [
  { label: 'Home',     icon: 'bookmark', onClick: () => {} },
  { label: 'Projects', icon: 'file-text', onClick: () => {} },
  { label: 'Settings', icon: 'settings',  onClick: () => {} },
  { label: 'Profile',  icon: 'users',     active: true },
]

<Breadcrumb items={items} />`;

const COLLAPSED_CODE = `// maxItems collapses middle items into ···
<Breadcrumb
  items={[
    { label: 'Home',      onClick: () => {} },
    { label: 'Dashboard', onClick: () => {} },
    { label: 'Projects',  onClick: () => {} },
    { label: 'Frontend',  onClick: () => {} },
    { label: 'Settings',  active: true },
  ]}
  maxItems={3}
/>`;

const NUMBERED_CODE = `// numbered variant with step status
const items = [
  { label: 'Account',  step: 1, stepStatus: 'done' },
  { label: 'Profile',  step: 2, stepStatus: 'done' },
  { label: 'Settings', step: 3, stepStatus: 'current' },
  { label: 'Confirm',  step: 4, stepStatus: 'pending' },
]

<Breadcrumb items={items} variant="numbered" />`;

/* ─── Shared layout helpers ─── */

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 8,
};

const darkBg: React.CSSProperties = {
  background: 'linear-gradient(135deg,#1E3A8A,#4C1D95)',
  padding: '12px 16px',
  borderRadius: 8,
};

/* ─── Page ─── */

export default function BreadcrumbPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Breadcrumb']}
        title="Breadcrumb"
        description="Hierarchical navigation trail showing where the user is. 11 variants, 4 separators, icons and collapsible."
        tags={['11 variants', '4 separators', 'Icons', 'Collapsible', 'Numbered steps']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Plain text trail with chevron separators — clean and accessible"
          align="start"
        >
          <Breadcrumb items={ITEMS} />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: All 11 variants ── */}
        <ComponentPreview
          title="All 11 variants"
          description="default · pill · outlined · dark · floating · gradient · underline · arrow · glass · highlight · numbered"
          align="start"
        >
          <div style={stack}>
            {(
              [
                { variant: 'default'  as const, label: 'default'  },
                { variant: 'pill'     as const, label: 'pill'     },
                { variant: 'outlined' as const, label: 'outlined' },
                { variant: 'dark'     as const, label: 'dark'     },
                { variant: 'floating' as const, label: 'floating' },
                { variant: 'gradient' as const, label: 'gradient' },
                { variant: 'underline'as const, label: 'underline'},
                { variant: 'arrow'    as const, label: 'arrow'    },
                { variant: 'highlight'as const, label: 'highlight'},
              ]
            ).map(({ variant, label: lbl }) => (
              <div key={variant}>
                <p style={label}>{lbl}</p>
                <Breadcrumb items={ITEMS} variant={variant} />
              </div>
            ))}

            {/* glass needs its own coloured background */}
            <div>
              <p style={label}>glass</p>
              <div style={darkBg}>
                <Breadcrumb items={ITEMS} variant="glass" />
              </div>
            </div>

            {/* numbered uses step/stepStatus items */}
            <div>
              <p style={label}>numbered</p>
              <Breadcrumb items={NUMBERED_ITEMS} variant="numbered" />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 3: Separators ── */}
        <ComponentPreview
          title="Separators"
          description="chevron (default) · slash · dot · custom element"
          align="start"
        >
          <div style={stack}>
            {(
              [
                { sep: 'chevron' as const, lbl: 'chevron' },
                { sep: 'slash'   as const, lbl: 'slash'   },
                { sep: 'dot'     as const, lbl: 'dot'     },
              ]
            ).map(({ sep, lbl }) => (
              <div key={sep}>
                <p style={label}>{lbl}</p>
                <Breadcrumb items={ITEMS} separator={sep} />
              </div>
            ))}
            <div>
              <p style={label}>custom → </p>
              <Breadcrumb
                items={ITEMS}
                customSeparator={
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700, margin: '0 2px' }}>→</span>
                }
              />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEPARATORS_CODE} />

        {/* ── Section 4: With icons ── */}
        <ComponentPreview
          title="With icons"
          description="icon prop on each BreadcrumbItem adds a leading icon before the label"
          align="start"
        >
          <div style={stack}>
            <div>
              <p style={label}>default + icons</p>
              <Breadcrumb items={ICON_ITEMS} />
            </div>
            <div>
              <p style={label}>pill + icons</p>
              <Breadcrumb items={ICON_ITEMS} variant="pill" />
            </div>
            <div>
              <p style={label}>showHomeIcon (auto home on first item)</p>
              <Breadcrumb items={ITEMS} showHomeIcon />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICONS_CODE} />

        {/* ── Section 5: Collapsible ── */}
        <ComponentPreview
          title="Collapsible"
          description="maxItems={3} collapses the middle trail into ··· — click to expand"
          align="start"
        >
          <div style={stack}>
            <div>
              <p style={label}>maxItems=3 (5 items → collapses 2)</p>
              <Breadcrumb items={LONG_ITEMS} maxItems={3} />
            </div>
            <div>
              <p style={label}>pill + maxItems=3</p>
              <Breadcrumb items={LONG_ITEMS} variant="pill" maxItems={3} />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLLAPSED_CODE} />

        {/* ── Section 6: Numbered steps ── */}
        <ComponentPreview
          title="Numbered steps"
          description="numbered variant uses step and stepStatus — done · current · pending"
          align="start"
        >
          <Breadcrumb items={NUMBERED_ITEMS} variant="numbered" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={NUMBERED_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={BREADCRUMB_PROPS} />

      </div>
    </div>
  );
}
