'use client';

import { useState } from 'react';
import { Tabs, StepTabs } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const TABS_PROPS = [
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    description: 'Default active tab value — uncontrolled',
  },
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    description: 'Controlled active tab value',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: 'undefined',
    description: 'Callback fired when the active tab changes',
  },
  {
    name: 'variant',
    type: "'underline' | 'pill' | 'filled' | 'bordered' | 'card' | 'floating' | 'line' | 'bubble' | 'gradient'",
    default: "'underline'",
    description: 'Visual style of the tab list',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Tab list orientation',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size of tab labels',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Tabs } from 'omverse-ui'
// TabsList, TabsTrigger, TabsContent are rendered internally
// — the Tabs component wires the variant styles automatically.

<Tabs defaultValue="overview" variant="underline">
  {/* Use TabsList / TabsTrigger / TabsContent once exported */}
</Tabs>`;

const VARIANTS_CODE = `// 9 visual variants
<Tabs variant="underline">  ...  </Tabs>
<Tabs variant="pill">       ...  </Tabs>
<Tabs variant="filled">     ...  </Tabs>
<Tabs variant="bordered">   ...  </Tabs>
<Tabs variant="card">       ...  </Tabs>
<Tabs variant="floating">   ...  </Tabs>
<Tabs variant="line">       ...  </Tabs>
<Tabs variant="bubble">     ...  </Tabs>
<Tabs variant="gradient">   ...  </Tabs>`;

const VERTICAL_CODE = `<Tabs orientation="vertical" variant="line">
  {/* tabs render in a column, content beside them */}
</Tabs>`;

const STEP_TABS_CODE = `import { StepTabs } from 'omverse-ui'

const [step, setStep] = useState('settings');

<StepTabs
  steps={[
    { value: 'account',  label: 'Account',  done: true },
    { value: 'profile',  label: 'Profile',  done: true },
    { value: 'settings', label: 'Settings' },
    { value: 'confirm',  label: 'Confirm',  disabled: true },
  ]}
  value={step}
  onChange={setStep}
/>`;

/* ─── Shared styles ─── */

const contentStyle: React.CSSProperties = {
  padding: '14px 16px',
  fontSize: 13,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.6,
};

/* ─────────────────────────────────────────
   Local tab demo — until TabsList / TabsTrigger
   / TabsContent are individually exported, we
   build a controlled demo using native elements
   and let the <Tabs> wrapper apply variant styles.
───────────────────────────────────────────── */

const TAB_ITEMS = [
  { value: 'overview',  label: 'Overview',  content: 'Overview content' },
  { value: 'analytics', label: 'Analytics', content: 'Analytics content' },
  { value: 'settings',  label: 'Settings',  content: 'Settings content' },
];

const ALL_VARIANTS = [
  'underline', 'pill', 'filled', 'bordered',
  'card', 'floating', 'line', 'bubble', 'gradient',
] as const;

type TabVariant = (typeof ALL_VARIANTS)[number];

/** Native tab demo that lives inside a <Tabs> wrapper for variant styles. */
function TabDemo({
  variant,
  orientation = 'horizontal',
  items = TAB_ITEMS,
}: {
  variant: TabVariant;
  orientation?: 'horizontal' | 'vertical';
  items?: typeof TAB_ITEMS;
}) {
  const [active, setActive] = useState(items[0].value);

  const isVertical = orientation === 'vertical';

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    gap: 2,
    borderBottom: isVertical ? 'none' : '1px solid var(--color-border-primary)',
    borderRight: isVertical ? '1px solid var(--color-border-primary)' : 'none',
    minWidth: isVertical ? 120 : undefined,
    padding: isVertical ? '4px 0' : '0',
  };

  const btnBase: React.CSSProperties = {
    padding: isVertical ? '8px 16px' : '8px 14px',
    fontSize: 13,
    fontWeight: 500,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 6,
    transition: 'all 0.15s',
    textAlign: isVertical ? 'left' : 'center',
    whiteSpace: 'nowrap',
  };

  const activeBtn: React.CSSProperties = {
    ...btnBase,
    color: 'var(--color-primary)',
    background: 'var(--color-primary-subtle, rgba(99,102,241,0.08))',
  };

  const inactiveBtn: React.CSSProperties = {
    ...btnBase,
    color: 'var(--color-text-secondary)',
  };

  const wrapStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'row' : 'column',
    width: '100%',
  };

  const activeContent = items.find((i) => i.value === active)?.content ?? '';

  return (
    <Tabs variant={variant} orientation={orientation} style={{ width: '100%' }}>
      <div style={wrapStyle}>
        <div role="tablist" style={listStyle}>
          {items.map((item) => (
            <button
              key={item.value}
              role="tab"
              aria-selected={active === item.value}
              onClick={() => setActive(item.value)}
              style={active === item.value ? activeBtn : inactiveBtn}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" style={contentStyle}>
          {activeContent}
        </div>
      </div>
    </Tabs>
  );
}

/* ── StepTabs demo (needs controlled value + onChange) ── */

function StepTabsDemo() {
  const [step, setStep] = useState('settings');
  return (
    <StepTabs
      steps={[
        { value: 'account',  label: 'Account',  done: true },
        { value: 'profile',  label: 'Profile',  done: true },
        { value: 'settings', label: 'Settings' },
        { value: 'confirm',  label: 'Confirm',  disabled: true },
      ]}
      value={step}
      onChange={setStep}
    />
  );
}

/* ─── Page ─── */

export default function TabsPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Tabs']}
        title="Tabs"
        description="Organize content into sections. 9 variants, horizontal and vertical orientation, badge and icon support."
        tags={['9 variants', 'Horizontal', 'Vertical', 'Controlled', 'StepTabs']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Underline variant — M3 primary style with bottom-border indicator"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TabDemo variant="underline" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: All 9 variants ── */}
        <ComponentPreview
          title="All 9 variants"
          description="underline · pill · filled · bordered · card · floating · line · bubble · gradient"
          align="start"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%', maxWidth: 800 }}>
            {ALL_VARIANTS.map((v) => (
              <div key={v}>
                <p style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 8,
                }}>
                  {v}
                </p>
                <TabDemo variant={v} />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 3: Vertical ── */}
        <ComponentPreview
          title="Vertical"
          description="orientation='vertical' — tabs in a column with content beside them (sidebar style)"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TabDemo
              variant="line"
              orientation="vertical"
              items={[
                { value: 'profile',  label: 'Profile',  content: 'Profile settings' },
                { value: 'account',  label: 'Account',  content: 'Account settings' },
                { value: 'security', label: 'Security', content: 'Security settings' },
              ]}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Section 4: StepTabs ── */}
        <ComponentPreview
          title="StepTabs"
          description="Wizard/onboarding progress — done steps show a checkmark, disabled steps are unclickable"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <StepTabsDemo />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STEP_TABS_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={TABS_PROPS} />

      </div>
    </div>
  );
}
