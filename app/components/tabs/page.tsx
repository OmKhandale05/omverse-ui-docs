'use client';

import { useState } from 'react';
import { Tabs, StepTabs } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const TABS_PROPS = [
  { name: 'defaultValue',  type: 'string',                                    default: '—',           description: 'Initially active tab value (uncontrolled)' },
  { name: 'value',         type: 'string',                                    default: '—',           description: 'Controlled active tab value' },
  { name: 'onChange',      type: '(value: string) => void',                   default: '—',           description: 'Callback fired when the active tab changes' },
  { name: 'variant',       type: "'underline' | 'pill' | 'filled' | 'bordered' | 'card' | 'floating' | 'bubble' | 'gradient'", default: "'underline'", description: 'Visual style of the tab list' },
  { name: 'orientation',   type: "'horizontal' | 'vertical'",                 default: "'horizontal'", description: 'Tab list direction' },
  { name: 'children',      type: 'ReactNode',                                 default: '—',           description: 'TabsList + TabsContent components' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const STEP_PROPS = [
  { name: 'value',         type: 'string',                                    default: '—',           description: 'Controlled active step value' },
  { name: 'onChange',      type: '(value: string) => void',                   default: '—',           description: 'Callback fired when the active step changes' },
  { name: 'steps',         type: '{ value: string; label: string; done?: boolean; disabled?: boolean }[]', default: '—', description: 'Step definitions' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Step data ─── */

const stepTabsSteps = [
  { value: 'account', label: 'Account', done: true     },
  { value: 'profile', label: 'Profile'                 },
  { value: 'plan',    label: 'Plan'                    },
  { value: 'done',    label: 'Done',    disabled: true },
];

/* ─── Code snippets ─── */

const UNDERLINE_CODE = `import { Tabs } from 'omverse-ui'

<Tabs variant="underline" defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview" icon="layout-dashboard">Overview</TabsTrigger>
    <TabsTrigger value="analytics" icon="bar-chart-2" badge={3}>Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><p>Overview content</p></TabsContent>
  <TabsContent value="analytics"><p>Analytics content</p></TabsContent>
  <TabsContent value="reports"><p>Reports content</p></TabsContent>
  <TabsContent value="settings"><p>Settings content</p></TabsContent>
</Tabs>`;

const PILL_CODE = `<Tabs variant="pill" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Profile</TabsTrigger>
    <TabsTrigger value="tab3">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1"><p>Account content</p></TabsContent>
  <TabsContent value="tab2"><p>Profile content</p></TabsContent>
  <TabsContent value="tab3"><p>Billing content</p></TabsContent>
</Tabs>`;

const FILLED_CODE = `<Tabs variant="filled" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab one</TabsTrigger>
    <TabsTrigger value="tab2">Tab two</TabsTrigger>
    <TabsTrigger value="tab3">Tab three</TabsTrigger>
  </TabsList>
</Tabs>`;

const BORDERED_CODE = `<Tabs variant="bordered" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab one</TabsTrigger>
    <TabsTrigger value="tab2">Tab two</TabsTrigger>
    <TabsTrigger value="tab3">Tab three</TabsTrigger>
  </TabsList>
</Tabs>`;

const CARD_CODE = `<Tabs variant="card" defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview"  icon="home">Overview</TabsTrigger>
    <TabsTrigger value="analytics" icon="bar-chart-2">Analytics</TabsTrigger>
    <TabsTrigger value="settings"  icon="settings">Settings</TabsTrigger>
  </TabsList>
</Tabs>`;

const FLOATING_CODE = `<Tabs variant="floating" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab one</TabsTrigger>
    <TabsTrigger value="tab2">Tab two</TabsTrigger>
    <TabsTrigger value="tab3">Tab three</TabsTrigger>
  </TabsList>
</Tabs>`;

const BUBBLE_CODE = `<Tabs variant="bubble" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab one</TabsTrigger>
    <TabsTrigger value="tab2">Tab two</TabsTrigger>
    <TabsTrigger value="tab3">Tab three</TabsTrigger>
  </TabsList>
</Tabs>`;

const GRADIENT_CODE = `<Tabs variant="gradient" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab one</TabsTrigger>
    <TabsTrigger value="tab2">Tab two</TabsTrigger>
    <TabsTrigger value="tab3">Tab three</TabsTrigger>
  </TabsList>
</Tabs>`;

const VERTICAL_CODE = `<Tabs variant="underline" orientation="vertical" defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
    <TabsTrigger value="tab3">Notifications</TabsTrigger>
    <TabsTrigger value="tab4">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1"><p>Account settings</p></TabsContent>
  <TabsContent value="tab2"><p>Password settings</p></TabsContent>
  <TabsContent value="tab3"><p>Notification preferences</p></TabsContent>
  <TabsContent value="tab4"><p>Billing details</p></TabsContent>
</Tabs>`;

const STEP_TABS_CODE = `import { StepTabs } from 'omverse-ui'

const steps = [
  { value: 'account', label: 'Account', done: true     },
  { value: 'profile', label: 'Profile'                 },
  { value: 'plan',    label: 'Plan'                    },
  { value: 'done',    label: 'Done',    disabled: true },
]

const [step, setStep] = useState('profile')

<StepTabs value={step} onChange={setStep} steps={steps} />

<div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
  <button onClick={() => {
    const idx = steps.findIndex(s => s.value === step)
    if (idx > 0) setStep(steps[idx - 1].value)
  }}>Back</button>
  <button onClick={() => {
    const idx = steps.findIndex(s => s.value === step)
    const next = steps[idx + 1]
    if (next && !next.disabled) setStep(next.value)
  }}>Next</button>
</div>`;

/* ─── Inline tab demo helper (TabsList/TabsTrigger/TabsContent not exported) ─── */

type TabItem = { value: string; label: string; icon?: string; badge?: number; disabled?: boolean };

function TabDemo({
  tabs,
  variant = 'underline',
  orientation = 'horizontal',
  subtitle,
}: {
  tabs: TabItem[];
  variant?: string;
  orientation?: 'horizontal' | 'vertical';
  subtitle?: boolean;
}) {
  const [active, setActive] = useState(tabs[0]?.value ?? '');

  const isVertical = orientation === 'vertical';

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'row' : 'column',
    gap: 0,
    width: '100%',
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    gap: variant === 'separated' ? 6 : 0,
    borderBottom: !isVertical ? '1px solid var(--color-border)' : 'none',
    borderRight: isVertical ? '1px solid var(--color-border)' : 'none',
    padding: ['pill', 'floating', 'bubble', 'gradient'].includes(variant) ? '4px' : 0,
    background: ['pill', 'floating', 'bubble', 'gradient'].includes(variant) ? 'var(--color-background-secondary)' : 'transparent',
    borderRadius: ['pill', 'floating', 'bubble', 'gradient'].includes(variant) ? 8 : 0,
    flexShrink: 0,
  };

  const getTabStyle = (item: TabItem): React.CSSProperties => {
    const isActive = item.value === active;
    const base: React.CSSProperties = {
      padding: '8px 14px',
      fontSize: 13,
      fontWeight: isActive ? 600 : 400,
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 0.4 : 1,
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap',
      color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
      transition: 'all 0.15s',
    };

    if (variant === 'underline') {
      return {
        ...base,
        borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
        marginBottom: -1,
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
      };
    }
    if (variant === 'pill' || variant === 'floating' || variant === 'bubble') {
      return {
        ...base,
        borderRadius: 6,
        background: isActive ? 'var(--color-background-primary)' : 'transparent',
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      };
    }
    if (variant === 'filled') {
      return {
        ...base,
        borderRadius: 6,
        background: isActive ? 'var(--color-primary)' : 'transparent',
        color: isActive ? '#fff' : 'var(--color-text-secondary)',
      };
    }
    if (variant === 'bordered') {
      return {
        ...base,
        border: isActive ? '1px solid var(--color-primary)' : '1px solid transparent',
        borderRadius: 6,
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
      };
    }
    if (variant === 'card') {
      return {
        ...base,
        background: isActive ? 'var(--color-background-primary)' : 'var(--color-background-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        marginRight: 4,
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
      };
    }
    if (variant === 'gradient') {
      return {
        ...base,
        borderRadius: 6,
        background: isActive ? 'linear-gradient(135deg, var(--color-primary) 0%, #764ba2 100%)' : 'transparent',
        color: isActive ? '#fff' : 'var(--color-text-secondary)',
      };
    }
    return base;
  };

  const activeTab = tabs.find(t => t.value === active);

  return (
    <div style={baseStyle}>
      <div style={listStyle}>
        {tabs.map(item => (
          <button
            key={item.value}
            style={getTabStyle(item)}
            disabled={item.disabled}
            onClick={() => !item.disabled && setActive(item.value)}
          >
            {item.label}
            {item.badge != null && (
              <span style={{
                fontSize: 10, padding: '1px 5px', borderRadius: 10,
                background: 'var(--color-primary)', color: '#fff',
              }}>{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div style={{ padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', flex: 1, paddingLeft: isVertical ? 16 : 0 }}>
        <p>Content for <strong>{activeTab?.label}</strong></p>
        {subtitle && <p style={{ marginTop: 4, fontSize: 12 }}>Subtitle — additional context for this tab</p>}
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function TabsPage() {
  const [step, setStep] = useState('profile');

  const overviewTabs: TabItem[] = [
    { value: 'overview',   label: 'Overview',   badge: 3   },
    { value: 'analytics',  label: 'Analytics'              },
    { value: 'reports',    label: 'Reports'                },
    { value: 'settings',   label: 'Settings',   disabled: true },
  ];

  const basicTabs: TabItem[] = [
    { value: 'tab1', label: 'Account'       },
    { value: 'tab2', label: 'Profile'       },
    { value: 'tab3', label: 'Billing'       },
  ];

  const cardTabs: TabItem[] = [
    { value: 'overview',  label: 'Overview'  },
    { value: 'analytics', label: 'Analytics' },
    { value: 'settings',  label: 'Settings'  },
  ];

  const verticalTabs: TabItem[] = [
    { value: 'tab1', label: 'Account'       },
    { value: 'tab2', label: 'Password'      },
    { value: 'tab3', label: 'Notifications' },
    { value: 'tab4', label: 'Billing'       },
  ];

  const stepIdx = stepTabsSteps.findIndex(s => s.value === step);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Tabs']}
        title="Tabs"
        description="8 variants · vertical orientation · StepTabs · with icons · badge · subtitle"
        tags={['Underline', 'Pill', 'Filled', 'Bordered', 'Card', 'Floating', 'Bubble', 'Gradient', 'Vertical', 'StepTabs', 'With subtitle']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Underline ── */}
        <ComponentPreview
          title="Underline"
          description="Classic bottom-border active indicator — the default variant"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <TabDemo tabs={overviewTabs} variant="underline" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={UNDERLINE_CODE} />

        {/* ── Section 2: Pill ── */}
        <ComponentPreview
          title="Pill"
          description="Floating pill on a tinted background"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={basicTabs} variant="pill" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PILL_CODE} />

        {/* ── Section 3: Filled ── */}
        <ComponentPreview
          title="Filled"
          description="Solid primary background on the active tab"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={basicTabs} variant="filled" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FILLED_CODE} />

        {/* ── Section 4: Bordered ── */}
        <ComponentPreview
          title="Bordered"
          description="Outlined active tab — clean and minimal"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={basicTabs} variant="bordered" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BORDERED_CODE} />

        {/* ── Section 5: Card ── */}
        <ComponentPreview
          title="Card"
          description="Each tab styled as an individual card"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={cardTabs} variant="card" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 6: Floating ── */}
        <ComponentPreview
          title="Floating"
          description="Elevated floating appearance with shadow"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={basicTabs} variant="floating" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FLOATING_CODE} />

        {/* ── Section 7: Bubble ── */}
        <ComponentPreview
          title="Bubble"
          description="Rounded bubble selection — similar to pill but softer"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={basicTabs} variant="bubble" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BUBBLE_CODE} />

        {/* ── Section 8: Gradient ── */}
        <ComponentPreview
          title="Gradient"
          description="Gradient active indicator — great for branding emphasis"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <TabDemo tabs={basicTabs} variant="gradient" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />

        {/* ── Section 9: Vertical ── */}
        <ComponentPreview
          title="Vertical"
          description="orientation=vertical stacks the tab list on the left — works with any variant"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 500 }}>
            <TabDemo tabs={verticalTabs} variant="underline" orientation="vertical" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Section 10: Step tabs ── */}
        <ComponentPreview
          title="StepTabs"
          description="Progress indicator for multi-step flows — done, active, and disabled states"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 540 }}>
            <StepTabs value={step} onChange={setStep} steps={stepTabsSteps} />
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  if (stepIdx > 0) setStep(stepTabsSteps[stepIdx - 1].value);
                }}
                disabled={stepIdx === 0}
                style={{
                  fontSize: 13, padding: '6px 14px', borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-background-primary)',
                  color: 'var(--color-text-primary)',
                  cursor: stepIdx === 0 ? 'not-allowed' : 'pointer',
                  opacity: stepIdx === 0 ? 0.5 : 1,
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  const next = stepTabsSteps[stepIdx + 1];
                  if (next && !next.disabled) setStep(next.value);
                }}
                disabled={!stepTabsSteps[stepIdx + 1] || !!stepTabsSteps[stepIdx + 1]?.disabled}
                style={{
                  fontSize: 13, padding: '6px 14px', borderRadius: 6,
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            </div>
            <p style={{ marginTop: 12, fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Current step: <strong>{step}</strong>
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STEP_TABS_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Tabs props
        </p>
        <PropsTable props={TABS_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          StepTabs props
        </p>
        <PropsTable props={STEP_PROPS} />

      </div>
    </div>
  );
}
