'use client';

import { useState, useRef } from 'react';
import { StepTabs } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import {
  AccessibilityChecklist,
  Anatomy,
  BehaviorGrid,
  ComponentDocSection,
  ComponentDocumentation,
  ContentGuidelines,
  GuidanceList,
  KeyboardTable,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation';

/* ─── Props tables ─── */

const TABS_PROPS = [
  { name: 'defaultValue',  type: 'string',                                    default: '—',           description: 'Initially active tab value (uncontrolled)' },
  { name: 'value',         type: 'string',                                    default: '—',           description: 'Controlled active tab value' },
  { name: 'onValueChange', type: '(value: string) => void',                   default: '—',           description: 'Callback fired when the active tab changes' },
  { name: 'variant',       type: "'underline' | 'line' | 'pill' | 'filled' | 'bordered' | 'card' | 'floating' | 'bubble' | 'gradient'", default: "'underline'", description: 'Visual style of the tab list' },
  { name: 'orientation',   type: "'horizontal' | 'vertical'",                 default: "'horizontal'", description: 'Tab list direction' },
  { name: 'size',          type: "'sm' | 'md' | 'lg'",                        default: "'md'",         description: 'Size of tab labels' },
  { name: 'children',      type: 'ReactNode',                                 default: '—',           description: 'TabsList + TabsContent components' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const STEP_PROPS = [
  { name: 'value',    type: 'string',                                                                              default: '—', description: 'Controlled active step value' },
  { name: 'onChange', type: '(value: string) => void',                                                             default: '—', description: 'Callback fired when the active step changes' },
  { name: 'steps',    type: '{ value: string; label: string; done?: boolean; disabled?: boolean }[]',              default: '—', description: 'Step definitions' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Step data ─── */

const stepTabsSteps = [
  { value: 'account', label: 'Account', done: true     },
  { value: 'profile', label: 'Profile'                 },
  { value: 'plan',    label: 'Plan'                    },
  { value: 'done',    label: 'Done',    disabled: true },
];

/* ─── Code snippets ─── */

const UNDERLINE_CODE = `<Tabs variant="underline" defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview" icon="info">Overview</TabsTrigger>
    <TabsTrigger value="analytics" badge={3}>Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="messages" badge={12}>Messages</TabsTrigger>
    <TabsTrigger value="settings" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><p>Overview content goes here.</p></TabsContent>
  <TabsContent value="analytics"><p>Analytics content goes here.</p></TabsContent>
  <TabsContent value="reports"><p>Reports content goes here.</p></TabsContent>
  <TabsContent value="messages"><p>Messages content goes here.</p></TabsContent>
</Tabs>`;

const PILL_CODE = `<Tabs variant="pill" defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="paused">Paused</TabsTrigger>
    <TabsTrigger value="completed">Completed</TabsTrigger>
  </TabsList>
  <TabsContent value="all"><p>All items shown here.</p></TabsContent>
  <TabsContent value="active"><p>Active items shown here.</p></TabsContent>
  <TabsContent value="paused"><p>Paused items shown here.</p></TabsContent>
  <TabsContent value="completed"><p>Completed items shown here.</p></TabsContent>
</Tabs>`;

const FILLED_CODE = `<Tabs variant="filled" defaultValue="design">
  <TabsList>
    <TabsTrigger value="design">Design</TabsTrigger>
    <TabsTrigger value="engineering">Engineering</TabsTrigger>
    <TabsTrigger value="marketing">Marketing</TabsTrigger>
    <TabsTrigger value="product">Product</TabsTrigger>
  </TabsList>
  <TabsContent value="design"><p>Design team content.</p></TabsContent>
  <TabsContent value="engineering"><p>Engineering team content.</p></TabsContent>
  <TabsContent value="marketing"><p>Marketing team content.</p></TabsContent>
  <TabsContent value="product"><p>Product team content.</p></TabsContent>
</Tabs>`;

const BORDERED_CODE = `<Tabs variant="bordered" defaultValue="day">
  <TabsList>
    <TabsTrigger value="day">Day</TabsTrigger>
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
    <TabsTrigger value="year">Year</TabsTrigger>
  </TabsList>
  <TabsContent value="day"><p>Daily view.</p></TabsContent>
  <TabsContent value="week"><p>Weekly view.</p></TabsContent>
  <TabsContent value="month"><p>Monthly view.</p></TabsContent>
  <TabsContent value="year"><p>Yearly view.</p></TabsContent>
</Tabs>`;

const CARD_CODE = `<Tabs variant="card" defaultValue="analytics">
  <TabsList>
    <TabsTrigger value="analytics" icon="info">Analytics</TabsTrigger>
    <TabsTrigger value="team" icon="info">Team</TabsTrigger>
    <TabsTrigger value="settings" icon="settings">Settings</TabsTrigger>
    <TabsTrigger value="billing" icon="info">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="analytics"><p>Analytics dashboard content.</p></TabsContent>
  <TabsContent value="team"><p>Team management content.</p></TabsContent>
  <TabsContent value="settings"><p>Settings content.</p></TabsContent>
  <TabsContent value="billing"><p>Billing content.</p></TabsContent>
</Tabs>`;

const FLOATING_CODE = `<Tabs variant="floating" defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><p>Overview content.</p></TabsContent>
  <TabsContent value="analytics"><p>Analytics content.</p></TabsContent>
  <TabsContent value="reports"><p>Reports content.</p></TabsContent>
  <TabsContent value="settings"><p>Settings content.</p></TabsContent>
</Tabs>`;

const BUBBLE_CODE = `<Tabs variant="bubble" defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">All posts</TabsTrigger>
    <TabsTrigger value="published">Published</TabsTrigger>
    <TabsTrigger value="drafts">Drafts</TabsTrigger>
    <TabsTrigger value="archived">Archived</TabsTrigger>
  </TabsList>
  <TabsContent value="all"><p>All posts content.</p></TabsContent>
  <TabsContent value="published"><p>Published posts.</p></TabsContent>
  <TabsContent value="drafts"><p>Draft posts.</p></TabsContent>
  <TabsContent value="archived"><p>Archived posts.</p></TabsContent>
</Tabs>`;

const GRADIENT_CODE = `<Tabs variant="gradient" defaultValue="monthly">
  <TabsList>
    <TabsTrigger value="monthly">Monthly</TabsTrigger>
    <TabsTrigger value="yearly">Yearly</TabsTrigger>
    <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
  </TabsList>
  <TabsContent value="monthly"><p>Monthly pricing plans.</p></TabsContent>
  <TabsContent value="yearly"><p>Yearly pricing — save 20%.</p></TabsContent>
  <TabsContent value="lifetime"><p>Lifetime access — one-time payment.</p></TabsContent>
</Tabs>`;

const VERTICAL_CODE = `<Tabs variant="line" orientation="vertical" defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile"       icon="info">Profile</TabsTrigger>
    <TabsTrigger value="notifications" icon="bell">Notifications</TabsTrigger>
    <TabsTrigger value="security"      icon="lock">Security</TabsTrigger>
    <TabsTrigger value="billing"       icon="info">Billing</TabsTrigger>
    <TabsTrigger value="advanced"      icon="settings">Advanced</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">
    <p className="font-medium">Profile settings</p>
    <p>Manage your profile information.</p>
  </TabsContent>
  <TabsContent value="notifications">
    <p className="font-medium">Notification preferences</p>
    <p>Control how you receive notifications.</p>
  </TabsContent>
  {/* … other content panels */}
</Tabs>`;

const SCROLLABLE_CODE = `const scrollRef = useRef<HTMLDivElement>(null)

function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
  e.preventDefault()
  if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY
}

<div style={{ width: 300, overflow: 'hidden' }}>
  <div
    ref={scrollRef}
    onWheel={handleWheel}
    style={{
      display: 'flex',
      overflowX: 'scroll',
      borderBottom: '2px solid var(--color-border)',
      scrollbarWidth: 'none',
    }}
  >
    {['React', 'TypeScript', 'Tailwind', 'Next.js',
      'Vue', 'Angular', 'Svelte', 'Remix', 'Astro'].map(t => (
      <button
        key={t}
        type="button"
        style={{ flexShrink: 0, padding: '8px 16px', whiteSpace: 'nowrap' }}
      >
        {t}
      </button>
    ))}
  </div>
</div>`;

const STEP_TABS_CODE = `import { StepTabs } from 'omverse-ui'

const steps = [
  { value: 'account', label: 'Account', done: true     },
  { value: 'profile', label: 'Profile'                 },
  { value: 'plan',    label: 'Plan'                    },
  { value: 'done',    label: 'Done',    disabled: true },
]

const [step, setStep] = useState('profile')

<StepTabs value={step} onChange={setStep} steps={steps} />

<div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
  <button onClick={() => {
    const idx = steps.findIndex(s => s.value === step)
    if (idx > 0) setStep(steps[idx - 1].value)
  }}>← Back</button>
  <button onClick={() => {
    const idx = steps.findIndex(s => s.value === step)
    const next = steps[idx + 1]
    if (next && !next.disabled) setStep(next.value)
  }}>Next →</button>
</div>`;

const SUBTITLE_CODE = `<Tabs variant="underline" defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview"   subtitle="All metrics">Overview</TabsTrigger>
    <TabsTrigger value="revenue"    subtitle="$48.2k">Revenue</TabsTrigger>
    <TabsTrigger value="users"      subtitle="2,841 active">Users</TabsTrigger>
    <TabsTrigger value="conversion" subtitle="3.2%">Conversion</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><p>All metrics overview.</p></TabsContent>
  <TabsContent value="revenue"><p>Revenue breakdown.</p></TabsContent>
  <TabsContent value="users"><p>User analytics.</p></TabsContent>
  <TabsContent value="conversion"><p>Conversion funnel.</p></TabsContent>
</Tabs>`;

/* ─── Inline tab demo helper ─── */
/* TabsList / TabsTrigger / TabsContent are not exported from omverse-ui; */
/* this helper recreates the same look via styled buttons.                 */

type TabItem = {
  value: string;
  label: string;
  icon?: string;       // tabler class, e.g. 'ti-info-circle'
  badge?: number;
  disabled?: boolean;
  subtitle?: string;
};

function TabDemo({
  tabs,
  variant = 'underline',
  orientation = 'horizontal',
  defaultValue,
  contentMap,
}: {
  tabs: TabItem[];
  variant?: string;
  orientation?: 'horizontal' | 'vertical';
  defaultValue?: string;
  contentMap?: Record<string, { title: string; desc: string }>;
}) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? '');
  const isVertical = orientation === 'vertical';

  /* ── Root wrapper ── */
  const wrapStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'row' : 'column',
    gap: isVertical ? 16 : 0,
    width: '100%',
  };

  /* ── List container — matches tabsListVariants CVA exactly ── */
  const listStyle: React.CSSProperties = (() => {
    const row: React.CSSProperties = { display: 'flex', flexShrink: 0, flexDirection: isVertical ? 'column' : 'row' };
    switch (variant) {
      case 'underline':
        // border-b-2 border-outline gap-0  (vertical → border-r-2 flex-col)
        return isVertical
          ? { ...row, gap: 0, borderRight: '2px solid var(--color-outline)' }
          : { ...row, gap: 0, borderBottom: '2px solid var(--color-outline)' };
      case 'pill':
        // bg-surface-variant p-1 rounded-xl gap-1
        return { ...row, gap: 4, background: 'var(--color-surface-variant)', padding: '4px', borderRadius: 12 };
      case 'filled':
        // gap-1
        return { ...row, gap: 4 };
      case 'bordered':
        // border-[1.5px] border-outline rounded-xl overflow-hidden gap-0
        return { ...row, gap: 0, border: '1.5px solid var(--color-outline)', borderRadius: 12, overflow: 'hidden' };
      case 'card':
        // gap-2
        return { ...row, gap: 8 };
      case 'floating':
        // bg-background shadow-elevation-2 p-1 rounded-xl gap-1
        return { ...row, gap: 4, background: 'var(--color-background)', padding: '4px', borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)' };
      case 'line':
        // flex-col border-l-2 border-outline gap-0  (horizontal → flex-row border-b-2)
        return isVertical
          ? { ...row, gap: 0, flexDirection: 'column', borderLeft: '2px solid var(--color-outline)' }
          : { ...row, gap: 0, flexDirection: 'row',    borderBottom: '2px solid var(--color-outline)' };
      case 'bubble':
        // gap-1.5  — NO background, NO border on list
        return { ...row, gap: 6 };
      case 'gradient':
        // bg-surface-variant p-1 rounded-xl gap-1
        return { ...row, gap: 4, background: 'var(--color-surface-variant)', padding: '4px', borderRadius: 12 };
      default:
        return row;
    }
  })();

  /* ── Tab button — matches tabTriggerVariants CVA exactly ── */
  const getTabStyle = (item: TabItem, index: number = 0, total: number = 1): React.CSSProperties => {
    const isActive = item.value === active;

    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontSize: 13,
      fontWeight: isActive ? 600 : 500,
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 0.4 : 1,
      background: 'transparent',
      border: 'none',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      transition: 'all 0.15s',
    };

    switch (variant) {
      case 'underline':
        // px-4 py-2.5  border-b-2 border-transparent -mb-[2px]
        // active → text-primary border-primary
        return {
          ...base,
          padding: '10px 16px',
          borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
          marginBottom: -2,
          color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        };

      case 'pill':
        // px-4 py-1.5 rounded-lg
        // active → bg-background text-text-primary shadow-sm
        return {
          ...base,
          padding: '6px 16px',
          borderRadius: 8,
          background: isActive ? 'var(--color-background)' : 'transparent',
          color:      isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          boxShadow:  isActive ? '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)' : 'none',
        };

      case 'filled':
        // px-4 py-2 rounded-lg
        // active → bg-primary-container text-on-primary-container
        return {
          ...base,
          padding: '8px 16px',
          borderRadius: 8,
          background: isActive ? 'var(--color-primary-container)' : 'transparent',
          color:      isActive ? 'var(--color-on-primary-container)' : 'var(--color-text-secondary)',
        };

      case 'bordered':
        // flex-1 px-4 py-2  border-r border-outline last:border-r-0
        // active → bg-primary text-on-primary
        return {
          ...base,
          flex: 1,
          padding: '8px 16px',
          borderRight: index < total - 1 ? '1px solid var(--color-outline)' : 'none',
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color:      isActive ? 'var(--color-on-primary)' : 'var(--color-text-secondary)',
        };

      case 'card':
        // flex-col px-5 py-3 rounded-xl border-[1.5px] border-outline bg-surface
        // active → border-primary bg-background text-primary shadow-md
        return {
          ...base,
          flexDirection: 'column',
          padding: '12px 20px',
          borderRadius: 12,
          border:     isActive ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-outline)',
          background: isActive ? 'var(--color-background)' : 'var(--color-surface)',
          color:      isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
          boxShadow:  isActive ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
        };

      case 'floating':
        // px-4 py-2 rounded-lg
        // active → bg-primary text-on-primary shadow-md
        return {
          ...base,
          padding: '8px 16px',
          borderRadius: 8,
          background: isActive ? 'var(--color-primary)' : 'transparent',
          color:      isActive ? 'var(--color-on-primary)' : 'var(--color-text-secondary)',
          boxShadow:  isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        };

      case 'line':
        // px-4 py-2  border-l-2 border-transparent -ml-[2px]
        // active → border-primary bg-primary-container/20 text-primary
        // horizontal → border-b-2 border-transparent -mb-[2px]
        return isVertical
          ? {
              ...base,
              padding: '8px 16px',
              borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
              marginLeft: -2,
              background: isActive ? 'rgba(var(--color-primary-container-rgb, 219,234,254), 0.2)' : 'transparent',
              color:      isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            }
          : {
              ...base,
              padding: '10px 16px',
              borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
              marginBottom: -2,
              color:        isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            };

      case 'bubble':
        // px-4 py-1.5 rounded-full border-[1.5px] border-transparent
        // active → bg-secondary-container text-on-secondary-container border-secondary
        return {
          ...base,
          padding: '6px 16px',
          borderRadius: 9999,
          border:     isActive ? '1.5px solid var(--color-secondary)' : '1.5px solid transparent',
          background: isActive ? 'var(--color-secondary-container)' : 'transparent',
          color:      isActive ? 'var(--color-on-secondary-container)' : 'var(--color-text-secondary)',
        };

      case 'gradient':
        // px-4 py-1.5 rounded-lg
        // active → bg-gradient-to-r from-primary to-secondary text-on-primary shadow-md
        return {
          ...base,
          padding: '6px 16px',
          borderRadius: 8,
          background: isActive
            ? 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
            : 'transparent',
          color:     isActive ? 'var(--color-on-primary)' : 'var(--color-text-secondary)',
          boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        };

      default:
        return { ...base, color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)' };
    }
  };

  const activeTab = tabs.find(t => t.value === active);

  return (
    <div style={wrapStyle}>
      {/* Tab list */}
      <div style={listStyle}>
        {tabs.map((item, i) => (
          <button
            key={item.value}
            style={getTabStyle(item, i, tabs.length)}
            disabled={item.disabled}
            onClick={() => !item.disabled && setActive(item.value)}
          >
            {/* Optional icon */}
            {item.icon && (
              <i className={`ti ${item.icon}`} style={{ fontSize: 14, lineHeight: 1 }} aria-hidden />
            )}

            {/* Label + optional subtitle */}
            {item.subtitle ? (
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <span>{item.label}</span>
                <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                  {item.subtitle}
                </span>
              </span>
            ) : (
              <span>{item.label}</span>
            )}

            {/* Badge */}
            {item.badge != null && (
              <span style={{
                fontSize: 10, padding: '1px 5px', borderRadius: 10,
                background: 'var(--color-primary)', color: '#fff',
                lineHeight: 1.4,
              }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{
        flex: 1,
        paddingLeft:  isVertical ? 16 : 0,
        paddingTop:   isVertical ? 0 : 12,
      }}>
        {contentMap ? (
          <div style={{
            padding: 16,
            background: 'var(--color-surface-variant)',
            borderRadius: 12,
          }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text-primary)', marginBottom: 6 }}>
              {contentMap[active]?.title}
            </p>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              {contentMap[active]?.desc}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            Content for <strong style={{ color: 'var(--color-text-primary)' }}>{activeTab?.label}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Tab data (matches original stories exactly) ─── */

const underlineTabs: TabItem[] = [
  { value: 'overview',  label: 'Overview',  icon: 'ti-info-circle' },
  { value: 'analytics', label: 'Analytics', badge: 3 },
  { value: 'reports',   label: 'Reports' },
  { value: 'messages',  label: 'Messages',  badge: 12 },
  { value: 'settings',  label: 'Settings',  disabled: true },
];

const pillTabs: TabItem[] = [
  { value: 'all',       label: 'All' },
  { value: 'active',    label: 'Active' },
  { value: 'paused',    label: 'Paused' },
  { value: 'completed', label: 'Completed' },
];

const filledTabs: TabItem[] = [
  { value: 'design',      label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing',   label: 'Marketing' },
  { value: 'product',     label: 'Product' },
];

const borderedTabs: TabItem[] = [
  { value: 'day',   label: 'Day' },
  { value: 'week',  label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year',  label: 'Year' },
];

const cardTabs: TabItem[] = [
  { value: 'analytics', label: 'Analytics', icon: 'ti-info-circle' },
  { value: 'team',      label: 'Team',      icon: 'ti-info-circle' },
  { value: 'settings',  label: 'Settings',  icon: 'ti-settings' },
  { value: 'billing',   label: 'Billing',   icon: 'ti-info-circle' },
];

const floatingTabs: TabItem[] = [
  { value: 'overview',  label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports',   label: 'Reports' },
  { value: 'settings',  label: 'Settings' },
];

const bubbleTabs: TabItem[] = [
  { value: 'all',       label: 'All posts' },
  { value: 'published', label: 'Published' },
  { value: 'drafts',    label: 'Drafts' },
  { value: 'archived',  label: 'Archived' },
];

const gradientTabs: TabItem[] = [
  { value: 'monthly',  label: 'Monthly' },
  { value: 'yearly',   label: 'Yearly' },
  { value: 'lifetime', label: 'Lifetime' },
];

const verticalTabs: TabItem[] = [
  { value: 'profile',       label: 'Profile',       icon: 'ti-info-circle' },
  { value: 'notifications', label: 'Notifications', icon: 'ti-bell' },
  { value: 'security',      label: 'Security',      icon: 'ti-lock' },
  { value: 'billing',       label: 'Billing',       icon: 'ti-info-circle' },
  { value: 'advanced',      label: 'Advanced',      icon: 'ti-settings' },
];

const verticalContentMap: Record<string, { title: string; desc: string }> = {
  profile:       { title: 'Profile settings',         desc: 'Manage your profile information.' },
  notifications: { title: 'Notification preferences', desc: 'Control how you receive notifications.' },
  security:      { title: 'Security settings',         desc: 'Manage passwords and 2FA.' },
  billing:       { title: 'Billing & plans',           desc: 'Manage your subscription.' },
  advanced:      { title: 'Advanced settings',         desc: 'Danger zone and advanced options.' },
};

const subtitleTabs: TabItem[] = [
  { value: 'overview',    label: 'Overview',    subtitle: 'All metrics' },
  { value: 'revenue',     label: 'Revenue',     subtitle: '$48.2k' },
  { value: 'users',       label: 'Users',       subtitle: '2,841 active' },
  { value: 'conversion',  label: 'Conversion',  subtitle: '3.2%' },
];

const SCROLLABLE_ITEMS = ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Remix', 'Astro'];

/* ─── Page ─── */

export default function TabsPage() {
  const [step, setStep]               = useState('profile');
  const [scrollActive, setScrollActive] = useState('React');
  const scrollRef = useRef<HTMLDivElement>(null);

  const stepIdx = stepTabsSteps.findIndex(s => s.value === step);

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
  }

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Tabs']}
        title="Tabs"
        description="9 variants · horizontal + vertical · badge · icon · subtitle · scrollable · step"
        tags={['Underline', 'Pill', 'Filled', 'Bordered', 'Card', 'Floating', 'Bubble', 'Gradient', 'Vertical (line)', 'Scrollable', 'StepTabs', 'With subtitle']}
      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Tabs organize peer views within the same context and let people move between them without leaving the page.">
          <div className="component-doc-stack">
            <ComponentPreview title="Related views" description="The active tab is visually and programmatically connected to its panel." layout="start">
              <div style={{ width: '100%', maxWidth: 560 }}><TabDemo tabs={underlineTabs.slice(0, 4)} variant="underline" /></div>
            </ComponentPreview>
            <CodeBlock filename="ProjectTabs.tsx" code={UNDERLINE_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy" description="Tabs consist of a tablist, ordered tab triggers, an active indicator, and one associated content panel.">
          <Anatomy preview={
            <div className="component-anatomy-visual tabs-anatomy">
              <div className="tabs-anatomy-list"><span data-active="true">Overview</span><span>Activity</span><span>Settings</span></div>
              <div className="tabs-anatomy-panel">Overview panel content</div>
              <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 12, left: -34 }}>1</span>
              <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 38 }}>2</span>
              <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 37, right: -34 }}>3</span>
              <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ bottom: 26, right: -34 }}>4</span>
            </div>
          } items={[
            { number: 1, name: 'Tablist', description: 'Groups peer tabs and declares horizontal or vertical orientation.', required: true },
            { number: 2, name: 'Tab trigger', description: 'Names and activates one corresponding panel.', required: true },
            { number: 3, name: 'Active indicator', description: 'Distinguishes the selected tab without relying on color alone.', required: true },
            { number: 4, name: 'Tab panel', description: 'Contains the view controlled by the selected trigger.', required: true },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Use tabs when a small set of peer views belongs to one page context.">
          <GuidanceList tone="do" items={[
            { title: 'Switch between related views', description: 'Keep the page title and primary context stable while panel content changes.' },
            { title: 'Organize manageable content', description: 'Use concise labels for a small, predictable set of categories.' },
            { title: 'Preserve quick comparison', description: 'Let people move between views without a full navigation transition.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="Choose navigation or progressive disclosure when content is not peer-level.">
          <GuidanceList tone="dont" items={[
            { title: 'Do not use for destinations', description: 'Use navigation links when each item has its own page, URL, or information hierarchy.' },
            { title: 'Do not use for sequential tasks', description: 'Use a stepper for required ordered progress; StepTabs communicates progress, not peer views.' },
            { title: 'Do not hide critical content', description: 'Use sections or Accordion when people need to read content together.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Visual variants must preserve the same tab semantics and interaction model.">
          <BehaviorGrid items={[
            { icon: 'ti-line', title: 'Underline', description: 'Default choice for page-level peer views.' },
            { icon: 'ti-pill', title: 'Pill and filled', description: 'Compact choice for filters and tightly scoped views.' },
            { icon: 'ti-layout-sidebar', title: 'Vertical line', description: 'Useful when labels are longer or the view count is larger.' },
            { icon: 'ti-list-numbers', title: 'StepTabs', description: 'Shows progress through a sequential workflow.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="Each trigger communicates selection, focus, availability, and optional supporting status.">
          <StateMatrix rows={[
            { state: 'Inactive', trigger: 'Another tab is selected', visual: 'Neutral label', interaction: 'Can receive focus and activate' },
            { state: 'Hover', trigger: 'Pointer enters an enabled tab', visual: 'Subtle emphasis', interaction: 'Signals availability' },
            { state: 'Focus', trigger: 'Keyboard navigation', visual: 'Visible focus indicator', interaction: 'Arrow keys move focus' },
            { state: 'Active', trigger: 'Tab is selected', visual: 'Indicator and emphasized label', interaction: 'Its panel is displayed' },
            { state: 'Disabled', trigger: 'View is unavailable', visual: 'Reduced emphasis', interaction: 'Skipped by keyboard navigation' },
            { state: 'Complete', trigger: 'StepTabs step is finished', visual: 'Completion mark and connector', interaction: 'May remain revisitable' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="Tabs use roving focus and keep every trigger associated with exactly one panel.">
          <BehaviorGrid items={[
            { icon: 'ti-arrows-horizontal', title: 'Focus movement', description: 'Arrow keys move focus through enabled tabs and wrap at list boundaries.' },
            { icon: 'ti-link', title: 'Panel relationship', description: 'Trigger and panel share a stable value used for IDs and ARIA references.' },
            { icon: 'ti-device-desktop', title: 'Overflow', description: 'Allow horizontal scrolling rather than shrinking labels beyond readability.' },
            { icon: 'ti-refresh', title: 'Mounted state', description: 'Use keepMounted only when inactive panel state must persist.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="Tabs follow the ARIA tab pattern with one tabbable trigger, directional navigation, and labelled tab panels.">
          <div className="component-doc-stack">
            <KeyboardTable rows={[
              { keys: ['Tab'], action: 'Moves focus into the active tab, then into the active panel.' },
              { keys: ['←', '→'], action: 'Moves focus across horizontal tabs.' },
              { keys: ['↑', '↓'], action: 'Moves focus across vertical tabs.' },
              { keys: ['Home', 'End'], action: 'Moves focus to the first or last enabled tab.' },
            ]} />
            <AccessibilityChecklist items={['Use concise, unique tab labels.', 'Keep one trigger in the page tab order.', 'Expose selected state with aria-selected.', 'Connect every trigger and panel with stable IDs.', 'Declare vertical orientation when applicable.', 'Do not use disabled tabs to advertise unavailable features without explanation.']} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Tab labels describe the view—not the action of opening it.">
          <ContentGuidelines rules={[
            { label: 'Use short nouns', guidance: 'Name the content category with one or two familiar words.', example: 'Overview' },
            { label: 'Keep labels parallel', guidance: 'Use the same grammatical pattern and level of specificity.', example: 'Overview · Activity · Settings' },
            { label: 'Avoid instructions', guidance: 'Do not add “View,” “Open,” or “Go to” before labels.', example: 'Billing' },
            { label: 'Use badges sparingly', guidance: 'Show actionable counts or status, not decorative metrics.', example: 'Messages 12' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="The examples below cover the supported visual treatments, orientations, overflow, subtitles, and sequential StepTabs pattern.">
          <div className="component-doc-stack">

        {/* ── Section 1: Underline ── */}
        <ComponentPreview
          title="Underline (M3 primary)"
          description="Classic bottom-border active indicator — icon, badge, disabled states"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 600 }}>
            <TabDemo tabs={underlineTabs} variant="underline" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={UNDERLINE_CODE} />

        {/* ── Section 2: Pill ── */}
        <ComponentPreview
          title="Pill / Segmented"
          description="Floating pill on a tinted background — great for filter controls"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TabDemo tabs={pillTabs} variant="pill" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PILL_CODE} />

        {/* ── Section 3: Filled ── */}
        <ComponentPreview
          title="Filled"
          description="Solid primary background on the active tab"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TabDemo tabs={filledTabs} variant="filled" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FILLED_CODE} />

        {/* ── Section 4: Bordered ── */}
        <ComponentPreview
          title="Bordered"
          description="Outlined active tab — clean and minimal"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 360 }}>
            <TabDemo tabs={borderedTabs} variant="bordered" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BORDERED_CODE} />

        {/* ── Section 5: Card ── */}
        <ComponentPreview
          title="Card tabs"
          description="Each tab styled as an individual card — supports icons"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 500 }}>
            <TabDemo tabs={cardTabs} variant="card" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 6: Floating ── */}
        <ComponentPreview
          title="Floating pill"
          description="Elevated floating appearance with shadow on the active tab"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TabDemo tabs={floatingTabs} variant="floating" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FLOATING_CODE} />

        {/* ── Section 7: Bubble ── */}
        <ComponentPreview
          title="Bubble"
          description="Rounded bubble selection on a tinted container"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TabDemo tabs={bubbleTabs} variant="bubble" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BUBBLE_CODE} />

        {/* ── Section 8: Gradient ── */}
        <ComponentPreview
          title="Gradient active"
          description="Gradient background on the active tab — great for pricing toggles"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 360 }}>
            <TabDemo tabs={gradientTabs} variant="gradient" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />

        {/* ── Section 9: Vertical (line) ── */}
        <ComponentPreview
          title="Vertical (line variant)"
          description="orientation=vertical stacks the tab list on the left — icons supported"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <TabDemo
              tabs={verticalTabs}
              variant="line"
              orientation="vertical"
              contentMap={verticalContentMap}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Section 10: Scrollable ── */}
        <ComponentPreview
          title="Scrollable"
          description="Overflow tabs scroll horizontally — scroll with mouse wheel or drag"
          layout="start"
        >
          <div>
            <div style={{ width: 300, overflow: 'hidden' }}>
              <div
                ref={scrollRef}
                onWheel={handleWheel}
                style={{
                  display: 'flex',
                  overflowX: 'scroll',
                  overflowY: 'hidden',
                  borderBottom: '2px solid var(--color-border)',
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
                  msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'],
                }}
              >
                {SCROLLABLE_ITEMS.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setScrollActive(t)}
                    style={{
                      flexShrink: 0,
                      padding: '8px 16px',
                      fontSize: 13,
                      whiteSpace: 'nowrap',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: scrollActive === t ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      fontWeight: scrollActive === t ? 600 : 400,
                      borderBottom: scrollActive === t ? '2px solid var(--color-primary)' : '2px solid transparent',
                      marginBottom: -2,
                      transition: 'all 0.15s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Active: <strong style={{ color: 'var(--color-text-primary)' }}>{scrollActive}</strong>
              <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                — scroll left/right to see all tabs
              </span>
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SCROLLABLE_CODE} />

        {/* ── Section 11: Step tabs ── */}
        <ComponentPreview
          title="StepTabs — wizard"
          description="Progress indicator for multi-step flows — done, active, and disabled states"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 540 }}>
            <StepTabs value={step} onChange={setStep} steps={stepTabsSteps} />
            <div style={{
              marginTop: 16, padding: 16,
              background: 'var(--color-surface-variant)',
              borderRadius: 12,
            }}>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Current step: <strong style={{ color: 'var(--color-text-primary)' }}>{step}</strong>
              </p>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={() => { if (stepIdx > 0) setStep(stepTabsSteps[stepIdx - 1].value); }}
                disabled={stepIdx === 0}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13,
                  border: '1px solid var(--color-border)',
                  background: 'transparent',
                  color: 'var(--color-text-secondary)',
                  cursor: stepIdx === 0 ? 'not-allowed' : 'pointer',
                  opacity: stepIdx === 0 ? 0.5 : 1,
                }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = stepTabsSteps[stepIdx + 1];
                  if (next && !next.disabled) setStep(next.value);
                }}
                disabled={!stepTabsSteps[stepIdx + 1] || !!stepTabsSteps[stepIdx + 1]?.disabled}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13,
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STEP_TABS_CODE} />

        {/* ── Section 12: With subtitle ── */}
        <ComponentPreview
          title="With subtitle"
          description="subtitle prop adds a small secondary line below each tab label"
          layout="start"
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <TabDemo tabs={subtitleTabs} variant="underline" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SUBTITLE_CODE} />

          </div>
        </ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="Tabs is the state provider; TabsList, TabsTrigger, and TabsContent form the compound structure. StepTabs exposes a separate progress API.">
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Tabs props
        </p>
        <PropsTable props={TABS_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          StepTabs props
        </p>
        <PropsTable props={STEP_PROPS} />
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Choose the pattern based on whether people switch views, navigate, reveal content, or advance through steps.">
          <RelatedComponents items={[
            { name: 'Navbar', href: '/components/navbar', description: 'Navigate between destinations', icon: 'ti-navigation' },
            { name: 'Accordion', href: '/components/accordion', description: 'Reveal sections in one content flow', icon: 'ti-layout-navbar-expand' },
            { name: 'Breadcrumb', href: '/components/breadcrumb', description: 'Show hierarchical location', icon: 'ti-route' },
            { name: 'Button', href: '/components/button', description: 'Trigger a single action', icon: 'ti-hand-click' },
          ]} />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  );
}
